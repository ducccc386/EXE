-- =============================================
-- DATABASE: StudyMateDB
-- DESC: Hỗ trợ eKYC, Matching Algorithm & Escrow Payment
-- =============================================

CREATE DATABASE StudyMateDB;
GO
USE StudyMateDB;
GO

-- 1. Bảng Roles (Phân quyền)
CREATE TABLE Roles (
    id INT PRIMARY KEY IDENTITY(1,1),
    role_name NVARCHAR(20) NOT NULL -- ADMIN, TUTOR, PARENT
);

-- 2. Bảng Users (Thông tin chung + Tọa độ để Matching vị trí)
CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name NVARCHAR(100),
    phone VARCHAR(15),
    avatar_url VARCHAR(255),
    latitude FLOAT,   -- Tọa độ X để tính khoảng cách
    longitude FLOAT,  -- Tọa độ Y để tính khoảng cách
    role_id INT,
    status NVARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, BANNED
    created_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_User_Role FOREIGN KEY (role_id) REFERENCES Roles(id)
);

-- 3. Bảng Subjects (Danh mục môn học)
CREATE TABLE Subjects (
    id INT PRIMARY KEY IDENTITY(1,1),
    subject_name NVARCHAR(50) NOT NULL -- Toán, Lý, Hóa, Tiếng Anh...
);

-- 4. Bảng TutorProfiles (Chi tiết năng lực Gia sư)
CREATE TABLE TutorProfiles (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT UNIQUE,
    bio NVARCHAR(MAX),
    education NVARCHAR(255),
    experience_summary NVARCHAR(MAX),
    hourly_rate_min DECIMAL(18, 2), -- Mức lương tối thiểu nhận dạy
    is_verified BIT DEFAULT 0,      -- Tích xanh sau khi Face Matching thành công
    average_rating FLOAT DEFAULT 0, -- Điểm trung bình từ Reviews
    CONSTRAINT FK_Tutor_User FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- 5. Bảng Tutor_Subjects (Mối quan hệ Gia sư - Môn học để thuật toán lọc)
CREATE TABLE Tutor_Subjects (
    tutor_id INT,
    subject_id INT,
    PRIMARY KEY (tutor_id, subject_id),
    FOREIGN KEY (tutor_id) REFERENCES TutorProfiles(id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(id)
);

-- 6. Bảng Certificates (Hỗ trợ eKYC & Face Matching)
CREATE TABLE Certificates (
    id INT PRIMARY KEY IDENTITY(1,1),
    tutor_id INT,
    certificate_type NVARCHAR(50), -- CCCD, Student_Card, IELTS...
    identity_number VARCHAR(20),   -- Số CCCD
    image_front_url VARCHAR(255),  -- Ảnh mặt trước CCCD
    image_back_url VARCHAR(255),   -- Ảnh mặt sau CCCD
    face_match_percentage FLOAT,   -- Kết quả AI so khớp Face vs CCCD (%)
    status NVARCHAR(20) DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    verified_at DATETIME,
    CONSTRAINT FK_Cert_Tutor FOREIGN KEY (tutor_id) REFERENCES TutorProfiles(id)
);

-- 7. Bảng JobPosts (Lớp học do Phụ huynh đăng + Tọa độ địa điểm học)
CREATE TABLE JobPosts (
    id INT PRIMARY KEY IDENTITY(1,1),
    parent_id INT,
    subject_id INT,
    grade NVARCHAR(50),
    description NVARCHAR(MAX),
    address NVARCHAR(255),
    latitude FLOAT,  -- Tọa độ địa điểm học để Matching
    longitude FLOAT,
    salary_per_session DECIMAL(18, 2),
    sessions_per_week INT,
    status NVARCHAR(20) DEFAULT 'OPEN', -- OPEN, IN_PROGRESS, CLOSED
    created_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Job_Parent FOREIGN KEY (parent_id) REFERENCES Users(id),
    CONSTRAINT FK_Job_Subject FOREIGN KEY (subject_id) REFERENCES Subjects(id)
);

-- 8. Bảng Applications (Gia sư ứng tuyển)
CREATE TABLE Applications (
    id INT PRIMARY KEY IDENTITY(1,1),
    job_id INT,
    tutor_id INT,
    applied_at DATETIME DEFAULT GETDATE(),
    status NVARCHAR(20) DEFAULT 'PENDING', -- PENDING, ACCEPTED, REJECTED
    CONSTRAINT FK_App_Job FOREIGN KEY (job_id) REFERENCES JobPosts(id),
    CONSTRAINT FK_App_Tutor FOREIGN KEY (tutor_id) REFERENCES Users(id)
);

-- 9. Bảng Contracts (Quản lý dạy học & Thanh toán trung gian)
CREATE TABLE Contracts (
    id INT PRIMARY KEY IDENTITY(1,1),
    job_id INT,
    tutor_id INT,
    parent_id INT,
    total_price DECIMAL(18, 2),
    payment_status NVARCHAR(20) DEFAULT 'HOLDING', -- HOLDING (Hệ thống giữ tiền), RELEASED (Đã trả gia sư), REFUNDED
    contract_status NVARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, COMPLETED, CANCELLED
    start_date DATE,
    CONSTRAINT FK_Con_Job FOREIGN KEY (job_id) REFERENCES JobPosts(id),
    CONSTRAINT FK_Con_Tutor FOREIGN KEY (tutor_id) REFERENCES Users(id),
    CONSTRAINT FK_Con_Parent FOREIGN KEY (parent_id) REFERENCES Users(id)
);

-- 10. Bảng Reviews (Đánh giá 2 chiều cho Matching chất lượng)
CREATE TABLE Reviews (
    id INT PRIMARY KEY IDENTITY(1,1),
    contract_id INT,
    from_user_id INT,
    to_user_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Review_Contract FOREIGN KEY (contract_id) REFERENCES Contracts(id),
    CONSTRAINT FK_Review_From FOREIGN KEY (from_user_id) REFERENCES Users(id),
    CONSTRAINT FK_Review_To FOREIGN KEY (to_user_id) REFERENCES Users(id)
);

-- Chèn dữ liệu mẫu cơ bản
INSERT INTO Roles (role_name) VALUES ('ADMIN'), ('TUTOR'), ('PARENT');
INSERT INTO Subjects (subject_name) VALUES (N'Toán'), (N'Lý'), (N'Hóa'), (N'Tiếng Anh'), (N'Văn');

ALTER TABLE TutorProfiles ADD 
    -- Dữ liệu để tính Personality Score
    patience_level INT DEFAULT 5,         -- Thang điểm 1-10
    communication_style INT DEFAULT 5,    -- 1: Nghiêm khắc, 10: Vui vẻ
    teaching_speed INT DEFAULT 5,         -- 1: Chậm, 10: Nhanh
    
    -- Dữ liệu bổ trợ Matching
    total_reviews INT DEFAULT 0,
    identity_card_number VARCHAR(20); -- Dùng cho Face Matching

	SELECT * FROM TutorProfiles