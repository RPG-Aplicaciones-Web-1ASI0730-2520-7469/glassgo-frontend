export class UserProfile {
  constructor(data = {}) {
    this.id = data.id || 0;
    this.username = data.username || '';
    this.email = data.email || '';
    this.role = data.role || '';
    this.fullName = data.fullName || '';
    this.avatar = data.avatar || '';
    this.company = data.company || '';
    this.phone = data.phone || '';
    this.address = data.address || '';
    this.createdAt = data.createdAt || new Date();
    this.lastLogin = data.lastLogin || new Date();
  }

  get displayName() {
    return this.fullName || this.username;
  }

  get roleDisplayName() {
    const roleMap = {
      'admin': 'Administrator',
      'distributor': 'Distributor',
      'transport': 'Transport Company'
    };
    return roleMap[this.role] || this.role;
  }
}