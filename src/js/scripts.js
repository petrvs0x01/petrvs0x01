document.addEventListener('DOMContentLoaded', () => {
    console.log('script.js: DOM Content Loaded. Iniciando funcionalidades.');

    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        const applyTheme = (theme) => {
            console.log(`script.js: Aplicando tema: ${theme}`);
            document.body.classList.remove('light-theme', 'dark-theme');
            document.body.classList.add(`${theme}-theme`);
            localStorage.setItem('theme', theme);
        };

        const savedTheme = localStorage.getItem('theme');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (prefersDarkScheme.matches) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });

        prefersDarkScheme.addEventListener('change', (event) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(event.matches ? 'dark' : 'light');
            }
        });

    } else {
        console.error('script.js: Elemento #theme-toggle não encontrado. O alternador de tema não funcionará.');
    }

    const languageOptions = document.querySelectorAll('.lang-option');
    const translatableElements = document.querySelectorAll('[data-lang-pt], [data-lang-en]');
    const titleElement = document.querySelector('title');

    const translatePage = (lang) => {
        console.log(`script.js: Traduzindo para: ${lang}`);

        translatableElements.forEach(element => {
            const ptText = element.dataset.langPt;
            const enText = element.dataset.langEn;

            if (element !== titleElement) {
                if (lang === 'en' && enText) {
                    element.textContent = enText;
                } else if (lang === 'pt' && ptText) {
                    element.textContent = ptText;
                }
            }
        });

        if (titleElement) {
            titleElement.textContent = (lang === 'en' && titleElement.dataset.langEn) ? titleElement.dataset.langEn : titleElement.dataset.langPt;
        }
    };

    const setLanguage = (lang) => {
        languageOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.lang === lang) {
                option.classList.add('active');
            }
        });
        localStorage.setItem('language', lang);
        translatePage(lang);
    };

    const savedLanguage = localStorage.getItem('language') || 'pt';
    setLanguage(savedLanguage);

    if (languageOptions.length > 0) {
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                setLanguage(e.target.dataset.lang);
            });
        });
    } else {
        console.warn('script.js: Elementos .lang-option não encontrados. O seletor de linguagem pode não funcionar como esperado.');
    }

    const navLinks = document.querySelectorAll('.nav-link');

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    } else {
        console.warn('script.js: Nenhuma navegação (.nav-link) encontrada. A rolagem suave para tópicos não será aplicada.');
    }

    console.log('script.js: Todas as funcionalidades iniciais configuradas.');
});
