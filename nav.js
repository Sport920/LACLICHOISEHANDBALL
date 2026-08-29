// Menu hamburger pour la navigation mobile
document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('header');
    var nav = header && header.querySelector('nav');
    if (!nav || header.querySelector('.nav-toggle')) { return; }

    var btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Ouvrir le menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '☰';
    header.insertBefore(btn, nav);

    btn.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.innerHTML = open ? '✕' : '☰';
    });

    // Referme le menu quand on choisit une page
    nav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            nav.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            btn.innerHTML = '☰';
        }
    });
});
