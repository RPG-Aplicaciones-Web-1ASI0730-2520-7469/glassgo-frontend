export const profileRoutes = [
  {
    path: '',
    name: 'profile-main',
    component: () => import('./views/profile.vue'),
    meta: { requiresAuth: true }
  }
];