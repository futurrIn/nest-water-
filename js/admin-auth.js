/**
 * NEST Water Technologies - Admin Security & Auth Module
 * Provides SHA-256 password hashing, session tokens, brute-force protection & route guard.
 */

class AdminAuth {
  constructor() {
    this.SESSION_KEY = 'nest_admin_session_token';
    this.CREDENTIALS_KEY = 'nest_admin_creds_hash';
    this.LOCKOUT_KEY = 'nest_admin_lockout_data';
    this.SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 Hours
    this.MAX_ATTEMPTS = 5;
    this.LOCKOUT_TIME = 15 * 60 * 1000; // 15 Minutes
    
    this.initCredentials();
  }

  // Helper for SHA-256 Hashing
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + "_nest_salt_2025!");
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async initCredentials() {
    if (!localStorage.getItem(this.CREDENTIALS_KEY)) {
      // Default credentials: username 'admin', password 'admin123'
      const defaultHash = await this.hashPassword('admin123');
      const creds = {
        username: 'admin',
        hash: defaultHash,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(this.CREDENTIALS_KEY, JSON.stringify(creds));
    }
  }

  getLockoutData() {
    const data = localStorage.getItem(this.LOCKOUT_KEY);
    return data ? JSON.parse(data) : { attempts: 0, lockUntil: 0 };
  }

  setLockoutData(data) {
    localStorage.setItem(this.LOCKOUT_KEY, JSON.stringify(data));
  }

  async login(username, password) {
    const lockout = this.getLockoutData();
    const now = Date.now();

    if (lockout.lockUntil > now) {
      const remainingMins = Math.ceil((lockout.lockUntil - now) / 60000);
      return {
        success: false,
        message: `Too many failed login attempts. Account temporarily locked for ${remainingMins} minute(s).`
      };
    }

    const credsData = JSON.parse(localStorage.getItem(this.CREDENTIALS_KEY) || '{}');
    const inputHash = await this.hashPassword(password);

    if (username.trim() === credsData.username && inputHash === credsData.hash) {
      // Reset lockout on success
      this.setLockoutData({ attempts: 0, lockUntil: 0 });

      // Generate Session Token
      const token = 'tok_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
      const session = {
        token: token,
        username: username,
        expiresAt: now + this.SESSION_DURATION,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
      return { success: true, token };
    } else {
      const newAttempts = (lockout.attempts || 0) + 1;
      let lockUntil = 0;
      let msg = `Invalid username or password. (${this.MAX_ATTEMPTS - newAttempts} attempt(s) remaining)`;

      if (newAttempts >= this.MAX_ATTEMPTS) {
        lockUntil = now + this.LOCKOUT_TIME;
        msg = `Account locked due to 5 consecutive failed attempts. Please try again in 15 minutes.`;
      }

      this.setLockoutData({ attempts: newAttempts, lockUntil });
      return { success: false, message: msg };
    }
  }

  isLoggedIn() {
    const sessionStr = localStorage.getItem(this.SESSION_KEY);
    if (!sessionStr) return false;
    try {
      const session = JSON.parse(sessionStr);
      if (Date.now() > session.expiresAt) {
        this.logout();
        return false;
      }
      return true;
    } catch (e) {
      this.logout();
      return false;
    }
  }

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  }

  async updatePassword(currentPassword, newPassword) {
    const credsData = JSON.parse(localStorage.getItem(this.CREDENTIALS_KEY) || '{}');
    const currentHash = await this.hashPassword(currentPassword);

    if (currentHash !== credsData.hash) {
      return { success: false, message: 'Current password is incorrect.' };
    }

    if (newPassword.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters long.' };
    }

    const newHash = await this.hashPassword(newPassword);
    credsData.hash = newHash;
    credsData.lastUpdated = new Date().toISOString();
    localStorage.setItem(this.CREDENTIALS_KEY, JSON.stringify(credsData));

    return { success: true, message: 'Password updated successfully!' };
  }

  checkAuthOrRedirect() {
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html';
    }
  }
}

window.adminAuth = new AdminAuth();
