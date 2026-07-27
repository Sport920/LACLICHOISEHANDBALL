/* Bannière de consentement cookies – La Clichoise Handball
   Conforme aux recommandations CNIL : Google Analytics ne se charge
   qu'après consentement explicite. Choix mémorisé 6 mois. */
(function () {
    var GA_ID = "G-9WBP39TY6W";
    var COOKIE_NAME = "lch_consent";

    function getConsent() {
        var m = document.cookie.match(new RegExp("(?:^|; )" + COOKIE_NAME + "=([^;]*)"));
        return m ? m[1] : null;
    }

    function setConsent(value) {
        var d = new Date();
        d.setMonth(d.getMonth() + 6);
        document.cookie = COOKIE_NAME + "=" + value + "; expires=" + d.toUTCString() + "; path=/; SameSite=Lax";
    }

    function loadAnalytics() {
        var s = document.createElement("script");
        s.async = true;
        s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag("js", new Date());
        gtag("config", GA_ID, { anonymize_ip: true });
    }

    function removeBanner() {
        var b = document.getElementById("cookie-banner");
        if (b) b.remove();
    }

    function showBanner() {
        if (document.getElementById("cookie-banner")) return;
        var banner = document.createElement("div");
        banner.id = "cookie-banner";
        banner.setAttribute("role", "dialog");
        banner.setAttribute("aria-label", "Consentement aux cookies");
        banner.innerHTML =
            '<p>Ce site utilise des cookies de mesure d’audience (Google Analytics) uniquement si vous les acceptez. ' +
            'Votre choix est conservé 6 mois. ' +
            '<a href="mentions-legales.html">En savoir plus</a></p>' +
            '<div class="cookie-banner-actions">' +
            '<button type="button" id="cookie-accept">Accepter</button>' +
            '<button type="button" id="cookie-refuse">Refuser</button>' +
            '</div>';
        document.body.appendChild(banner);
        document.getElementById("cookie-accept").addEventListener("click", function () {
            setConsent("granted");
            removeBanner();
            loadAnalytics();
        });
        document.getElementById("cookie-refuse").addEventListener("click", function () {
            setConsent("denied");
            removeBanner();
        });
    }

    function initMenu() {
        var header = document.querySelector("header");
        var nav = header && header.querySelector("nav");
        if (!header || !nav || document.querySelector(".nav-toggle")) return;
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "nav-toggle";
        btn.setAttribute("aria-label", "Ouvrir le menu");
        btn.setAttribute("aria-expanded", "false");
        btn.innerHTML = "\u2630";
        header.insertBefore(btn, nav);
        btn.addEventListener("click", function () {
            var open = header.classList.toggle("nav-open");
            btn.setAttribute("aria-expanded", open ? "true" : "false");
            btn.innerHTML = open ? "\u2715" : "\u2630";
        });
        nav.addEventListener("click", function (e) {
            if (e.target.tagName === "A") {
                header.classList.remove("nav-open");
                btn.setAttribute("aria-expanded", "false");
                btn.innerHTML = "\u2630";
            }
        });
    }

    function init() {
        initMenu();
        var consent = getConsent();
        if (consent === "granted") {
            loadAnalytics();
        } else if (consent === null) {
            showBanner();
        }
        var manage = document.getElementById("cookie-settings");
        if (manage) {
            manage.addEventListener("click", function (e) {
                e.preventDefault();
                showBanner();
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
