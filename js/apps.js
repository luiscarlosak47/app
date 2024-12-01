Go.set("apps").route = function () {
  this.limit = 50;
  this.name = "home";
  this.target = ".body";
  this.html = () =>
    Go.create({
      tagName: "div",
      className: "apps",
      childrens: [
        {
          class: "appsTitle",
          tagName: "h1",
          innerHTML: Go.lang("app_name"),
          style: { fontSize: "2.5em" },
          animate: {
            delay: 500,
            duration: 500,
            from: { opacity: 0, transform: "translateY(-50px)" },
            to: { opacity: 1, transform: "translateY(0px)" },
          },
        },
        {
          class: "appsList",
          tagName: "div",
          animate: {
            delay: 900,
            duration: 500,
            from: { opacity: 0, transform: "translateY(-50px)" },
            to: { opacity: 1, transform: "translateY(0px)" },
          },
          childrens: Go.arrayFill(this.limit).map(() => Go.do("apps/app", {})),
          onRender: (element) => {
            Go.do("apps/loadApps", element);
          },
        },
      ],
    });
};

Go.set("apps").app = function (app, index) {
  return {
    tagName: "a",
    class: "app",
    innerHTML: Go.do("apps/createTemplate", { ...app, name: Go.lang("loading") + "..." }),
    setNewApp: async function (app) {
      this.innerHTML = Go.do("apps/createTemplate", app);
      this.appData = await Go.http.get(Go.base("", `/db/${app.key}.json`));
      if (!this.appData) return;
      this.innerHTML = Go.do("apps/createTemplate", this.appData);
      this.onclick = () => Go.do("apps/openApp", this.appData);
    },
    quitApp: function () {
      this.remove();
    },
  };
};

Go.set("apps").loadApps = async function (target) {
  try {
    this.apps = await Go.http.get(Go.base("", "db/apps.json"));
  } catch (error) {
    return Go.alert(Go.getErrorMessage(error));
  }

  target.querySelectorAll(".app").forEach((app, index) => {
    const infoApp = this.apps[index];
    infoApp ? app.setNewApp(infoApp) : app.quitApp();
  });
};

Go.set("apps").createTemplate = function (app) {
  return `<div class="content ${app.key}">
    <div class="icon ${!app.icon && "loading"}" style='--img: url("${Go.base("", app.icon)}")'></div>
    <p class="name">${app.name}</p>
  </div>`;
};

Go.set("apps").openApp = function (app) {
  this.startUrl = Go.lower(app.start_url || `/app/${app.name}`).replaceAll(" ", "-");
  this.appUrl = `http://www.luigios.com/${this.startUrl}`;
  window.open(Go.url(this.appUrl).fix(), "_blank");
};
