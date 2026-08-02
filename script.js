function updatelinenumbers() {
    const content = document.querySelector('.content');
    const linenumbers = document.querySelector('.line-numbers');

    if (!content || !linenumbers) return;

    const lineheight = 27;
    const contentheight = content.scrollHeight;
    
    // YENİ EKLENEN KOD: Numaraların olduğu kutunun yüksekliğini içeriğin boyuna eşitler. 
    // Böylece sağdaki çizgi sayfa ne kadar uzarsa o kadar uzar.
    linenumbers.style.height = contentheight + 'px';

    const alllines = Math.floor(contentheight / lineheight);

    linenumbers.innerHTML = '';
    for (let i = 1; i <= alllines; i++) {
        linenumbers.innerHTML += i + '<br>';
    }
}

function typeWriterEffect() {
    const headings = Array.from(document.querySelectorAll('.content h2, .content h3'));
    
    function typeHeading(headingIndex) {
        if (headingIndex >= headings.length) return;
        
        const heading = headings[headingIndex];
        const originalText = heading.textContent;
        heading.textContent = '';
        
        heading.style.display = 'inline-block';
        heading.style.borderRight = '2px solid #7fdcfb';
        heading.style.paddingRight = '5px';
        
        let charIndex = 0;
        const speed = 80; 
        let nextTriggered = false;
        
        function type() {
            if (charIndex < originalText.length) {
                heading.textContent += originalText.charAt(charIndex);
                charIndex++;
                updatelinenumbers();
                
                if (!nextTriggered && charIndex >= Math.floor(originalText.length * 0.75)) {
                    typeHeading(headingIndex + 1);
                    nextTriggered = true;
                }
                
                setTimeout(type, speed);
            } else {
                heading.style.borderRight = 'none';
                heading.style.display = 'block';
                
                if (!nextTriggered) {
                    typeHeading(headingIndex + 1);
                }
            }
        }
        
        type();
    }
    
    if (headings.length > 0) {
        typeHeading(0);
    }
}

window.addEventListener('load', () => {
    updatelinenumbers();
    typeWriterEffect();
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