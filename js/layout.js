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
  const path = window.location.pathname;

  // تحميل الفوتر في كل الصفحات
  loadPartial("footer-placeholder", "/PdfSwift/partials/footer.html");

  // إذا كانت الصفحة الرئيسية → حمّل الهيدر الخاص بها
  if (
    path.endsWith("index.html") ||
    path === "/PdfSwift/" ||
    path === "/PdfSwift"
  ) {
    loadPartial("home-header-placeholder", "/PdfSwift/partials/home-header.html");
  }

  // غير ذلك → حمّل الهيدر الموحد
  else {
    loadPartial("header-placeholder", "/PdfSwift/partials/header.html");
  }
});
