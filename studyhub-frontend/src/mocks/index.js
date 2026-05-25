/**
 * mocks/index.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Re-export tất cả mock data từ một chỗ.
 * Import gọn: import { DEMO_ACCOUNTS, MOCK_FRIENDS } from "../mocks";
 *
 * ⚠️  Toàn bộ thư mục này sẽ bị XÓA khi backend đầy đủ.
 *     Xem BACKEND_INTEGRATION.md để biết endpoint nào thay thế mock nào.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export * from "./auth.mock";
export * from "./chat.mock";
export * from "./tutors.mock";
export * from "./parent.mock";
export * from "./admin.mock";
