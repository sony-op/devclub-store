/**
 * DevClub.store — Exact Account Dashboard Engine
 */

const LIBRARY_PRODUCTS = [
  {
    id: 'wpbakery',
    title: 'WPBakery Page Builder for WordPress',
    image: 'images/wpbakery.svg',
    version: '7.8.2',
    category: 'plugin',
    downloads: 1420
  },
  {
    id: 'spacemax',
    title: 'SPACEMAX - MULTIPURPOSE HTML TEMPLATE LATEST VERSION',
    image: 'images/spacemax.svg',
    version: '3.1.0',
    category: 'template',
    downloads: 890
  },
  {
    id: 'furea',
    title: 'FUREA - FURNITURE ECOMMERCE HTML TEMPLATE LATEST VERSION',
    image: 'images/furea.svg',
    version: '2.4.0',
    category: 'ecommerce',
    downloads: 620
  },
  {
    id: 'katerina',
    title: 'KATERINA - PHOTOGRAPHY PORTFOLIO SITE TEMPLATE LATEST...',
    image: 'images/katerina.svg',
    version: '1.9.0',
    category: 'portfolio',
    downloads: 510
  },
  {
    id: 'elementor-pro',
    title: 'Elementor Pro - Visual Drag & Drop Builder Plugin',
    image: 'images/elementor.svg',
    version: '3.24.4',
    category: 'plugin',
    downloads: 2450
  },
  {
    id: 'wprocket',
    title: 'WP Rocket - High Performance WordPress Caching Engine',
    image: 'images/wprocket.svg',
    version: '3.16.2',
    category: 'plugin',
    downloads: 1980
  },
  {
    id: 'astra-pro',
    title: 'Astra Pro Multi-Purpose WordPress Theme Agency Bundle',
    image: 'images/spacemax.svg',
    version: '4.8.1',
    category: 'theme',
    downloads: 1760
  },
  {
    id: 'woo-subscriptions',
    title: 'WooCommerce Subscriptions & Recurring Payments Addon',
    image: 'images/furea.svg',
    version: '6.4.0',
    category: 'ecommerce',
    downloads: 1120
  }
];

// Collections Mock Data
const COLLECTIONS_DATA = [
  {
    id: 'col-agency',
    title: 'Agency Starter Stack (Elementor + WP Rocket + Astra)',
    image: 'images/spacemax.svg',
    version: '2026 Edition',
    category: 'collection',
    downloads: 320
  },
  {
    id: 'col-ecom',
    title: 'eCommerce Master Pack (WooCommerce + Furea + Subscriptions)',
    image: 'images/furea.svg',
    version: '2026 Edition',
    category: 'collection',
    downloads: 290
  }
];

let currentTab = 'library';

function renderLibrary(query = '') {
  const grid = document.getElementById('library-grid');
  if (!grid) return;

  const dataset = currentTab === 'library' ? LIBRARY_PRODUCTS : COLLECTIONS_DATA;
  let filtered = dataset;

  if (query.trim() !== '') {
    const q = query.toLowerCase();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.category.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
        <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
        <h3 style="font-size: 16px; font-weight: 700; color: #1e293b;">No products found in your library</h3>
        <p style="font-size: 13.5px; color: #64748b; margin-top: 4px;">Try searching for "WPBakery", "Spacemax", "Template", or clear your search.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="library-card" id="product-${item.id}">
      <div class="card-image-wrapper">
        <img src="${item.image}" alt="${item.title}" class="card-image" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-title-row">
          <h3 class="card-title" title="${item.title}">${item.title}</h3>
          <span class="card-warning-icon" title="Version Update Available" onclick="showToast('Changelog', 'v${item.version} release notes available.', 'ℹ️')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </span>
        </div>
        <button class="download-btn" onclick="triggerDownload('${item.id}', '${item.title.replace(/'/g, "\\'")}', '${item.version}')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download
        </button>
      </div>
    </div>
  `).join('');
}

function triggerDownload(id, title, version) {
  showToast('Starting Download', `Preparing ${title.substring(0, 32)}...`, '⚡');

  // Generate simulated .zip download package
  const fileData = `=====================================================
DEVCLUB.STORE — OFFICIAL UNTOUCHED GPL RELEASE
=====================================================
Package: ${title}
Version: v${version}
License: GNU General Public License (GPL)
Downloaded By: info.nomangraphics@gmail.com
Subscription: Annual Unlimited (Active)
Timestamp: ${new Date().toISOString()}

Notice: This file is 100% original, untouched, and free of any malware or modifications.
Thank you for being a valued member of devclub.store!
=====================================================
`;
  const blob = new Blob([fileData], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${id}-v${version}-devclub.zip.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => {
    showToast('Download Completed', `${id}-v${version}.zip saved successfully.`, '✓');
  }, 1000);
}

function switchTab(tab) {
  currentTab = tab;
  const libBtn = document.getElementById('tab-library-btn');
  const colBtn = document.getElementById('tab-collections-btn');
  const searchInput = document.getElementById('library-search');

  if (tab === 'library') {
    libBtn.classList.add('active');
    colBtn.classList.remove('active');
    if (searchInput) searchInput.placeholder = 'Search your library...';
  } else {
    libBtn.classList.remove('active');
    colBtn.classList.add('active');
    if (searchInput) searchInput.placeholder = 'Search your collections...';
  }

  renderLibrary(searchInput ? searchInput.value : '');
}

function focusSearch() {
  const searchInput = document.getElementById('library-search');
  if (searchInput) {
    searchInput.focus();
    searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function handleSignOut() {
  showToast('Signed Out', 'You have been signed out of devclub.store.', '👋');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1200);
}

function openSubscriptionModal() {
  const modal = document.getElementById('sub-modal');
  if (modal) modal.classList.add('open');
}

function closeSubscriptionModal() {
  const modal = document.getElementById('sub-modal');
  if (modal) modal.classList.remove('open');
}

function showToast(title, message, icon = '✓') {
  let container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="font-size: 16px;">${icon}</span>
    <div>
      <div style="font-weight: 600;">${title}</div>
      <div style="font-size: 12px; color: #94a3b8;">${message}</div>
    </div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

document.addEventListener('DOMContentLoaded', () => {
  renderLibrary();

  const searchInput = document.getElementById('library-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderLibrary(e.target.value);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSubscriptionModal();
  });
});
