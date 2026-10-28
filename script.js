function updatelinenumbers() {
    const content = document.querySelector('.content');
    const linenumbers = document.querySelector('.line-numbers');

    if (!content || !linenumbers) return;

    const lineheight = 27;
    const contentheight = content.scrollHeight;
    
    linenumbers.style.height = contentheight + 'px';

    const alllines = Math.floor(contentheight / lineheight);

    linenumbers.innerHTML = '';
    for (let i = 1; i <= alllines; i++) {
        linenumbers.innerHTML += i + '<br>';
    }
}

window.addEventListener('load', () => {
    updatelinenumbers();
});

window.addEventListener('resize', updatelinenumbers);

document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const scrollContainer = document.querySelector('.home-page');
        
        if (targetElement && scrollContainer) {
            const startPosition = scrollContainer.scrollTop;
            const targetPosition = targetElement.getBoundingClientRect().top + scrollContainer.scrollTop - scrollContainer.getBoundingClientRect().top;
            const distance = targetPosition - startPosition;
            const duration = 600;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
                
                scrollContainer.scrollTop = startPosition + distance * ease;
                
                if (timeElapsed < duration) {
                    window.requestAnimationFrame(animation);
                }
            }
            
            window.requestAnimationFrame(animation);
        }
    });
});

function startCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 70;
        
        function updateCount() {
            const current = +counter.innerText;
            
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        }
        updateCount();
    });
}


const statsSection = document.querySelector('#stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounters();
            observer.disconnect();
        }
    }, { threshold: 1 });
    
    observer.observe(statsSection);
}

const scrollContainer = document.querySelector('.home-page');
const scrollbar = document.querySelector('.scrollbar');
const scrollThumb = document.querySelector('.scrollbar-thumb');
let scrollIdleTimer = null;

function updateScrollbar() {
    if (!scrollContainer || !scrollbar || !scrollThumb) return;

    const visibleRatio = scrollContainer.clientHeight / scrollContainer.scrollHeight;
    scrollbar.classList.toggle('is-hidden', visibleRatio >= 1);

    const trackHeight = scrollbar.clientHeight;
    const thumbHeight = Math.max(trackHeight * visibleRatio, 40);
    const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    const thumbTop = maxScroll > 0 ? (scrollContainer.scrollTop / maxScroll) * (trackHeight - thumbHeight) : 0;

    scrollThumb.style.height = thumbHeight + 'px';
    scrollThumb.style.transform = `translateY(${thumbTop}px)`;
}

if (scrollContainer && scrollbar && scrollThumb) {
    scrollContainer.addEventListener('scroll', () => {
        updateScrollbar();
        scrollbar.classList.add('is-active');
        clearTimeout(scrollIdleTimer);
        scrollIdleTimer = setTimeout(() => scrollbar.classList.remove('is-active'), 800);
    });

    window.addEventListener('resize', updateScrollbar);
    window.addEventListener('load', updateScrollbar);

    // Çubuğu sürükleyerek kaydırma
    scrollThumb.addEventListener('pointerdown', e => {
        e.preventDefault();
        e.stopPropagation();

        const startY = e.clientY;
        const startScroll = scrollContainer.scrollTop;
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const scrollPerPixel = maxScroll / (scrollbar.clientHeight - scrollThumb.offsetHeight);

        scrollContainer.style.scrollBehavior = 'auto';
        scrollThumb.setPointerCapture(e.pointerId);

        function onMove(moveEvent) {
            scrollContainer.scrollTop = startScroll + (moveEvent.clientY - startY) * scrollPerPixel;
        }

        function onUp() {
            scrollContainer.style.scrollBehavior = '';
            scrollThumb.removeEventListener('pointermove', onMove);
            scrollThumb.removeEventListener('pointerup', onUp);
        }

        scrollThumb.addEventListener('pointermove', onMove);
        scrollThumb.addEventListener('pointerup', onUp);
    });

    // Boş alana tıklayınca o noktaya git
    scrollbar.addEventListener('pointerdown', e => {
        const rect = scrollbar.getBoundingClientRect();
        const clickRatio = (e.clientY - rect.top) / rect.height;
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        scrollContainer.scrollTo({ top: clickRatio * maxScroll, behavior: 'smooth' });
    });
}
