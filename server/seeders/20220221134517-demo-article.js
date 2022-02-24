'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const articleNum = 9;
    const title = [
      '불고기',
      '사과 같이 사요',
      '우유 2병',
      '대파 나눔',
      '새우 1+1',
      '1+1 식빵 같이 사요',
      '인절미 1/N',
      '김치 2kg 공구',
      '코스트코 베이글',
    ];
    const markets = [
      '이마트',
      '홈플러스',
      '롯데마트',
      'gs슈퍼',
      '시장',
      '하나로마트',
      '트레이더스',
      '까르푸',
      '코스트코',
    ];
    const times = [
      '오전 06~09',
      '오전 09~12',
      '오후 12~01',
      '오후 01~03',
      '오후 03~06',
      '오후 06~09',
      '오후 09~12',
      '오전 00~03',
      '오전 03~06',
    ];
    const categories = [
      '정육/계란',
      '과일',
      '우유/유제품',
      '채소',
      '수산/건어물',
      '베이커리',
      '간식/떡/빙과',
      '김치/반찬',
      '기타',
    ];

    let articles = [];
    for (let i = 1; i < articleNum; i++) {
      let obj = {
        title: title[i],
        image_key: 'jointPurchaseDefaultImage.jpeg',
        image_location:
          'https://banana-mk-image.s3.ap-northeast-2.amazonaws.com/jointPurchaseDefaultImage.jpeg',
        content: '',
        category_id: i,
        market: markets[i],
        region_id: i,
        date: `2022-03-0${i + 1}`,
        // date : '2022-03-0' + i+1,
        time: times[i],
        total_mate: 3,
        current_mate: 1,
        trade_type: '공구',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      articles.push(obj);
    }

    for (let market of markets) {
      for (let i = 0; i < 9; i++) {
        let obj = {
          title: `${market} -- ${categories[i]} -- ${times[i]}`,
          image_key: 'jointPurchaseDefaultImage.jpeg',
          image_location:
            'https://banana-mk-image.s3.ap-northeast-2.amazonaws.com/jointPurchaseDefaultImage.jpeg',
          content: '',
          category_id: `${i + 1}`,
          market: `${market}`,
          region_id: `${i + 1}`,
          date: `2022-03-0${i + 1}`,
          // date : '2022-03-0' + i+1,
          time: `{times[i]}`,
          total_mate: 3,
          current_mate: 1,
          trade_type: '공구',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        articles.push(obj);
      }
    }
    return queryInterface.bulkInsert('Articles', articles, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles', null, {});
  },
};
