export function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const scrollToBlock = hash => {
  if (!hash) window.scrollTo({ top: 0, behavior: 'smooth' });
  else {
    const element = document.getElementById(hash.replace('#', ''));
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const getRandomNumber = (from, to) => {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

export const getCleanRoute = link => link.replace(/[/#]/g, '') || '/';

export const formatTime = time => {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.floor(time - minutes * 60) || 0;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
