// نظام التنقل بين الصفحات
function showPage(pageId, element) {
    document.querySelectorAll('.app-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    element.classList.add('active');
}

// تغيير المظهر (Theme)
function changeTheme() {
    const theme = document.getElementById('theme-select').value;
    const body = document.body;
    
    if (theme === 'light') {
        body.style.backgroundColor = "#ffffff";
        body.style.color = "#333333";
    } else if (theme === 'gold') {
        body.style.backgroundColor = "#1a1a1a";
        body.style.color = "#ffd700";
    } else {
        body.style.backgroundColor = "#0f0f0f";
        body.style.color = "#ffffff";
    }
    localStorage.setItem('samtupe_theme', theme);
}

// محرك التحميل
async function analyzeVideo() {
    const url = document.getElementById('video-url').value;
    const preview = document.getElementById('preview-area');
    
    if(!url) return alert("الرجاء إدخال الرابط");
    
    preview.innerHTML = "<p>جاري المعالجة...</p>";

    try {
        const res = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ url: url })
        });
        const data = await res.json();

        if (data.url) {
            preview.innerHTML = `
                <div class="result-card">
                    <a href="${data.url}" target="_blank" class="dl-btn">تحميل الملف (Download)</a>
                </div>`;
        } else {
            preview.innerHTML = "<p>تعذر جلب البيانات. تأكد من الرابط.</p>";
        }
    } catch (e) {
        preview.innerHTML = "<p>حدث خطأ. تأكد من استخدام HTTPS لموقعك.</p>";
    }
}

// تطبيق الإعدادات عند البداية
window.onload = () => {
    const saved = localStorage.getItem('samtupe_theme');
    if(saved) {
        document.getElementById('theme-select').value = saved;
        changeTheme();
    }
};
