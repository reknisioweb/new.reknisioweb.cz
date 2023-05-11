const dataPrivacy = function (action) {
    switch (action) {
        case "allow": // Kliknul na Povolit
            var cookieBar = document.querySelector("[data-privacy]");
            cookieBar.innerHTML('<small>Tento web ukládá do prohlížeče cookie první strany pro analýzy návštěvnost (<a href="https://support.google.com/analytics/topic/2919631">Google Analytics</a>). <button>Zakázat</button></small>')
            cookieBar.getElementsByTagName("button")[0].addEventListener("click", () => { dataPrivacy("disallow"); })
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
            document.cookie = "consent=granted; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=reknisioweb.cz; secure";
            console.log(action)
            break;
        case "disallow": // Kliknul na Zakázat
            var cookieBar = document.querySelector("[data-privacy]");
            cookieBar.innerHTML('<small>Pro zlepšování kvality tohoto webu potřebujeme povolit analytiku (<a href="https://support.google.com/analytics/topic/2919631">Google Analytics</a>). <button>Povolit</button></small>')
            cookieBar.getElementsByTagName("button")[0].addEventListener("click", () => { dataPrivacy("allow"); })
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });

            const exp = new Date();
            exp.setUTCFullYear(exp.getUTCFullYear + 1)

            document.cookie = `consent=denied; expires=${exp.toUTCString()}; path=/; domain=reknisioweb.cz; secure`;
            console.log(action)
            break;
        default:
            const cookies = {};
            if (document.cookie.length > 0) {
                document.cookie.split(/\s*;\s*/).forEach((cookie) => {
                    Object.assign(cookies, JSON.parse(`{ "${cookie.split(/\s*=\s*/).join('": "')}" }`))
                });
            }
            if (cookies.hasOwn("consent")) {
                if (cookies["consent"].toLowerCase().indexOf("denied") == 0)
                    dataPrivacy("disallow");
            } else {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
                document.querySelector("[data-privacy] button").addEventListener("click", () => { dataPrivacy("disallow"); })
                console.log("default consent")
            }
            break;
    }
}

const ready = function (fn, ...args) {
    if (document.readyState !== 'loading') {
        fn(...arguments.shift());
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-HFFN6HTH6J');
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied'
});

ready(dataPrivacy);