const backdrop = document.querySelector(".backdrop") as HTMLElement;
const sideDrawer = <HTMLElement>(
  document.querySelector(".mobile-nav-side-drawer")
);
const menuToggle = <HTMLElement>document.querySelector("#side-menu-toggle");

function backdropClickHandler() {
  backdrop.style.display = "none";
  sideDrawer.classList.remove("open");
}

function menuToggleClickHandler() {
  backdrop.style.display = "block";
  sideDrawer.classList.add("open");
}

backdrop.addEventListener("click", backdropClickHandler);
menuToggle.addEventListener("click", menuToggleClickHandler);
