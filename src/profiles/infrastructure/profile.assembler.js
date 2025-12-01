export class ProfileAssembler {
  static toApi(profile) {
    return {
      id: profile.id,
      username: profile.username,
      email: profile.email,
      role: profile.role,
      fullName: profile.fullName,
      company: profile.company,
      phone: profile.phone,
      address: profile.address
    };
  }

  static fromApi(apiData) {
    return {
      id: apiData.id,
      username: apiData.username,
      email: apiData.email,
      role: apiData.role,
      fullName: apiData.full_name || apiData.fullName,
      avatar: apiData.avatar_url || apiData.avatar,
      company: apiData.company,
      phone: apiData.phone,
      address: apiData.address,
      createdAt: new Date(apiData.created_at || apiData.createdAt),
      lastLogin: new Date(apiData.last_login || apiData.lastLogin)
    };
  }
}

export class HistoryAssembler {
  static fromApi(apiData) {
    return {
      id: apiData.id,
      location: apiData.location,
      product: apiData.product,
      quantity: apiData.quantity,
      status: apiData.status,
      trackingNumber: apiData.tracking_number || apiData.trackingNumber,
      price: apiData.price,
      createdAt: new Date(apiData.created_at || apiData.createdAt),
      updatedAt: new Date(apiData.updated_at || apiData.updatedAt)
    };
  }

  static toApi(historyItem) {
    return {
      id: historyItem.id,
      location: historyItem.location,
      product: historyItem.product,
      quantity: historyItem.quantity,
      status: historyItem.status,
      tracking_number: historyItem.trackingNumber,
      price: historyItem.price
    };
  }
}