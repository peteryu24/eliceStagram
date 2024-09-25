CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firebase_uid VARCHAR(128),
    email VARCHAR(255) UNIQUE,
    username VARCHAR(20) UNIQUE,
    profile_image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
COMMENT ON TABLE users IS '사용자 테이블';
COMMENT ON COLUMN users.user_id IS '사용자 고유 ID';
COMMENT ON COLUMN users.firebase_uid IS 'Firebase 소셜 로그인 UID';
COMMENT ON COLUMN users.email IS '사용자 이메일';
COMMENT ON COLUMN users.username IS '사용자 닉네임';
COMMENT ON COLUMN users.profile_image_url IS '사용자 프로필 이미지 URL';
COMMENT ON COLUMN users.created_at IS '계정 생성 날짜';
COMMENT ON COLUMN users.updated_at IS '계정 수정 날짜';


CREATE TABLE feed (
    feed_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,  
    description TEXT,
    like_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
COMMENT ON TABLE feed IS '게시글 테이블';
COMMENT ON COLUMN feed.feed_id IS '게시글 고유 ID';
COMMENT ON COLUMN feed.user_id IS '작성자 ID';
COMMENT ON COLUMN feed.description IS '게시글 텍스트';
COMMENT ON COLUMN feed.like_count IS '좋아요 수';
COMMENT ON COLUMN feed.comment_count IS '댓글 수';
COMMENT ON COLUMN feed.created_at IS '게시글 생성 날짜';
COMMENT ON COLUMN feed.updated_at IS '게시글 수정 날짜';


CREATE TABLE comment (
    comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,  
    feed_id UUID REFERENCES feed(feed_id) ON DELETE CASCADE,   
    description TEXT,
    like_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
COMMENT ON TABLE comment IS '댓글 테이블';
COMMENT ON COLUMN comment.comment_id IS '댓글 고유 ID';
COMMENT ON COLUMN comment.user_id IS '댓글 작성자 ID';
COMMENT ON COLUMN comment.feed_id IS '댓글이 달린 게시글 ID';
COMMENT ON COLUMN comment.description IS '댓글 텍스트';
COMMENT ON COLUMN comment.like_count IS '댓글에 대한 좋아요 수';
COMMENT ON COLUMN comment.created_at IS '댓글 생성 날짜';
COMMENT ON COLUMN comment.updated_at IS '댓글 수정 날짜';


CREATE TABLE like_status (
    like_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,  
    target_id UUID,
    target_type INT,
    created_at TIMESTAMP DEFAULT NOW()
);
COMMENT ON TABLE like_status IS '좋아요 상태 테이블';
COMMENT ON COLUMN like_status.like_id IS '좋아요 상태 고유 ID';
COMMENT ON COLUMN like_status.user_id IS '좋아요를 누른 사용자 ID';
COMMENT ON COLUMN like_status.target_id IS '좋아요 대상 ID (게시글 또는 댓글)';
COMMENT ON COLUMN like_status.target_type IS '좋아요 대상 유형 (11: 게시글, 12: 댓글)';
COMMENT ON COLUMN like_status.created_at IS '좋아요 발생 날짜';


CREATE TABLE feed_image (
    feed_image_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    feed_id UUID REFERENCES feed(feed_id) ON DELETE CASCADE,   
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
COMMENT ON TABLE feed_image IS '피드 이미지 테이블';
COMMENT ON COLUMN feed_image.feed_image_id IS '피드 이미지 고유 ID';
COMMENT ON COLUMN feed_image.feed_id IS '해당 이미지가 종속된 피드 ID';
COMMENT ON COLUMN feed_image.image_url IS '이미지 URL';
COMMENT ON COLUMN feed_image.created_at IS '이미지 생성 날짜';
COMMENT ON COLUMN feed_image.updated_at IS '이미지 수정 날짜';


CREATE TABLE notification (
    notification_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    receiver_id UUID REFERENCES users(user_id) ON DELETE CASCADE,  
    actor_id UUID REFERENCES users(user_id) ON DELETE CASCADE,     
    target_id UUID,
    target_type INT,
    notification_type INT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
COMMENT ON TABLE notification IS '알림 테이블';
COMMENT ON COLUMN notification.notification_id IS '알림 고유 ID';
COMMENT ON COLUMN notification.receiver_id IS '알림 수신자 ID';
COMMENT ON COLUMN notification.actor_id IS '알림 발생자 ID';
COMMENT ON COLUMN notification.target_id IS '알림 대상 ID (게시글 또는 댓글)';
COMMENT ON COLUMN notification.target_type IS '알림 대상 유형 (11: 게시글, 12: 댓글)';
COMMENT ON COLUMN notification.notification_type IS '알림 유형 (111: 좋아요, 112: 댓글)';
COMMENT ON COLUMN notification.is_read IS '알림 읽음 여부';
COMMENT ON COLUMN notification.created_at IS '알림 발생 날짜';