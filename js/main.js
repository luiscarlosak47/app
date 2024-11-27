import "../sdk/go.js/go.js";
import "../sdk/go.js/go.router.js";
import "./apps.js";

const App = Promise.all([
  import(Go.base("", `/lang/${Go.lang().current() || "en"}.js`)), // lang
  import(Go.base("", `/js/icons.js`)), // icons
  import(Go.base("", `/js/views.js`)), // views
]);

App.then(([lang, icons, views]) => {
  Go.lang(lang.default);
  Go.icons(icons.default);
  Go.views(views.default);
  Go.do("nav/start");
});

App.catch((err) => {
  console.error(err);
  Go.alert(Go.getErrorMessage(err));
});
