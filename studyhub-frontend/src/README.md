# StudyHub Frontend — Cấu trúc dự án

```
src/
├── constants/
│   └── index.js          ← API endpoints, routes, roles, storage keys
├── services/
│   ├── api.js            ← Axios instance (JWT interceptor, base URL)
│   ├── authService.js    ← login / logout / register
│   └── tutorService.js   ← getTutors / getTutorById
├── hooks/
│   └── useAuth.js        ← Custom hook: user, isLoggedIn, isAdmin...
├── utils/
│   └── format.js         ← formatPrice, formatDate, getInitials...
├── data/
│   └── tutors.js         ← Mock data (xóa khi có backend)
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx    ← Sticky nav, role-aware auth section
│   │   └── Footer.jsx    ← Footer links
│   ├── sections/         ← Các section của HomePage
│   │   ├── HeroSection.jsx
│   │   ├── StatsSection.jsx
│   │   ├── BenefitsSection.jsx
│   │   ├── ScheduleSection.jsx
│   │   ├── SubjectsSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   └── shared.jsx    ← SVG decorators (Squiggly, Triangle, Diamond)
│   ├── ui/
│   │   └── index.jsx     ← VerifiedBadge, StarRating, Avatar, StatusBadge
│   └── ProtectedRoute.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── TutorListingPage.jsx
│   ├── TutorProfilePage.jsx
│   ├── BookingDashboardPage.jsx
│   ├── NewsPage.jsx
│   ├── ContactPage.jsx
│   ├── MaterialsPage.jsx
│   ├── Admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminEkycApproval.jsx
│   │   ├── AdminFinance.jsx
│   │   ├── AdminJobMatching.jsx
│   │   └── AdminUserManagement.jsx
│   ├── Tutor/
│   │   ├── TutorDashboard.jsx
│   │   └── TutorProfile.jsx
│   └── Parent/
│       ├── ParentDashboard.jsx
│       ├── ParentPayment.jsx
│       ├── ParentPerfectMatch.jsx
│       └── LearningAssessment.jsx
├── App.jsx               ← Routes (dùng ROUTES constant)
├── index.css             ← Design tokens (:root CSS variables)
└── index.jsx
```

## Kết nối Spring Boot

1. Đổi `API_BASE_URL` trong `constants/index.js`
2. Bỏ comment API calls trong `services/tutorService.js`
3. Xóa import mock data trong `services/tutorService.js`
4. Xóa thư mục `data/` khi mock không còn cần thiết

## Color System (Design Tokens)

| Token | Màu | Dùng cho |
|---|---|---|
| `--color-primary` | Orange #F97316 | CTA buttons, active states, brand |
| `--color-secondary` | Blue #2563EB | Stats, info, trust indicators |
| `--color-success` | Emerald #10B981 | Verified badge |
