import "../sdk/go.js/go.js";
import "../sdk/go.js/go.router.js";
import "./views.js";

const lang = Go.lang().current() || "en";

Go.import(`./lang/${lang}.js`, (lang) => {
  Go.lang(lang);
  Go.do("nav/start");
});
