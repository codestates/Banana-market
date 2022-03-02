const { Article, Chat, UserArticles } = require('./models')
// const { Op } = require("sequelize");

module.exports = io => {

  const chatroom = io.of('/chatroom');
  
  chatroom.on('connect', (socket) => {
    console.log('= = = = = = = = = socket - chatroom 네임스페이스와 연결!!= = = = = = = = = ')
    // console.log("🗝 🚪 여기여ㅣㄱ", chatroom.adapter.rooms)
    
    // A. 채팅방 참여 요청 from client
    socket.on('join', async ({ userId, roomId }, callback) => {

      if (roomId) {
        // A-a. 참여중인 유저 목록 // userArticles 테이블에 해당 article의 user 레코드 찾기 (이미 있는 유저인지, 호스트인지) -> http /room/join에서 함..
        let getUsersInRoom = await UserArticles.findAll({
          where: {
            article_id: roomId
          },
          attributes: ['user_id'],
          raw: true
        }).catch(error => callback(error))
  
        // A-b. 참여중인 유저들 id만 추출
        getUsersInRoom = getUsersInRoom.map((user) => user.user_id)
        // console.log(getUsersInRoom);                        // [ 6, 5 ]
  
        // A-c. 참여중인 유저들 id 중 이번에 참여한 유저의 id와 일치하는 것 있는지 확인
        const checkUser = getUsersInRoom.filter(id => userId === id)
        // console.log("✅", checkUser);
        
        // A-d. 해당 게시글 모집 인원 확인    // current / total 숫자 비교해서 status -> false로 변경   // 현재 참여자 1 증가
        const articleData = await Article.findByPk(roomId, {
          attributes: [['current_mate', 'current'], ['total_mate', 'total'], 'status'],
          raw: true
        }).catch(error => callback(error))
        console.log("현재 아티클 인원??", articleData)
  
        // A-e. 모집 인원 남아 있고, status가 true인 게시글일 경우
        if (articleData.current < articleData.total && articleData.status === 1) {
          // A-e. 참여중이 아니라면, userarticles에 레코드 생성 및 참여자 1 증가, status 확인
          if (checkUser.length === 0) {

            // A-e. 방에 참가시켜줌
            socket.join(roomId)
            console.log(`⛹️‍♀️ 참가했나?? ${roomId}에??`)
            console.log(" 참여중인 룸 ?? : ", socket.rooms)            

            await UserArticles.create({
              user_id : userId,
              article_id : roomId,
              is_host : false 
            }).catch(error => callback(error))
  
            const articleAfter = await Article.findOne({
              where: {
                id: roomId
              }
            }).catch(error => callback(error))
  
            await articleAfter.update({
              current_mate: articleAfter.current_mate + 1
            }).catch(error => callback(error))
  
            if (articleAfter.current_mate === articleAfter.total_mate) {
              await articleAfter.update({
                status: false
              }).catch(error => callback(error))
              console.log(" 🤷 방이 다 찼어,,,")
            }
          }

          // A-f. 참여중이라면? -> 그냥 참여만 시켜줘..
          socket.join(roomId)
          console.log(" 참여중인 룸 ?? : ", socket.rooms)  
        }

        //  A-g. 모집 인원 안남았거나, 방 status가 false인 경우
        console.log(" 🤷 방이 다 찼어,,,")
        console.log(" 못 들어가고 참여중인 룸 ?? : ", socket.rooms)  
        // 참여중인 모든 유저 정보(id) 전달 (본인 포함) -> -> -> 필요할지..?
        chatroom.to(roomId).emit("usersInRoom", { users : getUsersInRoom })
      }
    })

    // B. 채팅방에서 나가기
    socket.on('leave', async({ userId, roomId }) => {
      socket.leave(roomId)
      console.log(`😳 서버 ${roomId}방을 나갔습니다`)

      // userArticles 테이블에서 해당 article의 user 레코드 지우기 및 Articles current -1
      await UserArticles.destroy({
        where : {
          user_id : userId,
          article_id : roomId
        }
      })

      const articleData = await Article.findByPk(roomId, {
        attributes: [['current_mate', 'current'], ['total_mate', 'total'], 'status'],
        raw: true
      }).catch(error => callback(error))

      if (articleData.current === articleData.total) {
        await articleData.update({
          status: true,
          current_mate: articleData.current -1
        })
      }
      await articleData.update({
        current_mate: articleData.current -1
      })
    })

    // C. 메세지 작성 -> 작성자, 게시글, 메세지 받아서 채팅 db에 저장
    socket.on('sendMessage', async ({ userId, roomId, message, created }, callback) => {
      console.log(" 📨 ", userId, roomId, message, created)

      await Chat.create({
        user_id : userId,
        article_id : roomId,
        contents : message
      })

      // created = Date.now()

      chatroom.to(roomId).emit("message", message, created)
      console.log("무슨 메세지?", message)
      callback();
    })

    // D. 소켓 연결 종료 (브라우저 닫을 때)
    socket.on('disconnect', () => {
      // socket.leave(roomId)
      console.log(`서버 연결 종료`)
    })
  })
}
