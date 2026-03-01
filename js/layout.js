// تحميل أجزاء الصفحة (الهيدر + الفوتر)
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
  // تحميل الهيدر والفوتر
  loadPartial("header-placeholder", "/PdfSwift/partials/header.html");
  loadPartial("footer-placeholder", "/PdfSwift/partials/footer.html");

  // تشغيل القائمة بعد تحميل الهيدر
  setTimeout(() => {
    const menuBtn = document.getElementById("menuBtn");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    if (!menuBtn || !sideMenu || !menuOverlay) return;

    // فتح القائمة
    menuBtn.addEventListener("click", () => {
      sideMenu.classList.toggle("-translate-x-full");
      menuOverlay.classList.toggle("hidden");
    });

    // إغلاق عند الضغط خارجها
    menuOverlay.addEventListener("click", () => {
      sideMenu.classList.add("-translate-x-full");
      menuOverlay.classList.add("hidden");
    });

  }, 300);
});
