const { Article, User, Chat, UserArticles } = require('./models');
// const { Op } = require("sequelize");

module.exports = (io) => {
  const chatroom = io.of('/chatroom');

  chatroom.on('connect', (socket) => {
    console.log(
      '= = = = = = = = = socket - chatroom 네임스페이스와 연결!!= = = = = = = = = '
    );
    // console.log("🗝 🚪 여기여ㅣㄱ", chatroom.adapter.rooms)

    // A. 채팅방 참여 요청 from client
    socket.on('join', async ({ userId, roomId }, callback) => {
      if (roomId) {
        socket.join(roomId);
        console.log(`⛹️‍♀️ 참가했나?? ${userId} 유저, ${roomId}번 방에??`);
        console.log(' 참여중인 룸 ?? : ', socket.rooms);

        // // A-a. 참여중인 유저 목록 // userArticles 테이블에 해당 article의 user 레코드 찾기 (이미 있는 유저인지, 호스트인지) -> http /room/join에서 함..
        // let getUsersInRoom = await UserArticles.findAll({
        //   where: {
        //     article_id: roomId
        //   },
        //   attributes: ['user_id'],
        //   raw: true
        // }).catch(error => callback(error))

        // // A-b. 참여중인 유저들 id만 추출
        // getUsersInRoom = getUsersInRoom.map((user) => user.user_id)
        // // console.log(getUsersInRoom);                        // [ 6, 5 ]

        // // 참여중인 모든 유저 정보(id) 전달 (본인 포함) -> -> -> 필요할지..?
        // chatroom.to(roomId).emit("usersInRoom", { users : getUsersInRoom })
      }
    });

    // B. 채팅방에서 나가기
    socket.on('leave', async ({ userId, roomId }) => {
      // B-a. 해당 유저가 참여한 아티클인지 확인
      const checkJoin = await UserArticles.findOne({
        where: {
          user_id: userId,
          article_id: roomId,
        },
      }).catch((e) => console.log(e));
      console.log('참여한 사람 맞아?', checkJoin);

      // B-b. 참여한 유저 맞으면 room에서 내보내기
      if (checkJoin) {
        socket.leave(roomId);
        console.log(`😳 서버 ${roomId}번 방을 나갔습니다`);

        // B-b. userArticles 테이블에서 해당 article의 user 레코드 지우기
        await checkJoin.destroy();

        // B-b. Article
        const articleData = await Article.findOne({
          where: {
            id: roomId,
          },
          attributes: ['id', 'current_mate', 'total_mate', 'status'],
        }).catch((error) => callback(error));
        console.log('삭제하기 전 커런트??', articleData.get({ plain: true }));

        // B-c. 현재 인원과 모집 인원이 같았으면, current -1, status -> true
        if (articleData.current_mate === articleData.total_mate) {
          await articleData.update({
            status: true,
            current_mate: articleData.current_mate - 1,
          });
        } else {
          // B-c. 모집 인원이 남은 상태였으면 current만 -1
          await articleData.update({
            current_mate: articleData.current_mate - 1,
          });
        }
      } else {
        console.log(' ? ? 참여한 사람 아닌데 ? ? ? ');
      }
    });

    // C. 메세지 작성 -> 작성자, 게시글, 메세지 받아서 채팅 db에 저장
    socket.on('sendMessage', async ({ userId, roomId, message }, callback) => {
      console.log(' 📨 ', '유저:', userId, ', 룸: ', roomId, message);

      console.log(' 참여중인 룸 ?? : ', socket.rooms);

      let receivedMessage = await Chat.create({
        user_id: userId,
        article_id: roomId,
        contents: message,
      });

      let userPfp = await User.findByPk(userId, {
        attributes: ['id', 'name', ['profile_image_key', 'profileImage']],
      });
      userPfp = userPfp.get({ plain: true });
      receivedMessage = receivedMessage.get({ plain: true });
      // console.log("받아서 보낼 메세지 1", receivedMessage)
      receivedMessage = { ...receivedMessage, ...userPfp };
      console.log('받아서 보낼 메세지 2', receivedMessage);
      // receivedMessage = receivedMessage.get({ plain:true })

      chatroom.to(roomId).emit('message', receivedMessage);
      // console.log("무슨 메세지?", message)
      callback();
    });

    // D. 소켓 연결 종료 (브라우저 닫을 때)
    socket.on('disconnect', () => {
      // socket.leave(roomId)
      console.log(`서버 연결 종료`);
    });
  });
};
