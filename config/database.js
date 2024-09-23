const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',   
  host: 'localhost',       
  database: 'snsApp', 
  password: '0000', 
  port: 5432,              
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('클라이언트 연결 오류', err.stack);
  } else {
    console.log('PostgreSQL에 연결되었습니다.');
    
    // 테이블 생성 쿼리
    const createTablesQuery = `
      -- 사용자 테이블
      CREATE TABLE IF NOT EXISTS user (
          user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- 사용자 식별 수단
          firebase_uid VARCHAR(128),                            -- Firebase 소셜 로그인 UID (최대 128자)
          email VARCHAR(255) UNIQUE,                            -- 사용자 이메일, UNIQUE 제약 조건
          username VARCHAR(20) UNIQUE,                          -- 사용자 닉네임, UNIQUE 제약 조건
          profile_image_url TEXT,                               -- 사용자 프로필 이미지 URL
          created_at TIMESTAMP DEFAULT NOW(),                   -- 계정 생성 날짜
          updated_at TIMESTAMP DEFAULT NOW()                    -- 계정 수정 날짜
      );

      -- 피드(게시글) 테이블
      CREATE TABLE IF NOT EXISTS feed (
          feed_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- 게시글 식별 수단
          user_id UUID REFERENCES user(user_id),                -- 작성자 ID, 사용자 테이블과의 FK 관계
          description TEXT,                                     -- 게시글 텍스트
          like_count INT DEFAULT 0,                             -- 좋아요 수
          comment_count INT DEFAULT 0,                          -- 댓글 수
          created_at TIMESTAMP DEFAULT NOW(),                   -- 게시글 생성 날짜
          updated_at TIMESTAMP DEFAULT NOW()                    -- 게시글 수정 날짜
      );

      -- 댓글 테이블
      CREATE TABLE IF NOT EXISTS comment (
          comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- 댓글 식별 수단
          user_id UUID REFERENCES user(user_id),                  -- 댓글 작성자 ID
          feed_id UUID REFERENCES feed(feed_id),                  -- 댓글이 달린 게시글 ID
          created_at TIMESTAMP DEFAULT NOW(),                     -- 댓글 생성 날짜
          updated_at TIMESTAMP DEFAULT NOW()                      -- 댓글 수정 날짜
      );

      -- 좋아요 상태 테이블
      CREATE TABLE IF NOT EXISTS LikeStatus (
          like_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- 좋아요 상태 식별자
          user_id UUID REFERENCES user(user_id),                -- 좋아요를 누른 사용자 ID
          target_id UUID,                                       -- 좋아요 대상의 ID (게시글 또는 댓글)
          target_type INT,                                      -- 좋아요 대상 유형 (11: 게시글, 12: 댓글)
          created_at TIMESTAMP DEFAULT NOW()                    -- 좋아요 발생 날짜
      );

      -- 피드 이미지 테이블
      CREATE TABLE IF NOT EXISTS feedImage (
          feed_image_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- 피드 이미지 고유 식별자
          feed_id UUID REFERENCES feed(feed_id),                      -- 해당 이미지가 종속된 피드 ID
          image_url TEXT,                                              -- 이미지 URL
          created_at TIMESTAMP DEFAULT NOW(),                          -- 이미지 생성 날짜
          updated_at TIMESTAMP DEFAULT NOW()                           -- 이미지 수정 날짜
      );

      -- 알림 테이블
      CREATE TABLE IF NOT EXISTS notification (
          notification_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- 알림 고유 식별자
          receiver_id UUID REFERENCES user(user_id),                   -- 알림 수신자의 ID
          actor_id UUID REFERENCES user(user_id),                      -- 알림 발생자의 ID
          target_id UUID,                                              -- 알림 대상 ID (게시글 또는 댓글)
          target_type INT,                                             -- 게시글 또는 댓글 (11: 게시글, 12: 댓글)
          notification_type INT,                                       -- 좋아요인지 댓글인지 (111: 좋아요, 112: 댓글)
          is_read BOOLEAN DEFAULT FALSE,                               -- 알림이 읽혔는지 여부
          created_at TIMESTAMP DEFAULT NOW()                           -- 알림 발생 날짜
      );
    `;

    client.query(createTablesQuery, (err, res) => {
      release();
      if (err) {
        console.error('쿼리 실행 오류', err.stack);
      } else {
        console.log('테이블이 성공적으로 생성되었습니다.');
      }
    });
  }
});

module.exports = pool;
