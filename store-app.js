/**
 * DevClub Store - Application & Dashboard Interactive Engine
 */

// Digital Goods Mock Database
const PRODUCTS_DATA = [
  {
    id: 'elementor-pro',
    name: 'Elementor Pro',
    category: 'plugins',
    categoryLabel: 'WordPress Plugin',
    version: '3.24.4',
    rating: 4.9,
    downloads: '148.2k',
    price: '$9.99',
    updated: '2 days ago',
    desc: 'The leading website builder platform for WordPress. Visual drag-and-drop page editor with 300+ designer templates, theme builder, and form integration.',
    icon: '⚡',
    gpl: '100% GPL v3',
    changelog: [
      'v3.24.4: Fix responsive container padding bug',
      'v3.24.3: Added nested carousel loop builder',
      'v3.24.0: Major performance overhaul and lazy-load assets'
    ]
  },
  {
    id: 'wp-rocket',
    name: 'WP Rocket',
    category: 'plugins',
    categoryLabel: 'WordPress Plugin',
    version: '3.16.2',
    rating: 4.95,
    downloads: '92.4k',
    price: '$8.99',
    updated: 'Yesterday',
    desc: 'Top-tier caching and website performance optimization plugin. Instant PageSpeed 99+ score with delay JS execution, CDN rewrite, and database cleanup.',
    icon: '🚀',
    gpl: '100% GPL v2',
    changelog: [
      'v3.16.2: Enhanced Delay JS execution compatibility',
      'v3.16.1: WooCommerce cart fragment optimization'
    ]
  },
  {
    id: 'astra-pro',
    name: 'Astra Pro Theme',
    category: 'themes',
    categoryLabel: 'WordPress Theme',
    version: '4.8.1',
    rating: 4.88,
    downloads: '124.8k',
    price: '$12.99',
    updated: '4 days ago',
    desc: 'Ultra-fast, lightweight (<50KB), and highly customizable multi-purpose WordPress theme with WooCommerce booster and header/footer builder.',
    icon: '🌟',
    gpl: '100% GPL v3',
    changelog: [
      'v4.8.1: Sticky header mobile transition refinement',
      'v4.8.0: Mega menu custom badges and colors'
    ]
  },
  {
    id: 'woocommerce-subscriptions',
    name: 'WooCommerce Subscriptions',
    category: 'woocommerce',
    categoryLabel: 'WooCommerce Extension',
    version: '6.4.0',
    rating: 4.85,
    downloads: '64.1k',
    price: '$14.99',
    updated: '1 week ago',
    desc: 'Capture recurring revenue by allowing customers to subscribe to your digital products and physical goods with automated recurring billing.',
    icon: '💳',
    gpl: '100% GPL v3',
    changelog: [
      'v6.4.0: Stripe payment intent synchronization update',
      'v6.3.2: Prorated upgrades & customer self-cancellation portal'
    ]
  },
  {
    id: 'yoast-seo-premium',
    name: 'Yoast SEO Premium',
    category: 'plugins',
    categoryLabel: 'WordPress Plugin',
    version: '23.4',
    rating: 4.82,
    downloads: '88.0k',
    price: '$7.99',
    updated: '3 days ago',
    desc: 'Dominate Google search results with AI title and description generation, automated internal linking suggestions, and redirect manager.',
    icon: '🔍',
    gpl: '100% GPL v3',
    changelog: [
      'v23.4: Google Search Console API v3 connection refresh',
      'v23.3: Schema.org structured data visual builder'
    ]
  },
  {
    id: 'divi-builder-theme',
    name: 'Divi Theme & Visual Builder',
    category: 'themes',
    categoryLabel: 'WordPress Theme',
    version: '4.27.0',
    rating: 4.87,
    downloads: '110.5k',
    price: '$11.99',
    updated: '5 days ago',
    desc: 'Complete design framework and visual website builder. Features 2,000+ premade layouts and responsive editing controls.',
    icon: '🎨',
    gpl: '100% GPL v3',
    changelog: [
      'v4.27.0: Divi Cloud preset sharing support',
      'v4.26.8: Critical CSS extraction speedup'
    ]
  },
  {
    id: 'acf-pro',
    name: 'Advanced Custom Fields Pro',
    category: 'plugins',
    categoryLabel: 'WordPress Plugin',
    version: '6.3.6',
    rating: 4.97,
    downloads: '95.6k',
    price: '$9.99',
    updated: '3 days ago',
    desc: 'The developer standard for custom fields in WordPress. Includes Repeater, Flexible Content, Options Page, and ACF Blocks for Gutenberg.',
    icon: '⚙️',
    gpl: '100% GPL v2',
    changelog: [
      'v6.3.6: Enhanced PHP 8.3 & 8.4 compatibility',
      'v6.3.4: Bidirectional relationship field auto-sync'
    ]
  },
  {
    id: 'crocoblock-jetengine',
    name: 'JetEngine by Crocoblock',
    category: 'elementor',
    categoryLabel: 'Elementor Template Kit',
    version: '3.5.2',
    rating: 4.91,
    downloads: '58.2k',
    price: '$8.99',
    updated: '1 week ago',
    desc: 'Dynamic content plugin for Elementor and Gutenberg. Build Custom Post Types, taxonomies, relational databases, and interactive filters.',
    icon: '🧩',
    gpl: '100% GPL v3',
    changelog: [
      'v3.5.2: Rest API query builder pagination fixes',
      'v3.5.0: Dynamic table and chart widgets'
    ]
  },
  {
    id: 'perfmatters',
    name: 'Perfmatters',
    category: 'plugins',
    categoryLabel: 'WordPress Plugin',
    version: '2.3.4',
    rating: 4.93,
    downloads: '42.9k',
    price: '$6.99',
    updated: 'Just now',
    desc: 'Lightweight WordPress performance plugin. Disable emojis, embeds, XML-RPC, and use Script Manager to disable unused JS on specific pages.',
    icon: '⏱️',
    gpl: '100% GPL v3',
    changelog: [
      'v2.3.4: QuickSwap web font display swap optimization',
      'v2.3.3: Script Manager regex path matching'
    ]
  },
  {
    id: 'php-saas-script',
    name: 'DevSaaS - Multi-Tenant PHP Script',
    category: 'scripts',
    categoryLabel: 'PHP Script',
    version: '2.1.0',
    rating: 4.89,
    downloads: '18.4k',
    price: '$19.99',
    updated: '6 days ago',
    desc: 'Complete SaaS starter kit in Laravel 11. Built-in Stripe billing, user management, workspace switching, and API authentication.',
    icon: '💻',
    gpl: '100% GPL v3',
    changelog: [
      'v2.1.0: Laravel 11 framework upgrade',
      'v2.0.4: Team member role permissions'
    ]
  }
];

// User State Management
const DEFAULT_USER = {
  isLoggedIn: true,
  name: 'DevClub VIP Member',
  email: 'parth@devclub.store',
  membership: 'Lifetime VIP All-Access',
  tier: 'vip',
  downloadsRemaining: 19,
  downloadsLimit: 25,
  apiKey: 'devclub_live_sec_78943f82aa190bce2491',
  joined: 'March 2026',
  expires: 'Never (Lifetime Access)',
  downloadsCount: 42
};

const DEFAULT_ORDERS = [
  { id: 'DC-98432', date: 'Oct 12, 2026', item: 'Lifetime VIP All-Access Membership', amount: '$199.00', status: 'Completed' },
  { id: 'DC-91204', date: 'Sep 04, 2026', item: 'Elementor Pro + WP Rocket Bundle', amount: '$14.99', status: 'Completed' },
  { id: 'DC-88120', date: 'Jul 21, 2026', item: 'Astra Pro Annual License Renewal', amount: '$49.00', status: 'Completed' }
];

// Initialize Storage
function getUser() {
  const stored = localStorage.getItem('devclub_user');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) {}
  }
  return DEFAULT_USER;
}

function saveUser(user) {
  localStorage.setItem('devclub_user', JSON.stringify(user));
}

function getOrders() {
  const stored = localStorage.getItem('devclub_orders');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) {}
  }
  return DEFAULT_ORDERS;
}

// Toast System
function showToast(title, message, icon = '✓') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--accent-cyan); font-weight: bold; font-size: 1.1rem;">${icon}</span>
    <div>
      <div style="font-weight: 600; color: #fff;">${title}</div>
      <div style="font-size: 0.8rem; color: #94a3b8;">${message}</div>
    </div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Simulated Download Handler
function downloadProduct(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const user = getUser();
  if (user.isLoggedIn && user.downloadsRemaining <= 0) {
    showToast('Download Quota Exceeded', 'You have used all 25 daily downloads. Upgrades or daily reset at midnight UTC.', '⚠️');
    return;
  }

  if (user.isLoggedIn && user.downloadsRemaining > 0) {
    user.downloadsRemaining--;
    user.downloadsCount = (user.downloadsCount || 0) + 1;
    saveUser(user);
    updateDashboardUI();
  }

  showToast('Starting Secure Download', `${product.name} v${product.version} (.zip) - Original GPL file`, '⚡');

  // Trigger simulated file download
  const blobContent = `--- DevClub.Store Original GPL Release ---
Package: ${product.name}
Version: ${product.version}
License: ${product.gpl}
Original Author: Verified Upstream
Downloaded by: ${user.isLoggedIn ? user.name : 'Guest User'}
Verification Digest: SHA256-${Math.random().toString(36).substring(2, 15)}

Notice: This digital asset is 100% untouched and released under the GNU General Public License.
Thank you for supporting DevClub Store!
`;
  const blob = new Blob([blobContent], { type: 'text/plain;charset=utf-8' });
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `${product.id}-v${product.version}-devclub.zip.txt`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();

  setTimeout(() => {
    showToast('Download Complete', `${product.name} saved to your device.`, '📦');
  }, 1200);
}

// Modal System
function openChangelogModal(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  let modal = document.getElementById('app-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'app-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 20px;">
        <span style="font-size: 2rem;">${product.icon}</span>
        <div>
          <h3 style="font-size: 1.4rem;">${product.name}</h3>
          <span class="badge badge-version">v${product.version}</span>
          <span class="badge badge-gpl">${product.gpl}</span>
        </div>
      </div>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px;">${product.desc}</p>
      <h4 style="font-size: 1rem; margin-bottom: 12px; color: var(--accent-cyan);">Version History & Changelog</h4>
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; margin-bottom: 24px;">
        ${product.changelog.map(log => `<div style="padding: 6px 0; border-bottom: 1px solid var(--border-subtle); font-size: 0.85rem; color: #cbd5e1;">${log}</div>`).join('')}
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 12px;">
        <button class="btn btn-secondary btn-sm" onclick="closeModal()">Close</button>
        <button class="btn btn-primary btn-sm" onclick="downloadProduct('${product.id}'); closeModal();">Download v${product.version}</button>
      </div>
    </div>
  `;
  modal.classList.add('open');
}

function closeModal() {
  const modal = document.getElementById('app-modal');
  if (modal) modal.classList.remove('open');
}

// Render Products Grid on Store Page
function renderProducts(filterCategory = 'all', searchQuery = '') {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  let filtered = PRODUCTS_DATA;

  if (filterCategory !== 'all') {
    filtered = filtered.filter(p => p.category === filterCategory);
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.desc.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
        <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
        <h3>No digital products found</h3>
        <p style="color: var(--text-muted); margin-top: 8px;">Try searching for "Elementor", "Rocket", "WooCommerce", or change category.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" id="card-${p.id}">
      <div class="product-header">
        <div class="product-icon">${p.icon}</div>
        <div class="product-meta">
          <div class="product-category">${p.categoryLabel}</div>
          <h3 class="product-title">${p.name}</h3>
        </div>
      </div>
      <p class="product-desc">${p.desc}</p>
      <div class="product-badges">
        <span class="badge badge-version">v${p.version}</span>
        <span class="badge badge-gpl">${p.gpl}</span>
        <span class="badge" style="color: var(--accent-amber);">★ ${p.rating}</span>
      </div>
      <div class="product-footer">
        <div class="product-stats">
          <span>↓ ${p.downloads}</span>
          <span>• ${p.updated}</span>
        </div>
        <div class="product-actions">
          <button class="btn btn-secondary btn-sm" onclick="openChangelogModal('${p.id}')">Info</button>
          <button class="btn btn-primary btn-sm" onclick="downloadProduct('${p.id}')">Download</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Update Dashboard UI Elements
function updateDashboardUI() {
  const user = getUser();
  
  // Banner details
  const nameEl = document.getElementById('user-display-name');
  if (nameEl) nameEl.textContent = user.name;
  
  const emailEl = document.getElementById('user-display-email');
  if (emailEl) emailEl.textContent = user.email;

  const roleEl = document.getElementById('user-role-badge');
  if (roleEl) roleEl.textContent = user.membership;

  const quotaRemainingEl = document.getElementById('quota-remaining-count');
  if (quotaRemainingEl) quotaRemainingEl.textContent = `${user.downloadsRemaining} / ${user.downloadsLimit}`;

  const quotaBar = document.getElementById('quota-progress-bar');
  if (quotaBar) {
    const pct = Math.round((user.downloadsRemaining / user.downloadsLimit) * 100);
    quotaBar.style.width = `${pct}%`;
  }

  const metricDownloads = document.getElementById('metric-total-downloads');
  if (metricDownloads) metricDownloads.textContent = user.downloadsCount || 42;

  const metricQuota = document.getElementById('metric-quota-left');
  if (metricQuota) metricQuota.textContent = user.downloadsRemaining;

  const metricMembership = document.getElementById('metric-membership-plan');
  if (metricMembership) metricMembership.textContent = user.tier.toUpperCase();

  // Populate Downloads Table
  const downloadsBody = document.getElementById('user-downloads-tbody');
  if (downloadsBody) {
    downloadsBody.innerHTML = PRODUCTS_DATA.slice(0, 6).map(p => `
      <tr>
        <td>
          <div class="item-cell">
            <div class="item-thumb">${p.icon}</div>
            <div>
              <div>${p.name}</div>
              <div style="font-size: 0.75rem; color: var(--accent-cyan);">${p.categoryLabel}</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-version">v${p.version}</span></td>
        <td>${p.updated}</td>
        <td><span class="badge badge-gpl">Active License</span></td>
        <td style="text-align: right;">
          <button class="btn btn-primary btn-sm" onclick="downloadProduct('${p.id}')">Download .zip</button>
        </td>
      </tr>
    `).join('');
  }

  // Populate Orders Table
  const ordersBody = document.getElementById('user-orders-tbody');
  if (ordersBody) {
    const orders = getOrders();
    ordersBody.innerHTML = orders.map(o => `
      <tr>
        <td><strong style="color: var(--accent-cyan);">${o.id}</strong></td>
        <td>${o.date}</td>
        <td>${o.item}</td>
        <td><span class="badge badge-gpl">${o.status}</span></td>
        <td><strong>${o.amount}</strong></td>
        <td style="text-align: right;">
          <button class="btn btn-secondary btn-sm" onclick="showToast('Invoice Generated', 'Invoice ${o.id}.pdf ready for printing.', '📄')">Invoice</button>
        </td>
      </tr>
    `).join('');
  }
}

// Authentication Actions
function switchAuthTab(tab) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginBtn = document.getElementById('tab-btn-login');
  const registerBtn = document.getElementById('tab-btn-register');

  if (tab === 'login') {
    if (loginForm) loginForm.style.display = 'block';
    if (registerForm) registerForm.style.display = 'none';
    if (loginBtn) loginBtn.classList.add('active');
    if (registerBtn) registerBtn.classList.remove('active');
  } else {
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'block';
    if (loginBtn) loginBtn.classList.remove('active');
    if (registerBtn) registerBtn.classList.add('active');
  }
}

function handleLogin(e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById('login-email');
  const user = getUser();
  user.isLoggedIn = true;
  if (emailInput && emailInput.value) {
    user.email = emailInput.value;
    user.name = emailInput.value.split('@')[0];
  }
  saveUser(user);
  showToast('Logged In Successfully', `Welcome back, ${user.name}!`, '✓');
  renderAccountPage();
}

function handleRegister(e) {
  if (e) e.preventDefault();
  const nameInput = document.getElementById('register-name');
  const emailInput = document.getElementById('register-email');
  const user = {
    isLoggedIn: true,
    name: nameInput ? nameInput.value : 'New Member',
    email: emailInput ? emailInput.value : 'member@devclub.store',
    membership: 'Pro Club Member',
    tier: 'pro',
    downloadsRemaining: 20,
    downloadsLimit: 20,
    apiKey: 'devclub_live_sec_' + Math.random().toString(36).substring(2, 12),
    joined: 'October 2026',
    expires: 'October 2027 (Annual)',
    downloadsCount: 0
  };
  saveUser(user);
  showToast('Account Created', 'Your DevClub Membership is now active!', '🎉');
  renderAccountPage();
}

function loginAsDemo(type) {
  const user = getUser();
  user.isLoggedIn = true;
  if (type === 'vip') {
    user.name = 'Alex Rivera (VIP Club)';
    user.email = 'alex.vip@devclub.store';
    user.membership = 'Lifetime VIP All-Access';
    user.tier = 'vip';
    user.downloadsRemaining = 25;
    user.downloadsLimit = 25;
  } else {
    user.name = 'Guest Developer';
    user.email = 'guest@devclub.store';
    user.membership = 'Free Trial Member';
    user.tier = 'free';
    user.downloadsRemaining = 3;
    user.downloadsLimit = 3;
  }
  saveUser(user);
  showToast('Demo Login Active', `Signed in as ${user.name}`, '⚡');
  renderAccountPage();
}

function handleLogout() {
  const user = getUser();
  user.isLoggedIn = false;
  saveUser(user);
  showToast('Logged Out', 'You have been signed out safely.', '👋');
  renderAccountPage();
}

function generateNewApiKey() {
  const user = getUser();
  user.apiKey = 'devclub_live_sec_' + Array.from({length: 24}, () => Math.floor(Math.random()*16).toString(16)).join('');
  saveUser(user);
  const codeEl = document.getElementById('api-key-display');
  if (codeEl) codeEl.textContent = user.apiKey;
  showToast('API Key Refreshed', 'New WordPress Updater secret generated.', '🔑');
}

function copyApiKey() {
  const user = getUser();
  navigator.clipboard.writeText(user.apiKey || 'devclub_live_sec_78943f82aa190bce2491');
  showToast('Copied to Clipboard', 'API key copied. Paste into your DevClub WordPress plugin.', '📋');
}

// Switch Dashboard Sub-Tabs
function switchDashboardTab(tabName) {
  const buttons = document.querySelectorAll('.sidebar-btn');
  const panes = document.querySelectorAll('.tab-pane');

  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
  });

  panes.forEach(pane => {
    pane.classList.toggle('active', pane.id === `tab-${tabName}`);
  });
}

// Render Account Page depending on auth state
function renderAccountPage() {
  const user = getUser();
  const authSection = document.getElementById('auth-section');
  const dashboardSection = document.getElementById('dashboard-section');

  if (!authSection || !dashboardSection) return;

  if (user.isLoggedIn) {
    authSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    updateDashboardUI();
  } else {
    authSection.style.display = 'block';
    dashboardSection.style.display = 'none';
  }
}

// Page Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Check if store page
  const searchInput = document.getElementById('store-search-input');
  if (searchInput) {
    renderProducts();

    searchInput.addEventListener('input', (e) => {
      const activeFilterBtn = document.querySelector('.filter-btn.active');
      const cat = activeFilterBtn ? activeFilterBtn.getAttribute('data-cat') : 'all';
      renderProducts(cat, e.target.value);
    });

    // Filter pill clicks
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        renderProducts(cat, searchInput.value);
      });
    });

    // Sort select
    const sortSelect = document.getElementById('store-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        if (e.target.value === 'popular') {
          PRODUCTS_DATA.sort((a, b) => parseFloat(b.downloads) - parseFloat(a.downloads));
        } else if (e.target.value === 'rating') {
          PRODUCTS_DATA.sort((a, b) => b.rating - a.rating);
        } else if (e.target.value === 'name') {
          PRODUCTS_DATA.sort((a, b) => a.name.localeCompare(b.name));
        }
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        const cat = activeFilterBtn ? activeFilterBtn.getAttribute('data-cat') : 'all';
        renderProducts(cat, searchInput.value);
      });
    }
  }

  // Account Page logic
  if (document.getElementById('auth-section')) {
    renderAccountPage();
  }

  // Global Esc key for modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
