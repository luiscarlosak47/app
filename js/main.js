import "../sdk/go.js/go.js";
import "../sdk/go.js/go.router.js";

const lang = Go.lang().current() || "en";

import(Go.base("", `/lang/${lang}.js`)).then((lang) => {
  Go.lang(lang.default);
  import(Go.base("", `/js/views.js`)).then((views) => {
    Go.views(views.default);
    Go.do("nav/start");
  });
});
