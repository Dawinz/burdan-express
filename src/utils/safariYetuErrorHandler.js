class SafariYetuErrorHandler {
  constructor(component = 'Unknown') {
    this.component = component;
    this.errorHistory = [];
    this.maxErrorHistory = 10;
  }

  coerceError(error) {
    if (error instanceof Error) return error;
    if (typeof error === 'string') return new Error(error);
    if (error && typeof error === 'object') {
      if (error.message) {
        const err = new Error(error.message);
        if (error.stack) err.stack = error.stack;
        if (error.name) err.name = error.name;
        return err;
      }
      return new Error(JSON.stringify(error));
    }
    return new Error(`Unknown error occurred: ${String(error)}`);
  }

  logError(error, context = '', metadata = {}) {
    const coercedError = this.coerceError(error);
    const timestamp = new Date().toISOString();

    const errorEntry = {
      timestamp,
      component: this.component,
      context,
      message: coercedError.message,
      name: coercedError.name,
      stack: coercedError.stack,
      metadata
    };

    this.errorHistory.unshift(errorEntry);
    if (this.errorHistory.length > this.maxErrorHistory) {
      this.errorHistory.pop();
    }

    console.group(`SafariYetu Error [${this.component}]`);
    console.error(`Context: ${context}`);
    console.error(`Message: ${coercedError.message}`);
    console.error(`Time: ${timestamp}`);
    if (Object.keys(metadata).length > 0) console.error('Metadata:', metadata);
    if (coercedError.stack) console.error('Stack:', coercedError.stack);
    console.groupEnd();

    return errorEntry;
  }

  handleScriptLoadError(error, retryCount = 0) {
    const errorEntry = this.logError(error, 'Script Loading', { retryCount });
    let userMessage = 'SafariYetu booking system is not available.';
    let shouldRetry = false;
    let retryDelay = 1000;

    if (retryCount < 3) {
      shouldRetry = true;
      retryDelay = Math.min(1000 * Math.pow(2, retryCount), 5000);
      userMessage += ' Retrying...';
    } else {
      userMessage += ' Please refresh the page and try again.';
    }

    return { errorEntry, userMessage, shouldRetry, retryDelay, technicalError: this.coerceError(error).message };
  }

  handleDialogError(error, operation = 'unknown') {
    const errorEntry = this.logError(error, `Dialog ${operation}`, { operation });
    let userMessage;
    switch (operation.toLowerCase()) {
      case 'open': userMessage = 'Unable to open booking system. Please try again.'; break;
      case 'close': userMessage = 'There was an issue closing the booking dialog.'; break;
      case 'monitor': userMessage = 'Booking system monitoring encountered an issue.'; break;
      default: userMessage = 'An error occurred with the booking system.';
    }
    return { errorEntry, userMessage, technicalError: this.coerceError(error).message, shouldCleanup: true };
  }

  handleCleanupError(error, cleanupType = 'general') {
    this.logError(error, `Cleanup Error (${cleanupType})`, { cleanupType, severity: 'warning' });
  }

  handleTimeoutError(operation, timeout) {
    const error = new Error(`${operation} operation timed out after ${timeout}ms`);
    const errorEntry = this.logError(error, 'Timeout', { operation, timeout });
    return { errorEntry, userMessage: 'The booking system is taking too long to respond. Please try again.', technicalError: error.message, shouldCleanup: true };
  }

  getErrorHistory(limit = 5) { return this.errorHistory.slice(0, limit); }
  clearErrorHistory() { this.errorHistory = []; }
}

export const createErrorHandler = (component) => new SafariYetuErrorHandler(component);
export const searchFormErrorHandler = new SafariYetuErrorHandler('SearchForm');
export const bookingPageErrorHandler = new SafariYetuErrorHandler('BookingPage');
export const scrollManagerErrorHandler = new SafariYetuErrorHandler('ScrollManager');

export default SafariYetuErrorHandler;
