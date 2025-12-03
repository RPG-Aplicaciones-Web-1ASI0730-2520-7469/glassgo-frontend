// analytics-routes.js
export default [
  {
    path: '/reportes',
    name: 'Reportes',
    component: () => import('./views/reportes.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      icon: 'bar_chart',
      title: 'Reporte',
    },
  },
];
