// Vercel Serverless Function for Live Realtime Data Sync

let globalLiveDb = global._devclub_live_db || {
  users: [
    { id: 'usr_01', name: 'Noman Graphics', email: 'info.nomangraphics@gmail.com', authMethod: 'Password', plan: 'Annual Unlimited', status: 'Active', joinedDate: 'Oct 15, 2026', downloads: 142 },
    { id: 'usr_02', name: 'Parth Sharma', email: 'parth.sharma@example.com', authMethod: 'OTP Mobile', plan: 'VIP Lifetime', status: 'Active', joinedDate: 'Oct 16, 2026', downloads: 87 }
  ],
  otps: [
    { id: 'otp_101', target: 'info.nomangraphics@gmail.com', code: '482910', type: 'Email OTP', status: 'Verified', time: 'Just now', ip: '103.212.144.18' }
  ],
  products: [
    { id: 'wpbakery', title: 'WPBakery Page Builder for WordPress', category: 'WordPress Plugins', version: '7.8.2', downloads: 1420 },
    { id: 'spacemax', title: 'SPACEMAX - Multipurpose HTML Template', category: 'Web Templates', version: '3.1.0', downloads: 890 },
    { id: 'elementor-pro', title: 'Elementor Pro Visual Page Builder', category: 'WordPress Plugins', version: '3.24.4', downloads: 2450 }
  ]
};

global._devclub_live_db = globalLiveDb;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { type, data } = payload || {};

      if (type === 'otp' && data) {
        globalLiveDb.otps.unshift({
          id: 'otp_' + Date.now().toString().slice(-4),
          target: data.target || 'user@example.com',
          code: data.code || '123456',
          type: data.target && data.target.includes('@') ? 'Email OTP' : 'Mobile SMS',
          status: data.status || 'Pending',
          time: 'Just now',
          ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '103.212.144.18'
        });
      } else if (type === 'user' && data) {
        if (!globalLiveDb.users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
          globalLiveDb.users.unshift({
            id: 'usr_' + Date.now().toString().slice(-4),
            name: data.name || 'New Member',
            email: data.email,
            authMethod: data.authMethod || 'Password',
            plan: data.plan || 'Annual Unlimited',
            status: 'Active',
            joinedDate: 'Just now',
            downloads: 1
          });
        }
      } else if (type === 'product' && data) {
        globalLiveDb.products.unshift(data);
      }

      return res.status(200).json({ success: true, db: globalLiveDb });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  // GET: return entire live database
  return res.status(200).json(globalLiveDb);
};
