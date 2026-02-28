// js/auth.js

// استيراد عميل Supabase من ملف الإعدادات
import { supabase } from './supabase-config.js';

// --- مراجع عناصر DOM (DOM Element References) ---
// روابط التبديل بين النماذج
const showSignupLink = document.getElementById('show-signup-link');
const showLoginLink = document.getElementById('show-login-link');

// النماذج نفسها
const loginFormWrapper = document.getElementById('login-form');
const signupFormWrapper = document.getElementById('signup-form');

// عناصر النماذج
const emailLoginForm = document.getElementById('email-login-form');
const emailSignupForm = document.getElementById('email-signup-form');
const googleLoginBtn = document.getElementById('google-login-btn');
const googleSignupBtn = document.getElementById('google-signup-btn');

// صندوق عرض الرسائل
const authMessage = document.getElementById('auth-message');


// --- دوال مساعدة (Helper Functions) ---

/**
 * تعرض رسالة للمستخدم في صفحة المصادقة.
 * @param {string} message - نص الرسالة.
 * @param {boolean} [isError=false] - هل الرسالة خطأ (أحمر) أم نجاح (أخضر).
 */
function showMessage(message, isError = false) {
    if (!authMessage) return;
    
    authMessage.textContent = message;
    authMessage.style.color = isError ? 'var(--color-error, #d9534f)' : 'var(--color-success, #5cb85c)';
    authMessage.style.display = 'block';

    // إخفاء الرسالة تلقائيًا بعد 5 ثوانٍ
    setTimeout(() => {
        authMessage.style.display = 'none';
    }, 5000);
}


// --- مستمعي الأحداث للتبديل بين النماذج ---

if (showSignupLink) {
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormWrapper.style.display = 'none';
        signupFormWrapper.style.display = 'block';
        showMessage(''); // مسح أي رسائل سابقة
    });
}

if (showLoginLink) {
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupFormWrapper.style.display = 'none';
        loginFormWrapper.style.display = 'block';
        showMessage(''); // مسح أي رسائل سابقة
    });
}


// --- منطق المصادقة (Authentication Logic) ---

// التعامل مع إنشاء حساب بالبريد وكلمة المرور
if (emailSignupForm) {
    emailSignupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        showMessage('جاري إنشاء الحساب...', false);

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            console.error('خطأ في إنشاء الحساب:', error.message);
            showMessage(`فشل إنشاء الحساب: ${error.message}`, true);
        } else {
            // Supabase يسجل دخول المستخدم تلقائيًا بعد إنشاء الحساب بنجاح
            showMessage('تم إنشاء الحساب بنجاح! جاري تسجيل دخولك...', false);
            setTimeout(() => {
                window.location.href = '../pages/tools.html';
            }, 1500);
        }
    });
}

// التعامل مع تسجيل الدخول بالبريد وكلمة المرور
if (emailLoginForm) {
    emailLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        showMessage('جاري تسجيل الدخول...', false);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.error('خطأ في تسجيل الدخول:', error.message);
            showMessage(`فشل تسجيل الدخول: ${error.message}`, true);
        } else {
            showMessage('تم تسجيل الدخول بنجاح!', false);
            setTimeout(() => {
                window.location.href = '../pages/tools.html';
            }, 1000);
        }
    });
}

// دالة للتعامل مع تسجيل الدخول عبر Google (مشتركة بين زر الدخول والتسجيل)
const handleGoogleSignIn = async () => {
    showMessage('جاري التوجيه إلى Google...', false);

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // سيتم توجيه المستخدم إلى هذا الرابط بعد موافقته على Google
            redirectTo: `${window.location.origin}/pages/tools.html`
        }
    });

    if (error) {
        console.error('خطأ في تسجيل الدخول عبر Google:', error.message);
        showMessage(`فشل تسجيل الدخول عبر Google: ${error.message}`, true);
    }
    // لا حاجة لإعادة التوجيه يدويًا، Supabase يتولى ذلك تلقائيًا.
};

if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', handleGoogleSignIn);
}

if (googleSignupBtn) {
    googleSignupBtn.addEventListener('click', handleGoogleSignIn);
}

// --- التحقق من العودة من Google ---

// التحقق إذا كان رابط الصفحة يحتوي على مؤشرات على محاولة تسجيل دخول عبر OAuth
if (window.location.hash.includes('access_token')) {
    showMessage('جاري تأكيد تسجيل الدخول...', false);
    // مكتبة Supabase تتعامل مع معلومات الجلسة من أجزاء الرابط (URL fragments) تلقائيًا.
    // نحن فقط نحتاج للاستماع إلى حالة المصادقة.
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            showMessage('تم تسجيل الدخول بنجاح! جاري التوجيه...', false);
            window.location.hash = ''; // تنظيف الرابط من المعلومات الحساسة
            setTimeout(() => {
                window.location.href = '../pages/tools.html';
            }, 1500);
        }
    });
}
