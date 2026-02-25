if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../scripts/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registrated with success! Scope:",
          registration.scope,
        );
      })
      .catch((error) => {
        console.error("Service Worker-registration failed:", error);
      });
  });
}
