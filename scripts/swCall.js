if ('serviceWorker' in navigator) { // register the service worker and calls for sw.js
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}