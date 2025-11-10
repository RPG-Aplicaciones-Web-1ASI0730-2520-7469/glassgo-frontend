// Minimal stub for useAuthStore to fix import error
export function useAuthStore() {
  return {
    user: {
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@glassgo.com',
      role: 'demo',
      company: 'Demo Company',
      phone: '+51 999999999'
    },
    logout: () => {}
  };
}
