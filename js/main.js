import "../sdk/go.js/go.js";
import "../sdk/go.js/go.router.js";

const lang = Go.lang().current() || "en";

import(Go.base("", `/lang/${lang}.js`)).then((lang) => {
  console.log(lang);
  Go.lang(lang);
  import(Go.base("", `/js/views.js`)).then((views) => {
    console.log(views);
    Go.views(views);
    Go.do("nav/start");
  });
});
