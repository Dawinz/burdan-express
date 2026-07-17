import { scrollManagerErrorHandler } from './safariYetuErrorHandler.js';

class SafariYetuScrollManager {
  constructor() {
    this.isDialogOpen = false;
    this.originalOverflow = '';
    this.cleanupFunctions = [];
    this.checkInterval = null;
    this.retryCount = 0;
    this.maxRetries = 5;
    this.maxCheckDuration = 30000;
    this.startTime = null;
    this.isDestroyed = false;
    this.errorHandler = scrollManagerErrorHandler;
  }

  disableScroll() {
    try {
      if (!this.isDialogOpen) {
        this.originalOverflow = document.body.style.overflow || '';
        document.body.style.overflow = 'hidden';
        this.isDialogOpen = true;
      }
    } catch (error) {
      this.errorHandler.logError(error, 'disableScroll');
    }
  }

  enableScroll() {
    try {
      if (this.isDialogOpen) {
        document.body.style.overflow = this.originalOverflow;
        this.isDialogOpen = false;
      }
    } catch (error) {
      this.errorHandler.logError(error, 'enableScroll');
    }
  }

  handleEscapeKey(event) {
    if (event.key === 'Escape' && this.isDialogOpen) {
      this.closeDialog();
    }
  }

  handleOutsideClick(event) {
    try {
      const safariDialog = document.querySelector('[data-safariplus-dialog], .safariplus-dialog, .safari-plus-dialog');
      if (safariDialog && !safariDialog.contains(event.target) && this.isDialogOpen) {
        this.closeDialog();
      }
    } catch (error) {
      this.errorHandler.logError(error, 'handleOutsideClick');
    }
  }

  checkDialogStatus() {
    if (this.isDestroyed) { this.cleanup(); return; }
    try {
      if (this.startTime && (Date.now() - this.startTime) > this.maxCheckDuration) {
        this.errorHandler.handleTimeoutError('Dialog monitoring', this.maxCheckDuration);
        this.closeDialog();
        return;
      }
      const dialogSelectors = ['[data-safariplus-dialog]', '.safariplus-dialog', '.safari-plus-dialog', '[id*="safari"]', '[class*="safari"]', '.modal[style*="block"]', '.dialog[style*="block"]'];
      const dialogExists = dialogSelectors.some(selector => {
        const elements = document.querySelectorAll(selector);
        return Array.from(elements).some(el => {
          const style = window.getComputedStyle(el);
          return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        });
      });
      const safariPlusActive = typeof window.safariplus !== 'undefined' && window.safariplus.isDialogOpen && window.safariplus.isDialogOpen();
      if (!dialogExists && !safariPlusActive && this.isDialogOpen) {
        this.closeDialog();
      }
    } catch (error) {
      this.errorHandler.logError(error, 'checkDialogStatus');
    }
  }

  startDialogMonitoring() {
    if (this.isDestroyed) return;
    try {
      this.startTime = Date.now();
      this.disableScroll();
      const escHandler = (event) => this.handleEscapeKey(event);
      document.addEventListener('keydown', escHandler);
      this.cleanupFunctions.push(() => document.removeEventListener('keydown', escHandler));
      setTimeout(() => {
        if (!this.isDestroyed) {
          const clickHandler = (event) => this.handleOutsideClick(event);
          document.addEventListener('click', clickHandler);
          this.cleanupFunctions.push(() => document.removeEventListener('click', clickHandler));
        }
      }, 500);
      this.checkInterval = setInterval(() => this.checkDialogStatus(), 1000);
      this.cleanupFunctions.push(() => { if (this.checkInterval) { clearInterval(this.checkInterval); this.checkInterval = null; } });
    } catch (error) {
      this.errorHandler.handleDialogError(error, 'startDialogMonitoring');
      this.closeDialog();
    }
  }

  closeDialog() {
    try { this.enableScroll(); this.cleanup(); } catch (error) { this.errorHandler.handleDialogError(error, 'closeDialog'); }
  }

  cleanup() {
    try {
      this.isDestroyed = true;
      this.cleanupFunctions.forEach(cleanupFn => { try { cleanupFn(); } catch (error) { this.errorHandler.handleCleanupError(error, 'event listeners'); } });
      this.cleanupFunctions = [];
      if (this.checkInterval) { clearInterval(this.checkInterval); this.checkInterval = null; }
      this.startTime = null;
      this.retryCount = 0;
    } catch (error) {
      this.errorHandler.handleCleanupError(error, 'general cleanup');
    }
  }

  async loadSafariYetuScript() {
    if (this.isDestroyed) return false;
    return new Promise((resolve) => {
      const checkScript = () => {
        if (typeof window.safariplus !== 'undefined') { resolve(true); return; }
        this.retryCount++;
        if (this.retryCount > this.maxRetries) { resolve(false); return; }
        setTimeout(checkScript, 1000);
      };
      checkScript();
    });
  }

  async openBookingDialog(bookingData) {
    if (this.isDestroyed) throw new Error('ScrollManager has been destroyed');
    try {
      const scriptLoaded = await this.loadSafariYetuScript();
      if (!scriptLoaded) {
        const errorDetails = this.errorHandler.handleScriptLoadError(new Error('SafariYetu script not available'), this.retryCount);
        throw new Error(errorDetails.userMessage);
      }
      this.startDialogMonitoring();
      if (typeof window.safariplus.newTripDialog === 'function') {
        await window.safariplus.newTripDialog(bookingData);
      } else {
        throw new Error('SafariYetu booking function is not available');
      }
    } catch (error) {
      this.errorHandler.handleDialogError(error, 'open');
      this.closeDialog();
      throw this.errorHandler.coerceError(error);
    }
  }

  static createInstance() { return new SafariYetuScrollManager(); }
  getReactCleanupFunction() { return () => { this.cleanup(); }; }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SafariYetuScrollManager;
} else if (typeof window !== 'undefined') {
  window.SafariYetuScrollManager = SafariYetuScrollManager;
}

export default SafariYetuScrollManager;
