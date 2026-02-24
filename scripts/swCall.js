if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registrerad med success! Scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker-registrering misslyckades:', error);
      });
  });
}