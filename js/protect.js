/* Deterrent only — does not prevent DevTools via browser menu or other means. */
(function () {
  'use strict';

  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  function isEditableTarget(target) {
    if (!target || !target.closest) return false;
    var el = target.closest('input, textarea, select, [contenteditable="true"]');
    return !!el;
  }

  document.addEventListener('keydown', function (e) {
    if (isEditableTarget(e.target)) return;

    var key = e.key;
    var ctrl = e.ctrlKey || e.metaKey;
    var shift = e.shiftKey;

    if (key === 'F12') {
      e.preventDefault();
      return;
    }

    if (ctrl && shift && (key === 'I' || key === 'i' || key === 'J' || key === 'j' || key === 'C' || key === 'c')) {
      e.preventDefault();
      return;
    }

    if (ctrl && !shift && (key === 'U' || key === 'u')) {
      e.preventDefault();
    }
  });
})();
