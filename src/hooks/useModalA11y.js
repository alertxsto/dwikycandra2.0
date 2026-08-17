import { useEffect, useRef } from 'react';

/**
 * useModalA11y — accessibility hook for modal dialogs
 * Provides: focus trap, Escape-to-close, focus restore, body scroll lock
 *
 * @param {boolean} isOpen - whether modal is open
 * @param {Function} onClose - called on Escape key
 * @param {Object} [options]
 * @param {boolean} [options.lockScroll=true] - lock body scroll while open
 */
export default function useModalA11y(isOpen, onClose, { lockScroll = true } = {}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    // Remember element that opened the modal (to restore focus on close)
    const previouslyFocused = document.activeElement;

    // Focus the dialog on open (first focusable element or dialog itself)
    const focusables = () =>
      dialog.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );

    const moveFocusToFirst = () => {
      const els = focusables();
      if (els.length > 0) els[0].focus();
      else dialog.focus();
    };
    moveFocusToFirst();

    // Focus trap: Tab / Shift+Tab stays inside the dialog
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const els = Array.from(focusables());
      if (els.length === 0) {
        e.preventDefault();
        return;
      }
      const first = els[0];
      const last = els[els.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // Lock body scroll while modal open
    const prevOverflow = document.body.style.overflow;
    if (lockScroll) {
      document.body.style.overflow = 'hidden';
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (lockScroll) {
        document.body.style.overflow = prevOverflow;
      }
      // Restore focus to the trigger element
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, onClose, lockScroll]);

  return dialogRef;
}
