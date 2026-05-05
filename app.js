import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// فتح موقع
window.openSite = (url) => window.open(url, "_blank");

// بحث
window.search = () => {
  let q = searchInput.value;
  window.open("https://www.google.com/search?q=" + q);
};

// Drawer
window.toggleDrawer = () => {
  drawer.classList.toggle("open");
};

// تغيير الصفحات
window.showPage = (page) => {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
};

// الثيم
window.toggleTheme = () => {
  document.body.classList.toggle("dark");
};

// خروج
window.logout = () => signOut(auth);
