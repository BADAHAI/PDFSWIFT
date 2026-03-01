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
  // تحميل الهيدر الموحد
  loadPartial("header-placeholder", "/PdfSwift/partials/header.html");

  // تحميل الفوتر
  loadPartial("footer-placeholder", "/PdfSwift/partials/footer.html");

  // بعد تحميل الهيدر، نشغل القائمة المنسدلة
  setTimeout(() => {
    const menuBtn = document.getElementById("menuBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    // لو الهيدر ما تحمل لسه، نوقف
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

  }, 300); // ننتظر تحميل الهيدر
});
