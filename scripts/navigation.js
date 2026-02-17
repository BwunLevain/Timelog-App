//trackers menu functions
function setupTrackersMenu() {
  const toggleBtn = document.getElementById('trackersToggle');
  const trackersMenu = document.getElementById('trackersMenu');
  
  if (!toggleBtn || !trackersMenu) return;
  
  toggleBtn.addEventListener('click', () => {
    trackersMenu.classList.toggle('open');
    toggleBtn.classList.toggle('active');
  });
}

setupTrackersMenu();