const STATUSES = {
    published:   { label: 'Yayınlandı',     color: 'green' },
    development: { label: 'Geliştiriliyor', color: 'yellow' },
    planned:     { label: 'Planlandı',      color: 'blue' },
    stopped:     { label: 'Durduruldu',     color: 'red' }
};

const SAMPLE_SUMMARY = 'Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.';

const SAMPLE_DESCRIPTION = [
    'Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.',
    'Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir.'
];

const SAMPLE_FEATURES = [
    'Kurulumu kolay ve kullanıcı dostu arayüz',
    'İhtiyaca göre özelleştirilebilir yapı',
    'Hızlı destek ve düzenli güncellemeler'
];

function sampleProject(id, title, icon, status) {
    return {
        id, title, icon, status,
        summary: SAMPLE_SUMMARY,
        description: SAMPLE_DESCRIPTION,
        features: SAMPLE_FEATURES,
        images: []
    };
}

const CATEGORIES = [
    {
        id: 'web-design',
        title: 'Web Tasarımı ve Geliştirme',
        //locked: true,
        projects: [
            sampleProject('web-design-1', 'Örnek Uygulama 1', 'fa-brands fa-html5', 'published'),
            sampleProject('web-design-2', 'Örnek Uygulama 2', 'fa-brands fa-wordpress', 'development'),
            sampleProject('web-design-3', 'Örnek Uygulama 3', 'fa-solid fa-palette', 'planned'),
            sampleProject('web-design-4', 'Örnek Uygulama 4', 'fa-solid fa-code', 'published'),
            sampleProject('web-design-5', 'Örnek Uygulama 5', 'fa-brands fa-css3-alt', 'development'),
            sampleProject('web-design-6', 'Örnek Uygulama 6', 'fa-solid fa-mobile-screen', 'planned')
        ]
    },
    {
        id: 'automation',
        title: 'Otomasyon Yazılımlar',
        locked: true,
        projects: [
            sampleProject('automation-1', 'Örnek Uygulama 1', 'fa-brands fa-whmcs', 'development'),
            sampleProject('automation-2', 'Örnek Uygulama 2', 'fa-solid fa-gears', 'published'),
            sampleProject('automation-3', 'Örnek Uygulama 3', 'fa-solid fa-bolt', 'stopped'),
            sampleProject('automation-4', 'Örnek Uygulama 4', 'fa-solid fa-table', 'published'),
            sampleProject('automation-5', 'Örnek Uygulama 5', 'fa-solid fa-envelope-open-text', 'development'),
            sampleProject('automation-6', 'Örnek Uygulama 6', 'fa-solid fa-clock', 'planned')
        ]
    },
    {
        id: 'ai-integration',
        title: 'AI Destekli Yazılımlar',
        locked: true,
        projects: [
            sampleProject('ai-integration-1', 'Örnek Uygulama 1', 'fa-solid fa-robot', 'planned'),
            sampleProject('ai-integration-2', 'Örnek Uygulama 2', 'fa-solid fa-brain', 'published'),
            sampleProject('ai-integration-3', 'Örnek Uygulama 3', 'fa-solid fa-wand-magic-sparkles', 'development'),
            sampleProject('ai-integration-4', 'Örnek Uygulama 4', 'fa-solid fa-comments', 'published'),
            sampleProject('ai-integration-5', 'Örnek Uygulama 5', 'fa-solid fa-image', 'planned'),
            sampleProject('ai-integration-6', 'Örnek Uygulama 6', 'fa-solid fa-microchip', 'development')
        ]
    },
    {
        id: 'e-commerce',
        title: 'E-Ticaret',
        locked: true,
        projects: [
            sampleProject('e-commerce-1', 'Örnek Uygulama 1', 'fa-brands fa-steam', 'stopped'),
            sampleProject('e-commerce-2', 'Örnek Uygulama 2', 'fa-solid fa-cart-shopping', 'development'),
            sampleProject('e-commerce-3', 'Örnek Uygulama 3', 'fa-brands fa-shopify', 'planned')
        ]
    },
    {
        id: 'game-development',
        title: 'Oyun Geliştirme',
        locked: true,
        projects: [
            sampleProject('game-development-1', 'Örnek Uygulama 1', 'fa-solid fa-gamepad', 'planned'),
            sampleProject('game-development-2', 'Örnek Uygulama 2', 'fa-brands fa-unity', 'development'),
            sampleProject('game-development-3', 'Örnek Uygulama 3', 'fa-solid fa-dice-d20', 'planned')
        ]
    }
];
