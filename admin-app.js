/**
 * DevClub.store — Master Admin Portal Engine
 * Full Control: Users, OTP Logs, Products, Orders & Real-time Sync
 */

// Initial Seed Data
const DEFAULT_USERS_DB = [
  {
    id: 'usr_01',
    name: 'Noman Graphics',
    email: 'info.nomangraphics@gmail.com',
    authMethod: 'Password',
    plan: 'Annual Unlimited',
    status: 'Active',
    joinedDate: 'Oct 15, 2026',
    downloads: 142
  },
  {
    id: 'usr_02',
    name: 'Parth Sharma',
    email: 'parth.sharma@example.com',
    authMethod: 'OTP Mobile',
    plan: 'VIP Lifetime',
    status: 'Active',
    joinedDate: 'Oct 16, 2026',
    downloads: 87
  },
  {
    id: 'usr_03',
    name: 'TechAgency Pro',
    email: 'contact@techagency.io',
    authMethod: 'Password',
    plan: 'Annual Unlimited',
    status: 'Active',
    joinedDate: 'Oct 12, 2026',
    downloads: 310
  },
  {
    id: 'usr_04',
    name: 'WordPress Dev',
    email: 'dev@wpexpert.com',
    authMethod: 'OTP Email',
    plan: 'Starter Free',
    status: 'Suspended',
    joinedDate: 'Oct 09, 2026',
    downloads: 4
  }
];

const DEFAULT_OTP_LOGS = [
  {
    id: 'otp_101',
    target: 'info.nomangraphics@gmail.com',
    code: '482910',
    type: 'Email OTP',
    status: 'Verified',
    time: '2 mins ago',
    ip: '103.212.144.18'
  },
  {
    id: 'otp_102',
    target: '+91 9876543210',
    code: '739104',
    type: 'Mobile SMS',
    status: 'Verified',
    time: '14 mins ago',
    ip: '103.212.144.18'
  },
  {
    id: 'otp_103',
    target: 'dev@wpexpert.com',
    code: '901248',
    type: 'Email OTP',
    status: 'Expired',
    time: '1 hour ago',
    ip: '185.220.101.5'
  }
];

const DEFAULT_ORDERS_DB = [
  { id: 'ORD-8942', customer: 'info.nomangraphics@gmail.com', plan: 'Annual Unlimited', amount: '$89.00', date: 'Oct 15, 2026', status: 'Completed' },
  { id: 'ORD-8941', customer: 'parth.sharma@example.com', plan: 'VIP Lifetime Club', amount: '$199.00', date: 'Oct 16, 2026', status: 'Completed' },
  { id: 'ORD-8940', customer: 'contact@techagency.io', plan: 'Annual Unlimited', amount: '$89.00', date: 'Oct 12, 2026', status: 'Completed' }
];

const DEFAULT_PRODUCTS_DB = [
  { id: 'wpbakery', title: 'WPBakery Page Builder for WordPress', category: 'WordPress Plugins', version: '7.8.2', downloads: 1420 },
  { id: 'spacemax', title: 'SPACEMAX - Multipurpose HTML Template', category: 'Web Templates', version: '3.1.0', downloads: 890 },
  { id: 'furea', title: 'FUREA - Furniture eCommerce Template', category: 'Shopify Themes', version: '2.4.0', downloads: 620 },
  { id: 'elementor-pro', title: 'Elementor Pro Visual Page Builder', category: 'WordPress Plugins', version: '3.24.4', downloads: 2450 },
  { id: 'wprocket', title: 'WP Rocket - High Speed Caching Engine', category: 'WordPress Plugins', version: '3.16.2', downloads: 1980 },
  { id: 'astra-pro', title: 'Astra Pro Multi-Purpose Theme Agency Bundle', category: 'WordPress Themes', version: '4.8.1', downloads: 1760 }
];

// Database Getters & Setters
function getAdminDb(key, defaultData) {
  const data = localStorage.getItem(key);
  if (data) {
    try { return JSON.parse(data); } catch (e) { return defaultData; }
  }
  localStorage.setItem(key, JSON.stringify(defaultData));
  return defaultData;
}

function setAdminDb(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Authentication Check
function isAdminLoggedIn() {
  return localStorage.getItem('devclub_admin_session') === 'true';
}

function checkAdminAuth() {
  const lockScreen = document.getElementById('admin-lock-screen');
  const adminLayout = document.getElementById('admin-layout');
  
  if (isAdminLoggedIn()) {
    if (lockScreen) lockScreen.style.display = 'none';
    if (adminLayout) adminLayout.style.display = 'flex';
    initAdminDashboard();
  } else {
    if (lockScreen) lockScreen.style.display = 'flex';
    if (adminLayout) adminLayout.style.display = 'none';
  }
}

function handleAdminLogin(event) {
  if (event) event.preventDefault();
  const email = document.getElementById('admin-login-email').value.trim();
  const pass = document.getElementById('admin-login-pass').value.trim();

  // Valid credentials
  if ((email === 'admin@devclub.store' || email === 'admin') && (pass === 'devclubadmin2026' || pass === 'admin123')) {
    localStorage.setItem('devclub_admin_session', 'true');
    showAdminToast('Welcome, Master Admin', 'Access Granted to DevClub Central Database.', '🔐');
    checkAdminAuth();
  } else {
    showAdminToast('Access Denied', 'Invalid Admin Email or Password.', '❌');
  }
}

function adminQuickLogin() {
  document.getElementById('admin-login-email').value = 'admin@devclub.store';
  document.getElementById('admin-login-pass').value = 'devclubadmin2026';
  handleAdminLogin();
}

function handleAdminLogout() {
  localStorage.removeItem('devclub_admin_session');
  showAdminToast('Admin Logged Out', 'Admin session terminated safely.', '👋');
  checkAdminAuth();
}

// Tab Switching
function switchAdminTab(tabName) {
  document.querySelectorAll('.admin-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
  });
  document.querySelectorAll('.admin-tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `tab-${tabName}`);
  });

  const titles = {
    overview: 'System Overview & Analytics',
    users: 'Registered Users Management',
    otp: 'Live OTP Verifications & Security Logs',
    products: 'GPL Assets & Products Catalog',
    orders: 'Subscriptions & Transaction History'
  };
  const titleEl = document.getElementById('current-page-title');
  if (titleEl && titles[tabName]) titleEl.textContent = titles[tabName];

  // Refresh tab data
  if (tabName === 'users') renderUsersTable();
  if (tabName === 'otp') renderOtpTable();
  if (tabName === 'products') renderProductsTable();
  if (tabName === 'orders') renderOrdersTable();
  if (tabName === 'overview') renderAdminOverview();
}

// Init Dashboard
function initAdminDashboard() {
  renderAdminOverview();
  renderUsersTable();
  renderOtpTable();
  renderProductsTable();
  renderOrdersTable();
}

function renderAdminOverview() {
  const users = getAdminDb('devclub_users_db', DEFAULT_USERS_DB);
  const otps = getAdminDb('devclub_otp_logs', DEFAULT_OTP_LOGS);
  const products = getAdminDb('devclub_products_db', DEFAULT_PRODUCTS_DB);
  const orders = getAdminDb('devclub_orders_db', DEFAULT_ORDERS_DB);

  // Update KPI counters
  const usersCountEl = document.getElementById('kpi-total-users');
  if (usersCountEl) usersCountEl.textContent = users.length;

  const otpsCountEl = document.getElementById('kpi-total-otps');
  if (otpsCountEl) otpsCountEl.textContent = otps.length;

  const productsCountEl = document.getElementById('kpi-total-products');
  if (productsCountEl) productsCountEl.textContent = `${products.length} Items`;

  const revenueEl = document.getElementById('kpi-total-revenue');
  if (revenueEl) {
    let total = orders.reduce((acc, curr) => acc + parseFloat(curr.amount.replace('$', '')), 0);
    revenueEl.textContent = `$${total.toFixed(2)}`;
  }

  // Update badge counters
  const usersBadge = document.getElementById('sidebar-users-count');
  if (usersBadge) usersBadge.textContent = users.length;

  const otpBadge = document.getElementById('sidebar-otp-count');
  if (otpBadge) otpBadge.textContent = otps.length;
}

// Render Users Table
function renderUsersTable(search = '') {
  const users = getAdminDb('devclub_users_db', DEFAULT_USERS_DB);
  const tbody = document.getElementById('users-table-body');
  if (!tbody) return;

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.plan.toLowerCase().includes(search.toLowerCase())
  );

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 30px;">No users found matching query.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(user => `
    <tr>
      <td>
        <div class="user-cell">
          <div class="user-mini-avatar">${user.name.charAt(0).toUpperCase()}</div>
          <div>
            <div class="user-name-title">${user.name}</div>
            <div class="user-email-subtitle">${user.email}</div>
          </div>
        </div>
      </td>
      <td>
        <span style="font-weight: 600; font-size: 13px; color: ${user.authMethod.includes('OTP') ? '#60a5fa' : '#a78bfa'};">
          ${user.authMethod.includes('OTP') ? '📲 ' : '🔑 '}${user.authMethod}
        </span>
      </td>
      <td>
        <span style="background: rgba(255,255,255,0.06); padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600;">
          ${user.plan}
        </span>
      </td>
      <td>${user.joinedDate}</td>
      <td>
        <span class="status-badge ${user.status === 'Active' ? 'badge-active' : 'badge-suspended'}">
          <span style="width: 6px; height: 6px; border-radius: 50%; background: currentColor;"></span>
          ${user.status}
        </span>
      </td>
      <td>
        <button class="row-action-btn" onclick="toggleUserStatus('${user.id}')" title="Toggle Status">
          ${user.status === 'Active' ? 'Suspend' : 'Activate'}
        </button>
        <button class="row-action-btn row-action-danger" onclick="deleteUser('${user.id}')" title="Delete User">
          Delete
        </button>
      </td>
    </tr>
  `).join('');
}

function toggleUserStatus(userId) {
  let users = getAdminDb('devclub_users_db', DEFAULT_USERS_DB);
  users = users.map(u => {
    if (u.id === userId) {
      u.status = u.status === 'Active' ? 'Suspended' : 'Active';
    }
    return u;
  });
  setAdminDb('devclub_users_db', users);
  renderUsersTable();
  showAdminToast('User Updated', 'Account status changed successfully.', '✓');
}

function deleteUser(userId) {
  if (!confirm('Are you sure you want to delete this user account?')) return;
  let users = getAdminDb('devclub_users_db', DEFAULT_USERS_DB);
  users = users.filter(u => u.id !== userId);
  setAdminDb('devclub_users_db', users);
  renderUsersTable();
  renderAdminOverview();
  showAdminToast('User Deleted', 'User account permanently removed.', '🗑️');
}

// Add User Modal
function openAddUserModal() {
  const modal = document.getElementById('add-user-modal');
  if (modal) modal.classList.add('open');
}

function closeAddUserModal() {
  const modal = document.getElementById('add-user-modal');
  if (modal) modal.classList.remove('open');
}

function saveNewUser(event) {
  event.preventDefault();
  const name = document.getElementById('new-user-name').value.trim();
  const email = document.getElementById('new-user-email').value.trim();
  const plan = document.getElementById('new-user-plan').value;
  const method = document.getElementById('new-user-method').value;

  if (!name || !email) return;

  const newUser = {
    id: 'usr_' + Date.now().toString().slice(-4),
    name: name,
    email: email,
    authMethod: method,
    plan: plan,
    status: 'Active',
    joinedDate: 'Just Now',
    downloads: 0
  };

  const users = getAdminDb('devclub_users_db', DEFAULT_USERS_DB);
  users.unshift(newUser);
  setAdminDb('devclub_users_db', users);

  closeAddUserModal();
  renderUsersTable();
  renderAdminOverview();
  showAdminToast('User Added', `${name} added to database.`, '👤');
}

// Render OTP Table
function renderOtpTable(search = '') {
  const otps = getAdminDb('devclub_otp_logs', DEFAULT_OTP_LOGS);
  const tbody = document.getElementById('otp-table-body');
  if (!tbody) return;

  const filtered = otps.filter(o => 
    o.target.toLowerCase().includes(search.toLowerCase()) || 
    o.code.includes(search)
  );

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 30px;">No OTP logs recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(otp => `
    <tr>
      <td style="font-weight: 700;">${otp.target}</td>
      <td><span class="otp-code-pill">${otp.code}</span></td>
      <td><span style="color: #94a3b8; font-size: 13px;">${otp.type}</span></td>
      <td>
        <span class="status-badge ${otp.status === 'Verified' ? 'badge-active' : 'badge-pending'}">
          ${otp.status}
        </span>
      </td>
      <td><span style="color: #64748b; font-size: 12.5px;">${otp.time}</span></td>
      <td><span style="font-family: monospace; font-size: 12px; color: #94a3b8;">${otp.ip}</span></td>
    </tr>
  `).join('');
}

// Render Products Table
function renderProductsTable(search = '') {
  const products = getAdminDb('devclub_products_db', DEFAULT_PRODUCTS_DB);
  const tbody = document.getElementById('products-table-body');
  if (!tbody) return;

  const filtered = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  tbody.innerHTML = filtered.map(prod => `
    <tr>
      <td style="font-weight: 700; color: #f8fafc;">${prod.title}</td>
      <td><span style="background: rgba(37,99,235,0.15); color: #60a5fa; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600;">${prod.category}</span></td>
      <td><span style="font-family: monospace; font-size: 13px;">v${prod.version}</span></td>
      <td style="font-weight: 600;">${prod.downloads.toLocaleString()} downloads</td>
      <td>
        <button class="row-action-btn row-action-danger" onclick="deleteProduct('${prod.id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

function deleteProduct(prodId) {
  if (!confirm('Are you sure you want to remove this GPL product?')) return;
  let products = getAdminDb('devclub_products_db', DEFAULT_PRODUCTS_DB);
  products = products.filter(p => p.id !== prodId);
  setAdminDb('devclub_products_db', products);
  renderProductsTable();
  renderAdminOverview();
  showAdminToast('Product Removed', 'GPL Product deleted from catalog.', '📦');
}

// Add Product Modal
function openAddProductModal() {
  const modal = document.getElementById('add-product-modal');
  if (modal) modal.classList.add('open');
}

function closeAddProductModal() {
  const modal = document.getElementById('add-product-modal');
  if (modal) modal.classList.remove('open');
}

function saveNewProduct(event) {
  event.preventDefault();
  const title = document.getElementById('prod-title').value.trim();
  const category = document.getElementById('prod-category').value;
  const version = document.getElementById('prod-version').value.trim();

  if (!title || !version) return;

  const newProd = {
    id: 'prod_' + Date.now().toString().slice(-4),
    title: title,
    category: category,
    version: version,
    downloads: 1
  };

  const products = getAdminDb('devclub_products_db', DEFAULT_PRODUCTS_DB);
  products.unshift(newProd);
  setAdminDb('devclub_products_db', products);

  closeAddProductModal();
  renderProductsTable();
  renderAdminOverview();
  showAdminToast('Product Published', `${title} is now in catalog!`, '🚀');
}

// Render Orders Table
function renderOrdersTable(search = '') {
  const orders = getAdminDb('devclub_orders_db', DEFAULT_ORDERS_DB);
  const tbody = document.getElementById('orders-table-body');
  if (!tbody) return;

  tbody.innerHTML = orders.map(ord => `
    <tr>
      <td style="font-family: monospace; font-weight: 700; color: #60a5fa;">${ord.id}</td>
      <td style="font-weight: 600;">${ord.customer}</td>
      <td>${ord.plan}</td>
      <td style="font-weight: 800; color: #34d399;">${ord.amount}</td>
      <td>${ord.date}</td>
      <td><span class="status-badge badge-active">${ord.status}</span></td>
    </tr>
  `).join('');
}

// Export Database JSON
function exportDatabaseJson() {
  const fullBackup = {
    exportDate: new Date().toISOString(),
    users: getAdminDb('devclub_users_db', DEFAULT_USERS_DB),
    otpLogs: getAdminDb('devclub_otp_logs', DEFAULT_OTP_LOGS),
    products: getAdminDb('devclub_products_db', DEFAULT_PRODUCTS_DB),
    orders: getAdminDb('devclub_orders_db', DEFAULT_ORDERS_DB)
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `devclub_admin_backup_${Date.now()}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();

  showAdminToast('Backup Exported', 'Full DevClub database JSON downloaded.', '💾');
}

// Toast Notifications
function showAdminToast(title, message, icon = '✓') {
  let container = document.getElementById('admin-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.style.cssText = `
    display: flex;
    align-items: center;
    gap: 12px;
    background: #1e293b;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 14px 20px;
    margin-top: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    color: #ffffff;
    font-size: 13.5px;
    z-index: 10000;
  `;
  toast.innerHTML = `
    <span style="font-size: 18px;">${icon}</span>
    <div>
      <div style="font-weight: 700;">${title}</div>
      <div style="color: #94a3b8; font-size: 12px;">${message}</div>
    </div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  checkAdminAuth();

  // Search input listeners
  const userSearch = document.getElementById('search-users-input');
  if (userSearch) {
    userSearch.addEventListener('input', (e) => renderUsersTable(e.target.value));
  }

  const otpSearch = document.getElementById('search-otp-input');
  if (otpSearch) {
    otpSearch.addEventListener('input', (e) => renderOtpTable(e.target.value));
  }

  const prodSearch = document.getElementById('search-products-input');
  if (prodSearch) {
    prodSearch.addEventListener('input', (e) => renderProductsTable(e.target.value));
  }

  // Keyboard shortcut ESC for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAddUserModal();
      closeAddProductModal();
    }
  });

  // Realtime Live Cloud Sync Poller (Every 3.5s)
  setInterval(async () => {
    if (typeof cloudFetchAllData === 'function') {
      const cloud = await cloudFetchAllData();
      if (cloud) {
        if (cloud.users && cloud.users.length) {
          setAdminDb('devclub_users_db', cloud.users);
          renderUsersTable();
        }
        if (cloud.otps && cloud.otps.length) {
          setAdminDb('devclub_otp_logs', cloud.otps);
          renderOtpTable();
        }
        renderAdminOverview();
      }
    }
  }, 3500);
});

