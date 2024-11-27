import "../sdk/go.js/go.js";
import "../sdk/go.js/go.router.js";
import "./views.js";

const lang = Go.lang().current() || "en";

import(Go.base("", `/lang/${lang}.js`)).then((lang) => {
  Go.lang(lang);
  Go.do("nav/start");
});
