# StudyHub — Backend Integration Guide

Tài liệu này dành cho **Spring Boot developer** kết nối vào project frontend.

---

## 1. Cấu trúc dự án liên quan

```
src/
├── api/                  ← Gọi HTTP đến Spring Boot (chỉnh sửa ở đây)
│   ├── client.js         ← Axios instance: baseURL, JWT interceptor, 401 handler
│   ├── authApi.js        ← /api/auth/*
│   ├── tutorApi.js       ← /api/tutors/* và /api/tutor/*
│   ├── parentApi.js      ← /api/parent/*
│   ├── adminApi.js       ← /api/admin/*
│   └── chatApi.js        ← /api/chat/* + WebSocket /ws/chat
│
├── mocks/                ← [XÓA KHI BACKEND SẴN SÀNG]
│   ├── auth.mock.js      ← Tài khoản demo (thay bởi POST /api/auth/login)
│   ├── tutors.mock.js    ← Danh sách gia sư (thay bởi GET /api/tutors)
│   ├── chat.mock.js      ← Bạn bè & tin nhắn (thay bởi /api/chat/*)
│   ├── parent.mock.js    ← Dữ liệu phụ huynh (thay bởi /api/parent/*)
│   └── admin.mock.js     ← Dữ liệu admin (thay bởi /api/admin/*)
│
└── constants/
    ├── index.js          ← Tất cả API_ENDPOINTS định nghĩa tập trung
    └── tutor.js          ← SUBJECTS, PRICE_RANGES (config UI, không phải mock)
```

---

## 2. Khởi động local

```bash
# Frontend chạy port 3000, tự proxy sang Spring Boot :8080
cp env.example .env
npm install
npm start
```

File `.env` mặc định:
```
VITE_API_BASE_URL=/api
```

Vite proxy `/api/*` → `http://localhost:8080` (xem `vite.config.js`).  
Không cần cấu hình CORS cho môi trường dev nếu dùng proxy này.

---

## 3. Checklist tích hợp theo module

### ✅ Auth
| Endpoint | Mô tả | File mock cần xóa |
|---|---|---|
| `POST /api/auth/login` | `{ email, password }` → `{ token, id, fullName, email, role }` | `mocks/auth.mock.js` + khối DEMO_ACCOUNTS trong `authApi.js` |
| `POST /api/auth/register` | `{ fullName, email, password, role }` → `{ token, ... }` | — |
| `GET /api/auth/me` | Header `Authorization: Bearer <token>` → user object | — |

**role** phải là một trong: `"ADMIN"`, `"TUTOR"`, `"PARENT"` (khớp với `constants/index.js`).

---

### ✅ Tutors (Public)
| Endpoint | Mô tả | File mock cần xóa |
|---|---|---|
| `GET /api/tutors` | Query params: `?subject=&location=&priceMax=&page=&size=` → `Page<TutorDTO>` | `mocks/tutors.mock.js` |
| `GET /api/tutors/:id` | TutorDTO đầy đủ (gồm reviews, certificates) | `mocks/tutors.mock.js` |

**TutorDTO shape** (frontend đang dùng):
```json
{
  "id": 1,
  "name": "Nguyễn Thanh Tùng",
  "initials": "TT",
  "avatarBg": "from-blue-400 to-blue-600",
  "title": "Cử nhân Toán — ĐH KHTN",
  "university": "ĐH KHTN HCM",
  "subject": "Math",
  "location": "Hà Nội",
  "rating": 4.8,
  "reviewCount": 32,
  "pricePerHour": 250000,
  "priceMin": 200000,
  "priceMax": 400000,
  "rateType": "hour",
  "bio": "...",
  "tags": ["Toán đại số"],
  "verified": true,
  "reviews": [{ "name": "...", "rating": 5, "text": "...", "date": "..." }],
  "certificates": [{ "name": "...", "year": 2020, "verified": true }]
}
```

Sau khi `GET /api/tutors/:id` sẵn sàng, sửa `TutorProfilePage.jsx`:
```js
// Xóa: import { getTutorByIdMock } from "../../mocks/tutors.mock"
// Thêm:
import { getTutorById } from "../../api/tutorApi";
```

---

### ✅ Tutor Dashboard (Authenticated)
| Endpoint | Mô tả |
|---|---|
| `GET /api/tutor/profile` | TutorProfileDTO |
| `PUT /api/tutor/profile` | Cập nhật hồ sơ |
| `GET /api/tutor/stats` | `{ totalStudents, totalNewStudents, rating, earningsMonth }` |
| `GET /api/tutor/classes` | `ClassDTO[]` |
| `GET /api/tutor/schedule` | `ScheduleDTO[]` |
| `GET /api/tutor/earnings` | `EarningsDTO` |

---

### ✅ Parent Dashboard (Authenticated)
| Endpoint | Mô tả | File mock cần xóa |
|---|---|---|
| `POST /api/parent/match` | `{ subject, location, priceMax }` → `TutorDTO[]` | `mocks/parent.mock.js` |
| `POST /api/parent/book-trial` | `{ tutorId, date, timeSlot }` → `BookingDTO` | `mocks/parent.mock.js` |
| `GET /api/parent/classes` | `ClassDTO[]` | `mocks/parent.mock.js` |
| `GET /api/parent/escrow` | `{ balance, currency, lastTopup }` | `mocks/parent.mock.js` |
| `POST /api/parent/topup` | `{ amount }` → `{ balance }` | `mocks/parent.mock.js` |
| `GET /api/parent/assessments` | `AssessmentDTO[]` | `mocks/parent.mock.js` |

---

### ✅ Admin Dashboard (Authenticated, role: ADMIN)
| Endpoint | Mô tả | File mock cần xóa |
|---|---|---|
| `GET /api/admin/stats` | `AdminStatsDTO` | `mocks/admin.mock.js` |
| `GET /api/admin/users` | `Page<UserDTO>` | `mocks/admin.mock.js` |
| `PUT /api/admin/users/:id/status` | `{ status }` → `UserDTO` | — |
| `GET /api/admin/ekyc` | `EkycRequestDTO[]` | `mocks/admin.mock.js` |
| `PUT /api/admin/ekyc/:id/approve` | — | — |
| `PUT /api/admin/ekyc/:id/reject` | `{ reason }` | — |
| `GET /api/admin/finance` | `FinanceReportDTO` | — |
| `GET /api/admin/matching` | `MatchingLogDTO[]` | — |

---

### ✅ Chat & WebSocket
| Endpoint | Mô tả | File mock cần xóa |
|---|---|---|
| `GET /api/chat/friends` | `FriendDTO[]` | `mocks/chat.mock.js` → `MOCK_FRIENDS` |
| `GET /api/chat/messages/:id?page=&size=` | `MessageDTO[]` (paginated) | `mocks/chat.mock.js` → `MOCK_MESSAGES` |
| `POST /api/chat/messages` | `{ receiverId, content }` → `MessageDTO` | — |
| `PUT /api/chat/messages/:id/read` | — | — |
| `GET /api/chat/unread-count` | `{ count }` | — |
| `WS /ws/chat?token=<jwt>` | STOMP / plain WebSocket | — |

Khi `GET /api/chat/friends` sẵn sàng, trong `ChatPage.jsx`:
```js
// Xóa: import { MOCK_FRIENDS, MOCK_MESSAGES } from "../mocks/chat.mock"
// Thêm: getFriends(), getMessages() từ chatApi thay cho MOCK_FRIENDS/MOCK_MESSAGES
```

---

## 4. JWT Authentication

Frontend đọc token từ `localStorage["studyhub_token"]` và gắn vào mọi request:
```
Authorization: Bearer <token>
```

Khi nhận `401`, frontend tự xóa token và redirect về `/login`.

Spring Boot cần:
- JWT secret khớp với token frontend đang giả lập (hoặc tạo mới khi login thật)
- Trả `401` khi token không hợp lệ / hết hạn

---

## 5. CORS (Production)

Khi deploy (không dùng Vite proxy), Spring Boot cần allow origin của frontend:

```java
@CrossOrigin(origins = "https://studyhub.vn")
// hoặc toàn cục trong WebMvcConfigurer
```

---

## 6. Dọn dẹp sau khi tích hợp xong

Xóa theo thứ tự:
1. `src/mocks/auth.mock.js` + import + khối demo trong `authApi.js`
2. `src/mocks/chat.mock.js` + import trong `ChatPage.jsx`
3. `src/mocks/tutors.mock.js` + import trong `TutorProfilePage.jsx`
4. `src/mocks/parent.mock.js`
5. `src/mocks/admin.mock.js`
6. `src/mocks/index.js`
7. Xóa cả thư mục `src/mocks/`
