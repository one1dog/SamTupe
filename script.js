import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const browser = document.getElementById("browser");

// 🌐 التصفح
window.loadSite = (url) => browser.src = url;

window.search = () => {
  const input = document.getElementById("searchInput").value;
  browser.src = input.startsWith("http")
    ? input
    : "https://www.google.com/search?q=" + input;
};

// 📂 القائمة
window.openDrawer = () => {
  document.getElementById("drawer").classList.toggle("open");
};

// 🌙 الثيم
window.toggleTheme = () => {
  document.body.classList.toggle("dark");
};

// 👤 تسجيل
window.register = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  await createUserWithEmailAndPassword(auth, email, password);
  alert("تم إنشاء الحساب");
};

// 🔐 دخول
window.login = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  await signInWithEmailAndPassword(auth, email, password);
  authBox.style.display = "none";
};

// 🚪 خروج
window.logout = () => signOut(auth);

// ⭐ حفظ
window.saveFavorite = async () => {
  const user = auth.currentUser;
  if (!user) return alert("سجل الدخول");

  await addDoc(collection(db, "favorites"), {
    uid: user.uid,
    url: browser.src
  });

  alert("تم الحفظ ⭐");
};

// 📜 عرض المفضلة
async function loadFavorites() {
  const snapshot = await getDocs(collection(db, "favorites"));
  const container = document.getElementById("favorites");
  container.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();
    container.innerHTML += `<p onclick="loadSite('${data.url}')">${data.url}</p>`;
  });
}

// 👁️ حالة المستخدم
onAuthStateChanged(auth, user => {
  if (user) {
    authBox.style.display = "none";
    loadFavorites();
  }
});
