// ============================================================
// 🧩 demo-user.js — Temporary demo user configuration
// ------------------------------------------------------------
// Centralized demo user ID used for local testing before the
// Identity & Access module is implemented.
// ============================================================

/**
 *  Usage:
 * - Change DEMO_USER_ID to simulate a different role.
 * - Home components (home-*) will automatically load its data.
 *
 *  Reference (db.json users):
 *   ID | Role            | Home View
 *   ---|-----------------|--------------------------
 *    1 | distributor     | home-distributor.vue
 *    2 | business-owner  | home-business-owner.vue
 *    3 | carrier         | home-carrier.vue
 *    4 | admin           | home-admin.vue
 */

export const DEMO_USER_ID = 1 //  Change this to test another role
