// Защита от DevTools (F12) и контекстного меню
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        return false;
    }
    
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

let downloadLink = '';
let isDownloading = false; // Флаг для отслеживания состояния загрузки

async function fetchDownloadLink() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/Wounsee/ev/refs/heads/main/link');
        downloadLink = (await response.text()).trim();
        return downloadLink;
    } catch (e) {
        console.error('Failed to fetch:', e);
        return null;
    }
}

// Загружаем ссылку при загрузке страницы
fetchDownloadLink();

async function downloadMod(btn, version) {
    // Если уже идет загрузка - выходим
    if (isDownloading) return;
    
    // Устанавливаем флаг загрузки
    isDownloading = true;
    
    // Добавляем класс loading для показа спиннера
    btn.classList.add('loading');
    
    // Если ссылка еще не загружена, загружаем
    if (!downloadLink) {
        downloadLink = await fetchDownloadLink();
    }
    
    // Имитируем задержку для UX
    setTimeout(() => {
        if (downloadLink && version === '1.16.5') {
            // Перенаправляем на скачивание
            window.location.href = downloadLink;
            showToast(`Загрузка версии ${version} началась!`);
            
            // Сбрасываем флаг после начала загрузки
            setTimeout(() => {
                isDownloading = false;
                btn.classList.remove('loading');
            }, 1000);
        } else {
            showToast('Ошибка загрузки. Попробуйте позже.');
            // Сбрасываем флаг и убираем состояние загрузки при ошибке
            isDownloading = false;
            btn.classList.remove('loading');
        }
    }, 600);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    
    if (toast && toastText) {
        toastText.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }
}

// Проверяем и исправляем состояние спиннера при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-btn-1165');
    if (downloadBtn) {
        // Убеждаемся, что спиннер скрыт при загрузке
        downloadBtn.classList.remove('loading');
        
        // Сбрасываем флаг загрузки
        isDownloading = false;
    }
});

// Плавный скролл к верху страницы при клике на логотип
document.querySelectorAll('.logo').forEach(logo => {
    logo.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});