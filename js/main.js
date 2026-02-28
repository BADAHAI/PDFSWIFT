// js/main.js

// دالة لجلب وتضمين ملف HTML في عنصر معين
async function includeHTML(url, elementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error loading component from ${url}:`, error);
    }
}

// يتم تشغيل هذا الكود بعد اكتمال تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {
    // تحميل الهيدر والفوتر
    includeHTML('components/header.html', 'header-placeholder');
    includeHTML('components/footer.html', 'footer-placeholder');
});
