/**
 * DevClub.store — Realtime Live Cloud Data Synchronization
 * Syncs Users, OTPs, and Products across all devices and browsers
 */

const CLOUD_SYNC_ENDPOINT = '/api/live-sync';
const FIREBASE_BACKUP_ENDPOINT = 'https://devclub-store-live-default-rtdb.firebaseio.com/data.json';

// Push New OTP to Live Cloud
async function cloudPushOtp(otpData) {
  try {
    // 1. Send to Vercel Serverless API
    fetch(CLOUD_SYNC_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'otp', data: otpData })
    }).catch(() => {});

    // 2. Also send to Firebase Realtime Cloud Backup
    fetch(FIREBASE_BACKUP_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'otp', data: otpData, timestamp: Date.now() })
    }).catch(() => {});
  } catch (err) {
    console.warn('Cloud sync offline, using local storage.');
  }
}

// Push New User Registration to Live Cloud
async function cloudPushUser(userData) {
  try {
    fetch(CLOUD_SYNC_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'user', data: userData })
    }).catch(() => {});

    fetch(FIREBASE_BACKUP_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'user', data: userData, timestamp: Date.now() })
    }).catch(() => {});
  } catch (err) {
    console.warn('Cloud sync offline, using local storage.');
  }
}

// Fetch Entire Live Database for Admin Panel
async function cloudFetchAllData() {
  try {
    const res = await fetch(CLOUD_SYNC_ENDPOINT);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    // Fallback to local storage
  }
  return null;
}
