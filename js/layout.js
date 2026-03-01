async function loadPartial(id, file) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (e) {
    console.error("Error loading partial:", file, e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // تحميل الهيدر الموحد في كل الصفحات
  loadPartial("header-placeholder", "/PdfSwift/partials/header.html");

  // تحميل الفوتر
  loadPartial("footer-placeholder", "/PdfSwift/partials/footer.html");
});
document.addEventListener("DOMContentLoaded", () => {

  // ننتظر تحميل الهيدر بالكامل
  setTimeout(() => {
    const menuBtn = document.getElementById("menuBtn");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    if (!menuBtn || !sideMenu || !menuOverlay) return;

    function openMenu() {
      sideMenu.classList.remove("-translate-x-full");
      menuOverlay.classList.remove("hidden");
    }

    function closeMenu() {
      sideMenu.classList.add("-translate-x-full");
      menuOverlay.classList.add("hidden");
    }

    menuBtn.addEventListener("click", openMenu);
    menuOverlay.addEventListener("click", closeMenu);

    sideMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

  }, 200); // ننتظر 200ms حتى يتم تحميل الهيدر
});
// تشغيل القائمة المنسدلة بعد تحميل الهيدر
setTimeout(() => {
  const menuBtn = document.getElementById("menuBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  if (!menuBtn || !dropdownMenu || !menuOverlay) return;

  // فتح القائمة
  menuBtn.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
    menuOverlay.classList.toggle("hidden");
  });

  // إغلاق عند الضغط خارجها
  menuOverlay.addEventListener("click", () => {
    dropdownMenu.classList.add("hidden");
    menuOverlay.classList.add("hidden");
  });

}, 200);
