// ملف JavaScript لمشروع التراث اليمني - script.js

// انتظر حتى تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('صفحة التراث اليمني جاهزة! 🇾🇪');
    
    // ===== تهيئة المتغيرات =====
    const backToTopBtn = document.getElementById('backToTop');
    const yemenNameBtn = document.getElementById('generateName');
    const nameOutput = document.getElementById('yemeniName');
    const counters = document.querySelectorAll('.counter-number');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const currentYear = document.getElementById('currentYear');
    
    // ===== ١. زر العودة للأعلى =====
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== ٢. مولد الأسماء اليمنية =====
    const yemeniFirstNames = [
        'عبدالله', 'فاطمة', 'أحمد', 'خديجة', 'محمد', 'آمنة',
        'علي', 'زينب', 'يوسف', 'مريم', 'إبراهيم', 'حواء',
        'حميد', 'سلمى', 'مهدي', 'هدى', 'سالم', 'نورة',
        'جمال', 'أسماء', 'بسام', 'رفيدة', 'وليد', 'شهد'
    ];
    
    const yemeniLastNames = [
        'الحداد', 'الصنعاني', 'التعزي', 'العدني', 'الحضرمي',
        'اليماني', 'الزبيدي', 'الشميري', 'المراني', 'الحكيمي',
        'الجراش', 'الكبسي', 'الهمداني', 'الذمارى', 'الابياني',
        'الضالعي', 'الرياني', 'الجعفري', 'النجاري', 'المقدشي'
    ];
    
    const yemeniTitles = [
        'الأصيل', 'اليمني', 'العربي', 'الحِمْيَري', 'السبئي',
        'التقليدي', 'الأصلي', 'الطيب', 'الكريم', 'الشهم'
    ];
    
    function generateYemeniName() {
        const randomFirst = yemeniFirstNames[Math.floor(Math.random() * yemeniFirstNames.length)];
        const randomLast = yemeniLastNames[Math.floor(Math.random() * yemeniLastNames.length)];
        const randomTitle = yemeniTitles[Math.floor(Math.random() * yemeniTitles.length)];
        
        // 70% احتمالية إضافة لقب
        const addTitle = Math.random() > 0.3;
        
        const fullName = addTitle 
            ? `${randomFirst} ${randomLast} ${randomTitle}`
            : `${randomFirst} ${randomLast}`;
        
        return fullName;
    }
    
    if (yemenNameBtn && nameOutput) {
        yemenNameBtn.addEventListener('click', function() {
            nameOutput.textContent = generateYemeniName();
            nameOutput.classList.add('fade-in');
            
            // إزالة الأنيميشن لإعادة استخدامها
            setTimeout(() => {
                nameOutput.classList.remove('fade-in');
            }, 800);
        });
        
        // توليد اسم أولي عند التحميل
        nameOutput.textContent = generateYemeniName();
    }
    
    // ===== ٣. العداد التصاعدي =====
    function startCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 ثانية
        const increment = target / (duration / 16); // 60 إطار في الثانية
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString() + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    // تشغيل العدادات عند التمرير لها
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                startCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    // ===== ٤. معرض الصور =====
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            // إنشاء عرض للصورة
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                cursor: pointer;
            `;
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = imgAlt;
            img.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border: 3px solid var(--yemen-red);
                border-radius: 10px;
                box-shadow: 0 0 30px rgba(206, 17, 38, 0.3);
            `;
            
            lightbox.appendChild(img);
            document.body.appendChild(lightbox);
            
            // إغلاق عند النقر
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            // إغلاق بالزر Escape
            document.addEventListener('keydown', function closeOnEscape(e) {
                if (e.key === 'Escape') {
                    document.body.removeChild(lightbox);
                    document.removeEventListener('keydown', closeOnEscape);
                }
            });
        });
    });
    
    // ===== ٥. تحديث السنة الحالية =====
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // ===== ٦. تأثيرات التمرير السلس =====
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== ٧. مؤقت للأطباق اليمنية =====
    function startFoodTimer() {
        const foods = [
            { name: 'المندي', time: '2-3 ساعات', icon: '🍗' },
            { name: 'السلتة', time: '30 دقيقة', icon: '🍲' },
            { name: 'العصيدة', time: '45 دقيقة', icon: '🥣' },
            { name: 'بنت الصحن', time: '1 ساعة', icon: '🍰' },
            { name: 'حنظل محشي', time: '1.5 ساعة', icon: '🥒' }
        ];
        
        let currentIndex = 0;
        const foodTimerElement = document.getElementById('foodTimer');
        
        if (foodTimerElement) {
            // تحديث كل 5 ثواني
            setInterval(() => {
                const food = foods[currentIndex];
                foodTimerElement.innerHTML = `
                    <span style="font-size: 2rem;">${food.icon}</span>
                    <h4>${food.name}</h4>
                    <p>⏱️ وقت التحضير: ${food.time}</p>
                `;
                
                currentIndex = (currentIndex + 1) % foods.length;
            }, 5000);
        }
    }
    
    startFoodTimer();
    
    // ===== ٨. كلمات يمنية عشوائية =====
    function displayRandomYemeniWord() {
        const words = [
            { word: "أهلاً وسهلاً", meaning: "ترحيب" },
            { word: "تباً", meaning: "للتعجب (إيجابي)" },
            { word: "شبيك", meaning: "كيف حالك" },
            { word: "قايد", meaning: "ماشي/حسناً" },
            { word: "ماجور", meaning: "ما عليك زعل" },
            { word: "نشاما", meaning: "رجال شجعان" }
        ];
        
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const wordElement = document.getElementById('yemeniWord');
        
        if (wordElement) {
            wordElement.innerHTML = `
                <strong>${randomWord.word}</strong>: ${randomWord.meaning}
            `;
        }
    }
    
    // تحديث الكلمة كل 10 ثواني
    setInterval(displayRandomYemeniWord, 10000);
    displayRandomYemeniWord(); // الكلمة الأولى
    
    // ===== ٩. وضع الليل/النهار =====
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // تحميل الوضع المحفوظ
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            const icon = themeToggle.querySelector('i');
            icon.className = 'fas fa-sun';
        }
    }
    
    // ===== ١٠. تأثيرات إضافية عند التمرير =====
    const fadeElements = document.querySelectorAll('.card, .timeline-item, .food-item');
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // ===== رسالة ترحيب =====
    setTimeout(() => {
        console.log('%c🇾🇪 مرحباً في مشروع التراث اليمني!', 'color: #CE1126; font-size: 18px; font-weight: bold;');
        console.log('%cتم التطوير بحب لليمن وأهله', 'color: #000000; font-size: 14px;');
    }, 1000);
});

// ===== دالة مساعدة: التاريخ الهجري =====
function getHijriDate() {
    const hijriMonths = [
        'محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر',
        'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
        'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
    ];
    
    const today = new Date();
    // هذا تقريبي - للدقة استخدم مكتبة متخصصة
    const hijriYear = today.getFullYear() - 622;
    const hijriMonth = hijriMonths[today.getMonth()];
    const hijriDay = today.getDate();
    
    return `${hijriDay} ${hijriMonth} ${hijriYear} هـ`;
}

// ===== دالة مساعدة: الوقت اليمني =====
function getYemenTime() {
    const now = new Date();
    // اليمن في UTC+3
    const yemenTime = new Date(now.getTime() + (3 * 60 * 60 * 1000));
    return yemenTime.toLocaleTimeString('ar-YE', {
        hour: '2-digit',
        minute: '2-digit'
    });
}
