// Direct imports for testing
import Login from './views/login.vue';

const authRoutes = [
    { 
        path: 'login', 
        name: 'auth-login', 
        component: Login, 
        meta: { title: 'Sign In', titleKey: 'auth.sign-in' } 
    },
    { 
        path: 'forgot-password', 
        name: 'auth-forgot-password', 
        component: () => import('./views/forgot-password.vue'), 
        meta: { title: 'Forgot Password', titleKey: 'auth.forgot-password' } 
    },
    { 
        path: 'register', 
        name: 'auth-register', 
        component: () => import('./views/register.vue'), 
        meta: { title: 'Register', titleKey: 'auth.sign-up' } 
    }
];

export default authRoutes;