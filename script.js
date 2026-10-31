const scrollContainer = document.querySelector('.home-page');
const content = document.querySelector('.content');
const lineNumbers = document.querySelector('.line-numbers');
const scrollbar = document.querySelector('.scrollbar');
const scrollThumb = document.querySelector('.scrollbar-thumb');
let scrollIdleTimer;

function maxScroll() {
    return scrollContainer.scrollHeight - scrollContainer.clientHeight;
}

function updateLineNumbers() {
    const lineHeight = parseFloat(getComputedStyle(lineNumbers).lineHeight);
    const lines = Math.floor(content.scrollHeight / lineHeight);

    lineNumbers.style.height = content.scrollHeight + 'px';
    lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
}

function updateScrollbar() {
    const visibleRatio = scrollContainer.clientHeight / scrollContainer.scrollHeight;
    const trackHeight = scrollbar.clientHeight;
    const thumbHeight = Math.max(trackHeight * visibleRatio, 40);
    const thumbTop = scrollContainer.scrollTop / maxScroll() * (trackHeight - thumbHeight) || 0;

    scrollbar.classList.toggle('is-hidden', visibleRatio >= 1);
    scrollThumb.style.height = thumbHeight + 'px';
    scrollThumb.style.transform = `translateY(${thumbTop}px)`;
}

function updateLayout() {
    updateLineNumbers();
    updateScrollbar();
}

function smoothScrollTo(target) {
    const start = scrollContainer.scrollTop;
    const offset = target.getBoundingClientRect().top - scrollContainer.getBoundingClientRect().top;
    const end = Math.min(start + offset, maxScroll());
    const duration = Math.min(1100, 450 + Math.abs(end - start) / 4);
    let startTime;

    scrollContainer.style.scrollBehavior = 'auto';
    requestAnimationFrame(function step(now) {
        startTime ??= now;
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = progress < 0.5 ? 4 * progress ** 3 : 1 - (2 - 2 * progress) ** 3 / 2;

        scrollContainer.scrollTop = start + (end - start) * ease;

        if (progress < 1) requestAnimationFrame(step);
        else scrollContainer.style.scrollBehavior = '';
    });
}

document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    smoothScrollTo(document.querySelector(link.getAttribute('href')));
}));

window.addEventListener('load', updateLayout);
window.addEventListener('resize', updateLayout);

fetch('https://api.github.com/repos/metehanxkurnaz/personal-cv-website/commits?per_page=1')
    .then(response => response.json())
    .then(([latest]) => {
        const date = new Date(latest.commit.committer.date).toLocaleDateString('tr-TR');
        document.querySelector('.last-update').textContent = `Son Güncelleme: ${date}`;
    })
    .catch(() => {});

scrollContainer.addEventListener('scroll', () => {
    updateScrollbar();
    scrollbar.classList.add('is-active');
    clearTimeout(scrollIdleTimer);
    scrollIdleTimer = setTimeout(() => scrollbar.classList.remove('is-active'), 800);
});

scrollThumb.addEventListener('pointerdown', e => {
    e.preventDefault();
    e.stopPropagation();

    const startY = e.clientY;
    const startScroll = scrollContainer.scrollTop;
    const scrollPerPixel = maxScroll() / (scrollbar.clientHeight - scrollThumb.offsetHeight);
    const onMove = moveEvent => {
        scrollContainer.scrollTop = startScroll + (moveEvent.clientY - startY) * scrollPerPixel;
    };

    scrollContainer.style.scrollBehavior = 'auto';
    scrollThumb.setPointerCapture(e.pointerId);
    scrollThumb.addEventListener('pointermove', onMove);
    scrollThumb.addEventListener('pointerup', () => {
        scrollContainer.style.scrollBehavior = '';
        scrollThumb.removeEventListener('pointermove', onMove);
    }, { once: true });
});

scrollbar.addEventListener('pointerdown', e => {
    const rect = scrollbar.getBoundingClientRect();
    scrollContainer.scrollTo({ top: (e.clientY - rect.top) / rect.height * maxScroll() });
});

const statsObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;

    statsObserver.disconnect();
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = +counter.dataset.target;
        let value = 0;
        const timer = setInterval(() => {
            value = Math.min(value + target / 70, target);
            counter.textContent = Math.ceil(value);
            if (value === target) clearInterval(timer);
        }, 15);
    });
}, { threshold: 1 });

statsObserver.observe(document.querySelector('#stats'));

const projectsById = {};
CATEGORIES.forEach(category => category.projects.forEach(project => {
    projectsById[project.id] = { project, category };
}));

const likedProjects = new Set();
try {
    JSON.parse(localStorage.getItem('likes') || '[]').forEach(id => likedProjects.add(id));
} catch (e) {}

function toggleLike(projectId) {
    const liked = !likedProjects.has(projectId);

    if (liked) likedProjects.add(projectId);
    else likedProjects.delete(projectId);

    try {
        localStorage.setItem('likes', JSON.stringify([...likedProjects]));
    } catch (e) {}

    document.querySelectorAll(`[data-like="${projectId}"]`).forEach(button => button.classList.toggle('is-liked', liked));
}

function likeButtonHtml(projectId, extraClass = '') {
    return `<button type="button" class="like-btn ${extraClass} ${likedProjects.has(projectId) ? 'is-liked' : ''}" data-like="${projectId}">
                <i class="fa-regular fa-thumbs-up"></i>Beğen
            </button>`;
}

function statusHtml(statusKey) {
    const status = STATUSES[statusKey];
    return `<div class="project-status"><span class="status-dot ${status.color}"></span>${status.label}</div>`;
}

function formatText(text) {
    const link = (label, url) => `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;

    return text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, label, url) => link(label, url))
        .replace(/(^|[\s(])(https?:\/\/[^\s<]+)/g, (_, before, url) => before + link(url, url))
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}

function projectCardHtml(project) {
    return `
        <div class="project-card" data-project="${project.id}" tabindex="0">
            <div class="card-content">
                <div class="project-title">${project.title}</div>
                ${statusHtml(project.status)}
            </div>
            <div class="card-logo"><i class="${project.icon}"></i></div>
            <div class="card-actions">${likeButtonHtml(project.id)}</div>
        </div>`;
}

document.querySelector('.categories').innerHTML = CATEGORIES.map(category => `
    <section class="category">
        <h3>${category.title}</h3>
        <div class="project-grid ${category.locked ? 'is-locked' : ''}">
            ${category.projects.slice(0, 3).map(projectCardHtml).join('')}
            <button type="button" class="project-card more-card" data-more="${category.id}">
                <i class="fa-solid fa-plus"></i>
                <span>Daha fazla gör</span>
            </button>
            ${category.locked ? '<div class="locked-overlay">Yükleniyor...</div>' : ''}
        </div>
    </section>`).join('');

document.querySelectorAll('.is-locked .project-card').forEach(card => card.inert = true);

const modal = document.querySelector('.modal');
const modalTitle = modal.querySelector('.modal-title');
const modalBody = modal.querySelector('.modal-body');
const whatsappUrl = document.querySelector('#contact a[href*="wa.me"]').href;
let modalHistory = [];
let focusBeforeModal = null;

function openView(render, id) {
    if (modalHistory.length) {
        modalHistory.at(-1).scroll = modalBody.scrollTop;
    } else {
        focusBeforeModal = document.activeElement;
        modal.hidden = false;
    }

    modalHistory.push({ render, id });
    showView(modalHistory.at(-1));
    modal.querySelector('.modal-close').focus();
}

function showView(view) {
    view.render(view.id);
    modalBody.scrollTop = view.scroll || 0;
}

function goBack() {
    modalHistory.pop();

    if (modalHistory.length) showView(modalHistory.at(-1));
    else closeModal();
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
        <h3 class="modal-heading">${category.title}</h3>
        <p class="modal-subheading">Bu kategorideki ${category.projects.length} projenin tamamı</p>
        <div class="project-grid">${category.projects.map(projectCardHtml).join('')}</div>`;
}

function renderProjectView(projectId) {
    const { project, category } = projectsById[projectId];
    modalTitle.textContent = category.title;

    const slides = project.images.length
        ? project.images.map((src, i) => `<img src="${src}" alt="${project.title} ekran görüntüsü ${i + 1}">`)
        : [1, 2, 3].map(n => `<div class="gallery-placeholder"><i class="${project.icon}"></i><span>Ekran görüntüsü ${n}</span></div>`);

    modalBody.innerHTML = `
        <div class="product-top">
            <div>
                <div class="gallery-main">
                    ${slides.map((slide, i) => `<div class="gallery-slide ${i === 0 ? 'is-active' : ''}">${slide}</div>`).join('')}
                    <button type="button" class="gallery-nav prev" aria-label="Önceki görsel"><i class="fa-solid fa-chevron-left"></i></button>
                    <button type="button" class="gallery-nav next" aria-label="Sonraki görsel"><i class="fa-solid fa-chevron-right"></i></button>
                </div>
                <div class="gallery-thumbs">
                    ${slides.map((slide, i) => `<button type="button" class="gallery-thumb ${i === 0 ? 'is-active' : ''}" aria-label="Görsel ${i + 1}">${slide}</button>`).join('')}
                </div>
            </div>

            <div class="product-info">
                <span class="product-category">${category.title}</span>
                <h2 class="product-title">${project.title}</h2>
                ${statusHtml(project.status)}
                ${project.summary ? `<p class="product-summary">${formatText(project.summary)}</p>` : ''}
                ${project.features.length ? `<ul class="product-features">
                    ${project.features.map(feature => `<li><i class="fa-solid fa-check"></i>${formatText(feature)}</li>`).join('')}
                </ul>` : ''}
                <div class="product-actions">
                    <a class="info-btn" href="${whatsappUrl}?text=${encodeURIComponent(`Merhaba, "${project.title}" hakkında bilgi almak istiyorum.`)}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i>Bilgi Al</a>
                    ${likeButtonHtml(project.id, 'like-btn-large')}
                </div>
            </div>
        </div>

        ${project.description.length ? `<div class="product-section">
            <h4 class="modal-section-title">Açıklama</h4>
            ${project.description.map(paragraph => `<p>${formatText(paragraph)}</p>`).join('')}
        </div>` : ''}`;

    const slideElements = modalBody.querySelectorAll('.gallery-slide');
    const thumbs = modalBody.querySelectorAll('.gallery-thumb');
    let current = 0;

    function showSlide(index) {
        current = (index + slideElements.length) % slideElements.length;
        slideElements.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
        thumbs.forEach((thumb, i) => thumb.classList.toggle('is-active', i === current));
    }

    modalBody.querySelector('.gallery-nav.prev').addEventListener('click', () => showSlide(current - 1));
    modalBody.querySelector('.gallery-nav.next').addEventListener('click', () => showSlide(current + 1));
    thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => showSlide(i)));
}

document.addEventListener('click', e => {
    const target = e.target.closest('[data-like], [data-project], [data-more]');
    if (!target) return;

    if (target.dataset.like) {
        toggleLike(target.dataset.like);
    } else if (target.dataset.project) {
        openView(renderProjectView, target.dataset.project);
    } else {
        openView(renderCategoryView, target.dataset.more);
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.matches('[data-project]')) {
        openView(renderProjectView, e.target.dataset.project);
    }

    if (e.key === 'Escape' && !modal.hidden) {
        closeModal();
    }
});

modal.querySelector('.modal-back').addEventListener('click', goBack);
modal.querySelector('.modal-close').addEventListener('click', closeModal);
modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
