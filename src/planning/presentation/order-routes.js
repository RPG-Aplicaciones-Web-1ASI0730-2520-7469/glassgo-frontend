export const orderRoutes = [
    {
        path: 'crear-pedido',
        name: 'orders-create',
        component: () => import('./views/crear-pedido.vue'),
        meta: { 
            title: 'Crear Pedido',
            requiresAuth: true,
            roles: ['distributor', 'admin']
        }
    },
    {
        path: 'mis-pedidos',
        name: 'orders-list',
        component: () => import('../../shared/presentation/views/coming-soon.vue'),
        meta: { 
            title: 'Mis Pedidos',
            requiresAuth: true,
            roles: ['distributor', 'admin']
        }
    },
    {
        path: 'pedido/:id',
        name: 'orders-detail',
        component: () => import('../../shared/presentation/views/coming-soon.vue'),
        meta: { 
            title: 'Detalle del Pedido',
            requiresAuth: true,
            roles: ['distributor', 'admin']
        }
    },
    // ...existing code...
];

export default orderRoutes;