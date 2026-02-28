// js/main.js

// دالة لجلب وتضمين ملف HTML في عنصر معين
async function includeHTML(url, elementId) {
    try {
        // جلب محتوى الملف
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();

        // وضع المحتوى في العنصر المحدد
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        } else {
            console.warn(`Element with id '${elementId}' not found.`);
        }

    } catch (error) {
        console.error(`Error loading component from ${url}:`, error);
        // عرض رسالة خطأ للمستخدم في حال فشل التحميل (اختياري)
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = '<p style="color: red; text-align: center; padding: 20px;">حدث خطأ في تحميل المكون. يرجى تحديث الصفحة.</p>';
        }
    }
}


// يتم تشغيل هذا الكود بعد اكتمال تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {

    // تحميل الهيدر والفوتر في صفحة index.html
    // المسارات نسبية من ملف index.html
    includeHTML('components/header.html', 'header-placeholder');
    includeHTML('components/footer.html', 'footer-placeholder');

    // أي منطق جافاسكريبت آخر يمكن إضافته هنا
    // مثال: console.log('Main script loaded successfully.');

});
