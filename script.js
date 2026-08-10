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

document.querySelectorAll('.sidebar a[href^="#"]').forEach(anchor => {
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

function updateActiveMenu() {
    const sections = document.querySelectorAll('.content section');
    const menuLinks = document.querySelectorAll('.sidebar a[href^="#"]');
    const scrollContainer = document.querySelector('.home-page');
    
    if (!scrollContainer || sections.length === 0) return;

    let currentId = '';
    const scrollPosition = scrollContainer.scrollTop;
    const containerOffset = scrollContainer.offsetTop;

    const isAtBottom = Math.ceil(scrollPosition + scrollContainer.clientHeight) >= scrollContainer.scrollHeight - 25;

    if (isAtBottom) {
        currentId = sections[sections.length - 1].getAttribute('id');
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - containerOffset;
            if (scrollPosition >= sectionTop - 100) {
                currentId = section.getAttribute('id');
            }
        });
    }

    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
        }
    });
}

const scrollContainer = document.querySelector('.home-page');
if (scrollContainer) {
    scrollContainer.addEventListener('scroll', updateActiveMenu);
}

window.addEventListener('load', updateActiveMenu);

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