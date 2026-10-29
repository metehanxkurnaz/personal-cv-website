function updatelinenumbers() {
    const content = document.querySelector('.content');
    const linenumbers = document.querySelector('.line-numbers');

    if (!content || !linenumbers) return;

    const lineheight = 27;
    const contentheight = content.scrollHeight;
    const alllines = Math.floor(contentheight / lineheight);

    linenumbers.style.height = contentheight + 'px';
    linenumbers.innerHTML = Array.from({ length: alllines }, (_, i) => i + 1).join('<br>');
}

window.addEventListener('load', updatelinenumbers);
window.addEventListener('resize', updatelinenumbers);

document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));

        if (targetElement) {
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

    scrollbar.addEventListener('pointerdown', e => {
        const rect = scrollbar.getBoundingClientRect();
        const clickRatio = (e.clientY - rect.top) / rect.height;
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        scrollContainer.scrollTo({ top: clickRatio * maxScroll, behavior: 'smooth' });
    });
}

function findProject(projectId) {
    for (const category of CATEGORIES) {
        const project = category.projects.find(p => p.id === projectId);
        if (project) return { project, category };
    }
    return null;
}

const likedProjects = new Set();

CATEGORIES.forEach(category => category.projects.forEach(project => {
    try {
        if (localStorage.getItem(`like-${project.id}`) === '1') likedProjects.add(project.id);
    } catch (e) {}
}));

function likeButtonHtml(projectId, extraClass = '') {
    const liked = likedProjects.has(projectId);
    return `<button type="button" class="like-btn ${extraClass} ${liked ? 'is-liked' : ''}" data-like="${projectId}">
                <i class="${liked ? 'fa-solid' : 'fa-regular'} fa-thumbs-up"></i>Beğen
            </button>`;
}

function toggleLike(projectId) {
    const liked = !likedProjects.has(projectId);

    if (liked) {
        likedProjects.add(projectId);
    } else {
        likedProjects.delete(projectId);
    }

    try {
        if (liked) {
            localStorage.setItem(`like-${projectId}`, '1');
        } else {
            localStorage.removeItem(`like-${projectId}`);
        }
    } catch (e) {}

    document.querySelectorAll(`[data-like="${projectId}"]`).forEach(button => {
        button.classList.toggle('is-liked', liked);
        button.querySelector('i').className = `${liked ? 'fa-solid' : 'fa-regular'} fa-thumbs-up`;
    });
}

function projectCardHtml(project) {
    const status = STATUSES[project.status];
    return `
        <div class="project-card" data-project="${project.id}" tabindex="0">
            <div class="card-content">
                <div class="project-title">${project.title}</div>
                <div class="project-status">
                    <span class="status-dot ${status.color}"></span>${status.label}
                </div>
            </div>
            <div class="card-logo"><i class="${project.icon}"></i></div>
            <div class="card-actions">${likeButtonHtml(project.id)}</div>
        </div>`;
}

document.querySelectorAll('.project-grid[data-category]').forEach(grid => {
    const category = CATEGORIES.find(c => c.id === grid.dataset.category);
    if (!category) return;

    grid.innerHTML = category.projects.slice(0, 3).map(projectCardHtml).join('') + `
        <button type="button" class="project-card more-card" data-more="${category.id}">
            <i class="fa-solid fa-plus"></i>
            <span>Daha fazla gör</span>
        </button>`;

    if (category.locked) {
        grid.classList.add('is-locked');
        grid.querySelectorAll('.project-card').forEach(card => card.inert = true);
        grid.insertAdjacentHTML('beforeend', '<div class="locked-overlay">Yükleniyor...</div>');
    }
});

const modal = document.querySelector('.modal');
const modalTitle = modal.querySelector('.modal-title');
const modalBody = modal.querySelector('.modal-body');

let modalHistory = [];
let focusBeforeModal = null;

function openView(view) {
    if (modalHistory.length) {
        modalHistory[modalHistory.length - 1].scroll = modalBody.scrollTop;
    } else {
        focusBeforeModal = document.activeElement;
        modal.hidden = false;
    }

    modalHistory.push(view);
    showView(view);
    modal.querySelector('.modal-close').focus();
}

function showView(view) {
    if (view.type === 'project') {
        renderProjectView(view.id);
    } else {
        renderCategoryView(view.id);
    }
    modalBody.scrollTop = view.scroll || 0;
}

function goBack() {
    modalHistory.pop();

    if (modalHistory.length) {
        showView(modalHistory[modalHistory.length - 1]);
    } else {
        closeModal();
    }
}

function closeModal() {
    modalHistory = [];
    modal.hidden = true;
    modalBody.innerHTML = '';
    if (focusBeforeModal) focusBeforeModal.focus();
}

function renderCategoryView(categoryId) {
    const category = CATEGORIES.find(c => c.id === categoryId);
    modalTitle.textContent = category.title;

    modalBody.innerHTML = `
        <div class="category-page">
            <h3 class="modal-heading">${category.title}</h3>
            <p class="modal-subheading">Bu kategorideki ${category.projects.length} projenin tamamı</p>
            <div class="project-grid">${category.projects.map(projectCardHtml).join('')}</div>
        </div>`;
}

function renderProjectView(projectId) {
    const { project, category } = findProject(projectId);
    const status = STATUSES[project.status];
    modalTitle.textContent = category.title;

    const slides = project.images.length
        ? project.images.map((src, i) => `<img src="${src}" alt="${project.title} ekran görüntüsü ${i + 1}">`)
        : [1, 2, 3].map(n => `
            <div class="gallery-placeholder">
                <i class="${project.icon}"></i>
                <span>Ekran görüntüsü ${n}</span>
            </div>`);

    modalBody.innerHTML = `
        <div class="product">
            <div class="product-top">
                <div class="product-gallery">
                    <div class="gallery-main">
                        ${slides.map((slide, i) => `<div class="gallery-slide ${i === 0 ? 'is-active' : ''}">${slide}</div>`).join('')}
                        <button type="button" class="gallery-nav prev" aria-label="Önceki görsel"><i class="fa-solid fa-chevron-left"></i></button>
                        <button type="button" class="gallery-nav next" aria-label="Sonraki görsel"><i class="fa-solid fa-chevron-right"></i></button>
                    </div>
                    <div class="gallery-thumbs">
                        ${slides.map((slide, i) => `<button type="button" class="gallery-thumb ${i === 0 ? 'is-active' : ''}" data-slide="${i}" aria-label="Görsel ${i + 1}">${slide}</button>`).join('')}
                    </div>
                </div>

                <div class="product-info">
                    <span class="product-category">${category.title}</span>
                    <h2 class="product-title">${project.title}</h2>
                    <div class="project-status">
                        <span class="status-dot ${status.color}"></span>${status.label}
                    </div>
                    <p class="product-summary">${project.summary}</p>
                    <ul class="product-features">
                        ${project.features.map(f => `<li><i class="fa-solid fa-check"></i>${f}</li>`).join('')}
                    </ul>
                    <div class="product-actions">
                        <button type="button" class="quote-btn" data-quote><i class="fa-solid fa-tag"></i>Fiyat Al</button>
                        ${likeButtonHtml(project.id, 'like-btn-large')}
                    </div>
                </div>
            </div>

            <div class="product-section">
                <h4 class="modal-section-title">Açıklama</h4>
                ${project.description.map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>
        </div>`;

    setupGallery();
}

function setupGallery() {
    const slides = modalBody.querySelectorAll('.gallery-slide');
    const thumbs = modalBody.querySelectorAll('.gallery-thumb');
    let current = 0;

    function showSlide(index) {
        current = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
        thumbs.forEach((thumb, i) => thumb.classList.toggle('is-active', i === current));
    }

    modalBody.querySelector('.gallery-nav.prev').addEventListener('click', () => showSlide(current - 1));
    modalBody.querySelector('.gallery-nav.next').addEventListener('click', () => showSlide(current + 1));
    thumbs.forEach(thumb => thumb.addEventListener('click', () => showSlide(+thumb.dataset.slide)));
}

document.addEventListener('click', e => {
    const likeButton = e.target.closest('[data-like]');
    if (likeButton) {
        toggleLike(likeButton.dataset.like);
        return;
    }

    const card = e.target.closest('[data-project]');
    if (card) {
        openView({ type: 'project', id: card.dataset.project });
        return;
    }

    const moreCard = e.target.closest('[data-more]');
    if (moreCard) {
        openView({ type: 'category', id: moreCard.dataset.more });
        return;
    }

    if (e.target.closest('[data-quote]')) {
        closeModal();
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.matches('[data-project]')) {
        openView({ type: 'project', id: e.target.dataset.project });
    }

    if (e.key === 'Escape' && !modal.hidden) {
        closeModal();
    }
});

modal.querySelector('.modal-back').addEventListener('click', goBack);
modal.querySelector('.modal-close').addEventListener('click', closeModal);
modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
