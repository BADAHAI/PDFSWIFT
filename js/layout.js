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
