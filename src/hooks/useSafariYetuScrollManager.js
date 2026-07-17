import { useEffect, useRef } from 'react';
import SafariYetuScrollManager from '../utils/safariYetuScrollManager';

export const useSafariYetuScrollManager = () => {
  const scrollManagerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (scrollManagerRef.current) {
        try {
          scrollManagerRef.current.cleanup();
        } catch (error) {
          console.error('Error cleaning up SafariYetu scroll manager:', error);
        } finally {
          scrollManagerRef.current = null;
        }
      }
    };
  }, []);

  const openBookingDialog = async (bookingData) => {
    try {
      if (scrollManagerRef.current) {
        scrollManagerRef.current.cleanup();
      }
      scrollManagerRef.current = SafariYetuScrollManager.createInstance();
      await scrollManagerRef.current.openBookingDialog(bookingData);
      return scrollManagerRef.current;
    } catch (error) {
      if (scrollManagerRef.current) {
        scrollManagerRef.current.cleanup();
        scrollManagerRef.current = null;
      }
      throw error;
    }
  };

  const closeDialog = () => {
    if (scrollManagerRef.current) {
      try {
        scrollManagerRef.current.closeDialog();
      } catch (error) {
        console.error('Error closing SafariYetu dialog:', error);
      } finally {
        scrollManagerRef.current = null;
      }
    }
  };

  const isDialogOpen = () => {
    return scrollManagerRef.current && scrollManagerRef.current.isDialogOpen;
  };

  const getCleanupFunction = () => {
    return () => {
      if (scrollManagerRef.current) {
        scrollManagerRef.current.cleanup();
        scrollManagerRef.current = null;
      }
    };
  };

  return {
    openBookingDialog,
    closeDialog,
    isDialogOpen,
    getCleanupFunction,
    scrollManager: scrollManagerRef.current
  };
};

export default useSafariYetuScrollManager;
