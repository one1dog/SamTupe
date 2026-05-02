// نظام التنقل
function showPage(pageId, element) {
    document.querySelectorAll('.app-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    element.classList.add('active');
}

// تغيير السمة
function changeTheme() {
    const theme = document.getElementById('theme-select').value;
    const body = document.getElementById('app-body');
    if (theme === 'light') { body.style.backgroundColor = "#fff"; body.style.color = "#333"; }
    else if (theme === 'gold') { body.style.backgroundColor = "#1a1a1a"; body.style.color = "#ffd700"; }
    else { body.style.backgroundColor = "#0f0f0f"; body.style.color = "#fff"; }
    localStorage.setItem('user_theme', theme);
}

// محرك التحميل المتطور
async function analyzeVideo() {
    const url = document.getElementById('video-url').value;
    const preview = document.getElementById('preview-area');
    if(!url) return alert("ضع الرابط!");

    preview.innerHTML = "<p>جاري معالجة الطلب عبر سيرفر آمن...</p>";

    try {
        const res = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ url: url, videoQuality: "720" })
        });
        const data = await res.json();
        if (data.url) {
            preview.innerHTML = `<div class="result-card"><a href="${data.url}" target="_blank" class="dl-btn">بدء التحميل المباشر</a></div>`;
        } else {
            preview.innerHTML = "<p>حدث خطأ: تأكد من الرابط أو إعدادات HTTPS.</p>";
        }
    } catch (e) {
        preview.innerHTML = "<p>فشل الاتصال. تأكد أن موقعك يعمل بـ HTTPS على GitHub.</p>";
    }
}

// مميزات إضافية
function openVault() {
    const pass = prompt("أدخل كلمة سر الخزانة:");
    if(pass === "1234") alert("تم فتح الخزانة السرية بنجاح.");
    else alert("كلمة سر خاطئة!");
}

function showAbout() {
    alert("SamTupe Pro\nتم التطوير بواسطة: Mr Abdo\nجميع الحقوق محفوظة 2026");
}

window.onload = () => {
    const saved = localStorage.getItem('user_theme');
    if(saved) { document.getElementById('theme-select').value = saved; changeTheme(); }
};
