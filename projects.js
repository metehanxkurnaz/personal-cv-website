const STATUSES = {
    "published": {
        "label": "Yayınlandı",
        "color": "green"
    },
    "development": {
        "label": "Geliştiriliyor",
        "color": "yellow"
    },
    "planned": {
        "label": "Planlandı",
        "color": "blue"
    },
    "stopped": {
        "label": "Durduruldu",
        "color": "red"
    }
};

const CATEGORIES = [
    {
        "id": "web-design",
        "title": "Web Tasarımı ve Geliştirme",
        "projects": [
            {
                "id": "web-design-1",
                "title": "Web Sitesi Kurulumu",
                "icon": "fa-brands fa-wordpress",
                "status": "published",
                "summary": "İşletmeniz için mobil uyumlu, hızlı ve müşterilerin sizi kolayca bulabileceği bir web sitesi kuruyorum. Kurulum, yayınlama ve teslim sonrası destek dahil.",
                "description": [
                    "Müşterileriniz sizi artık önce internette arıyor. Sitesi olmayan ya da mobilde düzgün açılmayan işletmeler, aynı aramada sitesi olan rakiplerine karşı kaybediyor. Bu hizmetle işletmenize, müşterinin güvenip size hemen ulaşabileceği bir web sitesi kuruyorum.",
                    "**Kimler için?**\nKlima ve kombi servisi, tesisat, nakliyat, oto servis, güzellik merkezi, veteriner, özel kurs gibi müşterisini internetten bulan yerel işletmeler için uygundur.",
                    "**Neler dahil?**\nWordPress altyapısıyla, kolay yönetilebilir site, hizmetleriniz, çalışma saatleriniz, konumunuz ve iletişim bilgileriniz, Google Haritalar entegrasyonu ve iletişim formu, alan adı ve hosting kurulumu, siteyi yayına alma hizmetleri pakete dahildir.",
                    "**Kurduğum Örnek Websiteler:**\n[Azelia Otel](https://metehanxkurnaz.github.io/demo-websites/otel/index.html)\n[Rota Sürücü Kursu](https://metehanxkurnaz.github.io/demo-websites/surucu-kursu/index.html)\n[Mira Güzellik Merkezi](https://metehanxkurnaz.github.io/demo-websites/guzellik-merkezi/index.html)",
                    "*Size uygun paketi öğrenmek ve bilgi almak için WhatsApp’tan yazabilirsiniz.*"
                ],
                "features": [
                    "Mobil uyumlu, WhatsApp ve tek tıkla arama butonlu tasarım",
                    "Google Haritalar ve Google İşletme Profili bağlantısı",
                    "Teslim sonrası ücretsiz hata düzeltme garantisi"
                ],
                "images": [
                    "images/1.png",
                    "images/2.png",
                    "images/3.png"
                ]
            }
        ]
    },
    {
        "id": "automation",
        "title": "Otomasyon Yazılımlar",
        "locked": true,
        "projects": [
            {
                "id": "automation-1",
                "title": "Örnek Uygulama 1",
                "icon": "fa-brands fa-whmcs",
                "status": "development",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            },
            {
                "id": "automation-2",
                "title": "Örnek Uygulama 2",
                "icon": "fa-solid fa-gears",
                "status": "published",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            },
            {
                "id": "automation-3",
                "title": "Örnek Uygulama 3",
                "icon": "fa-solid fa-bolt",
                "status": "stopped",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            },
            {
                "id": "automation-4",
                "title": "Örnek Uygulama 4",
                "icon": "fa-solid fa-table",
                "status": "published",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            },
            {
                "id": "automation-5",
                "title": "Örnek Uygulama 5",
                "icon": "fa-solid fa-envelope-open-text",
                "status": "development",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            },
            {
                "id": "automation-6",
                "title": "Örnek Uygulama 6",
                "icon": "fa-solid fa-clock",
                "status": "planned",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            }
        ]
    },
    {
        "id": "ai-integration",
        "title": "AI Destekli Yazılımlar",
        "locked": true,
        "projects": [
            {
                "id": "ai-integration-1",
                "title": "Örnek Uygulama 1",
                "icon": "fa-solid fa-robot",
                "status": "planned",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            },
            {
                "id": "ai-integration-2",
                "title": "Örnek Uygulama 2",
                "icon": "fa-solid fa-brain",
                "status": "published",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            },
            {
                "id": "ai-integration-3",
                "title": "Örnek Uygulama 3",
                "icon": "fa-solid fa-wand-magic-sparkles",
                "status": "development",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            },
            {
                "id": "ai-integration-4",
                "title": "Örnek Uygulama 4",
                "icon": "fa-solid fa-comments",
                "status": "published",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            },
            {
                "id": "ai-integration-5",
                "title": "Örnek Uygulama 5",
                "icon": "fa-solid fa-image",
                "status": "planned",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            },
            {
                "id": "ai-integration-6",
                "title": "Örnek Uygulama 6",
                "icon": "fa-solid fa-microchip",
                "status": "development",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            }
        ]
    },
    {
        "id": "e-commerce",
        "title": "E-Ticaret",
        "locked": true,
        "projects": [
            {
                "id": "e-commerce-1",
                "title": "Örnek Uygulama 1",
                "icon": "fa-brands fa-steam",
                "status": "stopped",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            },
            {
                "id": "e-commerce-2",
                "title": "Örnek Uygulama 2",
                "icon": "fa-solid fa-cart-shopping",
                "status": "development",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            },
            {
                "id": "e-commerce-3",
                "title": "Örnek Uygulama 3",
                "icon": "fa-brands fa-shopify",
                "status": "planned",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            }
        ]
    },
    {
        "id": "game-development",
        "title": "Oyun Geliştirme",
        "locked": true,
        "projects": [
            {
                "id": "game-development-1",
                "title": "Örnek Uygulama 1",
                "icon": "fa-solid fa-gamepad",
                "status": "planned",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            },
            {
                "id": "game-development-2",
                "title": "Örnek Uygulama 2",
                "icon": "fa-brands fa-unity",
                "status": "development",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            },
            {
                "id": "game-development-3",
                "title": "Örnek Uygulama 3",
                "icon": "fa-solid fa-dice-d20",
                "status": "planned",
                "summary": "Bu, örnek bir proje kaydıdır. Gerçek proje bilgileri eklendiğinde burada projenin ne işe yaradığını anlatan kısa bir özet yer alacak.",
                "description": [
                    "Projenin detaylı açıklaması bu alanda yer alacak. Hangi problemi çözdüğü, kimler için geliştirildiği ve nasıl çalıştığı burada anlatılabilir.",
                    "Kullanılan teknolojiler, geliştirme süreci ve projenin sağladığı somut faydalar da bu bölümde paylaşılabilir."
                ],
                "features": [
                    "Kurulumu kolay ve kullanıcı dostu arayüz",
                    "İhtiyaca göre özelleştirilebilir yapı",
                    "Hızlı destek ve düzenli güncellemeler"
                ],
                "images": []
            }
        ]
    }
];
