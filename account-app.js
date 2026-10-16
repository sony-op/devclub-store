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

/* ==========================================================================
   Complete Authentication Engine (Email/Password, OTP, Registration, State)
   ========================================================================== */

let generatedOtpCode = '482910';
let otpTimerInterval = null;

const DEFAULT_USER = {
  name: 'Noman Graphics',
  email: 'info.nomangraphics@gmail.com',
  plan: 'Annual Unlimited',
  initial: 'N',
  isLoggedIn: true
};

function getAuthUser() {
  const saved = localStorage.getItem('devclub_auth_user');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return DEFAULT_USER;
    }
  }
  return DEFAULT_USER;
}

function setAuthUser(user) {
  if (user) {
    localStorage.setItem('devclub_auth_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('devclub_auth_user');
  }
  updateAuthUI();
}

function updateAuthUI() {
  const user = getAuthUser();
  const avatarBadge = document.getElementById('header-avatar');
  const userEmailDisplay = document.getElementById('user-email-display');
  const headerAccountLink = document.getElementById('header-account-link');
  const modalAccountEmail = document.getElementById('modal-account-email');
  const signoutBtn = document.getElementById('header-signout-btn');
  const pageSignoutBtn = document.getElementById('page-signout-btn');
  const authPromptBanner = document.getElementById('auth-prompt-banner');
  const openAccountBtn = document.getElementById('header-open-account-btn');

  if (user && user.isLoggedIn) {
    if (avatarBadge) {
      avatarBadge.style.display = 'flex';
      avatarBadge.textContent = user.initial || (user.name ? user.name[0].toUpperCase() : 'U');
      avatarBadge.title = user.name || user.email;
    }
    if (userEmailDisplay) userEmailDisplay.textContent = user.email;
    if (modalAccountEmail) modalAccountEmail.textContent = user.email;
    if (headerAccountLink) headerAccountLink.textContent = 'Account';
    if (signoutBtn) signoutBtn.style.display = 'flex';
    if (pageSignoutBtn) pageSignoutBtn.style.display = 'inline-flex';
    if (openAccountBtn) openAccountBtn.style.display = 'none';
    if (authPromptBanner) authPromptBanner.style.display = 'none';
  } else {
    if (avatarBadge) avatarBadge.style.display = 'none';
    if (userEmailDisplay) userEmailDisplay.textContent = 'Guest User (Not Signed In)';
    if (modalAccountEmail) modalAccountEmail.textContent = 'None';
    if (headerAccountLink) headerAccountLink.textContent = 'Sign In';
    if (signoutBtn) signoutBtn.style.display = 'none';
    if (pageSignoutBtn) pageSignoutBtn.style.display = 'none';
    if (openAccountBtn) openAccountBtn.style.display = 'inline-flex';
    if (authPromptBanner) authPromptBanner.style.display = 'block';
  }
}

function openAuthModal(defaultTab = 'password') {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.classList.add('open');
    switchAuthTab(defaultTab);
  }
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.remove('open');
}

function switchAuthTab(tabName) {
  const tabs = ['password', 'otp', 'register'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const content = document.getElementById(`tab-content-${t}`);
    if (btn) btn.classList.toggle('active', t === tabName);
    if (content) content.classList.toggle('active', t === tabName);
  });
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  btn.innerHTML = isPassword
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
}

function fillDemoAccount() {
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  if (emailInput) emailInput.value = 'info.nomangraphics@gmail.com';
  if (passInput) passInput.value = 'DevClubDemo2026!';
  showToast('Demo Account Filled', 'Click "Sign In" to open account.', '⚡');
}

function handlePasswordLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-password').value.trim();

  if (!email || !pass) {
    showToast('Missing Fields', 'Please enter email and password.', '⚠️');
    return;
  }

  const btn = document.getElementById('password-submit-btn');
  if (btn) btn.innerHTML = `<span>Signing in...</span>`;

  setTimeout(() => {
    const user = {
      name: email.split('@')[0].replace(/[._]/g, ' '),
      email: email,
      plan: 'Annual Unlimited',
      initial: email.charAt(0).toUpperCase(),
      isLoggedIn: true
    };
    setAuthUser(user);

    // Sync into Admin DB
    try {
      let users = JSON.parse(localStorage.getItem('devclub_users_db') || '[]');
      if (!users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        users.unshift({
          id: 'usr_' + Date.now().toString().slice(-4),
          name: user.name,
          email: user.email,
          authMethod: 'Password',
          plan: 'Annual Unlimited',
          status: 'Active',
          joinedDate: 'Today',
          downloads: 1
        });
        localStorage.setItem('devclub_users_db', JSON.stringify(users));
      }
    } catch (e) {}

    if (btn) btn.innerHTML = `<span>Sign In to Account</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;
    closeAuthModal();
    showToast('Login Successful', `Welcome back, ${user.name}!`, '🎉');
  }, 500);
}

function sendOtpCode() {
  const identifier = document.getElementById('otp-identifier').value.trim();
  if (!identifier) {
    showToast('Required', 'Please enter your email or phone number.', '⚠️');
    return;
  }

  // Generate random 6-digit OTP
  generatedOtpCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Log into Admin OTP security table & Live Cloud Sync
  try {
    let logs = JSON.parse(localStorage.getItem('devclub_otp_logs') || '[]');
    logs.unshift({
      id: 'otp_' + Date.now().toString().slice(-4),
      target: identifier,
      code: generatedOtpCode,
      type: identifier.includes('@') ? 'Email OTP' : 'Mobile SMS',
      status: 'Pending',
      time: 'Just Now',
      ip: '103.212.144.18'
    });
    localStorage.setItem('devclub_otp_logs', JSON.stringify(logs));
    if (typeof cloudPushOtp === 'function') {
      cloudPushOtp({ target: identifier, code: generatedOtpCode, status: 'Pending' });
    }
  } catch (e) {}

  // Show Step 2
  document.getElementById('otp-step-1').style.display = 'none';
  document.getElementById('otp-step-2').style.display = 'block';
  document.getElementById('otp-sent-target').textContent = identifier;
  document.getElementById('live-generated-otp').textContent = generatedOtpCode;

  // Clear previous OTP inputs
  const otpInputs = document.querySelectorAll('.otp-digit');
  otpInputs.forEach(input => input.value = '');
  if (otpInputs[0]) otpInputs[0].focus();

  // Toast notification with OTP
  showToast('OTP Code Sent', `Your 6-digit verification code is: ${generatedOtpCode}`, '📲');

  // Start countdown timer
  startOtpCountdown();
}

function startOtpCountdown() {
  let seconds = 30;
  const timerDisplay = document.getElementById('otp-timer-display');
  const resendBtn = document.getElementById('resend-otp-btn');
  if (resendBtn) resendBtn.disabled = true;

  if (otpTimerInterval) clearInterval(otpTimerInterval);

  otpTimerInterval = setInterval(() => {
    seconds--;
    if (timerDisplay) timerDisplay.innerHTML = `Resend OTP in <strong>${seconds}</strong>s`;
    if (seconds <= 0) {
      clearInterval(otpTimerInterval);
      if (timerDisplay) timerDisplay.innerHTML = `Didn't get code?`;
      if (resendBtn) resendBtn.disabled = false;
    }
  }, 1000);
}

function resetOtpStep() {
  document.getElementById('otp-step-1').style.display = 'block';
  document.getElementById('otp-step-2').style.display = 'none';
  if (otpTimerInterval) clearInterval(otpTimerInterval);
}

function verifyOtpAndLogin() {
  const inputs = document.querySelectorAll('.otp-digit');
  let enteredOtp = '';
  inputs.forEach(i => enteredOtp += i.value);

  if (enteredOtp.length < 6) {
    showToast('Incomplete Code', 'Please enter all 6 digits of the OTP.', '⚠️');
    return;
  }

  if (enteredOtp !== generatedOtpCode) {
    showToast('Invalid OTP', `Entered code does not match. Demo code is: ${generatedOtpCode}`, '❌');
    return;
  }

  const identifier = document.getElementById('otp-identifier').value.trim();
  const user = {
    name: identifier.includes('@') ? identifier.split('@')[0] : 'Mobile User',
    email: identifier.includes('@') ? identifier : `${identifier}@verified.devclub.store`,
    plan: 'Annual Unlimited',
    initial: identifier.charAt(0).toUpperCase(),
    isLoggedIn: true
  };

  // Update OTP status in Admin Logs
  try {
    let logs = JSON.parse(localStorage.getItem('devclub_otp_logs') || '[]');
    if (logs.length > 0 && logs[0].code === generatedOtpCode) {
      logs[0].status = 'Verified';
      localStorage.setItem('devclub_otp_logs', JSON.stringify(logs));
    }
  } catch (e) {}

  // Save in Admin Users DB
  try {
    let users = JSON.parse(localStorage.getItem('devclub_users_db') || '[]');
    if (!users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
      users.unshift({
        id: 'usr_' + Date.now().toString().slice(-4),
        name: user.name,
        email: user.email,
        authMethod: 'OTP Verified',
        plan: 'Annual Unlimited',
        status: 'Active',
        joinedDate: 'Today',
        downloads: 1
      });
      localStorage.setItem('devclub_users_db', JSON.stringify(users));
    }
  } catch (e) {}

  setAuthUser(user);
  closeAuthModal();
  resetOtpStep();
  showToast('OTP Verified!', `Welcome, ${user.name}! Account opened.`, '✅');
}

function handleRegistration(event) {
  event.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();

  if (!name || !email) {
    showToast('Missing Info', 'Please enter your name and email.', '⚠️');
    return;
  }

  const user = {
    name: name,
    email: email,
    plan: 'Annual Unlimited',
    initial: name.charAt(0).toUpperCase(),
    isLoggedIn: true
  };

  // Add into Admin Users DB
  try {
    let users = JSON.parse(localStorage.getItem('devclub_users_db') || '[]');
    users.unshift({
      id: 'usr_' + Date.now().toString().slice(-4),
      name: name,
      email: email,
      authMethod: 'Registration Form',
      plan: 'Annual Unlimited',
      status: 'Active',
      joinedDate: 'Today',
      downloads: 0
    });
    localStorage.setItem('devclub_users_db', JSON.stringify(users));
  } catch (e) {}

  setAuthUser(user);
  closeAuthModal();
  showToast('Account Created!', `Welcome to DevClub.store, ${name}!`, '🎉');
}

function showForgotPassword(event) {
  event.preventDefault();
  switchAuthTab('otp');
  showToast('Password Reset', 'Enter your registered email to receive an instant OTP.', '🔑');
}

function handleSignOut() {
  setAuthUser({ isLoggedIn: false, name: '', email: '', initial: '' });
  showToast('Signed Out', 'You have been signed out. Click "Open Account" to sign in anytime.', '👋');
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
  updateAuthUI();

  // Categories Dropdown click listener
  const catToggle = document.getElementById('categories-toggle');
  const catDropdown = document.getElementById('categories-dropdown');
  if (catToggle && catDropdown) {
    catToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      catDropdown.classList.toggle('open');
    });

    document.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedCat = item.getAttribute('data-cat');
        catDropdown.classList.remove('open');
        showToast('Category Selected', `Filtering by: ${selectedCat}`, '📁');
        const searchInput = document.getElementById('library-search');
        if (searchInput) {
          searchInput.value = selectedCat === 'All Categories' ? '' : selectedCat;
          renderLibrary(searchInput.value);
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!catDropdown.contains(e.target)) {
        catDropdown.classList.remove('open');
      }
    });
  }

  // Search input
  const searchInput = document.getElementById('library-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderLibrary(e.target.value);
    });
  }

  // OTP 6-Digit Auto-advance & Backspace Listeners
  const otpInputs = document.querySelectorAll('.otp-digit');
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      if (input.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        otpInputs[index - 1].focus();
      } else if (e.key === 'Enter') {
        verifyOtpAndLogin();
      }
    });

    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData).getData('text').trim();
      if (/^\d{6}$/.test(pasteData)) {
        pasteData.split('').forEach((char, i) => {
          if (otpInputs[i]) otpInputs[i].value = char;
        });
        if (otpInputs[5]) otpInputs[5].focus();
      }
    });
  });

  // Modal Escape key support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSubscriptionModal();
      closeAuthModal();
    }
  });
});
