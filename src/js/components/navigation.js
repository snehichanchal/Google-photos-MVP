/**
 * Navigation Component
 * Handles switching between different main views (Photos, Search, Collections).
 */

export function initNavigation() {
  const switchBtns = document.querySelectorAll(".nav-switch-btn");
  const views = document.querySelectorAll(".view-section");
  const navItems = document.querySelectorAll(".bottom-nav-pill .nav-item");

  switchBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      
      const targetId = btn.getAttribute("data-target");
      if (!targetId) return;

      // Update Views
      views.forEach(view => {
        if (view.id === targetId) {
          view.classList.remove("hidden");
          view.classList.add("active");
        } else {
          view.classList.add("hidden");
          view.classList.remove("active");
        }
      });

      // Update Bottom Nav Active States (if the button clicked is in bottom nav)
      if (btn.classList.contains("nav-item")) {
        navItems.forEach(item => item.classList.remove("active"));
        btn.classList.add("active");
      } else {
        // If it's the floating action button or back button
        // Find the nav item that corresponds to the target and activate it
        navItems.forEach(item => {
          if (item.getAttribute("data-target") === targetId) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
    });
  });
}
