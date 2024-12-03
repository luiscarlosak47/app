/* Go.js SDK by Luis Carlos Hurtado - MIT Licence - luiscarloshurtado@live.com */
const [GO, GO_EXTENDS] = [{}, {}],
  GO_ACTIONS = {
    iterateActions: function (s = []) {
      return new Promise(async (t, e) => {
        var i = [];
        for (const n of s)
          try {
            var o = await n.action();
            i.push(o);
          } catch (t) {
            i.push(t);
          }
        t(i);
      });
    },
    buff: function (e, i) {
      let o;
      return function (...t) {
        clearTimeout(o),
          (o = setTimeout(() => {
            i.apply(this, t);
          }, e));
      };
    },
  },
  MODULE_LUIGI_OS_GOACTIONSJS = GO_ACTIONS,
  GO_AI_INSTANCE = (Object.assign(GO, MODULE_LUIGI_OS_GOACTIONSJS), null),
  GO_AI = function (t = {}) {
    if (
      ((this.options = t),
      Go.is(t, "string") && (this.options = { message: t }),
      (this.ai = null),
      (this.engine = null),
      (this.model = "Llama-3-8B-Instruct-q4f32_1-MLC"),
      (this.responseText = ""),
      (this.error = null),
      (this.options.context ||= [
        { role: "system", content: "" },
        { role: "user", content: this.options.message },
      ]),
      Go.is(t, "string"))
    )
      return this.prompt();
  },
  MODULE_LUIGI_OS_GOAIJS = {
    ai: function () {
      return new GO_AI(...arguments);
    },
    ia: function () {
      return new GO_AI(...arguments);
    },
  },
  Alert =
    ((GO_AI.prototype.load = async function () {
      return (
        (this.ai = await import("https://esm.run/@mlc-ai/web-llm")),
        (this.engine = new this.ai.MLCEngine()),
        this.engine.setInitProgressCallback(console.info),
        await this.engine.reload(this.model),
        (GO_AI_INSTANCE = this.ai),
        this.ai
      );
    }),
    (GO_AI.prototype.prompt = async function (t) {
      return (this.message = t), new Promise(this.resolve.bind(this));
    }),
    (GO_AI.prototype.resolve = async function (t, e) {
      GO_AI_INSTANCE || (await this.load()),
        this.message && this.options.context.push({ role: "user", content: this.message }),
        (this._options = { messages: this.options.context });
      try {
        (this.reply = await this.engine.chat.completions.create(this._options)), (this.responseText = this.reply.choices[0].message);
      } catch (t) {
        console.error(t), (this.error = t);
      }
      return this.message ? t({ message: this.responseText, error: this.error }) : t(this.responseText);
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOAIJS),
    function (t = {}, e = {}) {
      (this.options = t || {}), (this.extra = e || {}), (this.alert = null), (this.id = Go.uuid());
    }),
  MODULE_LUIGI_OS_GOALERTJS = {
    alert: function () {
      return new Alert(...arguments).show();
    },
    pop: function () {
      return new Alert(...arguments).show();
    },
  },
  animations =
    ((Alert.prototype.show = function () {
      return (
        Go.is(this.options, "string") && (this.options = { message: this.options }),
        Object.assign(this.options, this.extra),
        (this.template = '<div class="alertBody">'),
        (this.btnAttr = ""),
        this.options.icon &&
          ((this.btnAttr = "gap-y"),
          (this.template += `<div class="alertIcon" tcenter f250>
    <go-spacer num="2"></go-spacer>
      <go-icon name="${this.options.icon}"></go-icon>
    </div>`)),
        (this.template += `<div class="alertContent">${this.options.message}</div>`),
        (this.template += `<div class="alertOptions">
    <a class="alertCloseButton" onclick="Go.closeParent(event)">
      <div ${this.btnAttr}>${Go.lang("ok")}</div>
    </a>
  </div>`),
        (this.template += "</div>"),
        Go.view({
          title: "",
          header: !1,
          html: this.template,
          closeOutside: !0,
          class: "alert go-alert",
          close: !1,
          id: this.id,
          animation: "midTopIn",
          keepOnTop: !0,
          ...this.options,
        })
      );
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOALERTJS),
    {}),
  Animate = function (t = {}, e, i, o) {
    if (
      ((this.options = t),
      (this.animation = t.animate || animations[t.animation] || Go.prop(t.animation, window.animations)),
      (this.animationDuration = t.animationDuration || t.animationTime || o || 250),
      (this.el = t.el),
      Go.is(t, "string") || Go.is(t, "HTMLElement"))
    )
      return this.goAnimate(t, e, i, this.animationDuration);
  },
  MODULE_LUIGI_OS_GOANIMATEJS = {
    animate: function () {
      return new Animate(...arguments);
    },
  },
  GO_ANIMATION =
    ((Animate.prototype.goAnimate = function (e, i, o, n) {
      return (
        Go.is(e, "string") && (e = document.querySelector(e)),
        new Promise((t) => {
          e.animate([i, o], { duration: n, easing: "ease-in-out", fill: "forwards" }).onfinish = () => {
            t();
          };
        })
      );
    }),
    (Animate.prototype.open = function (t) {
      this.el && this.animation
        ? ((this.animation.duration = Number(this.animation.duration || this.animationDuration)),
          Go.is(this.options.animation, "object") && (this.animation = this.options.animation),
          Go.setStyle(this.el, { transition: "all 0.3s ease-in-out", ...this.animation.from }),
          (this.animateCard = this.el.animate([this.animation.from, this.animation.to], { duration: this.animation.duration, easing: "ease-in-out", fill: "forwards" })),
          (this.animateCard.onfinish = () => {
            Go.setStyle(this.el, this.animation.to), Go.is(t, "Function") && t();
          }))
        : Go.is(t, "Function") && t();
    }),
    (Animate.prototype.close = function (t) {
      this.el && this.animation
        ? ((this.animateCard = this.el.animate([this.animation.to, this.animation.from], { duration: this.animation.duration, easing: "ease-in-out", fill: "forwards" })),
          (this.animateCard.onfinish = async () => {
            Go.setStyle(this.el, this.animation.from), Go.is(t, "Function") && t();
          }))
        : Go.is(t, "Function") && t();
    }),
    Object.assign(animations, {
      fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      leftIn: { from: { transform: "translateX(-100%)" }, to: { transform: "translateX(0)" } },
      rightIn: { from: { transform: "translateX(100%)" }, to: { transform: "translateX(0)" } },
      midRightIn: { from: { opacity: 0, transform: "translate3d(50%, 0, 0)" }, to: { opacity: 1, transform: "translate3d(0, 0, 0)" } },
      midLeftIn: { from: { opacity: 0, transform: "translate3d(-50%, 0, 0)" }, to: { opacity: 1, transform: "translate3d(0, 0, 0)" } },
      topIn: { from: { opacity: 0, transform: "translate3d(0, -100%, 0)" }, to: { opacity: 1, transform: "translate3d(0, 0, 0)" } },
      bottomIn: { from: { opacity: 0, transform: "translate3d(0, 100%, 0)" }, to: { opacity: 1, transform: "translate3d(0, 0, 0)" } },
      zoomIn: { from: { opacity: 0, transform: "scale(0.5)" }, to: { opacity: 1, transform: "scale(1)" } },
      zoomOut: { from: { opacity: 1, transform: "scale(1.5)" }, to: { opacity: 0, transform: "scale(1)" } },
      rotateIn: { from: { opacity: 0, transform: "rotate(-90deg)" }, to: { opacity: 1, transform: "rotate(0)" } },
      midTopIn: { from: { opacity: 0, transform: "translate3d(0, -50%, 0)" }, to: { opacity: 1, transform: "translate3d(0, 0, 0)" } },
      midBottomIn: { from: { opacity: 0, transform: "translate3d(0, 50%, 0)" }, to: { opacity: 1, transform: "translate3d(0, 0, 0)" } },
      slideBottomIn: { from: { opacity: 0, transform: "translateY(100%)" }, to: { opacity: 1, transform: "translateY(0)" } },
      slideBottomIn3D: { from: { opacity: 0, transform: "translateZ(-100px) translateY(100%)" }, to: { opacity: 1, transform: "translateZ(0) translateY(0)" } },
      bottomZoomIn: { from: { opacity: 0, transform: "translateY(100%) scale(0.5)" }, to: { opacity: 1, transform: "translateY(0) scale(1)" } },
      midZoomIn: { from: { opacity: 0, transform: "scale(0.75)" }, to: { opacity: 1, transform: "scale(1)" } },
      midZoomOut: { from: { opacity: 1, transform: "scale(1)" }, to: { opacity: 0, transform: "scale(0.75)" } },
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOANIMATEJS),
    function (t) {
      (this.element = t), this.init();
    }),
  MODULE_LUIGI_OS_GOANIMATIONJS = {
    animation: function () {
      return new GO_ANIMATION(...arguments);
    },
  },
  MODULE_LUIGI_OS_GOANIMATIONSJS =
    ((GO_ANIMATION.prototype.init = function () {
      Go.is(this.element, "string") && (this.element = document.querySelector(this.element));
    }),
    (GO_ANIMATION.prototype.collapse = async function (t = 1e3) {
      if (this.element)
        return (
          this.element.classList.add("deleted"),
          (this.element.style.height = this.element.offsetHeight + "px"),
          (this.element.style.opacity = "0.3"),
          (this.element.style.transition = "all 1s ease"),
          await Go.sleep(100),
          (this.element.style.height = "0"),
          await Go.sleep(t),
          this.element
        );
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOANIMATIONJS),
    {
      fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      leftIn: { from: { transform: "translateX(-100%)" }, to: { transform: "translateX(0)" } },
      rightIn: { from: { transform: "translateX(100%)" }, to: { transform: "translateX(0)" } },
      midRightIn: { from: { opacity: 0, transform: "translate3d(50%, 0, 0)" }, to: { opacity: 1, transform: "translate3d(0, 0, 0)" } },
      midLeftIn: { from: { opacity: 0, transform: "translate3d(-50%, 0, 0)" }, to: { opacity: 1, transform: "translate3d(0, 0, 0)" } },
      topIn: { from: { opacity: 0, transform: "translate3d(0, -100%, 0)" }, to: { opacity: 1, transform: "translate3d(0, 0, 0)" } },
      bottomIn: { from: { opacity: 0, transform: "translate3d(0, 100%, 0)" }, to: { opacity: 1, transform: "translate3d(0, 0, 0)" } },
      zoomIn: { from: { opacity: 0, transform: "scale(0.5)" }, to: { opacity: 1, transform: "scale(1)" } },
      zoomOut: { from: { opacity: 1, transform: "scale(1.5)" }, to: { opacity: 0, transform: "scale(1)" } },
      rotateIn: { from: { opacity: 0, transform: "rotate(-90deg)" }, to: { opacity: 1, transform: "rotate(0)" } },
      midTopIn: { from: { opacity: 0, transform: "translate3d(0, -50%, 0)" }, to: { opacity: 1, transform: "translate3d(0, 0, 0)" } },
      midBottomIn: { from: { opacity: 0, transform: "translate3d(0, 50%, 0)" }, to: { opacity: 1, transform: "translate3d(0, 0, 0)" } },
      slideBottomIn: { from: { opacity: 0, transform: "translateY(100%)" }, to: { opacity: 1, transform: "translateY(0)" } },
      slideBottomIn3D: { from: { opacity: 0, transform: "translateZ(-100px) translateY(100%)" }, to: { opacity: 1, transform: "translateZ(0) translateY(0)" } },
      bottomZoomIn: { from: { opacity: 0, transform: "translateY(100%) scale(0.5)" }, to: { opacity: 1, transform: "translateY(0) scale(1)" } },
      midZoomIn: { from: { opacity: 0, transform: "scale(0.25)" }, to: { opacity: 1, transform: "scale(1)" } },
      midZoomIn3D: { from: { opacity: 0, transform: "translateZ(-100px) scale(0.25)" }, to: { opacity: 1, transform: "translateZ(0) scale(1)" } },
    }),
  GO_APP =
    (Object.assign(GO, MODULE_LUIGI_OS_GOANIMATIONSJS),
    function () {
      this.keyName = "";
    }),
  MODULE_LUIGI_OS_GOAPPJS = { app: new GO_APP() },
  GO_ARRAY =
    ((GO_APP.prototype.setApp = function (t) {
      Object.assign(this, t), Go.extends(this, Go.Events);
    }),
    (GO_APP.prototype.getIcon = function (t) {
      return this.images[`icon-${t}x` + t] && this.images[`icon-${t}x` + t].src;
    }),
    (GO_APP.prototype.load = function (t) {
      t = `/app/${this.keyName}/res/` + t;
      return Go.load(t);
    }),
    (GO_APP.prototype.res = function () {
      return this.load(...arguments);
    }),
    (GO_APP.prototype.resolve = function (t) {
      return `/app/${this.keyName}/res/` + t;
    }),
    (GO_APP.prototype.noItemsTemplate = function () {
      return (
        (this.noTemplate = '<div class="errorCard">'),
        (this.noTemplate += '<div class="icon"><go-icon name="empty_doc"></go-icon></div>'),
        (this.noTemplate += `<div semi-bold>${Go.lang("no_items_found")}</div>`),
        (this.noTemplate += "</div>"),
        this.noTemplate
      );
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOAPPJS),
    {}),
  MODULE_LUIGI_OS_GOARRAYJS =
    ((GO_ARRAY.arrayGroupOf = function (t, e, i) {
      for (var o = e.slice(), n = []; 0 < o.length; ) i ? ((i.id = Go.uuid()), n.push({ ...i, items: o.splice(0, t) })) : n.push(o.splice(0, t));
      return n;
    }),
    (GO_ARRAY.findIndex = function (e, i) {
      let o = -1;
      for (let t = 0; t < e.length; t++)
        if (e[t] === i) {
          o = t;
          break;
        }
      return o;
    }),
    (GO_ARRAY.findObjectIndex = function (e, i, o) {
      let n = -1;
      for (let t = 0; t < e.length; t++)
        if (Go.getProperty(i, e[t]) === o) {
          n = t;
          break;
        }
      return n;
    }),
    (GO_ARRAY.shuffle = function (t) {
      let e = t.length,
        i,
        o;
      for (; 0 !== e; ) (o = Math.floor(Math.random() * e)), (i = t[--e]), (t[e] = t[o]), (t[o] = i);
      return t;
    }),
    (GO_ARRAY.removeFromArray = function (t, e) {
      Go.is(t, "Object") && t.array && (e = (t = t.array).value);
      e = GO_ARRAY.findIndex(t, e);
      return -1 < e && t.splice(e, 1), t;
    }),
    (GO_ARRAY.removeObjectFromArray = function (t, e, i) {
      Go.is(t, "Object") && t.array && ((e = (t = t.array).key), (i = t.value));
      e = GO_ARRAY.findObjectIndex(t, e, i);
      return -1 < e && t.splice(e, 1), t;
    }),
    (GO_ARRAY.arrayRandomItem = function (t) {
      return t[Math.floor(Math.random() * t.length)];
    }),
    (GO_ARRAY.find = function (e, i) {
      if (Go.is(e, "number")) return i[e];
      let o = null;
      for (let t = 0; t < i.length; t++)
        if (Go.getProperty(e, i[t])) {
          o = i[t][e];
          break;
        }
      return o;
    }),
    (GO_ARRAY.arrayFill = function (e, i) {
      var o = [];
      for (let t = 0; t < e; t++) o.push(i || t);
      return o;
    }),
    (GO_ARRAY.arrayCombine = function (...e) {
      let i = [];
      for (let t = 0; t < e.length; t++) i = i.concat(e[t]);
      return i;
    }),
    (GO_ARRAY.pushFirst = function (t, e) {
      return t.unshift(e), t;
    }),
    (GO_ARRAY.pushLast = function (t, e) {
      return t.push(e), t;
    }),
    GO_ARRAY),
  Calendar =
    (Object.assign(GO, MODULE_LUIGI_OS_GOARRAYJS),
    function (t = {}) {
      (this.title = t.title || Go.lang("calendar")), (this.id = Go.uuid());
    }),
  MODULE_LUIGI_OS_GOCALENDARJS = { calendar: (t) => new Calendar(t) },
  ClipBoard =
    ((Calendar.prototype.show = function () {}),
    (Calendar.prototype.open = function () {
      this.show();
    }),
    (Calendar.prototype.body = function () {}),
    Object.assign(GO, MODULE_LUIGI_OS_GOCALENDARJS),
    function (t) {
      this.e = t;
    }),
  MODULE_LUIGI_OS_GOCLIPBOARDJS = { clipboard: (t) => new ClipBoard(t) },
  Component =
    ((ClipBoard.prototype.copy = function () {
      if (Go.is(this.e, "string") && navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(this.e);
      else if (Go.is(this.e, "HTMLElement")) this.e.select(), document.execCommand("copy");
      else if (Go.is(this.e, "string")) {
        var t = document.createElement("textarea");
        (t.value = this.e), (t.style.position = "fixed"), (t.style.opacity = 0), document.body.appendChild(t), t.focus(), t.select();
        try {
          document.execCommand("copy"), console.log("Texto copiado al portapapeles!");
        } catch (t) {
          console.error("Error al copiar al portapapeles: ", t);
        }
        document.body.removeChild(t);
      } else document.queryCommandSupported("copy") && (this.e.select(), document.execCommand("copy"));
    }),
    (ClipBoard.prototype.paste = function () {
      document.execCommand("paste");
    }),
    (ClipBoard.prototype.cut = function () {
      this.e.select(), document.execCommand("cut");
    }),
    (ClipBoard.prototype.clear = function () {
      document.execCommand("selectAll"), document.execCommand("delete");
    }),
    (ClipBoard.prototype.clean = function () {
      this.e.preventDefault();
      var t = (this.e.clipboardData || window.clipboardData).getData("text/plain");
      document.execCommand("insertHTML", !1, t);
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOCLIPBOARDJS),
    function () {}),
  component = new Component(),
  ElementMethods = {},
  ElementEvents = {},
  ElementProperties = {},
  MODULE_LUIGI_OS_GOCOMPONENTJS = { component: (t, e) => component.load(t, e) };
class ComponentCycles extends HTMLElement {
  constructor() {
    super(), (this.attrs = Go.parseAllAttributes(this)), (this.slots = this.querySelectorAll("[slot]")), (this.props = this.getProps()), (this.template = "");
  }
  async disconnectedCallback() {
    await this.cleanResources(), await this.onunload(), await this.destroy(), await this.$destroy(), this.remove();
  }
  async connectedCallback() {
    (await this.$init()) &&
      (await this.init(), (this.props = this.getProps()), await this.beforeRender(this), await this.render(this), await this.afterRender(this), await this.readyEvents());
  }
  async $init() {}
  async init() {}
  async beforeRender() {}
  async render() {
    this.template && (this.innerHTML = Go.eval(this.template));
  }
  async afterRender() {}
  async cleanResources() {}
  async onunload() {}
  async destroy() {}
  async readyEvents() {}
  async $destroy() {}
}
(Component.prototype.load = async function (t, e) {
  this.register(t, e);
}),
  (Component.prototype.register = async function (t, e) {
    let i = [{}][0];
    if (Go.is(e, "function")) (e = await e()), (i = e.default);
    else if (Go.is(e, "string")) (e = Go.route.fixPath(e)), (e = await import(e)), (i = e.default);
    else {
      if (!Go.is(e, "object")) return;
      i = e;
    }
    class o extends ComponentCycles {
      component() {
        return { name: t };
      }
    }
    Object.assign(o.prototype, i, ElementProperties, ElementMethods, ElementEvents);
    try {
      window.customElements.define(t, o);
    } catch (t) {
      this.error(t);
    }
    e = i.setup || i.onSetup || i.register || i.onRegister;
    Go.is(e, "Function") && (await e());
  }),
  (Component.prototype.error = function (t) {
    Go.has(String(t), "included", "has already") || console.log("Component: ", t);
  }),
  Object.assign(ElementMethods, {
    $: function (t) {
      return $(t, this);
    },
    $init: function () {
      return ((this.if ||= Go.attr(this, "if")), Go.is(this.if, "set") && !eval(this.if))
        ? this.disconnectedCallback()
        : (this.setVarsSizes(), this.listenStyles(), this.mapStyles(), !0);
    },
    evaluateProps: function () {
      return (
        (this.data ||= Go.attr(this, "data") ? Go.json(Go.attr(this, "data")) : null),
        (this.data ||= Go.attr(this, "props") ? Go.json(Go.attr(this, "props")) : {}),
        (this.data.src ||= this.src || Go.attr(this, "src")),
        (this.childs = this.querySelectorAll("*")),
        this.childs.forEach((t) => {
          var [e, i] = [Go.lower(t.tagName), Go.attr(t, "value")];
          (this.data[e] = i), t.remove();
        }),
        this.data
      );
    },
    setVarsSizes: function () {
      (this.sizes = this.sizes || this.attrs.sizes || Go.attr(this, "sizes") || {}),
        (this.sizes = Go.json(this.sizes)),
        Object.keys(this.sizes).forEach((t) => {
          Go.onlyNum(this.sizes[t]) && this.style.setProperty("--size-" + t, this.sizes[t]);
        });
    },
    reload: function () {
      this.connectedCallback();
    },
    html: function (t) {
      this.innerHTML = t;
    },
    text: function (t) {
      this.innerText = t;
    },
    append: function (t) {
      if (Go.is(t, "HTMLElement")) return this.appendChild(t);
      this.innerHTML += t;
    },
    prepend: function (t) {
      if (Go.is(t, "HTMLElement")) return this.prependChild(t);
      this.innerHTML = t + this.innerHTML;
    },
    prependChild: function (t) {
      this.insertBefore(t, this.firstChild);
    },
    put: function (t) {
      if ((this.clean(), Go.is(t, "HTMLElement"))) return this.appendChild(t);
      this.innerHTML = t;
    },
    child: function (t) {
      return Go.is(t, "HTMLElement") ? this.appendChild(t) : this.querySelector(t);
    },
    find: function (t) {
      return this.querySelectorAll(t);
    },
    select: function (t) {
      return this.querySelector(t);
    },
    parent: function (t) {
      return this.closest(t);
    },
    $slot: function (t) {
      return this.querySelector(`[slot=${t}]`);
    },
    $destroy: function () {
      (this.ondestroy = this.attrs.ondestroy || Go.attr(this, "ondestroy")),
        Go.is(this.ondestroy, "Function") && this.ondestroy(),
        Go.is(this.ondestroy, "stringFunction") && Go.eval(this.ondestroy),
        this.emit("destroy");
    },
    clean: function () {
      this.innerHTML = "";
    },
    loading: function (t = 0) {
      (this.latestHTML = this.innerHTML), (this.innerHTML = '<div class="loader"><go-icon name="gspinner"></go-icon></div>');
    },
    loaded: function () {
      this.innerHTML = this.latestHTML;
    },
    unloading: function () {
      this.innerHTML = this.latestHTML;
    },
    onunload: function () {
      Go.off("resized:" + this.styleId);
    },
    listenStyles: function () {
      (this.styleId = "style-" + Go.uuid()),
        (this.globalStyle = this.getDinamycStyle("style-glob")),
        (this.tabletStyle = this.getDinamycStyle("style-tbl")),
        (this.mobileStyle = this.getDinamycStyle("style-mbl")),
        (this.desktopStyle = this.getDinamycStyle("style-dsk")),
        (this.ntbStyle = this.getDinamycStyle("style-ntb")),
        (this.hasStyle = this.globalStyle || this.tabletStyle || this.mobileStyle || this.desktopStyle || this.ntbStyle),
        this.hasStyle &&
          (this.mapStyles(),
          Go.on("resized:" + this.styleId, () => {
            this.mapStyles();
          }));
    },
    mapStyles: function () {
      this.globalStyle && Go.style(this, this.globalStyle),
        Go.is(document, "tabletScreen") && this.tabletStyle
          ? Go.style(this, this.tabletStyle)
          : Go.is(document, "mobileScreen") && this.mobileStyle
          ? Go.style(this, this.mobileStyle)
          : Go.is(document, "desktopScreen") && this.desktopStyle
          ? Go.style(this, this.desktopStyle)
          : Go.is(document, "notebookScreen") && this.ntbStyle && Go.style(this, this.ntbStyle);
    },
    getDinamycStyle: function (t) {
      return this[t] || this.attrs[t] || (Go.attr(this, t) ? Go.attr(this, t) : Go.prop(t, this) ? Go.prop(t, this) : null);
    },
  }),
  Object.assign(ElementEvents, {
    readyEvents: function () {
      this.events = [];
    },
    isGlobalEvents: function () {
      this.events || this.readyEvents();
    },
    on: function (t, e) {
      Array.isArray(t)
        ? t.forEach((t) => {
            this.on(t, e);
          })
        : (this.isGlobalEvents(), this.events.push({ event: t, callback: e }));
    },
    emit: function (e, i) {
      this.isGlobalEvents(),
        this.events.forEach((t) => {
          (t.event !== e && !t.event.startsWith(e + ":")) || t.callback(i);
        });
    },
    off: function (t) {
      this.isGlobalEvents(), Go.removeObjectFromArray(this.events, "event", t);
    },
    once: function (t, e) {
      this.off(t, e), this.on(t, e);
    },
  }),
  Object.assign(ElementProperties, {
    prop: function (t, e) {
      return Go.is(e, "falsy") ? this.getProps(t) : Go.prop(this, t, e);
    },
    getProps: function (t) {
      var e = Object.keys(this).map((t) => ({ [t]: this[t] })),
        e = Object.assign({}, ...e);
      return Go.is(t, "string") ? Go.prop(t, e) : e;
    },
  }),
  Object.assign(GO, MODULE_LUIGI_OS_GOCOMPONENTJS);
const GO_CONFIG = {},
  MODULE_LUIGI_OS_GOCONFIGJS = { config: (t, e) => GO_CONFIG.config(t, e), state: (t, e) => GO_CONFIG.config(t, e) },
  GO_CONFIRM =
    ((GO_CONFIG.config = function (t, e) {
      if (!["setConfig", "getConfig"].includes(t)) return Go.is(e, "set") ? GO_CONFIG.setConfig(t, e) : GO_CONFIG.getConfig(t);
    }),
    (GO_CONFIG.getConfig = function (t) {
      return GO_CONFIG[t];
    }),
    (GO_CONFIG.setConfig = function (t, e) {
      return "--" == (e = "++" == e ? Number(GO_CONFIG.getConfig(t)) + 1 : e) && (e = Number(GO_CONFIG.getConfig(t)) - 1), (GO_CONFIG[t] = e);
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOCONFIGJS),
    {}),
  Confirm = function (t = {}, e = {}) {
    (this.template = ""),
      (this.id = Go.uuid()),
      (this.data = Go.is(t, "string") ? { message: t } : t),
      (this.conf = Go.is(e, "string") ? { title: e } : e),
      Object.assign(this, this.data, this.conf),
      (this.isOpen = this.data.opened || this.data.started || !1),
      this.isOpen && this.show();
  },
  MODULE_LUIGI_OS_GOCONFIRMJS = {
    confirm: (t, e) => new Confirm(t, e),
    acceptConfirm: (t) => {
      GO_CONFIRM[t] &&
        (Go.is(GO_CONFIRM[t].onaccept, "function") && GO_CONFIRM[t].onaccept(GO_CONFIRM[t].view),
        Go.is(GO_CONFIRM[t].resolve, "function") && GO_CONFIRM[t].resolve(!0),
        Go.close(".confirm" + t));
    },
    cancelConfirm: (t) => {
      GO_CONFIRM[t] &&
        (Go.is(GO_CONFIRM[t].oncancel, "function") && GO_CONFIRM[t].oncancel(GO_CONFIRM[t].view),
        Go.is(GO_CONFIRM[t].reject, "function") && GO_CONFIRM[t].reject(!1),
        Go.close(".confirm" + t));
    },
  },
  GO_COOKIE =
    ((Confirm.prototype.show = function () {
      return new Promise((t, e) => {
        (GO_CONFIRM[this.id] = {}),
          (GO_CONFIRM[this.id].onaccept = this.onaccept),
          (GO_CONFIRM[this.id].oncancel = this.oncancel),
          (GO_CONFIRM[this.id].resolve = t),
          (GO_CONFIRM[this.id].reject = e),
          (this.class = (this.data.class || "") + " " + (this.conf.class || "")),
          (GO_CONFIRM[this.id].view = Go.view({
            title: this.title || Go.lang("confirm"),
            html: this.bodyTemplate(),
            animation: "midTopIn",
            ...this.data,
            ...this.conf,
            class: this.class + " default size1 confirm confirm" + this.id,
          }));
      });
    }),
    (Confirm.prototype.open = function () {
      return this.show();
    }),
    (Confirm.prototype.bodyTemplate = function () {
      return (
        (this.confirmAttr = `acceptLabel='${this.data.acceptLabel || ""}' cancelLabel='${this.data.cancelLabel || ""}' `),
        (this.confirmAttr += `oncancel='Go.cancelConfirm("${this.id}")' onaccept='Go.acceptConfirm("${this.id}")' `),
        (this.template += '<div w100 class="confirmWin">'),
        (this.template += "<div gap>"),
        (this.template += this.message),
        (this.template += "</div>"),
        (this.template += '<div w100 class="options" inline-flex flex-end>'),
        (this.template += `<go-confirm ${this.confirmAttr}></go-confirm>`),
        (this.template += "</div>"),
        (this.template += "</div>"),
        this.template
      );
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOCONFIRMJS),
    {}),
  MODULE_LUIGI_OS_GOCOOKIEJS =
    ((GO_COOKIE.setCookie = function (t, e, i = 365) {
      var o = new Date(),
        i = (o.setTime(o.getTime() + 24 * i * 60 * 60 * 1e3), "expires=" + o.toUTCString());
      document.cookie = t + "=" + e + ";" + i + ";path=/";
    }),
    (GO_COOKIE.getCookie = function (t) {
      var i = t + "=",
        o = document.cookie.split(";");
      for (let e = 0; e < o.length; e++) {
        let t = o[e];
        for (; " " === t.charAt(0); ) t = t.substring(1);
        if (0 === t.indexOf(i)) return t.substring(i.length, t.length);
      }
      return "";
    }),
    (GO_COOKIE.deleteCookie = function (t) {
      document.cookie = t + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    }),
    GO_COOKIE),
  GO_COUNTERS = (Object.assign(GO, MODULE_LUIGI_OS_GOCOOKIEJS), {}),
  GO_COUNTER = function (t, e = 0) {
    (this.id = t || Go.uuid()), (GO_COUNTERS[this.id] ||= e), (this.value = GO_COUNTERS[this.id]);
  },
  MODULE_LUIGI_OS_GOCOUNTERJS = {
    counter: function () {
      return new GO_COUNTER(...arguments);
    },
  },
  GO_DATE =
    ((GO_COUNTER.prototype.increment = function () {
      return (GO_COUNTERS[this.id] += 1), GO_COUNTERS[this.id];
    }),
    (GO_COUNTER.prototype.decrement = function () {
      return --GO_COUNTERS[this.id], GO_COUNTERS[this.id];
    }),
    (GO_COUNTER.prototype.reset = function () {
      return (GO_COUNTERS[this.id] = 0), GO_COUNTERS[this.id];
    }),
    (GO_COUNTER.prototype.sum = function (t = 0) {
      return (GO_COUNTERS[this.id] += t), GO_COUNTERS[this.id];
    }),
    (GO_COUNTER.prototype.substract = function (t = 0) {
      return (GO_COUNTERS[this.id] -= t), GO_COUNTERS[this.id];
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOCOUNTERJS),
    {}),
  MODULE_LUIGI_OS_GODATEJS =
    ((GO_DATE.date = function (t, e) {
      return (t = t || new Date(t)), GO_DATE.dateFormat(t, e);
    }),
    (GO_DATE.year = function (t) {
      return (t = t && Go.is(t, "string") ? new Date(t) : t || new Date()).getFullYear();
    }),
    (GO_DATE.month = function (t) {
      (t = t && Go.is(t, "string") ? new Date(t) : t || new Date()).getMonth();
    }),
    (GO_DATE.day = function (t) {
      (t = t && Go.is(t, "string") ? new Date(t) : t || new Date()).getDate();
    }),
    (GO_DATE.dateFormat = function (t, e) {
      var { lang: e = "en", format: i = "yyyy-mm-dd" } = (e = Go.is(e, "String") ? { format: e } : e),
        [e, o, n] = (t = (t = Go.is(t, "String") ? new Date(t) : t).toLocaleDateString(e, { year: "numeric", month: "numeric", day: "numeric", timeZone: "UTC" })).split("/");
      return (t = (t = (t = i.replace("yyyy", n)).replace("mm", Go.fixZeros(e))).replace("dd", Go.fixZeros(o)));
    }),
    (GO_DATE.getYearsDiff = function (t, e = new Date()) {
      return t &&
        e &&
        ("number" == typeof (t = "string" == typeof t ? new Date(t) : t) && (t = new Date(t)),
        "number" == typeof (e = "string" == typeof e ? new Date(e) : e) && (e = new Date(e)),
        "object" == typeof t) &&
        "object" == typeof e &&
        t instanceof Date &&
        e instanceof Date
        ? e.getFullYear() - t.getFullYear()
        : 0;
    }),
    (GO_DATE.getMonthsDiff = function (t, e = new Date()) {
      return t &&
        e &&
        ("number" == typeof (t = "string" == typeof t ? new Date(t) : t) && (t = new Date(t)),
        "number" == typeof (e = "string" == typeof e ? new Date(e) : e) && (e = new Date(e)),
        "object" == typeof t) &&
        "object" == typeof e &&
        t instanceof Date &&
        e instanceof Date
        ? e.getMonth() - t.getMonth()
        : 0;
    }),
    (GO_DATE.getDaysDiff = function (t, e = new Date()) {
      return t &&
        e &&
        ("number" == typeof (t = "string" == typeof t ? new Date(t) : t) && (t = new Date(t)),
        "number" == typeof (e = "string" == typeof e ? new Date(e) : e) && (e = new Date(e)),
        "object" == typeof t) &&
        "object" == typeof e &&
        t instanceof Date &&
        e instanceof Date
        ? e.getDate() - t.getDate()
        : 0;
    }),
    (GO_DATE.getHoursDiff = function (t, e = new Date()) {
      return t &&
        e &&
        ("number" == typeof (t = "string" == typeof t ? new Date(t) : t) && (t = new Date(t)),
        "number" == typeof (e = "string" == typeof e ? new Date(e) : e) && (e = new Date(e)),
        "object" == typeof t) &&
        "object" == typeof e &&
        t instanceof Date &&
        e instanceof Date
        ? e.getHours() - t.getHours()
        : 0;
    }),
    (GO_DATE.getMinutesDiff = function (t, e = new Date()) {
      return t &&
        e &&
        ("number" == typeof (t = "string" == typeof t ? new Date(t) : t) && (t = new Date(t)),
        "number" == typeof (e = "string" == typeof e ? new Date(e) : e) && (e = new Date(e)),
        "object" == typeof t) &&
        "object" == typeof e &&
        t instanceof Date &&
        e instanceof Date
        ? e.getMinutes() - t.getMinutes()
        : 0;
    }),
    (GO_DATE.getSecondsDiff = function (t, e = new Date()) {
      return t &&
        e &&
        ("number" == typeof (t = "string" == typeof t ? new Date(t) : t) && (t = new Date(t)),
        "number" == typeof (e = "string" == typeof e ? new Date(e) : e) && (e = new Date(e)),
        "object" == typeof t) &&
        "object" == typeof e &&
        t instanceof Date &&
        e instanceof Date
        ? e.getSeconds() - t.getSeconds()
        : 0;
    }),
    (GO_DATE.getMillisecondsDiff = function (t, e = new Date()) {
      return t &&
        e &&
        ("number" == typeof (t = "string" == typeof t ? new Date(t) : t) && (t = new Date(t)),
        "number" == typeof (e = "string" == typeof e ? new Date(e) : e) && (e = new Date(e)),
        "object" == typeof t) &&
        "object" == typeof e &&
        t instanceof Date &&
        e instanceof Date
        ? e.getMilliseconds() - t.getMilliseconds()
        : 0;
    }),
    (GO_DATE.timestamp = function (t = new Date()) {
      return t && "object" == typeof (t = "number" == typeof (t = "string" == typeof t ? new Date(t) : t) ? new Date(t) : t) && t instanceof Date ? t.getTime() : 0;
    }),
    (GO_DATE.fixZeros = function (t) {
      return Number(t) < 10 ? "0" + t : t;
    }),
    (GO_DATE.date_locale = function (t, e = "en") {
      return (t = Go.is(t, "String") ? new Date(t) : t).toLocaleDateString(e, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
    }),
    (GO_DATE.dateLocale = function (t, e = "en") {
      return GO_DATE.date_locale(t, e);
    }),
    (GO_DATE.time_locale = function (t, e = "en") {
      return (t = Go.is(t, "String") ? new Date(t) : t).toLocaleTimeString(e, { hour: "numeric", minute: "numeric", second: "numeric", timeZone: "UTC" });
    }),
    (GO_DATE.datetime_locale = function (t, e = "en") {
      return (t = Go.is(t, "String") ? new Date(t) : t).toLocaleString(e, {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "UTC",
      });
    }),
    (GO_DATE.timeLocale = function (t, e = "en") {
      return GO_DATE.time_locale(t, e);
    }),
    (GO_DATE.getPastMonthDateRange = function (t = new Date(), e = "YYYY-MM-DD") {
      var i = new Date(t.getFullYear(), t.getMonth() - 1, 1),
        t = new Date(t.getFullYear(), t.getMonth(), 0);
      return e ? [GO_DATE.date(i, e), GO_DATE.date(t, e)] : [i, t];
    }),
    (GO_DATE.now = function () {
      return GO_DATE.timestamp();
    }),
    (GO_DATE.obtenerFechaEnFormato = function (t) {
      var e = new Date(),
        i = e.getFullYear(),
        o = String(e.getMonth() + 1).padStart(2, "0"),
        n = String(e.getDate()).padStart(2, "0");
      switch (t) {
        case "yyyy-mm-dd":
          return i + `-${o}-` + n;
        case "yyyy":
          return i;
        case "mm-dd":
          return o + "-" + n;
        default:
          return "Formato no válido";
      }
    }),
    GO_DATE),
  DataBase =
    (Object.assign(GO, MODULE_LUIGI_OS_GODATEJS),
    function (t = {}) {
      (this.data = "string" == typeof t ? { dbName: t } : t || {}), (this.dbName = this.data.dbName || "GoJsDB"), (this.table = this.data.table || "storage");
    }),
  MODULE_LUIGI_OS_GODBJS = {
    db: function () {
      return new DataBase(...arguments);
    },
  },
  GO_DEVICE =
    ((DataBase.prototype.open = async function () {
      return new Promise((e, i) => {
        var t = indexedDB.open(this.dbName, 1);
        (t.onupgradeneeded = (t) => {
          t.target.result.createObjectStore(this.table, { keyPath: "key" });
        }),
          (t.onsuccess = (t) => e(t.target.result)),
          (t.onerror = (t) => i(t.target.error));
      });
    }),
    (DataBase.prototype.save = async function (o, n) {
      return new Promise(async (e, i) => {
        var t = (await this.open()).transaction([this.table], "readwrite").objectStore(this.table).put({ key: o, value: n });
        (t.onsuccess = (t) => e(t.target.result)), (t.onerror = (t) => i(t.target.error));
      });
    }),
    (DataBase.prototype.get = async function (o) {
      return new Promise(async (e, i) => {
        var t = (await this.open()).transaction([this.table], "readonly").objectStore(this.table).get(o);
        (t.onsuccess = (t) => e(t.target.result && t.target.result.value)), (t.onerror = (t) => i(t.target.error));
      });
    }),
    (DataBase.prototype.remove = async function (o) {
      return new Promise(async (e, i) => {
        var t = (await this.open()).transaction([this.table], "readwrite").objectStore(this.table).delete(o);
        (t.onsuccess = (t) => e(t.target.result)), (t.onerror = (t) => i(t.target.error));
      });
    }),
    (DataBase.prototype.clear = async function () {
      return new Promise(async (e, i) => {
        var t = (await this.open()).transaction([this.table], "readwrite").objectStore(this.table).clear();
        (t.onsuccess = (t) => e(t.target.result)), (t.onerror = (t) => i(t.target.error));
      });
    }),
    (DataBase.prototype.getAll = async function () {
      return new Promise(async (e, i) => {
        var t = (await this.open()).transaction([this.table], "readonly").objectStore(this.table).getAll();
        (t.onsuccess = (t) => e(t.target.result)), (t.onerror = (t) => i(t.target.error));
      });
    }),
    (DataBase.prototype.existsDatabase = function () {
      return new Promise((e, t) => {
        const i = indexedDB.open(this.dbName);
        (i.onerror = () => {
          t(new Error("Error al verificar la base de datos"));
        }),
          (i.onsuccess = () => {
            i.result.close(), e(!0);
          }),
          (i.onupgradeneeded = (t) => {
            t.target.result.close(), e(!1);
          });
      });
    }),
    (DataBase.prototype.destroy = async function () {
      return new Promise((e, i) => {
        var t = indexedDB.deleteDatabase(this.dbName);
        (t.onsuccess = (t) => e(t.target.result)), (t.onerror = (t) => i(t.target.error));
      });
    }),
    (DataBase.prototype.findAll = DataBase.prototype.getAll),
    (DataBase.prototype.set = DataBase.prototype.save),
    (DataBase.prototype.delete = DataBase.prototype.remove),
    (DataBase.prototype.onsuccess = function () {}),
    (DataBase.prototype.onerror = function () {}),
    Object.assign(GO, MODULE_LUIGI_OS_GODBJS),
    function () {
      (this.model = null), (this.os = null), (this.data = {}), (this.db = null);
    }),
  MODULE_LUIGI_OS_GODEVICEJS =
    ((GO_DEVICE.prototype.init = async function () {
      return (this.data = (await Go.db("device").get("data")) || {}), this.data.uuid || ((this.data.uuid = Go.uuid()), await Go.db("device").set("data", this.data)), this.data;
    }),
    { device: new GO_DEVICE() }),
  GO_DOM =
    ((GO_DEVICE.prototype.vibrate = function (t) {
      "vibrate" in navigator && navigator.vibrate(t);
    }),
    (GO_DEVICE.prototype.get = function (t) {
      return this.data[t];
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GODEVICEJS),
    {}),
  MODULE_LUIGI_OS_GODOMJS =
    ((GO_DOM.removeAllClassOnGO_DOM = function (e) {
      document.querySelectorAll("." + e).forEach((t) => {
        t.classList.remove(e);
      });
    }),
    (GO_DOM.removeAllClassOnElement = function (t, e) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) &&
        t.querySelectorAll("." + e).forEach((t) => {
          t.classList.remove(e);
        });
    }),
    (GO_DOM.blurAll = function () {
      var t = document.createElement("input");
      document.body.appendChild(t), t.focus(), document.body.removeChild(t);
    }),
    (GO_DOM.put_html = function (t, e) {
      return Go.putHTML(e, t);
    }),
    (GO_DOM.putHTMLAfter = function (t, e) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.insertAdjacentHTML("afterend", e);
    }),
    (GO_DOM.putHTMLBefore = function (t, e) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.insertAdjacentHTML("beforebegin", e);
    }),
    (GO_DOM.putHTMLInside = function (t, e) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.insertAdjacentHTML("beforeend", e);
    }),
    (GO_DOM.putHTMLOutside = function (t, e) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.insertAdjacentHTML("afterbegin", e);
    }),
    (GO_DOM.removeHTML = function (t) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (t.innerHTML = "");
    }),
    (GO_DOM.appendHTML = function (t, e, i = {}) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (i.replace && t.querySelector(i.replace)?.remove(), window.$ ? $(t).append(e) : (t.innerHTML += e));
    }),
    (GO_DOM.prependHTML = function (t, e) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (window.$ ? $(t).prepend(e) : (t.innerHTML = e + t.innerHTML));
    }),
    (GO_DOM.removeElement = function (t) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.parentNode.removeChild(t);
    }),
    (GO_DOM.removeElementById = function (t) {
      t = document.getElementById(t);
      t.parentNode.removeChild(t);
    }),
    (GO_DOM.appendChild = function (t, e) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (Go.is(e, "HTMLElement") || (e = document.querySelector(e)), t.appendChild(e));
    }),
    (GO_DOM.replaceHTML = function (t, e) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (t.outerHTML = e);
    }),
    (GO_DOM.docTitle = function (t) {
      (t = t || document.title), Go.is(t, "function") && (t = t()), (document.title = t);
    }),
    (GO_DOM.extract = function (t, e, i) {
      var e = (t = t.replace(/(\r\n|\n|\r)/gm, "")).indexOf(e),
        o = t.indexOf(i);
      return t.substring(e, o + i.length);
    }),
    (GO_DOM.extractAll = function (t, e, i) {
      var o = (t = t.replace(/(\r\n|\n|\r)/gm, "")).indexOf(e),
        n = t.indexOf(i),
        o = t.substring(o, n + i.length),
        n = t.replace(o, "");
      return -1 < n.indexOf(e) ? [o].concat(this.extractAll(n, e, i)) : [o];
    }),
    (GO_DOM.render = function (t, e) {
      let [i, o, n, s] = [{}, t, e, !1];
      Go.is(e, "selector") && ((o = e), (n = t)),
        Go.is(o, "HTMLElement") || (o = document.querySelector(o)),
        (s = n.endsWith(".html") ? !0 : s)
          ? (Go.appendIfNotExists(o, Go.getSpinnerLoading(), "loading"),
            (i = Go.http.get(n, { responseType: "text" })).then(async (t) => {
              Go.addClass(o, "target leaving"),
                (o.innerHTML = Go.eval(t)),
                Go.removeClass(o, "leaving"),
                Go.addClass(o, "loaded"),
                await Go.sleep(Go.env("view_transition_time")),
                Go.removeClass(o, "target loaded");
            }),
            i.catch(async (t) => {
              Go.addClass(o, "target leaving"),
                (o.innerHTML = `<go-error>${Go.getErrorMessage(t)}</go-error>`),
                Go.removeClass(o, "leaving"),
                Go.addClass(o, "loaded"),
                await Go.sleep(Go.env("view_transition_time")),
                Go.removeClass(o, "target loaded");
            }))
          : (o.innerHTML = n);
    }),
    (GO_DOM.spinnerLoading = '<loading absolute centered><go-icon name="gspinner"></go-icon></loading>'),
    (GO_DOM.getSpinnerLoading = function (t) {
      return '<loading absolute centered><go-icon name="gspinner"></go-icon></loading>';
    }),
    (GO_DOM.setSpinnerLoading = function (t) {
      GO_DOM.spinnerLoading = t;
    }),
    (GO_DOM.domExec = function (t) {
      var e = Go.uuid();
      const i = document.createElement("div");
      (i.id = e),
        (i.style.display = "none"),
        document.body.appendChild(i),
        $("#" + e).html(t),
        Go.sleep(300).then(() => {
          document.body.removeChild(i);
        });
    }),
    (GO_DOM.countElements = function (t) {
      return t ? document.querySelectorAll(t).length : 0;
    }),
    (GO_DOM.parent = window.parent),
    (GO_DOM.enableFastClick = function () {
      document.addEventListener("touchstart", (t) => {});
    }),
    GO_DOM),
  GO_DRAG =
    (Object.assign(GO, MODULE_LUIGI_OS_GODOMJS),
    function (t) {
      (this.el = t),
        (this.started = !1),
        (this.startX = 0),
        (this.startY = 0),
        (this.distanceX = 0),
        (this.distanceY = 0),
        (this.direction = "none"),
        (this.lastX = 0),
        (this.lastY = 0),
        Go.extends(this, Go.Events),
        this.listen();
    }),
  MODULE_LUIGI_OS_GODRAGJS = { drag: (t) => new GO_DRAG(t) },
  GO_ELEMENT =
    ((GO_DRAG.prototype.listen = function () {
      Go.is(this.el, "HTMLElement") || (this.el = document.querySelector(this.el)),
        (this.el.onmousedown = this.moveStart.bind(this)),
        (this.el.onmousemove = this.moving.bind(this)),
        (this.el.onmouseleave = this.moveEnd.bind(this)),
        (this.el.onmouseup = this.moveEnd.bind(this)),
        (this.el.onblur = this.moveEnd.bind(this)),
        (this.el.ondragstart = this.moveStart.bind(this)),
        (this.el.ondrag = this.moving.bind(this)),
        (this.el.ondragend = this.moveEnd.bind(this)),
        (this.el.ontouchstart = this.moveStart.bind(this)),
        (this.el.ontouchmove = this.moving.bind(this)),
        (this.el.ontouchend = this.moveEnd.bind(this)),
        (this.el.ontouchcancel = this.moveEnd.bind(this));
    }),
    (GO_DRAG.prototype.moveStart = function (t) {
      (this.started = !0),
        (this.startX = t.pageX || t.touches[0].pageX),
        (this.startY = t.pageY || t.touches[0].pageY),
        (this.distanceX = 0),
        (this.distanceY = 0),
        (this.lastX = 0),
        (this.lastY = 0),
        (this.dirs = {}),
        this.emit("moveStart", { event: t, x: this.distanceX, y: this.distanceY });
    }),
    (GO_DRAG.prototype.moving = function (t) {
      this.started &&
        ((this.distanceX = (t.pageX || t.touches[0].pageX) - this.startX),
        (this.distanceY = (t.pageY || t.touches[0].pageY) - this.startY),
        (this.dirs = { up: this.distanceY < this.lastY, down: this.distanceY > this.lastY, left: this.distanceX < this.lastX, right: this.distanceX > this.lastX }),
        this.emit("moving", { event: t, axis: this.dirs, x: this.distanceX, y: this.distanceY }));
    }),
    (GO_DRAG.prototype.moveEnd = function (t) {
      this.started &&
        ((this.started = !1),
        (this.startX = 0),
        (this.startY = 0),
        (this.lastX = this.distanceX),
        (this.lastY = this.distanceY),
        this.emit("moveEnd", { event: t, axis: this.dirs, x: this.distanceX, y: this.distanceY }));
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GODRAGJS),
    {}),
  GO_ELEMENT_CREATE_PROTOTYPE =
    ((GO_ELEMENT.addClass = function (e, i) {
      Go.is(e, "String") && (e = document.querySelectorAll(e)),
        Go.is(e, "Array") || Go.is(e, "NodeList")
          ? e.forEach((t) => {
              GO_ELEMENT.addClass(t, i);
            })
          : Go.is(i, "String") && i.includes(" ")
          ? i.split(" ").forEach((t) => {
              t && GO_ELEMENT.addClass(e, t);
            })
          : Go.is(i, "Array")
          ? i.forEach((t) => {
              t && GO_ELEMENT.addClass(e, t);
            })
          : e && e.classList.add(i);
    }),
    (GO_ELEMENT.removeClass = function (e, i) {
      Go.is(e, "HTMLElement") || (e = document.querySelector(e)),
        Go.is(i, "String") && i.includes(" ")
          ? i.split(" ").forEach((t) => {
              t && GO_ELEMENT.removeClass(e, t);
            })
          : Go.is(e, "Array") || Go.is(e, "NodeList")
          ? i.forEach((t) => {
              i && GO_ELEMENT.removeClass(e, i);
            })
          : e && e.classList.remove(i);
    }),
    (GO_ELEMENT.removeClasses = function (e, t) {
      Go.is(e, "HTMLElement") || (e = document.querySelector(e)),
        Go.is(t, "String") && t.includes(" ") && (t = t.split(" ")),
        e &&
          t.forEach((t) => {
            e.classList.remove(t);
          });
    }),
    (GO_ELEMENT.rmClass = function () {
      GO_ELEMENT.removeClass(...arguments);
    }),
    (GO_ELEMENT.rmClasses = function () {
      GO_ELEMENT.removeClasses(...arguments);
    }),
    (GO_ELEMENT.hasClass = function (t, e) {
      return !!(t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.classList.contains(e);
    }),
    (GO_ELEMENT.toggleClass = function (t, e) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.classList.toggle(e);
    }),
    (GO_ELEMENT.toggleClasses = function (e, t) {
      (e = Go.is(e, "HTMLElement") ? e : document.querySelector(e)) &&
        t.forEach((t) => {
          e.classList.toggle(t);
        });
    }),
    (GO_ELEMENT.isEmpty = function (t) {
      return !!(t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && "" === t.innerHTML;
    }),
    (GO_ELEMENT.awaitUntilElement = function (o, n = {}) {
      return new Promise(async (t, e) => {
        var i = await GO_ELEMENT.awaitForElement(o, n);
        return i ? t(i) : e(`Go.awaitUntilElement: Element (${o}) not found, timeout`);
      });
    }),
    (GO_ELEMENT.awaitForElement = async function (t, e = {}) {
      const n = t,
        s = e.timeout || 5e3;
      let r = "HTMLInputElement" == typeof e ? e : e.scope || document;
      return new Promise((i, t) => {
        var e = r.querySelector(n);
        if (e) return i(e);
        const o = new MutationObserver((t) => {
          var e = r.querySelector(n);
          e && (o.disconnect(), i(e));
        });
        o.observe(r.body, { childList: !0, subtree: !0 }),
          setTimeout(() => {
            o.disconnect(), t(new Error(`Timeout: Element ${n} not found`));
          }, s);
      });
    }),
    (GO_ELEMENT.waitForElement = function (t, e = {}) {
      return GO_ELEMENT.awaitUntilElement(t, e);
    }),
    (GO_ELEMENT.awaitElement = function (t, e = {}) {
      return GO_ELEMENT.awaitUntilElement(t, e);
    }),
    (GO_ELEMENT.waitForSelector = function (t, e = {}) {
      return GO_ELEMENT.awaitForElement(t, e);
    }),
    (GO_ELEMENT.awaitForSelector = function (t, e = {}) {
      return GO_ELEMENT.awaitForElement(t, e);
    }),
    (GO_ELEMENT.awaitSelector = function (t, e = {}) {
      return GO_ELEMENT.awaitForElement(t, e);
    }),
    (GO_ELEMENT.parseAllAttributes = function (t) {
      if (!(t = Go.is(t, "HTMLElement") ? t : document.querySelector(t))) return {};
      var e = {},
        i = t.attributes;
      for (let t = 0; t < i.length; t++) {
        var { name: o, value: n } = i[t];
        e[o] = n;
      }
      return e;
    }),
    (GO_ELEMENT.uniqueClass = function (e, t, i) {
      i = (i = Go.is(i, "HTMLElement") ? i : document.querySelector(i)) || document.body;
      var [o, n] = [e, t],
        o = (Go.is(e, "someStartsWith", ["#", "."]) && ((t = o), (e = n)), Go.is(t, "string") && t.includes(",") && (t = t.split(",")), i.querySelectorAll("." + e));
      o && o.forEach((t) => t.classList.remove(e)),
        Go.is(t, "string") && (t = document.querySelectorAll(t)),
        Go.is(t, "Array") || Go.is(t, "NodeList")
          ? t.forEach((t) => {
              GO_ELEMENT.addClass(t, e);
            })
          : GO_ELEMENT.addClass(t, e);
    }),
    (GO_ELEMENT.uniClass = function () {
      GO_ELEMENT.uniqueClass(...arguments);
    }),
    (GO_ELEMENT.scrollIntoView = function (t) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.scrollIntoView({ behavior: "smooth", block: "start" });
    }),
    (GO_ELEMENT.select = function (t) {
      return (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) ? (Go.extends(t, Go.events), t) : null;
    }),
    (GO_ELEMENT.isScrollTop = function (t) {
      return !!(t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && 0 === t.scrollTop;
    }),
    (GO_ELEMENT.isScrollBottom = function (t) {
      return !!(t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.scrollTop + t.clientHeight === t.scrollHeight;
    }),
    (GO_ELEMENT.isScrollLeft = function (t) {
      return !!(t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && 0 === t.scrollLeft;
    }),
    (GO_ELEMENT.isScrollRight = function (t) {
      return !!(t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.scrollLeft + t.clientWidth === t.scrollWidth;
    }),
    (GO_ELEMENT.scrollBottom = function (t) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (t.scrollTop = t.scrollHeight);
    }),
    (GO_ELEMENT.scrollTop = function (t) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (t.scrollTop = 0);
    }),
    (GO_ELEMENT.scrollLeft = function (t) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (t.scrollLeft = 0);
    }),
    (GO_ELEMENT.scrollRight = function (t) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (t.scrollLeft = t.scrollWidth);
    }),
    (GO_ELEMENT.scroll = function (t, e = {}) {
      var i, o;
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (({ top: e, left: i, behavior: o = "smooth" } = e), t.scrollTo({ top: e, left: i, behavior: o }));
    }),
    (GO_ELEMENT.scrollBy = function (t, e = {}) {
      var i, o;
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (({ top: e, left: i, behavior: o = "smooth" } = e), t.scrollBy({ top: e, left: i, behavior: o }));
    }),
    (GO_ELEMENT.scrollIntoView = function (t, e = {}) {
      var i, o;
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) &&
        (({ behavior: e = "smooth", block: i = "start", inline: o = "nearest" } = e), t.scrollIntoView({ behavior: e, block: i, inline: o }));
    }),
    (GO_ELEMENT.scrollIntoViewIfNeeded = function (t, e = {}) {
      var i, o;
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) &&
        (({ behavior: e = "smooth", block: i = "start", inline: o = "nearest" } = e), t.scrollIntoViewIfNeeded({ behavior: e, block: i, inline: o }));
    }),
    (GO_ELEMENT.scrollIntoViewCenter = function (t, e = {}) {
      var i, o;
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) &&
        (({ behavior: e = "smooth", block: i = "center", inline: o = "center" } = e), t.scrollIntoView({ behavior: e, block: i, inline: o }));
    }),
    (GO_ELEMENT.toggleAttribute = function (t, e, i) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (t.hasAttribute(e) ? t.removeAttribute(e) : t.setAttribute(e, i));
    }),
    (GO_ELEMENT.setAttributes = function () {
      return GO_ELEMENT.setAttrs(...arguments);
    }),
    (GO_ELEMENT.toggleClass = function (t, e) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.classList.toggle(e);
    }),
    (GO_ELEMENT.toggleStyle = function (t, e, i) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (t.style[e] ? (t.style[e] = "") : (t.style[e] = i));
    }),
    (GO_ELEMENT.toggleAttributeValues = function (t, e, i) {
      var o;
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (-1 === (o = i.indexOf(t.getAttribute(e))) ? t.setAttribute(e, i[0]) : t.setAttribute(e, i[o + 1] || i[0]));
    }),
    (GO_ELEMENT.getAllAttributes = function (t) {
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t))) return Array.from(t.attributes).reduce((t, e) => ((t[e.name] = e.value), t), {});
    }),
    (GO_ELEMENT.attr = function (t, e, i) {
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t))) return void 0 === i ? t.getAttribute(e) : void t.setAttribute(e, i);
    }),
    (GO_ELEMENT.attrs = function (e, i) {
      if ((e = Go.is(e, "HTMLElement") ? e : document.querySelector(e)))
        return i
          ? void Object.keys(i).forEach((t) => {
              e.setAttribute(t, i[t]);
            })
          : GO_ELEMENT.getAllAttributes(e);
    }),
    (GO_ELEMENT.prop = function (t, e, i = void 0) {
      if (t)
        return Go.is(e, "array")
          ? Go.find(t, e)
          : !Go.is(t, "HTMLElement") && Go.is(e, "object")
          ? Go.getProp(e, t)
          : !Go.is(t, "HTMLElement") && Go.has(t, "someProperty")
          ? Go.getProp(t, e)
          : (Go.is(t, "HTMLElement") || (t = document.querySelector(t)), void 0 === i ? t[e] || Go.attr(t, e) : void (t[e] = i));
    }),
    (GO_ELEMENT.hasAttr = function (t, e) {
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t))) return t.hasAttribute(e);
    }),
    (GO_ELEMENT.removeAttr = function (t, e) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.removeAttribute(e);
    }),
    (GO_ELEMENT.removeAttrs = function (e, t) {
      (e = Go.is(e, "HTMLElement") ? e : document.querySelector(e)) &&
        t.forEach((t) => {
          e.removeAttribute(t);
        });
    }),
    (GO_ELEMENT.setAttr = function (t, e, i) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.setAttribute(e, i);
    }),
    (GO_ELEMENT.setAttrs = function (e, i) {
      (e = Go.is(e, "HTMLElement") ? e : document.querySelector(e)) &&
        Object.keys(i).forEach((t) => {
          e.setAttribute(t, i[t]);
        });
    }),
    (GO_ELEMENT.cssVar = function (t, e, i) {
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t))) return void 0 === i ? getComputedStyle(t).getPropertyValue(e) : void t.style.setProperty(e, i);
    }),
    (GO_ELEMENT.setCssVar = function () {
      return GO_ELEMENT.cssVar(...arguments);
    }),
    (GO_ELEMENT.close = async function (t, e) {
      var i;
      t &&
        (Go.is(t, "string") && t.includes(",") && (t = t.split(",")),
        Go.is(t, "string") && t.includes("&&") && (t = t.split("&&")),
        Go.is(t, "Array")
          ? t.forEach((t) => GO_ELEMENT.close(t))
          : (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) &&
            ((i = t.querySelector(`#header_${t.id} .closeElement`)) ? i.click() : Go.is(t.close, "Function") && t.close()),
        Go.is(e, "Function")) &&
        e();
    }),
    (GO_ELEMENT.closeAll = function (t, e) {
      (t = Go.is(t, "NodeList") || Go.is(t, "Array") ? t : document.querySelectorAll(t)) && t.forEach((t) => GO_ELEMENT.close(t)), Go.is(e, "Function") && e();
    }),
    (GO_ELEMENT.text = function (t, e) {
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t))) return void 0 === e ? t.textContent : void (t.textContent = e);
    }),
    (GO_ELEMENT.html = function (t, e) {
      if (t) return void 0 === e ? t.innerHTML : void GO_ELEMENT.putHTML(t, e);
    }),
    (GO_ELEMENT.putHTML = function (t, e) {
      Go.is(t, "HTMLElement") || (t = document.querySelector(t)), window.$ ? $(t).html(e) : (t.innerHTML = e);
    }),
    (GO_ELEMENT.append = function (t, e) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (Go.is(e, "HTMLElement") ? t.append(e) : t.insertAdjacentHTML("beforeend", e));
    }),
    (GO_ELEMENT.appendIfNotExists = function (t, e, i) {
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && !t.querySelector(i)) return GO_ELEMENT.append(t, e);
    }),
    (GO_ELEMENT.appendIfReplace = function (t, e, i) {
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t))) return (i = t.querySelector(i)) && i.remove(), GO_ELEMENT.append(t, e);
    }),
    (GO_ELEMENT.prepend = function (t, e) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (Go.is(e, "HTMLElement") ? t.prepend(e) : t.insertAdjacentHTML("afterbegin", e));
    }),
    (GO_ELEMENT.prependIfNotExists = function (t, e, i) {
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && !t.querySelector(i)) return GO_ELEMENT.prepend(t, e);
    }),
    (GO_ELEMENT.empty = function (t) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && (t.innerHTML = "");
    }),
    (GO_ELEMENT.clean = function () {
      return GO_ELEMENT.empty(...arguments);
    }),
    (GO_ELEMENT.clear = function () {
      return GO_ELEMENT.empty(...arguments);
    }),
    (GO_ELEMENT.in = function (t, e) {
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t))) return Go.is(t[e], "function") ? t[e]() : t[e];
    }),
    (GO_ELEMENT.getClosest = function (t, e) {
      if (t && e && (t = Go.is(t, "string") && !Go.is(t, "HTMLElement") ? document.querySelector(t) : t)) return t.closest(e);
    }),
    (GO_ELEMENT.closeParent = async function (t, e) {
      t.preventDefault && t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation();
      let i = Go.getClosest(t.target, ".View");
      (i = i || Go.getClosest(t.target, ".element")) && (await GO_ELEMENT.close(i), Go.is(e, "function")) && e();
    }),
    (GO_ELEMENT.infoElement = function (t) {
      var e, i, o;
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)))
        return (
          (i = (e = t.getBoundingClientRect()).left + window.scrollX),
          (o = e.top + window.scrollY),
          e.bottom,
          window.scrollY,
          e.right,
          window.scrollX,
          { tag: t.tagName.toLowerCase(), height: t.offsetHeight, width: t.offsetWidth, left: t.offsetLeft, top: t.offsetTop, screenLeft: i, screenTop: o }
        );
    }),
    (GO_ELEMENT.info = function () {
      return GO_ELEMENT.infoElement(...arguments);
    }),
    (GO_ELEMENT.toggleClass = function (t, e) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.classList.toggle(e);
    }),
    (GO_ELEMENT.classIterator = async function (t, e = []) {
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)))
        for (const i of e)
          i.add && Go.addClass(t, i.add), i.remove && Go.removeClass(t, i.remove), i.toggle && Go.toggleClass(t, i.toggle), await Go.sleep(i.delay || i.duration || i.time || 0);
    }),
    (GO_ELEMENT.attributeIterator = async function (t, e = []) {
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)))
        for (const i of e) i.add && t.setAttribute(i.add, i.value), i.remove && t.removeAttribute(i.remove), await Go.sleep(i.delay || i.duration || i.time || 0);
    }),
    (GO_ELEMENT.remove = function (t) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.remove();
    }),
    (GO_ELEMENT.removeIf = function (t, e) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && e && t.remove();
    }),
    (GO_ELEMENT.element = function (t) {
      return (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && Go.extends(t, Go.Events), t;
    }),
    (GO_ELEMENT.el = function () {
      return GO_ELEMENT.element(...arguments);
    }),
    (GO_ELEMENT.child = function (t, e) {
      return Go.is(t, "HTMLElement") || (t = document.querySelector(t)), e ? (t ? t.querySelector(e) : void 0) : t;
    }),
    (GO_ELEMENT.changeTagName = function (t, e) {
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)))
        return ((e = document.createElement(e)).innerHTML = t.innerHTML), (e.className = t.className), (e.id = t.id), t.parentNode.replaceChild(e, t), e;
    }),
    (GO_ELEMENT.click = function (e) {
      if (Go.is(e, "string") && e.includes(",")) (e = e.split(",").map((t) => t.trim())).forEach((t) => GO_ELEMENT.click(t));
      else {
        if (!Go.is(e, "HTMLElement"))
          try {
            e = $(e)[0];
          } catch (t) {
            e = document.querySelector(e);
          }
        if (e)
          try {
            $(e).click();
          } catch (t) {
            e.click();
          }
      }
    }),
    (GO_ELEMENT.clicke = GO_ELEMENT.click),
    (GO_ELEMENT.value = function (t, e) {
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t))) return void 0 === e ? t.value : void (t.value = e);
    }),
    (GO_ELEMENT.text = function (t, e) {
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t))) return void 0 === e ? t.textContent : void (t.textContent = e);
    }),
    (GO_ELEMENT.bringToEndOfDom = function (t) {
      if ((t = Go.is(t, "HTMLElement") ? t : document.querySelector(t))) return t.parentNode, t.remove(), document.body.appendChild(t), t;
    }),
    (GO_ELEMENT.focus = function (t) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.focus();
    }),
    (GO_ELEMENT.blur = function (t) {
      (t = Go.is(t, "HTMLElement") ? t : document.querySelector(t)) && t.blur();
    }),
    (GO_ELEMENT.getEventListeners = function (t) {
      Go.is(t, "HTMLElement") || (t = document.querySelector(t));
      let o = {};
      var e = t.cloneNode();
      return (
        t.parentNode.replaceChild(e, t),
        (e.addEventListener = (t, e, i) => {
          o[t] || (o[t] = []), o[t].push({ type: t, listener: e, useCapture: i?.capture || !1 });
        }),
        t.parentNode.replaceChild(t, e),
        o
      );
    }),
    (GO_ELEMENT.replaceNode = function (t, e) {
      return Go.is(t, "string") && (t = document.querySelector(t)), Go.is(e, "string") && (e = document.querySelector(e)), t.parentNode.replaceChild(e, t), e;
    }),
    {}),
  MODULE_LUIGI_OS_GOELEMENTJS =
    ((GO_ELEMENT.create = function (e = "div", i) {
      const o = document.createElement(e.tag || e.tagName || e);
      if ("string" != typeof e || i) {
        "object" == typeof e && delete (i = e).tagName,
          (i.innerHTML ||= i.html || ""),
          (i.animation ||= i.animate),
          Object.assign(o, i, GO_ELEMENT_CREATE_PROTOTYPE),
          (o.className = "ge " + (i.class || i.className || "nc")),
          "object" == typeof i.attrs &&
            Object.keys(i.attrs).forEach((t) => {
              o.setAttribute(t, i.attrs[t]);
            }),
          i.style && o.setStyle(i),
          i.child && o.appendChild(GO_ELEMENT.create(i.child)),
          i.childrens &&
            i.childrens.forEach((t) => {
              o.appendChild(GO_ELEMENT.create(t));
            }),
          o.styles && "object" == typeof o.styles && o.setStyles(),
          i.animation && o.animate(i.animation),
          i.target && Go.html(i.target, o);
        let t = i.onrender || i.onRender;
        t && Go.sleep(0).then(() => t(o));
      }
      return o;
    }),
    (GO_ELEMENT.paint = GO_ELEMENT.create),
    (GO_ELEMENT_CREATE_PROTOTYPE.reactive = function () {
      this.setStyles();
    }),
    (GO_ELEMENT_CREATE_PROTOTYPE.animate = async function (t = {}) {
      const e = this,
        i = t.from || {},
        o = t.to || {};
      var n = t.duration || 250,
        s = t.delay || 0,
        r = t.onFinish || t.onfinish,
        a = t.onStart || t.onstart,
        c = t.ease || "ease-in-out";
      (this.style.transition = `all ${n}ms ` + c),
        Object.keys(i).forEach((t) => {
          this.style[t] = i[t];
        }),
        s && (await Go.sleep(s)),
        Go.is(a, "function") && a(t),
        Object.keys(o).forEach((t) => {
          e.style[t] = o[t];
        }),
        await Go.sleep(n),
        Go.is(r, "function") && r(t);
    }),
    (GO_ELEMENT_CREATE_PROTOTYPE.setStyle = function (t) {
      let e = t.style;
      "function" == typeof t.style && (e = t.style()),
        Object.keys(e).forEach((t) => {
          t.startsWith("--") ? this.style.setProperty(t, e[t]) : (this.style[t] = e[t]);
        });
    }),
    (GO_ELEMENT_CREATE_PROTOTYPE.setStyles = function () {
      this.styles &&
        ((this.baseStyles = this.styles.base || {}),
        (this.breakpointsStyles = this.styles.breakpoints || this.styles.media || this.styles.responsive || {}),
        Object.keys(this.baseStyles).forEach((t) => {
          let e = this.baseStyles[t];
          "function" == typeof e && (e = e()), (this.style[t] = e);
        }),
        Object.keys(this.breakpointsStyles).forEach((t) => {
          var e = window.matchMedia(`(${t})`);
          let i = this.breakpointsStyles[t];
          "function" == typeof i && (i = i()), e.matches ? Object.assign(this.style, i) : Object.assign(this.style, this.baseStyles);
        }));
    }),
    GO_ELEMENT),
  Emojis = (Object.assign(GO, MODULE_LUIGI_OS_GOELEMENTJS), {}),
  GO_EMOJIS = function () {
    this.data = Emojis;
  },
  emojis = new GO_EMOJIS(),
  MODULE_LUIGI_OS_GOEMOJISJS = { emojis: (t, e) => (t ? emojis.get(t, e) : emojis), emoji: (t, e) => emojis.get(t, e) },
  Enviroment =
    ((GO_EMOJIS.prototype.load = function (t) {
      if (Go.is(t, "array")) t.forEach((t) => this.load(t));
      else {
        if (!Go.is(t, "object") || !Go.has(t, "someProperty")) {
          let o = t + ".js";
          return (
            t.endsWith(".js") && (o = t),
            new Promise((e, i) => {
              o = Go.route.fixPath(o);
              var t = Go.import(o);
              t.then(({ default: t }) => {
                Object.assign(this.data, t), e();
              }),
                t.catch((t) => {
                  console.error(t), i();
                });
            })
          );
        }
        Object.assign(this.data, t);
      }
    }),
    (GO_EMOJIS.prototype.get = function (t, e) {
      return Go.is(t, "object")
        ? (Object.assign(this.data, t), this)
        : "fa" === e
        ? `<i class="fas fa-${t}" aria-hidden="true"></i>`
        : (e = Object.assign(this.data, window.icons, this.data))[t] || Go.getProperty(e, t);
    }),
    (GO_EMOJIS.prototype.add = function (t = {}) {
      return Object.assign(this.data, t), this;
    }),
    Object.assign(Emojis, { rocket: "🚀", ok: "👌", no: "👎", yes: "👍", 100: "💯", heart: "❤️", heart_eyes: "😍", heart_broken: "💔", exclamation: "❗️", camera: "📸" }),
    Object.assign(GO, MODULE_LUIGI_OS_GOEMOJISJS),
    function () {
      (this.data = {}), (window.process = window.process || {}), (window.process.env = window.process.env || {});
    }),
  enviroment = new Enviroment(),
  MODULE_LUIGI_OS_GOENVJS = { env: (t) => (t ? enviroment.get(t) : enviroment) },
  GO_ERROR =
    ((Enviroment.prototype.load = function (e) {
      if (Go.is(e, "array")) e.forEach((t) => this.load(t));
      else if (Go.is(e, "object") && Go.has(e, "someProperty")) Object.assign(this.data, e);
      else {
        let t = e + "/env.js";
        e.endsWith(".js") && (t = e), (t = Go.route.fixPath(t));
        const [i, o] = [this, import(t)];
        o.then(({ default: t }) => {
          i.set(t);
        }),
          o.catch((t) => {
            console.error(t);
          });
      }
    }),
    (Enviroment.prototype.get = function (t) {
      var e;
      return Go.is(t, "Object") ? this.set(t) : ((e = Object.assign({}, this.data, window.process.env)), Go.getProperty(e, t));
    }),
    (Enviroment.prototype.set = function (t = {}) {
      return Object.assign(this.data, t), Object.assign(window.process.env, t), this;
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOENVJS),
    {}),
  MODULE_LUIGI_OS_GOERRORSJS =
    ((GO_ERROR.isError = function (t, e) {
      return !!t && !!e && !!t.toString().includes("with status code " + e);
    }),
    (GO_ERROR.getErrorMessage = function (t, e) {
      return t
        ? t.message ||
            t.statusText ||
            (t.response && t.response.message ? t.response.message : t.response && t.response.data && t.response.data.message ? t.response.data.message : e || t.toString())
        : "";
    }),
    GO_ERROR),
  Evaluate =
    (Object.assign(GO, MODULE_LUIGI_OS_GOERRORSJS),
    function (t, e) {
      (this.data = t), (this.context = e);
    }),
  evaluate = (t, e) => new Evaluate(t, e).evaluate(t, e),
  MODULE_LUIGI_OS_GOEVALJS = { eval: evaluate },
  GO_EVENTS =
    ((Evaluate.prototype.evaluate = function (data, context) {
      if (!data) return data;
      if (Go.is(data, "function")) return data();
      if (Go.is(data, "stringFunction")) return eval(data);
      const regex = /{{(.*?)}}/g,
        matches = data.match(regex);
      return (
        matches &&
          matches.forEach((t) => {
            var t = t.replace("{{", "").replace("}}", "").trim(),
              e = this.eval(t, context);
            data = data.replace(`{{${t}}}`, e);
          }),
        this.revaluate(data, context)
      );
    }),
    (Evaluate.prototype.revaluate = function (i, o) {
      var t = i.match(/\${(.*?)}/g);
      return (
        t &&
          t.forEach((t) => {
            var t = t.replace("${", "").replace("}", "").trim(),
              e = this.eval(t, o);
            i = i.replace(`\${${t}}`, e);
          }),
        i
      );
    }),
    (Evaluate.prototype.eval = function (key, context = !1) {
      try {
        return context ? this.evalInContext(key, context) : eval(key);
      } catch (error) {
        return key;
      }
    }),
    (Evaluate.prototype.evalInContext = function (js, Context) {
      return function () {
        return eval(js);
      }.call(Context);
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOEVALJS),
    { events: [], Events: {} }),
  MODULE_LUIGI_OS_GOEVENTSJS =
    ((GO_EVENTS.emit = function (e, i) {
      Go.is(e, "string") && e.includes(" ") && (e = e.split(" ")),
        Go.is(e, "Array")
          ? e.forEach((t) => {
              GO_EVENTS.emit(t, i);
            })
          : GO_EVENTS.events.forEach((t) => {
              (t.event !== e && !t.event.startsWith(e + ":")) || t.callback(i);
            });
    }),
    (GO_EVENTS.on = function (t, e) {
      Array.isArray(t)
        ? t.forEach((t) => {
            GO_EVENTS.on(t, e);
          })
        : GO_EVENTS.events.push({ event: t, callback: e });
    }),
    (GO_EVENTS.off = function (t) {
      Go.is(t, "string") && t.includes(" ") && (t = t.split(" ")),
        Go.is(t, "Array")
          ? t.forEach((t) => {
              GO_EVENTS.off(t);
            })
          : Go.removeObjectFromArray(GO_EVENTS.events, "event", t);
    }),
    (GO_EVENTS.once = function (t, e) {
      Go.is(t, "string") && t.includes(" ") && (t = t.split(" ")),
        Go.is(t, "Array")
          ? t.forEach((t) => {
              GO_EVENTS.once(t, e);
            })
          : (GO_EVENTS.off(t, e), GO_EVENTS.on(t, e));
    }),
    (GO_EVENTS.event = function (t, e) {}),
    (GO_EVENTS.prevent = function (t) {
      t.preventDefault(), t.stopPropagation();
    }),
    (GO_EVENTS.parent = "object" == typeof parent.Go ? parent.Go : parent),
    Object.assign(GO_EVENTS.Events, {
      readyEvents: function () {
        this.events = [];
      },
      isGlobalEvents: function () {
        this.events || this.readyEvents();
      },
      on: function (t, e) {
        Array.isArray(t)
          ? t.forEach((t) => {
              this.on(t, e);
            })
          : (this.isGlobalEvents(), this.events.push({ event: t, callback: e }));
      },
      emit: function (e, i) {
        this.isGlobalEvents(),
          this.events.forEach((t) => {
            (t.event !== e && !t.event.startsWith(e + ":")) || t.callback(i);
          });
      },
      off: function (t) {
        this.isGlobalEvents(), Go.removeObjectFromArray(this.events, "event", t);
      },
      once: function (t, e) {
        this.off(t, e), this.on(t, e);
      },
    }),
    GO_EVENTS),
  GO_FETCH =
    (Object.assign(GO, MODULE_LUIGI_OS_GOEVENTSJS),
    function (t) {
      this.path = t;
    }),
  MODULE_LUIGI_OS_GOFETCHJS = { fetch: (t) => new GO_FETCH(t) },
  GO_FILES = (Object.assign(GO, MODULE_LUIGI_OS_GOFETCHJS), {}),
  MODULE_LUIGI_OS_GOFILESJS =
    ((GO_FILES.readFIle = function (o, t) {
      return o.type.match(t)
        ? new Promise((t, e) => {
            const i = new FileReader();
            i.readAsDataURL(o),
              (i.onload = function () {
                t(i.result);
              }),
              (i.onerror = function (t) {
                e(t);
              });
          })
        : Promise.reject(new Error("Invalid file type"));
    }),
    (GO_FILES.waitForFile = async (e, i = 1e3, o = 3e4, n = "HEAD") => {
      let s = [Date.now()][0];
      Go.is(e, "object") && ((e = e.url), (i = e.interval), (o = e.timeout), e.cb, (n = e.method));
      const r = async () => {
        try {
          var t = await fetch(e, { method: n });
          if (t.ok) return Promise.resolve(t);
        } catch (t) {}
        return Date.now() - s >= o ? Promise.reject(new Error(`Timeout: ${e} not available after ${o}ms`)) : (await Go.sleep(i), r());
      };
      return r();
    }),
    (GO_FILES.hasInputFile = (t) => !(!Go.is(t, "object") || (!(Go.is(t, "File") && 0 < t.size) && (!t.files || !t.files[0])))),
    GO_FILES),
  GO_FIX =
    (Object.assign(GO, MODULE_LUIGI_OS_GOFILESJS),
    function (t = "") {
      this.data = t;
    }),
  MODULE_LUIGI_OS_GOFIXJS = {
    fix: function (t = "") {
      return new GO_FIX(t);
    },
  },
  GO_FORM =
    ((GO_FIX.prototype.url = function () {
      return (this.url = this.data.replace(/([^:]\/)\/+/g, "$1")), this.url.endsWith("//") && this.url.slice(0, -1), this.url;
    }),
    (GO_FIX.prototype.path = GO_FIX.prototype.url),
    Object.assign(GO, MODULE_LUIGI_OS_GOFIXJS),
    {}),
  MODULE_LUIGI_OS_GOFORMJS =
    ((GO_FORM.form = function (t) {
      return !!t && (Go.is(t, "string") && (t = document.querySelector(t)), new FormData(t));
    }),
    (GO_FORM.transferInputs = function (t, e, i = {}) {
      if (!t || !e) return !1;
      Go.is(t, "string") && (t = document.querySelector(t)), Go.is(e, "string") && (e = document.querySelector(e)), i.keep || Go.empty(e);
      for (var o = t.querySelectorAll("input, select, textarea"), n = 0; n < o.length; n++) {
        var s,
          r = o[n],
          a = r.getAttribute("name");
        Go.is(a, "undefined") ||
          ((r = r.value),
          Go.remove(Go.child(e, `[name="${a}"]`)),
          (s = document.createElement("input")).setAttribute("type", "hidden"),
          s.setAttribute("name", a),
          s.setAttribute("value", r),
          e.appendChild(s));
      }
    }),
    (GO_FORM.execForm = function (t, e) {
      if (!(t = Go.is(t, "string") ? document.querySelector(t) : t)) return Go.alert(Go.lang("form_not_found"));
      var i = t.getAttribute("action");
      if (!i) return Go.alert(Go.lang("action_not_found"));
      var o = t.getAttribute("method") || "POST",
        t = new FormData(t),
        i = Go.xhr(i, { method: o, body: t });
      const n = Go.loader();
      i.catch((t) => {
        n.close(), Go.alert(Go.getErrorMessage(t, Go.lang("data_error")));
      }),
        i.then((t = {}) => {
          n.close(), t.success && Go.is(e, "function") && e(t), t.message && Go.alert(t.message), t.next && Go.eval(t.next);
        });
    }),
    (GO_FORM.sendForm = function () {
      return GO_FORM.execForm(...arguments);
    }),
    (GO_FORM.send = function () {
      return GO_FORM.execForm(...arguments);
    }),
    (GO_FORM.createForm = function (t = {}) {
      var e = [t.inputs || []][0];
      let [i, o] = [document.createElement("form"), ""];
      Go.is(t.class, "set") && Go.addClass(i, t.class),
        Go.is(t.id, "set") && i.setAttribute("id", t.id),
        Go.is(t.style, "set") && Go.style(i, t.style),
        (o = (o += '<div w100 class="formWrap">') + `<form id="${t.id || ""}" class="${t.class || ""}" style="${Go.serializeStyle(t.style)}">`);
      for (var n, s = 0; s < e.length; s++) o += GO_FORM.createFormInput({ input: e[s], form: i, data: t }).template;
      return (
        (o += "</form>"),
        Go.is(t.options, "object") &&
          ((n = document.createElement("go-confirm")), Go.setAttrs(n, t.options), i.appendChild(n), t.options.style && Go.style(n, t.options.style), (o += n.outerHTML)),
        (o += "</div>"),
        { form: i, template: o }
      );
    }),
    (GO_FORM.createFormInput = function ({ input: t, form: e, data: i = {} }) {
      let [o, n, s] = ["", "", 0];
      if (Go.is(t, "array")) {
        var r = t[0];
        r.config && ((s = 1), (n = Go.serializeStyle(r.style))), (o += `<div w100 class="formGroup" style="${n}">`);
        for (var a = s; a < t.length; a++) o += GO_FORM.createFormInput({ input: t[a], form: e, data: i }).template;
        return { template: (o += "</div>") };
      }
      var [r, c, l, h, u] = [t.name, t.value, t.type, t.icon, t.label],
        d = document.createElement("go-input");
      return (
        Go.setAttributes(d, { type: l, name: r, value: c, label: u }),
        e.appendChild(d),
        (o =
          (o =
            (o =
              (o += `<go-input type="${l}" name="${r || ""}" value="${c || ""}" icon="${h || ""}" label="${u || ""}"`) +
              `style="${Go.serializeStyle(i.inputStyle) || ""}${Go.serializeStyle(t.style) || ""}" `) + `placeholder="${t.placeholder || ""}" `) +
          (Go.serializeAttributes(t.attrs) + "></go-input>")),
        Go.is(i.inputStyle, "set") && Go.style(d, i.inputStyle),
        Go.is(t.style, "set") && Go.style(d, t.style),
        Go.is(t.attrs, "set") && Go.attrs(d, t.attrs),
        { input: d, template: o }
      );
    }),
    (GO_FORM.formToObject = function (t) {
      if (!t) return !1;
      Go.is(t, "string") && (t = document.querySelector(t));
      var e,
        i,
        o = {};
      for ([e, i] of (t = Go.is(t, "FormData") ? t : new FormData(t))) o[e] = i;
      return o;
    }),
    GO_FORM),
  MODULE_LUIGI_OS_GOGTAGJS =
    (Object.assign(GO, MODULE_LUIGI_OS_GOFORMJS),
    {
      gtag: function (t) {
        window.dataLayer = window.dataLayer || [];
        var e = ["https://www.googletagmanager.com/gtag/js?id=" + t][0];
        Go.is(window.google_tag_data, "set") || (Go.load(e, { js: !0 }), dataLayer.push("js", new Date())), dataLayer.push("config", t);
      },
    }),
  Http =
    (Object.assign(GO, MODULE_LUIGI_OS_GOGTAGJS),
    function (t = {}) {
      this.opts = t;
    }),
  MODULE_LUIGI_OS_GOHTTPJS = { http: new Http() },
  GO_HYPERLIST =
    ((Http.prototype.get = function (t, o = {}) {
      return (
        (o.method = "get"),
        new Promise((e, i) => {
          Go.xhr(t, o)
            .then((t) => {
              e(t);
            })
            .catch((t) => {
              i(t);
            });
        })
      );
    }),
    (Http.prototype.post = function (t, o = {}) {
      return (
        ((o = Go.is(o, "FormData") ? { body: o } : o).method = "post"),
        new Promise((e, i) => {
          Go.xhr(t, o)
            .then((t) => {
              e(t);
            })
            .catch((t) => {
              i(t);
            });
        })
      );
    }),
    (Http.prototype.put = function (t, o = {}) {
      return (
        ((o = Go.is(o, "FormData") ? { body: o } : o).method = "put"),
        new Promise((e, i) => {
          Go.xhr(t, o)
            .then((t) => {
              e(t);
            })
            .catch((t) => {
              i(t);
            });
        })
      );
    }),
    (Http.prototype.patch = function (t, o = {}) {
      return (
        ((o = Go.is(o, "FormData") ? { body: o } : o).method = "patch"),
        new Promise((e, i) => {
          Go.xhr(t, o)
            .then((t) => {
              e(t);
            })
            .catch((t) => {
              i(t);
            });
        })
      );
    }),
    (Http.prototype.defaults = function (t, o = {}) {
      return new Promise((e, i) => {
        Go.xhr(t, o)
          .then((t) => {
            e(t);
          })
          .catch((t) => {
            i(t);
          });
      });
    }),
    (Http.prototype.delete = function (t, e = {}) {
      return (e.method = "delete"), this.defaults(t, e);
    }),
    (Http.prototype.head = function (t, e = {}) {
      return (e.method = "head"), this.defaults(t, e);
    }),
    (Http.prototype.options = function (t, e = {}) {
      return (e.method = "options"), this.defaults(t, e);
    }),
    (Http.prototype.trace = function (t, e = {}) {
      return (e.method = "trace"), this.defaults(t, e);
    }),
    (Http.prototype.json = function (t, e = {}) {
      return ((e = Go.is(e, "FormData") ? { body: e } : e).method ||= "post"), (e.responseType = "json"), this.defaults(t, e);
    }),
    (Http.prototype.text = function (t, e = {}) {
      return ((e = Go.is(e, "FormData") ? { body: e } : e).method ||= "post"), (e.responseType = "text"), this.defaults(t, e);
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOHTTPJS),
    function () {
      return (function o(n, s, r) {
        function a(e, t) {
          if (!s[e]) {
            if (!n[e]) {
              var i = "function" == typeof require && require;
              if (!t && i) return i(e, !0);
              if (c) return c(e, !0);
              throw (((t = new Error("Cannot find module '" + e + "'")).code = "MODULE_NOT_FOUND"), t);
            }
            (i = s[e] = { exports: {} }),
              n[e][0].call(
                i.exports,
                function (t) {
                  return a(n[e][1][t] || t);
                },
                i,
                i.exports,
                o,
                n,
                s,
                r
              );
          }
          return s[e].exports;
        }
        for (var c = "function" == typeof require && require, t = 0; t < r.length; t++) a(r[t]);
        return a;
      })(
        {
          1: [
            function (t, e, i) {
              "use strict";
              Object.defineProperty(i, "__esModule", { value: !0 });
              i = function (t, e, i) {
                return e && o(t.prototype, e), i && o(t, i), t;
              };
              function o(t, e) {
                for (var i = 0; i < e.length; i++) {
                  var o = e[i];
                  (o.enumerable = o.enumerable || !1), (o.configurable = !0), "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);
                }
              }
              function c(t, e, i) {
                return e in t ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = i), t;
              }
              function l(t) {
                return Number(t) === Number(t);
              }
              var h = { width: "100%", height: "100%" },
                n =
                  "classList" in document.documentElement
                    ? function (t, e) {
                        t.classList.add(e);
                      }
                    : function (t, e) {
                        var i = t.getAttribute("class") || "";
                        t.setAttribute("class", i + " " + e);
                      },
                i =
                  (i(u, null, [
                    {
                      key: "create",
                      value: function (t, e) {
                        return new u(t, e);
                      },
                    },
                    {
                      key: "mergeStyle",
                      value: function (t, e) {
                        for (var i in e) t.style[i] !== e[i] && (t.style[i] = e[i]);
                      },
                    },
                    {
                      key: "getMaxBrowserHeight",
                      value: function () {
                        var t = document.createElement("div"),
                          e = document.createElement("div"),
                          e =
                            (u.mergeStyle(t, { position: "absolute", height: "1px", opacity: 0 }),
                            u.mergeStyle(e, { height: "1e7px" }),
                            t.appendChild(e),
                            document.body.appendChild(t),
                            e.offsetHeight);
                        return document.body.removeChild(t), e;
                      },
                    },
                  ]),
                  i(u, [
                    {
                      key: "destroy",
                      value: function () {
                        window.cancelAnimationFrame(this._renderAnimationFrame);
                      },
                    },
                    {
                      key: "refresh",
                      value: function (t, e) {
                        if ((Object.assign(this._config, h, e), !t || 1 !== t.nodeType)) throw new Error("HyperList requires a valid DOM Node container");
                        this._element = t;
                        var o = this._config,
                          e = this._scroller || o.scroller || document.createElement(o.scrollerTagName || "tr");
                        if (("boolean" != typeof o.useFragment && (this._config.useFragment = !0), !o.generate)) throw new Error("Missing required `generate` function");
                        if (!l(o.total)) throw new Error("Invalid required `total` value, expected number");
                        if (!Array.isArray(o.itemHeight) && !l(o.itemHeight))
                          throw new Error("\n        Invalid required `itemHeight` value, expected number or array\n      ".trim());
                        l(o.itemHeight) ? (this._itemHeights = Array(o.total).fill(o.itemHeight)) : (this._itemHeights = o.itemHeight),
                          Object.keys(h)
                            .filter(function (t) {
                              return t in o;
                            })
                            .forEach(function (t) {
                              var e = o[t],
                                i = l(e);
                              if (e && "string" != typeof e && "number" != typeof e) throw new Error("Invalid optional `" + t + "`, expected string or number");
                              i && (o[t] = e + "px");
                            });
                        var i = Boolean(o.horizontal),
                          n = o[i ? "width" : "height"],
                          s =
                            (n &&
                              ((s = !(a = l(n)) && "%" === n.slice(-1)),
                              (a = a ? n : parseInt(n.replace(/px|%/, ""), 10)),
                              (r = window[i ? "innerWidth" : "innerHeight"]),
                              (this._containerSize = s ? (r * a) / 100 : l(n) ? n : a)),
                            o.scrollContainer),
                          r = o.itemHeight * o.total,
                          n = this._maxElementHeight,
                          a =
                            (n < r && console.warn(["HyperList: The maximum element height", n + "px has", "been exceeded; please reduce your item height."].join(" ")),
                            { width: "" + o.width, height: s ? r + "px" : "" + o.height, overflow: s ? "none" : "auto", position: "relative" }),
                          a =
                            (u.mergeStyle(t, a),
                            s && u.mergeStyle(o.scrollContainer, { overflow: "auto" }),
                            c((n = { opacity: "0", position: "absolute" }), i ? "height" : "width", "1px"),
                            c(n, i ? "width" : "height", r + "px"),
                            n),
                          s = (u.mergeStyle(e, a), this._scroller || t.appendChild(e), this._computeScrollPadding());
                        (this._scrollPaddingBottom = s.bottom),
                          (this._scrollPaddingTop = s.top),
                          (this._scroller = e),
                          (this._scrollHeight = this._computeScrollHeight()),
                          (this._itemPositions = this._itemPositions || Array(o.total).fill(0)),
                          this._computePositions(0),
                          this._renderChunk(null !== this._lastRepaint),
                          "function" == typeof o.afterRender && o.afterRender();
                      },
                    },
                    {
                      key: "_getRow",
                      value: async function (t) {
                        var e = this._config,
                          i = await e.generate(t),
                          o = i.height;
                        if (
                          (void 0 !== o && l(o)
                            ? ((i = i.element),
                              o !== this._itemHeights[t] && ((this._itemHeights[t] = o), this._computePositions(t), (this._scrollHeight = this._computeScrollHeight(t))))
                            : this._itemHeights[t],
                          !i || 1 !== i.nodeType)
                        )
                          throw new Error("Generator did not return a DOM Node for index: " + t);
                        n(i, e.rowClassName || "vrow");
                        o = this._itemPositions[t] + this._scrollPaddingTop;
                        return u.mergeStyle(i, c({ position: "absolute" }, e.horizontal ? "left" : "top", o + "px")), i;
                      },
                    },
                    {
                      key: "_getScrollPosition",
                      value: function () {
                        var t = this._config;
                        return "function" == typeof t.overrideScrollPosition ? t.overrideScrollPosition() : this._element[t.horizontal ? "scrollLeft" : "scrollTop"];
                      },
                    },
                    {
                      key: "_isScrollBottom",
                      value: function () {
                        var t = this._config,
                          { scrollTop: e, offsetHeight: i, scrollHeight: o, offsetGap: n = t.offsetGap } = ((t.offsetGap = t.offsetGap || 50), this._element),
                          o = o <= e + i + n;
                        return o && "function" == typeof t.onScrollBottom ? t.onScrollBottom() : o && "function" == typeof t.onBottom ? t.onBottom() : void 0;
                      },
                    },
                    {
                      key: "_renderChunk",
                      value: async function (t) {
                        var e = this._config,
                          i = this._element,
                          o = this._getScrollPosition(),
                          n = e.total,
                          o = e.reverse ? this._getReverseFrom(o) : this._getFrom(o) - 1;
                        if (((o < 0 || o - this._screenItemsLen < 0) && (o = 0), !t && this._lastFrom === o)) return !1;
                        var s = (this._lastFrom = o) + this._cachedItemsLen,
                          r = ((n < s || s + this._cachedItemsLen > n) && (s = n), e.useFragment ? document.createDocumentFragment() : []),
                          t = this._scroller;
                        r[e.useFragment ? "appendChild" : "push"](t);
                        for (var a = o; a < s; a++) {
                          var c = await this._getRow(a);
                          r[e.useFragment ? "appendChild" : "push"](c);
                        }
                        if (e.applyPatch) return e.applyPatch(i, r);
                        (i.innerHTML = ""), i.appendChild(r);
                      },
                    },
                    {
                      key: "_computePositions",
                      value: function () {
                        for (
                          var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1, e = this._config, i = e.total, o = e.reverse, n = (t = t < 1 && !o ? 1 : t);
                          n < i;
                          n++
                        )
                          o
                            ? 0 === n
                              ? (this._itemPositions[0] = this._scrollHeight - this._itemHeights[0])
                              : (this._itemPositions[n] = this._itemPositions[n - 1] - this._itemHeights[n])
                            : (this._itemPositions[n] = this._itemHeights[n - 1] + this._itemPositions[n - 1]);
                      },
                    },
                    {
                      key: "_computeScrollHeight",
                      value: function () {
                        var t = this,
                          e = this._config,
                          i = Boolean(e.horizontal),
                          o = e.total,
                          n =
                            this._itemHeights.reduce(function (t, e) {
                              return t + e;
                            }, 0) +
                            this._scrollPaddingBottom +
                            this._scrollPaddingTop,
                          s =
                            (u.mergeStyle(
                              this._scroller,
                              (c((s = { opacity: 0, position: "absolute", top: "0px" }), i ? "height" : "width", "1px"), c(s, i ? "width" : "height", n + "px"), s)
                            ),
                            this._itemHeights.slice(0).sort(function (t, e) {
                              return t - e;
                            })),
                          r = Math.floor(o / 2),
                          o = o % 2 == 0 ? (s[r] + s[r - 1]) / 2 : s[r],
                          s = i ? "clientWidth" : "clientHeight",
                          r = e.scrollContainer || this._element,
                          r = r[s] || this._containerSize;
                        return (
                          (this._screenItemsLen = Math.ceil(r / o)),
                          (this._containerSize = r),
                          (this._cachedItemsLen = Math.max(this._cachedItemsLen || 0, 3 * this._screenItemsLen)),
                          (this._averageHeight = o),
                          e.reverse &&
                            window.requestAnimationFrame(function () {
                              i ? (t._element.scrollLeft = n) : (t._element.scrollTop = n);
                            }),
                          n
                        );
                      },
                    },
                    {
                      key: "_computeScrollPadding",
                      value: function () {
                        function t(t) {
                          var e = n.getPropertyValue("padding-" + t);
                          return i.padding && (e = i.padding[t] + e), parseInt(e, 10) || 0;
                        }
                        var i = this._config,
                          e = Boolean(i.horizontal),
                          o = i.reverse,
                          n = window.getComputedStyle(this._element);
                        return e && o
                          ? { bottom: t("left"), top: t("right") }
                          : e
                          ? { bottom: t("right"), top: t("left") }
                          : o
                          ? { bottom: t("top"), top: t("bottom") }
                          : { bottom: t("bottom"), top: t("top") };
                      },
                    },
                    {
                      key: "_getFrom",
                      value: function (t) {
                        for (var e = 0; this._itemPositions[e] < t; ) e++;
                        return e;
                      },
                    },
                    {
                      key: "_getReverseFrom",
                      value: function (t) {
                        for (var e = this._config.total - 1; 0 < e && this._itemPositions[e] < t + this._containerSize; ) e--;
                        return e;
                      },
                    },
                  ]),
                  u);
              function u(t, e) {
                var n = this;
                if (!(this instanceof u)) throw new TypeError("Cannot call a class as a function");
                (this._config = {}), (this._lastRepaint = null), (this._maxElementHeight = u.getMaxBrowserHeight()), this.refresh(t, e);
                var s = this._config;
                (async function t() {
                  var e,
                    i = n._getScrollPosition(),
                    o = n._lastRepaint;
                  (n._renderAnimationFrame = window.requestAnimationFrame(t)),
                    i !== o &&
                      ((e = o ? i - o : 0), !o || e < 0 || e > n._averageHeight) &&
                      ((o = await n._renderChunk()), (n._lastRepaint = i), !1 !== o && "function" == typeof s.afterRender && s.afterRender(), n._isScrollBottom());
                })();
              }
              "undefined" != typeof window && (window.HyperList = i);
            },
            {},
          ],
        },
        {},
        [1]
      )(1);
    }),
  MODULE_LUIGI_OS_GOHYPERLISTJS = { initHyperList: () => GO_HYPERLIST() },
  Icons = (Object.assign(GO, MODULE_LUIGI_OS_GOHYPERLISTJS), {}),
  GO_ICONS = function () {
    this.data = Icons;
  },
  icons = new GO_ICONS(),
  MODULE_LUIGI_OS_GOICONSJS = { icons: (t, e) => (t ? icons.get(t, e) : icons), icon: (t, e) => icons.get(t, e) },
  Import =
    ((GO_ICONS.prototype.load = function (t) {
      if (Go.is(t, "array")) t.forEach((t) => this.load(t));
      else {
        if (!Go.is(t, "object") || !Go.has(t, "someProperty")) {
          let o = t + ".js";
          return (
            t.endsWith(".js") && (o = t),
            new Promise((e, i) => {
              o = Go.route.fixPath(o);
              var t = Go.import(o);
              t.then(({ default: t }) => {
                Object.assign(this.data, t), e();
              }),
                t.catch((t) => {
                  console.error(t), i();
                });
            })
          );
        }
        Object.assign(this.data, t);
      }
    }),
    (GO_ICONS.prototype.get = function (t, e) {
      return Go.is(t, "object")
        ? (Object.assign(this.data, t), this)
        : "fa" === e
        ? `<i class="fas fa-${t}" aria-hidden="true"></i>`
        : (e = Object.assign(this.data, window.icons, this.data))[t] || Go.getProperty(e, t);
    }),
    (GO_ICONS.prototype.add = function (t = {}) {
      return Object.assign(this.data, t), this;
    }),
    Object.assign(Icons, {
      user: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>',
      "chevron-right":
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\x3c!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --\x3e<path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',
      "chevron-left":
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\x3c!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --\x3e<path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',
      "chevron-up":
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --\x3e<path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>',
      "chevron-down":
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --\x3e<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',
      close:
        '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="close"><path d="M19.8534546,19.1465454L12.7069092,12l7.1465454-7.1465454c0.1871948-0.1937256,0.1871948-0.5009155,0-0.6947021c-0.1918335-0.1986084-0.5083618-0.2041016-0.7069702-0.0122681l-7.1465454,7.1465454L4.8534546,4.1465454c-0.1937256-0.1871338-0.5009155-0.1871338-0.6947021,0C3.960144,4.3383789,3.9546509,4.6549072,4.1464844,4.8535156L11.2929688,12l-7.1464844,7.1464844c-0.09375,0.09375-0.1464233,0.2208862-0.1464233,0.3534546C4,19.776062,4.223877,19.999939,4.5,20c0.1326294,0.0001221,0.2598267-0.0526123,0.3534546-0.1465454l7.1464844-7.1464844l7.1465454,7.1465454C19.2401123,19.9474487,19.3673706,20.0001831,19.5,20c0.1325073-0.000061,0.2595825-0.0526733,0.3533325-0.1463623C20.048645,19.6583862,20.0487061,19.3417969,19.8534546,19.1465454z"></path></svg>',
      gspinner:
        '<svg class="gspinner" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 18.6 18.6">\x3c!----\x3e<circle stroke="currentColor" cx="50%" cy="50%" r="8" class="ng-star-inserted" style="animation-name: mat-progress-spinner-stroke-rotate-26; stroke-dasharray: 50.2655px; stroke-width: 10%;"></circle>\x3c!----\x3e</svg>',
      zoomOut:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="zoom-out"><path d="M17.0251,15.6111a9.0225,9.0225,0,1,0-1.414,1.414L21.293,22.707a1,1,0,0,0,1.414-1.414ZM10,17a7,7,0,1,1,7-7A7.0085,7.0085,0,0,1,10,17Zm5-7a1,1,0,0,1-1,1H6A1,1,0,0,1,6,9h8A1,1,0,0,1,15,10Z"></path></svg>',
      zoomIn:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="zoom-in"><path d="M63.06 58.51 46.25 41.69c7.88-10.13 7.18-24.83-2.13-34.13C39.24 2.68 32.76 0 25.84 0c-6.91 0-13.4 2.68-18.27 7.56C2.69 12.44 0 18.93 0 25.84c0 6.9 2.69 13.4 7.57 18.28 4.88 4.88 11.37 7.57 18.27 7.57 5.82 0 11.34-1.92 15.85-5.44L58.5 63.06c.61.61 1.42.94 2.28.94.86 0 1.67-.33 2.28-.94.61-.61.94-1.42.94-2.28 0-.86-.33-1.67-.94-2.27zM39.57 39.56c-3.67 3.67-8.54 5.69-13.72 5.69-5.18 0-10.06-2.02-13.72-5.69-3.67-3.67-5.68-8.54-5.68-13.73 0-5.19 2.02-10.06 5.68-13.73 3.66-3.66 8.53-5.68 13.72-5.68 5.19 0 10.06 2.02 13.72 5.68 7.56 7.58 7.56 19.89 0 27.46z"></path><path d="M34.83 23.1h-6.25v-6.25c0-1.51-1.23-2.73-2.73-2.73-1.51 0-2.73 1.23-2.73 2.73v6.25h-6.25c-1.51 0-2.73 1.23-2.73 2.73 0 1.51 1.23 2.73 2.73 2.73h6.25v6.25c0 1.51 1.23 2.73 2.73 2.73 1.51 0 2.73-1.23 2.73-2.73v-6.25h6.25c1.51 0 2.73-1.23 2.73-2.73s-1.22-2.73-2.73-2.73z"></path></svg>',
      arrowLeft:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="arrow-left"><rect width="256" height="256" fill="none"></rect><line x1="216" x2="40" y1="128" y2="128" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><polyline fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" points="112 56 40 128 112 200"></polyline></svg>',
      arrowRight:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="arrow-right"><path d="M21.92,12.38a1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-7-7a1,1,0,0,0-1.42,1.42L18.59,11H3a1,1,0,0,0,0,2H18.59l-5.3,5.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l7-7A1,1,0,0,0,21.92,12.38Z" data-name="arrow right"></path></svg>',
      chevronRight:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',
      chevronLeft:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',
      search:
        '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>',
      times:
        '<?xml version="1.0" encoding="UTF-8" ?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg width="124pt" height="122pt" viewBox="0 0 124 122" version="1.1" xmlns="http://www.w3.org/2000/svg"> <g id="#ffffffff"> </g> <g id="#183153ff"> <path fill="#183153" opacity="1.00" d=" M 2.65 10.25 C -1.46 5.67 6.02 -1.96 10.57 2.35 C 26.92 18.35 43.12 34.51 59.38 50.61 C 60.04 51.46 61.47 52.76 62.44 51.49 C 78.69 35.37 94.90 19.21 111.15 3.09 C 112.24 1.96 113.74 1.38 115.20 0.88 C 118.36 1.36 120.78 3.91 121.40 7.00 C 120.76 8.44 120.52 10.14 119.18 11.13 C 103.24 27.21 87.35 43.34 71.37 59.37 C 69.87 60.00 69.88 62.00 71.38 62.63 C 86.04 77.31 100.56 92.12 115.20 106.83 C 117.45 109.42 120.71 111.38 121.40 115.00 C 120.74 118.05 118.30 120.89 115.02 121.02 C 113.36 120.58 111.80 119.71 110.65 118.42 C 94.93 102.78 79.18 87.17 63.48 71.50 C 62.73 70.75 61.46 69.18 60.39 70.42 C 43.76 86.81 27.26 103.33 10.58 119.65 C 6.77 123.24 0.62 118.47 1.52 113.87 C 2.61 111.06 5.10 109.27 7.08 107.13 C 22.34 91.74 37.68 76.43 52.89 61.00 C 36.22 44.01 19.22 27.33 2.65 10.25 Z" /> </g> </svg> ',
      exclamation:
        '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',
      plus: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>',
      paintbrush:
        '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M339.3 367.1c27.3-3.9 51.9-19.4 67.2-42.9L568.2 74.1c12.6-19.5 9.4-45.3-7.6-61.2S517.7-4.4 499.1 9.6L262.4 187.2c-24 18-38.2 46.1-38.4 76.1L339.3 367.1zm-19.6 25.4l-116-104.4C143.9 290.3 96 339.6 96 400c0 3.9 .2 7.8 .6 11.6C98.4 429.1 86.4 448 68.8 448H64c-17.7 0-32 14.3-32 32s14.3 32 32 32H208c61.9 0 112-50.1 112-112c0-2.5-.1-5-.2-7.5z"/></svg>',
      code: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">\x3c!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>',
      function:
        '<?xml version="1.0" encoding="UTF-8" ?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg width="203pt" height="164pt" viewBox="0 0 203 164" version="1.1" xmlns="http://www.w3.org/2000/svg"> <g id="#ffffffff"> </g> <g id="#1e3050ff"> <path fill="#1e3050" opacity="1.00" d=" M 38.46 5.39 C 45.95 1.20 54.77 2.01 63.02 2.02 C 65.80 2.16 69.20 3.18 70.23 6.07 C 72.59 10.01 70.12 15.82 65.52 16.63 C 59.78 17.63 53.86 16.44 48.10 17.26 C 42.60 18.71 38.25 24.22 38.59 29.98 C 38.60 40.64 38.61 51.30 38.59 61.96 C 43.71 62.11 48.85 61.85 53.97 62.08 C 56.45 62.43 59.34 63.49 60.24 66.07 C 62.58 70.02 60.11 75.83 55.51 76.63 C 49.93 77.49 44.22 76.73 38.59 77.04 C 38.62 92.71 38.59 108.39 38.60 124.06 C 38.71 132.98 34.14 141.75 26.76 146.76 C 21.66 150.46 15.27 151.33 9.17 151.95 C 4.20 152.11 -0.14 146.63 2.06 141.91 C 3.24 138.20 7.44 136.70 11.02 136.89 C 17.77 136.84 24.07 131.12 24.10 124.23 C 24.17 116.15 24.39 108.05 23.97 99.97 C 24.45 92.38 24.03 84.76 24.21 77.16 C 18.80 76.72 13.35 77.32 7.94 76.81 C 3.34 76.37 0.19 71.11 2.05 66.85 C 2.92 63.93 5.93 62.29 8.82 62.07 C 13.94 61.82 19.09 62.22 24.21 61.84 C 24.16 50.89 24.18 39.94 24.19 28.99 C 23.98 19.23 30.01 9.99 38.46 5.39 Z" /> <path fill="#1e3050" opacity="1.00" d=" M 91.44 42.58 C 97.40 40.29 103.23 47.26 100.20 52.84 C 83.02 79.89 81.45 116.14 96.40 144.51 C 98.01 147.93 101.18 150.94 100.85 155.00 C 101.19 160.23 94.38 163.60 90.19 160.81 C 88.25 159.75 87.19 157.73 86.10 155.91 C 66.31 122.88 66.71 78.82 87.24 46.22 C 88.19 44.58 89.66 43.24 91.44 42.58 Z" /> <path fill="#1e3050" opacity="1.00" d=" M 176.46 42.66 C 179.68 41.30 183.43 42.95 185.15 45.85 C 206.37 79.23 206.48 124.84 185.13 158.18 C 182.68 162.76 175.51 162.96 172.81 158.57 C 170.77 155.83 171.54 152.11 173.38 149.49 C 191.18 120.85 190.80 82.14 172.87 53.66 C 170.20 49.91 171.91 43.92 176.46 42.66 Z" /> <path fill="#1e3050" opacity="1.00" d=" M 111.50 83.96 C 111.77 80.15 115.24 77.15 118.98 76.98 C 120.99 77.25 122.88 78.21 124.37 79.58 C 128.31 83.30 131.92 87.37 135.95 90.99 L 136.87 90.90 C 141.51 86.91 145.30 81.98 150.12 78.21 C 153.84 75.51 159.38 77.94 160.70 82.12 C 162.12 85.02 160.42 88.24 158.42 90.37 C 154.59 94.29 150.67 98.12 146.81 102.00 C 150.66 105.87 154.57 109.69 158.39 113.60 C 160.41 115.74 162.14 118.99 160.69 121.90 C 159.36 126.06 153.85 128.48 150.14 125.80 C 145.30 122.04 141.52 117.07 136.85 113.09 L 135.96 113.00 C 131.31 117.00 127.54 121.99 122.65 125.71 C 119.01 128.46 113.46 126.21 112.03 122.10 C 110.71 119.34 111.88 116.10 113.92 114.05 C 117.87 109.98 121.94 106.03 125.92 102.00 C 122.11 98.16 118.26 94.36 114.45 90.52 C 112.72 88.81 111.23 86.51 111.50 83.96 Z" /> </g> </svg>',
      file: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">\x3c!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z"/></svg>',
      pencil:
        '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>',
      trash:
        '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>',
      key: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/></svg>',
      aspinner: `<i class="aspinner" style="--img: url('/system/img/sprites/aspinner.svg#icon-loading-spinner');"></i>`,
      globe:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"/></svg>',
      instagram:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>',
      twitter:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/></svg>',
      facebook:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>',
      telegram:
        '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="telegram"> <circle cx="12" cy="12" r="12" fill="#039be5"></circle> <path fill="#fff" d="m5.491 11.74 11.57-4.461c.537-.194 1.006.131.832.943l.001-.001-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953z"></path> </svg>',
      email:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>',
      verified:
        '<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"></path></svg>',
      whatsapp:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>',
      copy: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="copy-paste"> <circle cx="256" cy="256" r="250" fill="#2196f3"></circle> <path fill="#fff" d="M302.9 349.8v19.5c0 6.5-5.2 11.7-11.7 11.7H158.3c-6.5 0-11.7-5.2-11.7-11.7V189.6c0-6.5 5.2-11.7 11.7-11.7h35.2v144.5c0 15.1 12.3 27.3 27.3 27.3l82.1.1z"></path> <path fill="#fff" d="M302.9 181.8V131h-82c-6.5 0-11.7 5.2-11.7 11.7v179.7c0 6.5 5.2 11.7 11.7 11.7h132.8c6.5 0 11.7-5.2 11.7-11.7V193.5h-50.8c-6.5 0-11.7-5.3-11.7-11.7z"></path> <path fill="#fff" d="m361.9 166.6-32.2-32.2c-2.2-2.2-5.2-3.4-8.3-3.4h-3v46.9h46.9v-3c.1-3.1-1.2-6.1-3.4-8.3z"></path> </svg>',
      pinterest:
        '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" id="pinterest"> <g id="Icons" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"> <g id="Color-" fill="#CC2127" transform="translate(-300 -260)"> <path id="Pinterest" d="M324.001 260C310.748 260 300 270.745 300 284.001c0 9.825 5.91 18.27 14.369 21.981-.068-1.674-.012-3.689.415-5.512.462-1.948 3.087-13.076 3.087-13.076s-.765-1.533-.765-3.799c0-3.556 2.064-6.212 4.63-6.212 2.18 0 3.236 1.64 3.236 3.604 0 2.193-1.4 5.476-2.12 8.515-.6 2.549 1.276 4.623 3.788 4.623 4.547 0 7.61-5.84 7.61-12.76 0-5.258-3.543-9.195-9.986-9.195-7.279 0-11.815 5.427-11.815 11.49 0 2.094.616 3.567 1.581 4.708.446.527.505.736.344 1.34-.113.438-.378 1.505-.488 1.925-.16.607-.652.827-1.2.601-3.355-1.369-4.916-5.04-4.916-9.17 0-6.816 5.75-14.995 17.152-14.995 9.164 0 15.195 6.636 15.195 13.75 0 9.416-5.233 16.45-12.952 16.45-2.588 0-5.026-1.4-5.862-2.99 0 0-1.394 5.53-1.688 6.596-.508 1.85-1.504 3.7-2.415 5.14 2.159.638 4.44.985 6.801.985C337.255 308 348 297.255 348 284.001 348 270.745 337.255 260 324.001 260"></path> </g> </g> </svg>',
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOICONSJS),
    function (t) {
      (this.src = t), (this.module = {}), (this.data = {});
    }),
  MODULE_LUIGI_OS_GOIMPORTJS = { import: (t, e) => new Import(t).load(e) },
  Instances =
    ((Import.prototype.load = function (o) {
      return new Promise((e, i) => {
        Go.is(this.src, "function") ? (this.module = this.src()) : (this.module = import(this.src)),
          this.module.then((t) => {
            t.default && (t = t.default), e(t), Go.is(o, "function") && o(t);
          }),
          this.module.catch((t) => {
            i(t);
          });
      });
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOIMPORTJS),
    function () {
      this.data = {};
    }),
  GO_INSTANCES = {},
  GO_INSTANCE = new Instances(),
  MODULE_LUIGI_OS_GOINSTANCEJS = {
    set: (t, e) => GO_INSTANCE.new(t, e),
    obj: (t, e) => GO_INSTANCE.new(t, e),
    instance: (t, e) => GO_INSTANCE.new(t, e),
    namespace: (t, e) => GO_INSTANCE.new(t, e),
    dispatch: function () {
      return GO_INSTANCE.dispatch(...arguments);
    },
    do: function () {
      return GO_INSTANCE.dispatch(...arguments);
    },
    context: function () {
      return GO_INSTANCE.context(...arguments);
    },
    debounce: function (e, i) {
      let o;
      return function (...t) {
        clearTimeout(o),
          (o = setTimeout(() => {
            clearTimeout(o), e(...t);
          }, i));
      };
    },
  },
  [GO_IS, GO_IS_PLUS] =
    ((Instances.prototype.new = function (t, e) {
      let [i, o] = [t, null];
      return (
        Go.has(t, "included", "/")
          ? ((i = t.split("/")[0]), (o = t.split("/")[1]))
          : Go.has(t, "included", "\\")
          ? ((i = t.split("\\")[0]), (o = t.split("\\")[1]))
          : Go.has(t, "included", ".") && ((i = t.split(".")[0]), (o = t.split(".")[1])),
        GO_INSTANCES[i] || (GO_INSTANCES[i] = {}),
        o ? ((GO_INSTANCES[i][o] = e), GO_INSTANCES[i][o]) : GO_INSTANCES[i]
      );
    }),
    (Instances.prototype.dispatch = function () {
      let [t, e, i] = ["", void 0, [...arguments]];
      if (i[0]) {
        (t = i[0]),
          Go.has(t, "included", "/")
            ? ((t = i[0].split("/")[0]), (e = i[0].split("/")[1]))
            : Go.has(t, "included", "\\")
            ? ((t = i[0].split("\\")[0]), (e = i[0].split("\\")[1]))
            : Go.has(t, "included", ".") && ((t = i[0].split(".")[0]), (e = i[0].split(".")[1]));
        var o = GO_INSTANCES[t] && GO_INSTANCES[t][e];
        if (Go.is(o, "function")) {
          i.shift();
          try {
            return o.apply({}, i);
          } catch (t) {
            return console.error("Go.instance Error: " + t.message), !1;
          }
        }
        return o;
      }
    }),
    (Instances.prototype.context = function () {
      let [t, e, i] = ["", void 0, [...arguments]];
      if (i[0]) {
        if ("Function" == typeof (t = i[0])) return new t.prototype.constructor();
        Go.has(t, "included", "/")
          ? ((t = i[0].split("/")[0]), (e = i[0].split("/")[1]))
          : Go.has(t, "included", "\\")
          ? ((t = i[0].split("\\")[0]), (e = i[0].split("\\")[1]))
          : Go.has(t, "included", ".") && ((t = i[0].split(".")[0]), (e = i[0].split(".")[1]));
        var o = GO_INSTANCES[t] && GO_INSTANCES[t][e];
        return o ? new o.prototype.constructor() : {};
      }
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOINSTANCEJS),
    [{}, {}]),
  MODULE_LUIGI_OS_GOISJS =
    ((GO_IS.is = function (element, type, value) {
      if (element || type || value) {
        if ("object" === Go.lower(type)) return GO_IS_PLUS[Go.lower(type)](element);
        if (element === type && !value) return !0;
        if ("string" != typeof element || element) {
          if ("string" == typeof element && !value)
            try {
              return GO_IS_PLUS[element]() === type;
            } catch (error) {}
          if ("string" == typeof element && "string" == typeof type)
            try {
              return GO_IS_PLUS[type](element, value);
            } catch (error) {}
          if ("string" == typeof element && value)
            try {
              return GO_IS_PLUS[element](type, value);
            } catch (error) {}
          try {
            return GO_IS_PLUS[type](element, value);
          } catch (error) {}
          if ("true" === String(type) || "false" === String(type)) return String(element) === String(type);
          if (typeof element === type || typeof element === Go.lower(type)) return !0;
          if ("string" == typeof type)
            try {
              type = eval(Go.capitalize(type));
            } catch (error) {}
          try {
            return element instanceof type;
          } catch (error) {}
        }
      }
      return !1;
    }),
    (GO_IS.isFalsy = function (t) {
      return !t || "false" === t || "null" === t || "undefined" === t || "NaN" === t || "0" === t || 0 === t || !1 === t || null == t || NaN === t;
    }),
    (GO_IS.isTruthy = function (t) {
      return !Go.isFalsy(t);
    }),
    (GO_IS.isFalse = function (t) {
      return "false" === t || !1 === t;
    }),
    (GO_IS.has = function () {
      return Go.is(...arguments);
    }),
    Object.assign(GO_IS_PLUS, {
      object: function (t) {
        if ("object" == typeof t) for (var e in t) if (t.hasOwnProperty(e)) return !0;
      },
      path: function (t) {
        var e;
        return (
          !!(
            t.match(/\.[a-z0-9]+$/i) ||
            ((e = t.trim()), /^\/[a-zA-Z0-9_\-\/]+$/.test(e)) ||
            t.match(
              /^(http|https|ftp|mailto|tel|geo|sms|smsto|market|intent|itms|itms-apps|comgooglemaps|fb|twitter|instagram|linkedin|youtube|vimeo|skype|whatsapp|tg|t.me|mailto|tel|geo|sms|smsto|market|intent|itms|itms-apps|comgooglemaps|fb|twitter|instagram|linkedin|youtube|vimeo|skype|whatsapp|tg|t.me):/i
            ) ||
            t.match(/^\/\//)
          ) || void 0
        );
      },
      objectHasSomeProperty: function (t) {
        if ("object" == typeof t) for (var e in t) if (t.hasOwnProperty(e)) return !0;
        return !1;
      },
      someProperty: function (t) {
        if ("object" == typeof t) for (var e in t) if (t.hasOwnProperty(e)) return !0;
        return !1;
      },
      property: function (t, e) {
        if ("object" == typeof t && t.hasOwnProperty(e)) return !0;
      },
      json: function (t) {
        if (!t) return !1;
        if (Go.is(t, "object") && GO_IS_PLUS.objectHasSomeProperty(t)) return t;
        try {
          return (t = t.replace(/\s/g, "")), JSON.parse(t);
        } catch (t) {
          return !1;
        }
      },
      longString: function (t, e = 50) {
        return !!(t && t.length > e);
      },
      emailString: function (t) {
        return /\S+@\S+\.\S+/.test(t);
      },
      email: function (t) {
        return /\S+@\S+\.\S+/.test(t);
      },
      urlString: function (t) {
        return /^(http|https):\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/.test(t);
      },
      stringFunction: function (t) {
        return !!t && !!(t.endsWith(")") || t.endsWith(");") || t.endsWith("()") || t.endsWith("();"));
      },
      stringfunction: function () {
        return GO_IS_PLUS.stringFunction(...arguments);
      },
      textFunction: function () {
        return GO_IS_PLUS.stringFunction(...arguments);
      },
      AsyncFunction: function (t) {
        return t && "[object AsyncFunction]" === {}.toString.call(t);
      },
      asyncFunction: function () {
        return GO_IS_PLUS.AsyncFunction(...arguments);
      },
      classSelector: function (t) {
        return /^\.[a-zA-Z0-9-_]+$/.test(t);
      },
      idSelector: function (t) {
        return /^#[a-zA-Z0-9-_]+$/.test(t);
      },
      startSelector: function (t) {
        return /^(\.|#)/.test(t);
      },
      selector: function (t) {
        return (
          !!t &&
          (!!GO_IS_PLUS.startSelector(t) ||
            !(!GO_IS_PLUS.idSelector(t) && !GO_IS_PLUS.classSelector(t)) ||
            /^([a-z]+\d*|\*)(#[a-z][\w-]*)?(\.[a-z][\w-]*)*(\[[a-z]+(="[a-z0-9-_\s]+")?\])*$/i.test(t))
        );
      },
      someStartsWith: function (e = "", i = []) {
        for (let t = 0; t < i.length; t++) if (e.startsWith(i[t])) return !0;
      },
      onePoint: function (t = "") {
        if ("string" != typeof t) return !1;
      },
      DomElement: function (t) {
        return !!t && (Go.is(t, "string") && (t = document.querySelector(t)), !!Go.is(t, "HTMLElement"));
      },
      HTMLElementRendered: function (t) {
        return Go.is(t, "string") && (t = document.querySelector(t)), !!document.body.contains(t);
      },
      onDOM: function () {
        return GO_IS_PLUS.HTMLElementRendered(...arguments);
      },
      tagName: function (t, e) {
        t = (t = Go.is(t, "string") ? document.querySelector(t) : t).tagName;
        return Go.lower(t) === Go.lower(e);
      },
      HTMLRenderedElement: function () {
        return GO_IS_PLUS.HTMLElementRendered(...arguments);
      },
      some: function (t, e) {
        return !(!Array.isArray(t) || !Array.isArray(e)) && t.some((t) => e.includes(t));
      },
      defined: function (t) {
        return null !== t;
      },
      included: function (t, e) {
        return Go.is(t, "array") ? t.includes(e) : Go.is(t, "object") ? Object.keys(t).includes(e) : !!Go.is(t, "string") && t.includes(e);
      },
      false: function (t) {
        return "false" === t || !1 === t;
      },
      falsy: function (t) {
        return !t || "false" === t || "null" === t || "undefined" === t || "NaN" === t || "0" === t || 0 === t || !1 === t || null == t || NaN === t;
      },
      truthy: function (t) {
        return !Go.isFalsy(t);
      },
      true: function (t) {
        return "true" === t || !0 === t;
      },
      undefined: function (t) {
        return "undefined" === t || void 0 === t;
      },
      null: function (t) {
        return "null" === t || null === t;
      },
      nan: function (t) {
        return "NaN" === t || NaN === t;
      },
      empty: function (t) {
        return "" === t;
      },
      set: function (t) {
        return void 0 !== t && "undefined" !== t && null !== t && "" !== t && "false" !== t && !1 !== t && "NaN" !== t && "nan" !== t;
      },
      speechSynthesis: function () {
        return "speechSynthesis" in window;
      },
      multipleOf: function (t, e) {
        return Number(t) % Number(e) == 0;
      },
      notMultipleOf: function (t, e) {
        return Number(t) % Number(e) != 0;
      },
      prime: function (e) {
        if (e <= 1) return !1;
        {
          let t = 2;
          if (t < e) return e % t != 0 && 1 < e;
        }
      },
      desktopScreen: function () {
        return 1024 <= window.innerWidth;
      },
      notebookScreen: function () {
        var t = window.innerWidth;
        return 1024 <= t && t < 1444;
      },
      mobileScreen: function () {
        return window.innerWidth <= 590;
      },
      tabletScreen: function () {
        var t = window.innerWidth;
        return 590 < t && t < 1024;
      },
      tvScreen: function () {
        return 1444 <= window.innerWidth;
      },
      ios: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      async: function (t) {
        return "AsyncFunction" === t.constructor.name;
      },
      phone: function (t) {
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(t);
      },
      items: function (t) {
        return t && t.length;
      },
      length: function (t) {
        return t && t.length;
      },
    }),
    GO_IS),
  GO_JWT =
    (Object.assign(GO, MODULE_LUIGI_OS_GOISJS),
    function () {
      this.data = {};
    }),
  MODULE_LUIGI_OS_GOJWTJS = { jwt: new GO_JWT() },
  GO_KEYS =
    ((GO_JWT.prototype.decode = function (t) {
      return t
        ? ((t = t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
          (t = decodeURIComponent(
            atob(t)
              .split("")
              .map(function (t) {
                return "%" + ("00" + t.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          )),
          JSON.parse(t))
        : null;
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOJWTJS),
    {}),
  MODULE_LUIGI_OS_GOKEYSJS =
    ((GO_KEYS.enter = function (t = {}, e) {
      "Enter" === t.code && Go.is(e, "function") && e(t);
    }),
    GO_KEYS),
  Language =
    (Object.assign(GO, MODULE_LUIGI_OS_GOKEYSJS),
    function () {
      this.data = {};
    }),
  language = new Language(),
  MODULE_LUIGI_OS_GOLANGJS = { lang: (t) => (t ? language.get(t) : language), currentLang: () => localStorage.getItem("lang") || Go.config("lang") || "en" };
(Language.prototype.load = function (t, e) {
  Go.is(t, "array")
    ? t.forEach((t) => this.load(t))
    : Go.is(t, "object") && Go.has(t, "someProperty")
    ? Object.assign(this.data, t)
    : ((e += `/${t}.js`),
      (e = Go.route.fixPath(e)),
      (t = Go.import(e)).then(({ default: t }) => {
        Go.extends(this.data, t);
      }),
      t.catch((t) => {
        console.error(t);
      }));
}),
  (Language.prototype.get = function (t) {
    return Go.is(t, "object") ? (Object.assign(this.data, t), this) : this.data[t] || t;
  }),
  (Language.prototype.set = function (t, e) {
    Go.storage("lang").set(t), Go.storage("headers").set({ lang: t }), Go.setCookie("lang", t), Go.is(e, "function") && e();
  }),
  (Language.prototype.current = function () {
    return localStorage.getItem("lang") || Go.config("lang") || "en";
  }),
  Object.assign(GO, MODULE_LUIGI_OS_GOLANGJS);
class List {
  constructor(t) {
    (this.list = null),
      (this.config = {}),
      (this.data = []),
      (this.target = "string" == typeof t.target ? document.querySelector(t.target) : t.target),
      (this.reverse = t.reverse || !1),
      (this.itemHeight = t.itemHeight || 50),
      (this.horizontal = t.horizontal || !1),
      (this.height = t.height || window.innerHeight),
      (this.onBottom = t.onBottom),
      (this.padding = t.padding),
      (this.itemHeightGetter = t.itemHeightGetter);
  }
  refresh() {
    this.list.refresh(this.target, this.config);
  }
  removeIndex(t) {
    this.data.splice(t, 1), this.list.refresh(this.target, this.config);
  }
  emptyItem({ index: t }) {
    var e = document.createElement("div");
    return (e.innerHTML = `<p>ITEM ${t}</p>`), e;
  }
  append(t) {
    this.data.push.apply(this.data, t), this.list.refresh(this.target, this.config);
  }
  render(i) {
    var [o, e, n, s] = [this, this.target, null, {}];
    (this.data = i),
      (e = "string" == typeof e ? document.querySelector(e) : e).style.setProperty("--item-height", this.itemHeight + "px"),
      (s = {
        width: o.width || "100%",
        height: o.height,
        itemHeight: o.itemHeight,
        horizontal: o.horizontal,
        padding: o.padding,
        itemHeightGetter: o.itemHeightGetter,
        afterRender: o.afterRender,
        overrideScrollPosition: o.overrideScrollPosition,
        scrollerTagName: o.scrollerTagName || "div",
        reverse: o.reverse,
        rowClassName: o.rowClassName || "vrow",
        onBottom: () => {
          if ("function" == typeof o.onBottom) return o.onBottom();
        },
        get total() {
          return o.getTotalItems();
        },
        generate: async (t) => {
          let e = null;
          return (
            "function" == typeof o.item
              ? "string" == typeof (e = await o.item(i[t], t)) && ((e = document.createElement("div")).innerHTML = e)
              : "string" == typeof o.item
              ? ((e = document.createElement("div")).innerHTML = o.item)
              : (e = o.emptyItem({ index: t })),
            e
          );
        },
      }),
      (n = HyperList.create(e, s)),
      (this.list = n),
      (this.config = s),
      (e.onresize = (t) => {
        (s.height = window.innerHeight), n.refresh(e, s);
      });
  }
  getTotalItems() {
    return (this.data || []).length;
  }
}
const MODULE_LUIGI_OS_GOLISTJS = { list: (t) => new List(t) },
  Loader =
    (Object.assign(GO, MODULE_LUIGI_OS_GOLISTJS),
    function (t = {}) {
      (this.options = t || {}), (this.id = Go.uuid()), this.show();
    }),
  MODULE_LUIGI_OS_GOLOADERJS = { loader: (t) => new Loader(t) },
  GO_LOREM =
    ((Loader.prototype.show = function () {
      return (
        Go.is(this.options, "selector")
          ? ((this.loadElement = document.querySelector(this.options)), Go.addClass(this.loadElement, "loading"))
          : Go.is(this.options, "HTMLElement")
          ? ((this.loadElement = this.options), Go.addClass(this.loadElement, "loading"))
          : (this.view = Go.view({
              id: "loader",
              class: "GoLoader router loader-" + this.id,
              close: !1,
              header: !1,
              html: Go.config("routerLoaderBody") || '<go-icon name="gspinner"></go-icon>',
              ...this.options,
            })),
        this
      );
    }),
    (Loader.prototype.close = async function (t) {
      this.loadElement && Go.removeClass(this.loadElement, "loading"), this.view && Go.is(this.view.close, "function") && this.view.close();
      try {
        var e = await Go.awaitElement(".loader-" + this.id, { retry: 10 });
        e && Go.is(e.close, "function") && e.close();
      } catch (t) {}
      Go.is(t, "function") && t();
    }),
    (Loader.prototype.hide = Loader.prototype.close),
    (Loader.prototype.remove = Loader.prototype.close),
    (Loader.prototype.destroy = Loader.prototype.close),
    (Loader.prototype.unload = Loader.prototype.close),
    Object.assign(GO, MODULE_LUIGI_OS_GOLOADERJS),
    {}),
  MODULE_LUIGI_OS_GOLOREMJS = { lorem: (t) => GO_LOREM.generate(t) },
  GO_MATH =
    ((GO_LOREM.generate = function (e) {
      var i = [
        "lorem",
        "ipsum",
        "dolor",
        "sit",
        "amet",
        "consectetur",
        "adipiscing",
        "elit",
        "curabitur",
        "vel",
        "hendrerit",
        "libero",
        "eleifend",
        "blandit",
        "nunc",
        "ornare",
        "odio",
        "ut",
        "orci",
        "gravida",
        "imperdiet",
        "nullam",
        "purus",
        "lacinia",
        "a",
        "pretium",
        "quis",
        "congue",
        "praesent",
        "sagittis",
        "laoreet",
        "auctor",
        "mauris",
        "non",
        "velit",
        "eros",
        "dictum",
        "proin",
        "accumsan",
        "sapien",
        "nec",
        "massa",
        "volutpat",
        "venenatis",
        "sed",
        "eu",
        "molestie",
        "lacus",
        "quisque",
        "porttitor",
        "ligula",
        "dui",
        "mollis",
        "tempus",
        "at",
        "magna",
        "vestibulum",
        "turpis",
        "ac",
        "diam",
        "tincidunt",
        "id",
        "condimentum",
        "enim",
        "sodales",
        "in",
        "hac",
        "habitasse",
        "platea",
        "dictumst",
        "aenean",
        "neque",
        "fusce",
        "augue",
        "leo",
        "eget",
        "semper",
        "mattis",
        "tortor",
        "scelerisque",
        "nulla",
        "interdum",
        "tellus",
        "malesuada",
        "rhoncus",
        "porta",
        "sem",
        "aliquet",
        "et",
        "nam",
        "suspendisse",
        "potenti",
        "vivamus",
        "luctus",
        "fringilla",
        "erat",
        "donec",
        "justo",
        "vehicula",
        "ultricies",
        "varius",
        "ante",
        "primis",
        "faucibus",
        "ultrices",
        "posuere",
        "cubilia",
        "curae",
        "etiam",
        "cursus",
        "aliquam",
        "quam",
        "dapibus",
        "nisl",
        "feugiat",
        "egestas",
        "class",
        "aptent",
        "taciti",
        "sociosqu",
        "ad",
        "litora",
        "torquent",
        "per",
        "conubia",
        "nostra",
        "inceptos",
        "himenaeos",
        "phasellus",
        "nibh",
        "pulvinar",
        "vitae",
        "urna",
        "iaculis",
        "lobortis",
        "nisi",
        "viverra",
        "arcu",
        "morbi",
        "pellentesque",
        "metus",
        "commodo",
        "ut",
        "facilisis",
        "felis",
        "tristique",
        "ullamcorper",
        "placerat",
        "aenean",
        "convallis",
        "sollicitudin",
        "integer",
        "rutrum",
        "duis",
        "est",
        "etiam",
        "bibendum",
        "donec",
        "pharetra",
        "vulputate",
        "maecenas",
        "mi",
        "fermentum",
        "consequat",
        "suscipit",
        "aliquam",
        "habitant",
        "senectus",
        "netus",
        "fames",
        "quisque",
        "euismod",
        "curabitur",
        "lectus",
        "elementum",
        "tempor",
        "risus",
        "cras",
      ];
      let o = "";
      for (let t = 0; t < e; t++) o += i[Math.floor(Math.random() * i.length)] + " ";
      return o;
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOLOREMJS),
    {}),
  MODULE_LUIGI_OS_GOMATHJS =
    ((GO_MATH.onlyNumbers = function (t) {
      return t && ((t = (t = t.toString()).replace(/[^0-9.]/g, "")) ? Number(t) : void 0);
    }),
    (GO_MATH.onlyNum = function () {
      return GO_MATH.onlyNumbers(...arguments);
    }),
    (GO_MATH.onlyLetters = function (t) {
      return t && (t = t.toString()).replace(/[^a-zA-Z]/g, "");
    }),
    (GO_MATH.number_format = function (t, e, i, o) {
      t = (t + "").replace(/[^0-9+\-Ee.]/g, "");
      var t = isFinite(+t) ? +t : 0,
        e = isFinite(+e) ? Math.abs(e) : 0,
        o = void 0 === o ? "," : o,
        i = void 0 === i ? "." : i,
        n = "";
      return (
        3 <
          (n = (
            e
              ? (function (t, e) {
                  e = Math.pow(10, e);
                  return "" + Math.round(t * e) / e;
                })(t, e)
              : "" + Math.round(t)
          ).split("."))[0].length && (n[0] = n[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, o)),
        (n[1] || "").length < e && ((n[1] = n[1] || ""), (n[1] += new Array(e - n[1].length + 1).join("0"))),
        n.join(i)
      );
    }),
    (GO_MATH.toPositive = function (t) {
      return t < 0 ? -1 * t : t;
    }),
    (GO_MATH.toNegative = function (t) {
      return 0 < t ? -1 * t : t;
    }),
    (GO_MATH.toMoney = function (t) {
      return GO_MATH.number_format(t, 2, ",", ".");
    }),
    (GO_MATH._math = function (t, e, i) {
      return "+" === e ? t + i : "-" === e ? t - i : "*" === e ? t * i : "/" === e ? t / i : "%" === e ? t % i : t;
    }),
    (GO_MATH.math = function (t, e, i) {
      var [o, n, s] = [GO_MATH.onlyLetters(t), GO_MATH.onlyLetters(i), 0];
      return (
        (t = GO_MATH.onlyNumbers(t)),
        (i = GO_MATH.onlyNumbers(i)),
        (s = GO_MATH._math(Number(t), e, Number(i))),
        o || n ? (Go.lower(o) === Go.lower(n) ? s + o : (s = s + o + n) ? s.trim() : void 0) : Number(s)
      );
    }),
    (GO_MATH.getPercent = function (t, e) {
      return (100 * t) / e;
    }),
    (GO_MATH.getPercentValue = function (t, e) {
      return (t * e) / 100;
    }),
    (GO_MATH.unitConvert = function (t = 10, e = 0.13) {
      return t / e;
    }),
    GO_MATH),
  GO_MEDIA = (Object.assign(GO, MODULE_LUIGI_OS_GOMATHJS), {}),
  MODULE_LUIGI_OS_GOMEDIAJS =
    ((GO_MEDIA.preloadImages = function (i = []) {
      for (let t = 0, e = i.length; t < e; t++) (i[t] = new Image()), (i[t].src = i[t]);
      return i;
    }),
    (GO_MEDIA.getImagePredominantColor = function (e) {
      return (
        $.adaptiveBackground.run({
          selector: "[data-adaptive-background=1]",
          parent: null,
          exclude: ["rgb(0,0,0)", "rgba(255,255,255)"],
          normalizeTextColor: !1,
          normalizedTextColors: { light: "#fff", dark: "#000" },
          lumaClasses: { light: "ab-light", dark: "ab-dark" },
        }),
        new Promise((i, t) => {
          $(e).on("ab-color-found", function (t, e) {
            console.log(e.color), i(e);
          });
        })
      );
    }),
    (GO_MEDIA.MEDIA_METHODS = {}),
    (GO_MEDIA.media = function (t) {
      return new (function (t) {
        (this.media = t), Object.assign(this, GO_MEDIA.MEDIA_METHODS);
      })(t);
    }),
    (GO_MEDIA.MEDIA_METHODS.play = function () {
      this.media.play();
    }),
    (GO_MEDIA.MEDIA_METHODS.pause = function () {
      this.media.pause();
    }),
    (GO_MEDIA.MEDIA_METHODS.stop = function () {
      this.media.stop();
    }),
    (GO_MEDIA.MEDIA_METHODS.divToImage = async function () {
      return (
        GO_MEDIA.MEDIA_METHODS.html2canvas || (await Go.load("https://html2canvas.hertzen.com/dist/html2canvas.min.js"), await Go.sleep(1e3)),
        (GO_MEDIA.MEDIA_METHODS.html2canvas = !0),
        Go.is(this.media, "string") && (this.media = document.querySelector(this.media)),
        new Promise((e, t) => {
          html2canvas(this.media).then((t) => {
            e(t.toDataURL("image/png"));
          });
        })
      );
    }),
    (GO_MEDIA.MEDIA_METHODS.download = function (t = "media") {
      var e = document.createElement("a");
      (e.href = this.media), (e.download = t), e.click();
    }),
    (GO_MEDIA.MEDIA_METHODS.isImage = function () {
      var t, e;
      return !!Go.is(this.media, "string") && ((t = ["png", "jpg", "jpeg", "gif", "svg", "webp"]), (e = this.media.split(".").pop()), t.includes(e));
    }),
    (GO_MEDIA.MEDIA_METHODS.resize = function (t, e) {
      var i = document.createElement("canvas"),
        o = i.getContext("2d"),
        n = new Image(),
        o = ((n.src = this.media), (i.width = t), (i.height = e), o.drawImage(n, 0, 0, t, e), i.toDataURL("image/png"));
      return o;
    }),
    (GO_MEDIA.MEDIA_METHODS.base64ToBlob = function (t = "") {
      var e = atob(this.media.split(",")[1]),
        i = this.media.split(",")[0],
        o = new ArrayBuffer(e.length),
        n = new Uint8Array(o);
      for (let t = 0; t < e.length; t++) n[t] = e.charCodeAt(t);
      o = new Blob([o], { type: i });
      return "obj" == t || "object" == t ? { type: i, blob: o } : o;
    }),
    GO_MEDIA),
  Menu =
    (Object.assign(GO, MODULE_LUIGI_OS_GOMEDIAJS),
    function (t = {}) {
      (this.data = t), (this.options = t.options || []), this.open();
    }),
  MODULE_LUIGI_OS_GOMENUJS = { menu: (t) => new Menu(t) },
  GO_MISC =
    ((Menu.prototype.open = async function () {
      Go.is(this.options, "function") && (this.options = await this.options()),
        (this.view = Go.view({
          title: `<div bold>${this.data.title || Go.lang("menu")}</div>`,
          class: "default menu " + (this.data.class || "bottom"),
          animation: "bottomIn",
          ...this.data,
          html: `${this.data.preBody || ""}<div w100 class="options"></div>` + (this.data.afterBody || ""),
          onOpen: async (t) => {
            t = await Go.awaitElement(`#${t.id} .options`);
            Go.options(this.options, t, (t) => {
              this.select(t), Go.is(this.data.keepOpen, "true") || this.view.close();
            });
          },
        }));
    }),
    (Menu.prototype.select = function (option) {
      const onselect = this.data.onselect || this.data.onSelect || option.onselect || option.onSelect,
        onchoose = this.data.onchoose || this.data.onChoose || option.onchoose || option.onChoose,
        onoption = this.data.onoption || this.data.onOption,
        onclick = this.data.onclick || this.data.onClick || option.onclick || option.onClick || this.data.action || option.action,
        fn = this.data.fn || option.fn;
      let execute = onselect || onchoose || onoption || onclick || fn;
      Go.is(fn, "function") && (execute = () => fn(option)),
        Go.is(onclick, "function") && (execute = () => onclick(option)),
        Go.is(onselect, "function") && (execute = () => onselect(option)),
        Go.is(onchoose, "function") && (execute = () => onchoose(option)),
        Go.is(onoption, "function") && (execute = () => onoption(option)),
        Go.is(execute, "function") ? execute() : execute && eval(execute);
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOMENUJS),
    {}),
  MODULE_LUIGI_OS_GOMISCJS =
    ((GO_MISC.delay = function (t) {
      return GO_MISC.sleep(t);
    }),
    (GO_MISC.sleep = function (e, i) {
      return new Promise((t) => {
        setTimeout(() => GO_MISC.sleepEnd(t, i), e);
      });
    }),
    (GO_MISC.await = function () {
      return GO_MISC.sleep(...arguments);
    }),
    (GO_MISC.timeout = function (t, e) {
      return GO_MISC.sleep(t, e);
    }),
    (GO_MISC.sleepEnd = function (t, e) {
      let i = e;
      t((i = "function" == typeof e ? e() : i));
    }),
    (GO_MISC.viewTitle = function (t, e = "29", i = "", o = "") {
      return (
        Go.is(t, "object") && ((e = t.iconSize || e), (o = (t = t.title).class || o)),
        (i = (i += `<div dpadding flex-center flex-gap class="${o}">`) + `<app-icon size="${e}" src="/img/icons/${e}.png"></app-icon><div class="appTitle">${t}</div>` + "</div>")
      );
    }),
    (GO_MISC.reflectValue = function (e, t) {
      var i;
      Go.is(t, "HTMLElement") || (t = document.querySelectorAll(t)),
        Go.is(t, "NodeList") && 1 < t.length
          ? t.forEach((t) => GO_MISC.reflectValue(e, t))
          : (t = Go.is(t, "NodeList") ? t[0] : t) && ((i = e.target.value), (t.value = i), Go.is(t, "tagName", "input") || (t.innerHTML = i));
    }),
    (GO_MISC.exec = async function () {
      var e = [...arguments],
        i = e.length;
      for (let t = 0; t < i; t++) e[t] && "function" == typeof e[t] && (await e[t]());
    }),
    (GO_MISC.onMutation = function (t, e) {
      t && e && (t = Go.is(t, "String") ? document.querySelector(t) : t) && new MutationObserver(e).observe(t, { attributes: !0, childList: !0, subtree: !0 });
    }),
    (GO_MISC.viewContext = function (t, e = {}) {
      var i = Go.info(t.target),
        o = i.screenTop + i.height,
        o = {
          header: !1,
          style: `--x: ${i.screenLeft}px; --y: ${o}px;--parent-width: ${i.width}px;`,
          class: "select go-select context",
          closeOutside: !0,
          ...e,
          animate: { duration: 200, from: { opacity: 0, transform: "translateY(-1rem)" }, to: { opacity: 1, transform: "translateY(0)" } },
        };
      return (
        Go.is(e, "path") ? (o.template = e) : (o.html = e),
        Go.addClass(t.target, "open"),
        (o.onClose = function () {
          Go.removeClass(t.target, "open");
        }),
        Go.view(o)
      );
    }),
    (GO_MISC.menuContext = function () {
      return GO_MISC.viewContext(...arguments);
    }),
    (GO_MISC.href = function (t, e) {
      t && (e ? window.open(t, e ? "_blank" : "_self") : (location.href = t));
    }),
    (GO_MISC.base = function (t = "", e = "") {
      var i = Go.config("base");
      return i || (t ? (t = Go.url(t).getHost() + "/" + e) : ((i = document.querySelector("base")) && (t = i.href), e && (t += e)), Go.fix(t).url());
    }),
    GO_MISC),
  Module =
    (Object.assign(GO, MODULE_LUIGI_OS_GOMISCJS),
    function (t, e) {
      return (this.src = t), (this.source = t), (this.cb = e), (this.props = { src: t, cb: e }), this.init();
    }),
  MODULE_LUIGI_OS_GOMODULEJS = {
    module: function () {
      return new Module(...arguments);
    },
  },
  GO_NET =
    ((Module.prototype.init = function () {
      return (
        Go.is(this.src, "object") &&
          ((this.source = this.src.src),
          (this.loading = this.src.loading),
          (this.loaded = this.src.loaded || this.src.onLoad || this.src.onload),
          (this.error = this.src.error),
          (this.props = this.src.props)),
        this.load()
      );
    }),
    (Module.prototype.load = async function () {
      Go.is(this.loading, "function") && this.loading();
      try {
        this.module = await Go.import(this.source);
      } catch (t) {
        this.modError = t;
      }
      return (
        this.modError && Go.is(this.error, "function") && this.error(this.modError),
        Go.is(this.loaded, "function") && this.loaded(this.module),
        Go.is(this.cb, "function") && this.cb(this.module),
        Go.is(this.module, "function") && (this.module = new this.module()),
        (this.module.props = this.props),
        Go.is(this.module.init, "function") && (await this.module.init()),
        this.module
      );
    }),
    (Module.prototype.error = function (t) {
      console.log("Go Module: ", t);
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOMODULEJS),
    {}),
  MODULE_LUIGI_OS_GONETJS =
    ((GO_NET.host = function (t = "", e = "") {
      return (t = t ? Go.url(t).getHost() : window.location.host) || e ? (e ? (e.startsWith("/") || (e = "/" + e), Go.url(t + e).fix()) : t) : window.location.host;
    }),
    GO_NET),
  GO_NUMBER = (Object.assign(GO, MODULE_LUIGI_OS_GONETJS), {}),
  MODULE_LUIGI_OS_GONUMBERJS =
    ((GO_NUMBER.phoneFormat = function (t) {
      return t ? t.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") : "";
    }),
    (GO_NUMBER.phone_format = function (t) {
      return GO_NUMBER.phoneFormat(t);
    }),
    (GO_NUMBER.toPositive = function (t) {
      return Math.abs(t);
    }),
    (GO_NUMBER.positive = function (t) {
      return Math.abs(t);
    }),
    (GO_NUMBER.toNegative = function (t) {
      return -1 * Math.abs(t);
    }),
    (GO_NUMBER.negative = function (t) {
      return -1 * Math.abs(t);
    }),
    (GO_NUMBER.random = function (t = 0, e = 9) {
      return Math.floor(Math.random() * (e - t + 1) + t);
    }),
    (GO_NUMBER.randomNum = function () {
      return GO_NUMBER.random(...arguments);
    }),
    (GO_NUMBER.randomNumber = (t = 10) => Math.floor(Math.random() * (9 * Math.pow(10, t - 1))) + Math.pow(10, t - 1)),
    GO_NUMBER),
  GO_OBJECT = (Object.assign(GO, MODULE_LUIGI_OS_GONUMBERJS), {}),
  MODULE_LUIGI_OS_GOOBJECTJS =
    ((GO_OBJECT.toJson = function (t) {
      return JSON.stringify(t);
    }),
    (GO_OBJECT.toObject = function (t = '{"":""}') {
      return GO_OBJECT.fromJson(t);
    }),
    (GO_OBJECT.fromJson = function (t) {
      let e = {};
      try {
        e = JSON.parse(t);
      } catch (t) {}
      return e;
    }),
    (GO_OBJECT.json = function (t) {
      return "string" == typeof t ? GO_OBJECT.fromJson(t) : GO_OBJECT.toJson(t);
    }),
    (GO_OBJECT.object = function (t) {
      return "string" == typeof t ? GO_OBJECT.fromJson(t) : GO_OBJECT.toJson(t);
    }),
    (GO_OBJECT.queryStringToObject = (t) => {
      return (t = Go.removeFirstIf(t, "?"))
        .split("&")
        .map((t) => t.split("="))
        .reduce(
          (t, e) => (
            (t[e[0]] = ((t) => {
              try {
                t = decodeURIComponent(t);
              } catch (t) {}
              try {
                t = decodeURI(t);
              } catch (t) {}
              return t;
            })(e[1])),
            t
          ),
          {}
        );
    }),
    (GO_OBJECT.queryToObject = (t) => GO_OBJECT.queryStringToObject(t)),
    (GO_OBJECT.objectToQuery = (e) =>
      Object.keys(e)
        .map((t) => t + "=" + e[t])
        .join("&")),
    (GO_OBJECT.serializeObject = (t) => GO_OBJECT.objectToQuery(t)),
    (GO_OBJECT.queryToInputs = (t) => {
      var e = GO_OBJECT.queryToObject(t);
      let i = "";
      for (const o in e) i += `<input type="hidden" name="${o}" value="${e[o]}" />`;
      return i;
    }),
    (GO_OBJECT.cloneObject = function (t) {
      return JSON.parse(JSON.stringify(t));
    }),
    (GO_OBJECT.getProperty = function (t = {}, e = "") {
      if (e && (Go.is(t, "string") && ([t, e] = [e, t]), typeof t != typeof e))
        try {
          return e.split(".").reduce(function (t, e) {
            return t && t[e];
          }, t);
        } catch (t) {
          console.log(t);
        }
    }),
    (GO_OBJECT.getProp = function (t, e) {
      return GO_OBJECT.getProperty(t, e);
    }),
    (GO_OBJECT.setProperty = function (t, e, n) {
      Go.is(t, "String") && (e = t = e);
      try {
        e.split(".").reduce(function (t, e, i, o) {
          return i === o.length - 1 && (t[e] = n), t && t[e];
        }, t);
      } catch (t) {
        console.log(t);
      }
    }),
    (GO_OBJECT.deleteProperty = function (t, e) {
      Go.is(t, "String") && (e = t = e);
      try {
        e.split(".").reduce(function (t, e, i, o) {
          return i === o.length - 1 && delete t[e], t && t[e];
        }, t);
      } catch (t) {
        console.log(t);
      }
    }),
    (GO_OBJECT.extends = function (t, e) {
      return "function" == typeof e ? Object.assign(t, new e(), e.prototype) : "object" == typeof e ? Object.assign(t, ...arguments) : void 0;
    }),
    (GO_OBJECT.extend = function () {
      return GO_OBJECT.extends(...arguments);
    }),
    (GO_OBJECT.assign = function (t, ...e) {
      return Object.assign(t, ...e);
    }),
    (GO_OBJECT.for = function (t, e) {
      return Go.is(t, "Array")
        ? GO_OBJECT.FOR(t, e)
        : Go.is(t, "number")
        ? GO_OBJECT.forNumber(t, e)
        : (Go.is(t, "selector") && (t = document.querySelectorAll(t)), Go.is(t, "NodeList") ? t.forEach(e) : Go.is(t, "Object") ? GO_OBJECT.forObject(t, e) : void 0);
    }),
    (GO_OBJECT.forNumber = function (e = 0, i) {
      return new Promise(async (t) => {
        for (let t = 0; t < e; t++) Go.is(i, "async") ? await i(t) : i(t);
        t();
      });
    }),
    (GO_OBJECT.forObject = function (i = {}, o) {
      return new Promise(async (t) => {
        var e = Object.keys(i);
        for (let t = 0; t < e.length; t++) Go.is(o, "async") ? await o(e[t], i[e[t]]) : o(e[t], i[e[t]]);
        t();
      });
    }),
    (GO_OBJECT.FOR = function (i = [], o) {
      return new Promise(async (t) => {
        var e = i.length;
        for (let t = 0; t < e; t++) Go.is(o, "async") ? await o(i[t], t) : o(i[t], t);
        t();
      });
    }),
    (GO_OBJECT.forEach = function (t, e) {
      return GO_OBJECT.for(t, e);
    }),
    (GO_OBJECT.map = function (e, i) {
      return (
        Go.is(e, "selector") && (e = document.querySelectorAll(e)),
        Go.is(e, "NodeList") ? Array.from(e).map(i) : Go.is(e, "Array") ? e.map(i) : Go.is(e, "Object") ? Object.keys(e).map((t) => i(e[t], t)) : void 0
      );
    }),
    (GO_OBJECT.serializeAttributes = function (t) {
      let e = "";
      if (Go.is(t, "object")) for (const i in t) e += `${i}="${t[i]}" `;
      return e;
    }),
    (GO_OBJECT.serializeAttrs = function (t) {
      return GO_OBJECT.serializeAttributes(t);
    }),
    (GO_OBJECT.recursiveObjectsCombine = function (t, e) {
      for (var i in e) "object" == typeof e[i] && null !== e[i] && "object" == typeof t[i] && null !== t[i] ? Go.recursiveObjectsCombine(t[i], e[i]) : (t[i] = e[i]);
      return t;
    }),
    (GO_OBJECT.recursiveObjectsMerge = function (t, e) {
      return GO_OBJECT.recursiveObjectsCombine(t, e);
    }),
    (GO_OBJECT.recursiveObjectsAssign = function (t, e) {
      return GO_OBJECT.recursiveObjectsCombine(t, e);
    }),
    (GO_OBJECT.objectsCombine = function (t, e) {
      return GO_OBJECT.recursiveObjectsCombine(t, e);
    }),
    (GO_OBJECT.objectsMerge = function (t, e) {
      return GO_OBJECT.recursiveObjectsCombine(t, e);
    }),
    (GO_OBJECT.objectsAssign = function (t, e) {
      return GO_OBJECT.recursiveObjectsCombine(t, e);
    }),
    GO_OBJECT),
  GO_OBSERVER =
    (Object.assign(GO, MODULE_LUIGI_OS_GOOBJECTJS),
    function (t, e) {
      Go.extend(this, Go.Events), (this.el = t), (this.observer1 = null), (this.observer2 = null), (this.options = e), this.observe();
    }),
  MODULE_LUIGI_OS_GOOBSERVERJS = { observer: (t, e) => new GO_OBSERVER(t, e) },
  Options =
    ((GO_OBSERVER.prototype.observe = function () {
      Go.is(this.el, "string") && (this.el = document.querySelector(this.el)),
        this.el && (this.options.intersection && this.intersection(), this.options.mutation) && this.mutations();
    }),
    (GO_OBSERVER.prototype.mutations = function () {
      (this.observer1 = new MutationObserver(this.mutationsCallback.bind(this), this.options)), this.observer1.observe(this.el, this.options);
    }),
    (GO_OBSERVER.prototype.mutationsCallback = function (t) {
      for (var e of t) this.emit("mutation", { mutation: e });
    }),
    (GO_OBSERVER.prototype.intersection = function () {
      (this.observer2 = new IntersectionObserver(this.intersectionCallback.bind(this), this.options)), this.observer2.observe(this.el, this.options);
    }),
    (GO_OBSERVER.prototype.intersectionCallback = function (t) {
      for (var e of t) this.emit("intersection", { entry: e });
    }),
    (GO_OBSERVER.prototype.disconnect = function () {
      this.observer1 && this.observer1.disconnect(), this.observer2 && this.observer2.disconnect();
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOOBSERVERJS),
    function (t, e, i) {
      (this.options = t), (this.target = e), (this.callback = i), this.render();
    }),
  MODULE_LUIGI_OS_GOOPTIONSJS = { options: (t, e, i) => new Options(t, e, i) },
  GO_PAGES_DATA =
    ((Options.prototype.render = function () {
      Go.is(this.target, "Array") && ([this.options, this.target] = [this.target, this.options]),
        Go.is(this.target, "HTMLElement") || (this.target = document.querySelector(this.target));
      let t = this.target.querySelector("go-options");
      if (t) return t.remove();
      (t = document.createElement("go-options")), this.target.appendChild(t);
      const o = document.createElement("go-options-content");
      t.appendChild(o),
        this.options.forEach((t) => {
          var e = document.createElement("go-option");
          e.option = t;
          let i = "";
          Go.is(t.icon, "string")
            ? (i += `<go-icon class="icon" name="${t.icon}"></go-icon>`)
            : Go.is(t.icon, "object")
            ? (i += `<go-icon class="icon" ${Go.serializeAttrs(t.icon)}></go-icon>`)
            : t.icon && (i += `<go-icon class="icon" name="${t.icon}"></go-icon>`),
            (i += '<div class="text">'),
            (t.label || t.name) && (i += `<div class="label">${t.label || t.name}</div>`),
            t.desc && (i += `<div class="desc">${t.desc}</div>`),
            (i += "</div>"),
            (e.innerHTML = Go.eval(i)),
            o.appendChild(e),
            Go.addClass(e, Go.keyId(t.name) + " " + (t.class || "")),
            Go.cssVars(e, t.vars),
            Go.attrs(e, t.attrs || {});
        }),
        (this.target.onclick = (t) => this.select(t));
    }),
    (Options.prototype.select = function (t) {
      var e;
      if (t.target.matches("go-option"))
        return (
          ([t, e] = [t.target.option, t]),
          Go.is(this.callback, "function")
            ? this.callback(t, e)
            : Go.is(this.onSelect, "function")
            ? this.onSelect(t, e)
            : Go.is(this.onOption, "function")
            ? this.onOption(t, e)
            : void 0
        );
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOOPTIONSJS),
    {}),
  GO_PAGES = function (t = {}) {
    this.pages = t;
  },
  MODULE_LUIGI_OS_GOPAGESJS = { pages: (t) => new GO_PAGES(t) },
  GO_PRINT =
    ((GO_PAGES.prototype.load = function () {
      return Object.assign(GO_PAGES_DATA, this.pages);
    }),
    (GO_PAGES.prototype.add = function () {
      return Object.assign(GO_PAGES_DATA, this.pages);
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOPAGESJS),
    function (t) {
      (this.el = t), this.print();
    }),
  MODULE_LUIGI_OS_GOPRINTJS = { print: (t) => new GO_PRINT(t) },
  GO_PROMISE =
    ((GO_PRINT.prototype.print = function () {
      if ((Go.is(this.el, "string") && (this.el = document.querySelector(this.el)), !Go.is(this.el, "HTMLElement"))) return Go.alert(Go.lang("print_error"));
      var t = this.printScript(),
        e = window.open("", "PRINT", "height=980,width=768");
      e.document.write("<html><head><title>" + document.title + "</title>" + t),
        e.document.write("</head><body >"),
        e.document.write(this.el.innerHTML),
        e.document.write("</body></html>"),
        e.document.close(),
        e.focus();
    }),
    (GO_PRINT.prototype.printScript = function (t = "") {
      return (t = (t = (t = t + '<script type="text/javascript">' + "window.onload = function() {") + "window.print();" + "window.close();") + "};" + "</script>");
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOPRINTJS),
    function (t) {
      this.promise = t;
    }),
  GO_PROMISES = function (...t) {
    (this.promises = t[0]), (this.sucess = !1), (this.result = {}), (this.progress = 0), (this.data = ""), (this.finished = !1);
  },
  MODULE_LUIGI_OS_GOPROMISEJS = { promise: (t) => new GO_PROMISE(t), promises: (...t) => new GO_PROMISES(t) },
  GO_PROMPT =
    ((GO_PROMISE.prototype.promise = function () {
      return new Promise((t, e) => {});
    }),
    (GO_PROMISES.prototype.run = async function () {
      return new Promise(async (e, t) => {
        for (let t = 0; t < this.promises.length; t++) {
          var i = this.promises[t];
          (this.progress = this.calculateProgress(t + 1)), (this.current = await this.executePromise(i, t)), e(this.current);
        }
      });
    }),
    (GO_PROMISES.prototype.executePromise = function (i, o) {
      return new Promise(async (t, e) => {
        this.timeoutBetween && (await Go.sleep(this.timeoutBetween)),
          Go.is(i, "function") && (this.data += await this.tryPromise(i, o)),
          Go.is(this.onProgress, "function") && this.onProgress({ data: this.data, index: o, percent: this.progress }),
          o === this.promises.length - 1 && this.workFinished(),
          t();
      });
    }),
    (GO_PROMISES.prototype.tryPromise = function (i, t) {
      return new Promise(async (t, e) => {
        try {
          this.data = await i();
        } catch (t) {
          this.nowError(t);
        }
        t(this.data);
      });
    }),
    (GO_PROMISE.prototype.nowError = function (t) {
      Go.is(this.onError, "function") && this.onError(t);
    }),
    (GO_PROMISES.prototype.calculateProgress = function (t) {
      return Math.round((t / this.promises.length) * 100);
    }),
    (GO_PROMISES.prototype.workFinished = function () {
      (this.progress = this.calculateProgress(this.promises.length)),
        (this.finished = { data: this.data, percent: this.progress, result: this.result }),
        Go.is(this.onFinished, "function") && this.onFinished(this.finished),
        Go.is(this.onSuccess, "function") && this.onSuccess(this.finished),
        Go.is(this.onFinish, "function") && this.onFinish(this.finished);
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOPROMISEJS),
    function (t = {}) {
      (this.data = t), Go.is(t, "string") && (this.data = { message: t }), (this.value = null);
    }),
  MODULE_LUIGI_OS_GOPROMPTJS = {
    prompt: function () {
      return new GO_PROMPT(...arguments).show();
    },
  },
  Resource =
    ((GO_PROMPT.prototype.show = function () {
      const i = this;
      return (
        (this.configData = Go.config("prompt") || {}),
        (this.data.placeholder ||= Go.capitalize(Go.string(this.data.message).lastWord())),
        (this.data = Object.assign({}, this.configData, this.data)),
        (this.inputAttrs = Go.serializeAttrs(this.data.inputAttrs || {})),
        (this.inputStyle = Go.serializeStyle(this.data.inputStyle || {})),
        new Promise((t, e) => {
          (i.input = Go.confirm({
            title: i.data.title || Go.lang("prompt"),
            ...i.data,
            onOpened: function (e) {
              var t = e.querySelector(".promptInput .input");
              t.focus(),
                (t.onkeyup = function (t) {
                  13 === t.keyCode && (i.input.onaccept(), e.close()), "textbox" === i.data.type ? (i.value = t.target.innerText) : (i.value = t.target.value);
                });
            },
            message: `<div class="promptMessage">
        <div class="promptTitle">${i.data.message || ""}</div>
        <go-spacer num="1"></go-spacer>
        <div class="promptInput">
          <go-input w100 
          type="${i.data.type || "text"}" 
          placeholder="${i.data.placeholder || ""}" 
          value="${i.data.value || ""}" 
          ${i.inputAttrs} 
          style="${i.inputStyle}"
          >
          </go-input>
        </div>
      </div>`,
          })),
            (i.input.onaccept = function () {
              t(i.value);
            }),
            (i.input.oncancel = function () {
              e(null);
            }),
            i.input.show();
        })
      );
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOPROMPTJS),
    function (t, e = {}) {
      return (this.src = t), (this.conf = e), this.load();
    }),
  MODULE_LUIGI_OS_GORESJS = {
    load: (t, e) => new Resource(t, e),
    unload: (t) => {
      (t = Go.keyString(t)), (t = document.getElementById(t));
      t && t.remove();
    },
  },
  Resizer =
    ((Resource.prototype.load = function () {
      return this.src.endsWith(".js") || this.conf.js
        ? this.loadJs()
        : this.src.endsWith(".css")
        ? this.loadCss()
        : "js" === this.conf.type
        ? this.loadJs()
        : "css" === this.conf.type
        ? this.loadCss()
        : void 0;
    }),
    (Resource.prototype.loadJs = function () {
      return new Promise((t, e) => {
        (this.keyName = Go.keyString(this.src)), (this.src = Go.route.fixPath(this.src));
        let i = this.src,
          o = "",
          n = document.getElementById(this.keyName);
        var s;
        this.conf.replace && n && n.remove(),
          document.getElementById(this.keyName) ||
            (this.src.startsWith("http") || (i = location.protocol + "//" + location.host + this.src),
            (s = document.getElementsByTagName("head")[0]),
            ((n = document.createElement("script")).type = "text/javascript"),
            this.conf.async && (n.async = !0),
            this.conf.defer && (n.defer = !0),
            this.conf.type && (n.type = this.conf.type),
            this.conf.hash && (o = "?v=" + Go.uuid()),
            (n.src = i + o),
            (n.id = this.keyName),
            s.appendChild(n),
            (n.onload = () => {
              t(this);
            }));
      });
    }),
    (Resource.prototype.loadCss = function () {
      return new Promise((t, e) => {
        (this.keyName = Go.keyString(this.src)), (this.src = Go.route.fixPath(this.src));
        let i = this.src,
          o = "",
          n = document.getElementById(this.keyName);
        var s;
        this.conf.replace && n && n.remove(),
          document.getElementById(this.keyName) ||
            (this.src.startsWith("http") || (i = location.protocol + "//" + location.host + this.src),
            this.conf.hash && (o = "?v=" + Go.uuid()),
            (s = document.getElementsByTagName("head")[0]),
            ((n = document.createElement("link")).id = this.keyName),
            (n.rel = "stylesheet"),
            (n.type = "text/css"),
            (n.href = i + o),
            s.appendChild(n),
            (n.onload = () => {
              t(this);
            }));
      });
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GORESJS),
    function () {
      (this.doit = null), (this.initialized = !1);
    }),
  MODULE_LUIGI_OS_GORESIZERJS = { resizer: new Resizer() },
  Route =
    ((Resizer.prototype.init = function () {
      this.listen();
    }),
    (Resizer.prototype.listen = function () {
      this.initialized ||
        ((this.initialized = !0), window.removeEventListener("resize", (t) => this.resizing(t)), window.addEventListener("resize", (t) => this.resizing(t)), this.setScreen());
    }),
    (Resizer.prototype.resizing = function (t) {
      const e = this;
      clearTimeout(this.doit),
        (this.doit = setTimeout(function () {
          e.resizeEnd();
        }, 100));
    }),
    (Resizer.prototype.resizeEnd = function () {
      this.setScreen(), Go.emit("resized resizeEnd endResize");
    }),
    (Resizer.prototype.setScreen = function () {
      var t = window.innerWidth,
        e = window.innerHeight;
      Go.cssVar(document.body, "--screen-width", t + "px"), Go.cssVar(document.body, "--screen-height", e + "px");
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GORESIZERJS),
    function () {
      (this.path = "/"), (this.query = {});
    }),
  MODULE_LUIGI_OS_GOROUTEJS = { route: new Route() },
  RouterLoader =
    ((Route.prototype.set = function (t) {
      (this.path = location.pathname),
        (this.host = location.host),
        (this.search = location.search),
        (this.query = Go.queryStringToObject(Go.removeFirstStringIf(this.search, "?"))),
        Object.assign(this, t);
    }),
    (Route.prototype.fixPath = function (e) {
      if (e && !e.startsWith("http")) {
        let t = location.pathname.split("/app/")[1];
        (t = t || Go.attr("html", "app")) && ((t = t.split("/")[0]), !e.startsWith("/")) && t && (e = `/app/${t}/` + e);
      }
      return e;
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOROUTEJS),
    function () {
      (this.rounum = 0), (this.paths = {});
    }),
  Router = function () {
    (this.routes = {}), (this.outStarts = ["http", "mailto", "tel", "whatsapp", "sms"]), (this.headers = { router: window.location.origin }), (this.config = {});
  },
  router = new Router(),
  routerLoader = new RouterLoader(),
  MODULE_LUIGI_OS_GOROUTERJS = { router: router, navigate: (t) => router.navigate(t) },
  GO_SASS =
    ((Router.prototype.init = function () {
      this.navigatePrevent(), this.routeListen();
    }),
    (Router.prototype.isCurrentPath = function (t) {
      return window.location.pathname === t || window.location.pathname === t + "/" || window.location.pathname === "/" + t;
    }),
    (Router.prototype.isTopPath = function ({ link: e, target: i }) {
      for (let t = 0; t < this.outStarts.length; t++) if (e.startsWith(this.outStarts[t]) && "_blank" !== i) return !0;
    }),
    (Router.prototype.isOutPath = function ({ link: e, target: i }) {
      for (let t = 0; t < this.outStarts.length; t++) if (e.startsWith(this.outStarts[t]) && "_blank" === i) return !0;
    }),
    (Router.prototype.navigatePrevent = function () {
      const o = this;
      document.addEventListener("click", function (t) {
        var [e, i] = [Go.attr(t.target, "href"), Go.attr(t.target, "target")];
        e &&
          (t.preventDefault(),
          o.closeParentView(t),
          o.isCurrentPath(e) ||
            (o.isTopPath({ link: e, target: i })
              ? (location.href = e)
              : o.isOutPath({ link: e, target: i })
              ? window.open(e, i)
              : (window.history.pushState({}, "", e), window.dispatchEvent(new Event("popstate")))));
      });
    }),
    (Router.prototype.closeParentView = function (t) {
      var e = t.target.closest(".View");
      Go.hasAttr(t.target, "close-parent") && e && e.close();
    }),
    (Router.prototype.routeListen = function (t, e) {
      const i = this;
      window.addEventListener("popstate", function () {
        i.loadRoute();
      });
    }),
    (Router.prototype.load = function (t) {
      Go.is(t, "object") && Go.has(t, "someProperty")
        ? Object.assign(this.routes, t)
        : Go.is(t, "array")
        ? t.forEach((t) => this.load(t))
        : ((t = Go.route.fixPath(t)),
          (t = import(t)).then(({ default: t }) => {
            Object.assign(this.routes, t), this.loadRoute();
          }),
          t.catch((t) => {
            console.error(t);
          }));
    }),
    (Router.prototype.navigate = async function (t) {
      window.history.pushState({}, "", t), window.dispatchEvent(new Event("popstate"));
    }),
    (Router.prototype.loadRoute = async function (t) {
      t = t || window.location.pathname;
      let e = this.routes[t];
      var i;
      if ((e || ((t = "/"), (e = this.routes[t])), e)) return e.if && !Go.eval(e.if) ? ((i = e.else || {}), this.execRoute({ ...e, ...i }, t)) : this.execRoute(e, t);
    }),
    (Router.prototype.execRoute = async function (t, e) {
      let i = null;
      var o = t.router,
        n = t.title,
        s = t.styles || t.style,
        r = t.scripts || t.script,
        a = t.exec || t.call,
        c = t.loader;
      if ((Go.is(c, "falsy") || routerLoader.routing(e), s && Go.load(s), r && Go.load(r), Go.is(a, "function")))
        return this.setRoute({ route: t, target: o, data: i, title: n, path: e }), a();
      (Go.is(t.template, "path") || Go.is(t.template, "url")) && (i = await this.fetchRoute(t)),
        (i = Go.is(t.template, "function") ? t.template() : i) && this.setRoute({ route: t, target: o, data: i, title: n });
    }),
    (Router.prototype.fetchRoute = async function (t) {
      let e = null;
      try {
        e = await Go.xhr(t.template, { method: "GET", responseType: "text", headers: this.headers });
      } catch (t) {
        console.error("Go.router Error: ", t);
      }
      return e;
    }),
    (Router.prototype.setRoute = function ({ route: t, target: e, data: i, title: o, path: n }) {
      o && Go.docTitle(o), i && Go.putHTML(e, Go.eval(i)), Go.route.set(t), Go.router.scrollToRoute(e), routerLoader.unrouting(n);
    }),
    (Router.prototype.scrollToRoute = function (t) {
      t = document.querySelector(t);
      t && t.scrollIntoView({ behavior: "smooth" });
    }),
    (RouterLoader.prototype.routing = async function (t) {
      this.paths[t] = await this.loading();
    }),
    (RouterLoader.prototype.unrouting = async function (t) {
      Go.is(this.paths[t]?.close, "function") && this.paths[t].close(),
        await Go.sleep(Go.env("view_transition_time")),
        Go.close("#" + this.paths[t]?.view?.id),
        delete this.paths[t];
    }),
    (RouterLoader.prototype.loading = async function () {
      return Go.view({ id: Go.uuid(), class: "loader router", close: !1, html: '<go-icon name="gspinner"></go-icon>' });
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOROUTERJS),
    {}),
  MODULE_LUIGI_OS_GOSASSJS =
    ((GO_SASS.compileSCSS = function (t) {
      return t && Go.is(t, "String")
        ? (t = Go.minify(t)).replace(/\.([\w-]+)\s*\{([^{}]+)\}/g, (t, e, i) => {
            return (i = i.trim()), e.replace(/\./g, " ") + ` { ${i} }`;
          })
        : "";
    }),
    GO_SASS),
  GO_SCREEN = (Object.assign(GO, MODULE_LUIGI_OS_GOSASSJS), {}),
  MODULE_LUIGI_OS_GOSCREENJS =
    ((GO_SCREEN.screen = function () {
      var t = { width: window.innerWidth, height: window.innerHeight };
      let [e, i, o] = [!1, !1, !1],
        [n, s, r, a] = [767, 768, 1024, null];
      return (
        t.width <= n && t.width <= s ? (e = !0) : s <= t.width && t.width <= r ? (i = !0) : r <= t.width && (o = !0),
        180 == window.orientation || 0 == window.orientation ? (a = "portrait") : (90 != window.orientation && -90 != window.orientation) || (a = "landscape"),
        { isMobile: e, isTablet: i, isDesktop: o, ...t, orientation: a, nextBackground: () => {}, setBackground: (t) => {} }
      );
    }),
    (GO_SCREEN.fullScreen = () => {
      var t = document.documentElement,
        e = t.requestFullScreen || t.webkitRequestFullScreen || t.mozRequestFullScreen || t.msRequestFullscreen;
      Go.is(e, "undefined") || e.call(t);
    }),
    (GO_SCREEN.exitFullScreen = () => {
      var t = document,
        e = t.cancelFullScreen || t.webkitCancelFullScreen || t.mozCancelFullScreen || t.msExitFullscreen;
      Go.is(e, "undefined") || e.call(t);
    }),
    GO_SCREEN),
  GO_SESSION =
    (Object.assign(GO, MODULE_LUIGI_OS_GOSCREENJS),
    function () {
      this.data = {};
    }),
  MODULE_LUIGI_OS_GOSESSIONJS = { session: new GO_SESSION() },
  GO_SET =
    ((GO_SESSION.prototype.parseJWT = function (t) {
      return Go.jwt.decode(t);
    }),
    (GO_SESSION.prototype.set = function (t, e = "go-ss", i) {
      if (t || e || i) return Go.is(e, "function") && ((i = e), (e = "go-ss")), !t && Go.is(i, "function") ? i() : this.new(t, e, i);
    }),
    (GO_SESSION.prototype.new = function (t, e = "go-ss", i) {
      Go.is(e, "function") && ((i = e), (e = "go-ss")), (this.data = this.parseJWT(t)), localStorage.setItem(e, t), Go.setCookie(e, t, 365), Go.is(i, "function") && i(this.data);
    }),
    (GO_SESSION.prototype.user = function (t = "go-ss") {
      t = localStorage.getItem(t);
      return t ? this.parseJWT(t) : null;
    }),
    (GO_SESSION.prototype.logout = function (t = "go-ss", e) {
      Go.is(t, "function") && ((e = t), (t = "go-ss")), localStorage.removeItem(t), Go.deleteCookie(t), Go.is(e, "function") && e();
    }),
    (GO_SESSION.prototype.on = function (t = "go-ss") {
      return localStorage.getItem(t);
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOSESSIONJS),
    function (t, e) {
      (this.key = t), (this.value = e), this.set();
    }),
  MODULE_LUIGI_OS_GOSETJS = {
    Set: function () {
      return new GO_SET(...arguments);
    },
  },
  GO_SHARE =
    ((GO_SET.prototype.set = function () {
      if (Go.hasOwnProperty(this.key)) return console.warn(`La propiedad "${this.key}" No se puede reescribir.`), !1;
      GO_EXTENDS[this.key] = this.value;
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOSETJS),
    function (t = {}) {
      (this.url = t.url),
        (this.title = t.title),
        (this.message = decodeURIComponent(t.message || t.text) || ""),
        (this.skipNative = t.skipNative),
        (this.native = this.canNativeShare()),
        this.cleanText(),
        this.open();
    }),
  MODULE_LUIGI_OS_GOSHAREJS = {
    share: function () {
      return new GO_SHARE(...arguments);
    },
  },
  GO_SPEECH =
    ((GO_SHARE.prototype.cleanText = function () {
      (this.message = this.message.replace(/&nbsp;/gi, " ")), (this.message = this.message.replace(/(<([^>]+)>)/gi, ""));
    }),
    (GO_SHARE.prototype.canNativeShare = function () {
      return void 0 !== navigator.share;
    }),
    (GO_SHARE.prototype.open = function () {
      this.native && !this.skipNative
        ? (this.view = navigator.share({ url: this.url, title: this.title, text: this.message }))
        : (this.view = Go.menu({
            title: `${Go.lang("share")} - ${this.title} - ` + Go.lang("on"),
            class: "menu bottom share",
            animation: "bottomIn",
            closeOutside: !0,
            options: this.options(),
            onSelect: async (t) => {
              [t.icon, t.icon?.name].includes("copy") ? (Go.clipboard(this.url).copy(), Go.toast(Go.lang("copied") + "!")) : window.open(t.link, "_blank");
            },
          }));
    }),
    (GO_SHARE.prototype.options = function () {
      return (
        (this.shares = [
          {
            icon: { name: "whatsapp", original: !0 },
            label: Go.lang("whatsapp"),
            link: `https://api.whatsapp.com/send?text=${Go.url_encode(this.message)}%20` + Go.url_encode(this.url),
          },
          {
            icon: { name: "telegram", original: !0 },
            label: Go.lang("telegram"),
            link: `https://telegram.me/share/url?url=${Go.url_encode(this.url)}&text=${Go.url_encode(this.message)}%20` + Go.url_encode(this.url),
          },
          {
            icon: { name: "facebook", original: !0 },
            label: Go.lang("facebook"),
            link: `https://www.facebook.com/sharer/sharer.php?u=${Go.url_encode(this.url)}&quote=` + Go.url_encode(this.message),
          },
          {
            icon: { name: "instagram", original: !0 },
            label: Go.lang("instagram"),
            link: `https://www.instagram.com/web/share/?url=${Go.url_encode(this.url)}&text=${Go.url_encode(this.message)}%20` + Go.url_encode(this.url),
          },
          {
            icon: { name: "twitter", original: !0 },
            label: Go.lang("twitter"),
            link: `https://twitter.com/intent/tweet?text=${Go.url_encode(this.message)}%20` + Go.url_encode(this.url),
          },
          {
            icon: { name: "pinterest", original: !0 },
            label: Go.lang("pinterest"),
            link: `https://pinterest.com/pin/create/button/?url=${Go.url_encode(this.url)}&description=` + Go.url_encode(this.message),
          },
          {
            icon: { name: "email", original: !0 },
            label: Go.lang("email"),
            link: `mailto:?subject=${Go.url_encode(this.title)}&body=${Go.url_encode(this.message)}%20` + Go.url_encode(this.url),
          },
          { icon: { name: "copy", original: !0 }, label: Go.lang("copy_link") },
        ]),
        this.shares
      );
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOSHAREJS),
    function (t) {
      (this.text = t), this.read();
    }),
  MODULE_LUIGI_OS_GOSPEECHJS = { speech: (t) => new GO_SPEECH(t) },
  Storage =
    ((GO_SPEECH.prototype.read = function () {
      var t;
      Go.is(window, "speechSynthesis")
        ? (((t = new SpeechSynthesisUtterance(this.text)).lang = "es-ES"), (t.rate = 0.9), (t.pitch = 1), (t.volume = 1), window.speechSynthesis.speak(t))
        : console.log("SpeechSynthesis is not supported");
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOSPEECHJS),
    (window.storageEventListenerAdded = !1),
    function () {
      (this.data = {}), this.listen();
    }),
  storage =
    ((Storage.prototype.listen = function () {
      window.storageEventListenerAdded ||
        ((window.storageEventListenerAdded = !0),
        window.addEventListener("storage", (t) => {
          Go.emit("storage", t), Go.emit("storage-" + t.key, t);
        }));
    }),
    new Storage()),
  MODULE_LUIGI_OS_GOSTORAGEJS = { storage: (t) => storage.table(t) },
  Store =
    ((Storage.prototype.table = function (i) {
      return i
        ? (this.data[i] || (this.data[i] = {}),
          {
            get: (t) => this.get(i, t),
            set: (t, e) => this.set(i, t, e),
            remove: (t) => this.remove(i, t),
            delete: (t) => this.remove(i, t),
            clear: () => this.remove(i),
            clean: () => this.remove(i),
            destroy: () => this.remove(i),
            reset: (t, e) => {
              this.remove(i), this.set(i, t, e);
            },
          })
        : this.data;
    }),
    (Storage.prototype.get = function (t, e) {
      if (!t) return "";
      let i = localStorage.getItem(t);
      return i ? (Go.is(i, "json") && (i = JSON.parse(i)), e ? Go.getProperty(i, e) || "" : i) : "";
    }),
    (Storage.prototype.value = Storage.prototype.get),
    (Storage.prototype.set = function (t, e = {}) {
      let i = localStorage.getItem(t);
      if (Go.is(e, "string")) localStorage.setItem(t, e);
      else {
        i || localStorage.setItem(t, JSON.stringify(e)), (i = localStorage.getItem(t));
        try {
          i = JSON.parse(i);
        } catch (t) {
          i = {};
        }
        (i = { ...i, ...e }), localStorage.setItem(t, JSON.stringify(i)), Go.emit("storage", { action: "set", table: t, obj: e });
      }
    }),
    (Storage.prototype.remove = function (t, e) {
      var i = localStorage.getItem(t);
      i &&
        ((i = JSON.parse(i)),
        e ? (Go.deleteProperty(i, e), localStorage.setItem(t, JSON.stringify(i)), Go.emit("storage", { action: "remove", table: t, key: e })) : localStorage.removeItem(t));
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOSTORAGEJS),
    function (t) {
      (this.id = t), (this.data = {}), (this.subscribers = {});
    }),
  ParentStore = new Store("parent"),
  StoreMiddleware = function (t) {
    return ParentStore.get(t) ? ParentStore.get(t) : ParentStore.set(t, new Store(t));
  },
  MODULE_LUIGI_OS_GOSTOREJS = { store: (t) => StoreMiddleware(t), Store: (t) => StoreMiddleware(t) },
  [GO_STRING, GO_STRING_PROTOTYPE] =
    ((Store.prototype.get = function (t) {
      return Go.getProperty(this.data, t);
    }),
    (Store.prototype.set = function (t, e) {
      return (this.data[t] = e), this.notify(t), this.data[t];
    }),
    (Store.prototype.subscribe = function (t, e) {
      this.subscribers[t] || (this.subscribers[t] = []), this.subscribers[t].push(e);
    }),
    (Store.prototype.notify = function (e) {
      this.subscribers[e] && this.subscribers[e].forEach((t) => t(this.data[e]));
    }),
    (Store.prototype.unsubscribe = function (t, e) {
      this.subscribers[t] && (this.subscribers[t] = this.subscribers[t].filter((t) => t !== e));
    }),
    (Store.prototype.clear = function () {
      (this.data = {}), (this.subscribers = {});
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOSTOREJS),
    [{}, {}]),
  MODULE_LUIGI_OS_GOSTRINGJS =
    ((GO_STRING.capitalize = function (t) {
      return t && t.charAt(0).toUpperCase() + t.slice(1);
    }),
    (GO_STRING.capital = function (t) {
      return t && t.charAt(0).toUpperCase() + t.slice(1);
    }),
    (GO_STRING.removeSpaces = function (t) {
      return t && t.replace(/\s/g, "");
    }),
    (GO_STRING.fastID = function () {
      var t = () => Math.random().toString(16).slice(-4);
      return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t();
    }),
    (GO_STRING.uuid = function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
        var e = (16 * Math.random()) | 0;
        return ("x" == t ? e : (3 & e) | 8).toString(16);
      });
    }),
    (GO_STRING.lowercase = function (t) {
      return t && t.toLowerCase();
    }),
    (GO_STRING.uppercase = function (t) {
      return t && t.toUpperCase();
    }),
    (GO_STRING.lower = function (t) {
      return t && GO_STRING.lowercase(t);
    }),
    (GO_STRING.upper = function (t) {
      return t && GO_STRING.uppercase(t);
    }),
    (GO_STRING.toCamelCase = function (t) {
      return (
        t &&
        t.replace(/-([a-z])/g, function (t) {
          return t[1].toUpperCase();
        })
      );
    }),
    (GO_STRING.toDashCase = function (t) {
      return t && t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    }),
    (GO_STRING.toSnakeCase = function (t) {
      return t && t.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
    }),
    (GO_STRING.replaceVars = function (i, o) {
      var t = i.match(/{{(.*?)}}/g);
      return (
        t &&
          t.forEach((t) => {
            var t = t.replace("{{", "").replace("}}", "").trim(),
              e = new RegExp(`{{${t}}}`, "g");
            i = i.replace(e, Go.getProperty(o, t));
          }),
        i
      );
    }),
    (GO_STRING.cutString = function (t, e) {
      return t && t.length > e ? t.substring(0, e) : t;
    }),
    (GO_STRING.getString = function (t, e, i) {
      return t && t.length > i ? t.substring(e, i) : t;
    }),
    (GO_STRING.removeLastStringIf = function (t, e) {
      return t && t.endsWith(e) ? t.substring(0, t.length - e.length) : t;
    }),
    (GO_STRING.removeFirstStringIf = function (t, e) {
      return t && t.startsWith(e) ? t.substring(e.length) : t;
    }),
    (GO_STRING.removeFirstIf = function (t, e) {
      return GO_STRING.removeFirstStringIf(t, e);
    }),
    (GO_STRING.removeLastString = function (t, e) {
      return t && t.length > e ? t.substring(0, t.length - e) : t;
    }),
    (GO_STRING.hasExtension = function (t, e) {
      return !!t && t.endsWith(e);
    }),
    (GO_STRING.normalizeString = function (t) {
      if (!t) return "";
      if (!Go.is(t, "string")) return t;
      let e = t;
      return (e = (e = (e = e.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLocaleLowerCase()).split(" ").join(""));
    }),
    (GO_STRING.removeSpecialChars = function (t) {
      return Go.is(t, "string") ? t.replace(/[^a-zA-Z0-9 ]/g, "") : t;
    }),
    (GO_STRING.keyString = function (t) {
      return GO_STRING.removeSpecialChars(GO_STRING.normalizeString(t));
    }),
    (GO_STRING.keyId = function (t) {
      return GO_STRING.keyString(t);
    }),
    (GO_STRING.getChars = function (t, e, i) {
      return t.substring(e, e + i);
    }),
    (GO_STRING.shortEmail = function (t, e = 10) {
      if (!t) return "";
      let [i, o] = t.split("@");
      return (i = i.length > e ? i.substr(0, e) + "..." : i) + "@" + o;
    }),
    (GO_STRING.short_email = function (t, e = 10) {
      return GO_STRING.shortEmail(t, e);
    }),
    (GO_STRING.createTags = function (t, e = "span", i = {}) {
      if (!t) return t;
      t = t.split(" ");
      let [o, n, s] = ["", e, e];
      return (
        t.forEach((t) => {
          i.addClass && (n = `${e} class="${i.addClass} ${Go.keyString(t)}"`), (o += `<${n}>${t}</${s}> `);
        }),
        o
      );
    }),
    (GO_STRING.create_tags = function () {
      return GO_STRING.createTags(...arguments);
    }),
    (GO_STRING.randomColor = function () {
      return "#" + Math.floor(16777215 * Math.random()).toString(16);
    }),
    (GO_STRING.splitFirst = function (t, e) {
      e = t.indexOf(e);
      return -1 == e ? [t] : [t.substr(0, e), t.substr(e + 1)];
    }),
    (GO_STRING.minify = function (t) {
      return t && t.replace(/\s+/g, " ").trim();
    }),
    (GO_STRING.getBetween = function (t = "", e = "", i = "") {
      var o;
      return !t || !e || !i || -1 == (o = i.indexOf(t)) || -1 == (e = i.indexOf(e, o + t.length)) ? "" : i.substring(o + t.length, e);
    }),
    (GO_STRING.quitDuplicateQuery = function (t) {
      var e,
        i,
        o = {};
      for ([e, i] of new URLSearchParams(t).entries()) o[e] = i;
      return new URLSearchParams(o).toString();
    }),
    (GO_STRING.url_encode = function (t) {
      return t ? encodeURIComponent(t) : "";
    }),
    (GO_STRING.replaceLast = function (t, e, i) {
      var o;
      return t ? (-1 == (o = t.lastIndexOf(e)) ? t : t.substring(0, o) + i + t.substring(o + e.length)) : "";
    }),
    (GO_STRING.escapeHTML = function (t) {
      return t ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : "";
    }),
    (GO_STRING.string = function (t) {
      class e {
        constructor(t) {
          this.string = t;
        }
      }
      return (
        (e.prototype.replace = function (t, e) {
          return this.string.replaceAll(t, e);
        }),
        (e.prototype.trim = function () {
          return this.string.trim();
        }),
        (e.prototype.length = function () {
          return this.string.length;
        }),
        (e.prototype.getBetween = function (t = "", e = "") {
          return GO_STRING.getBetween(t, e, this.string);
        }),
        Object.assign(e.prototype, GO_STRING_PROTOTYPE),
        new e(t)
      );
    }),
    (GO_STRING_PROTOTYPE.getInitials = function (t = 2) {
      return this.string
        ? this.string
            .split(" ")
            .map((t) => t[0])
            .join("")
            .toUpperCase()
            .slice(0, t)
        : "";
    }),
    (GO_STRING_PROTOTYPE.ellipsis = function (t = 10, e = "...") {
      return this.string ? (this.string.length <= t ? this.string : this.string.slice(0, t) + e) : "";
    }),
    (GO_STRING_PROTOTYPE.removeTags = function () {
      var t = document.createElement("div");
      t.innerHTML = this.string;
      let e = t.innerText;
      return e ? (e = e.replace(/<[^>]*>/g, "")) : "";
    }),
    (GO_STRING_PROTOTYPE.lastWord = function () {
      var t;
      return this.string ? (t = this.string.split(" "))[t.length - 1] : "";
    }),
    GO_STRING),
  GO_STYLE = (Object.assign(GO, MODULE_LUIGI_OS_GOSTRINGJS), {}),
  MODULE_LUIGI_OS_GOSTYLEJS =
    ((GO_STYLE.getComputedStyle = function (t, e) {
      return t && e && (t = Go.is(t, "String") ? document.querySelector(t) : t) ? window.getComputedStyle(t, null).getPropertyValue(e) : "";
    }),
    (GO_STYLE.getComputedStyles = function (e, t) {
      if (!e) return {};
      if (!t) return {};
      if (!(e = Go.is(e, "String") ? document.querySelector(e) : e)) return {};
      const i = {};
      return (
        t.forEach((t) => {
          i[t] = window.getComputedStyle(e, null).getPropertyValue(t);
        }),
        i
      );
    }),
    (GO_STYLE.setCssVariable = function (t, e, i) {
      t && e && i && (t = Go.is(t, "String") ? document.querySelector(t) : t) && t.style.setProperty(e, i);
    }),
    (GO_STYLE.setStyle = function (t, e, i) {
      t && e && i && (t = Go.is(t, "String") ? document.querySelector(t) : t) && (t.style[e] = i);
    }),
    (GO_STYLE.cssTag = function (e, i) {
      if (e && i) {
        let t = document.getElementById(e);
        t || (((t = document.createElement("style")).id = e), document.head.appendChild(t)), (t.innerHTML = i);
      }
    }),
    (GO_STYLE.serializeStyle = function (e = {}) {
      if (!e) return "";
      let i = "";
      return (
        Object.keys(e).forEach((t) => {
          i += `${t}:${e[t]};`;
        }),
        i
      );
    }),
    (GO_STYLE.style = function (e, i = {}) {
      e &&
        i &&
        (e = Go.is(e, "String") ? document.querySelector(e) : e) &&
        (Go.is(i, "string")
          ? e.setAttribute("style", i)
          : Object.keys(i).forEach((t) => {
              t.startsWith("--") ? e.style.setProperty(t, i[t]) : (e.style[t] = i[t]);
            }));
    }),
    (GO_STYLE.domStyle = function (e, i = {}) {
      if (e && i) {
        Go.is(i, "object") && (i = GO_STYLE.serializeStyle(i));
        let t = document.querySelector("#style-" + Go.keyId(e));
        t || (((t = document.createElement("style")).id = "style-" + Go.keyId(e)), document.head.appendChild(t)), (t.innerHTML = e + `{${i}}`);
      }
    }),
    (GO_STYLE.cssVars = function (e, i = {}) {
      (e = Go.is(e, "HTMLElement") ? e : document.querySelector(e)) &&
        Object.keys(i).forEach((t) => {
          e.style.setProperty(t, i[t]);
        });
    }),
    (GO_STYLE.setCssVars = function () {
      return GO_STYLE.cssVars(...arguments);
    }),
    GO_STYLE),
  GO_TABS =
    (Object.assign(GO, MODULE_LUIGI_OS_GOSTYLEJS),
    function (t = {}) {
      (this.data = t), (this.id = this.data.id), (this.uuid = Go.uuid()), (this.class = this.data.class || "");
    }),
  MODULE_LUIGI_OS_GOTABSJS = { tabs: (t) => new GO_TABS(t) },
  GO_TOAST =
    ((GO_TABS.prototype.tab = function () {
      const e = this.data;
      document.querySelectorAll(`[tabs="${e.id}"] .tabBody`).forEach((t) => {
        Number(Go.attr(t, "tab")) === Number(e.index) &&
          (Go.uniqueClass("on", `[tab-button="${e.index}${e.id}"]`, `[tabs="${e.id}"] .buttons`), Go.uniqueClass("on", t, `[tabs="${e.id}"] .bodys`));
      });
    }),
    (GO_TABS.prototype.template = function () {
      return (
        (this.current = Go.findObjectIndex(this.data.tabs, "active", !0)),
        (this.template = `<div current="${this.current || 0}" class="g-tabs tabs-${this.uuid} ${this.class}" role="tablist">`),
        (this.template += '<ul class="buttons">'),
        Go.for(this.data.tabs, (t, e) => {
          this.template += this.handler(t, e);
        }),
        (this.template += "</ul>"),
        (this.template += '<ul class="bodys">'),
        (this.template += '<div class="bodysTopLine"></div>'),
        Go.for(this.data.tabs, (t, e) => {
          this.template += this.tabBody(t, e);
        }),
        (this.template += "</ul>"),
        (this.template += "</div>"),
        this.template
      );
    }),
    (GO_TABS.prototype.handler = function (t, e) {
      let i = [""][0];
      return (
        (t.id ||= "tab" + this.uuid + e),
        t.active && (i += " tab-active"),
        (this.ttab = `<li class="tab-handler ${i}" handler="${e}">
    <input type="radio" name="tabs${this.uuid}" id="tab${e}${t.id}" onchange="Go.do('tab/${this.uuid}', ${e}, event)" />
    <label for="tab${e}${t.id}" role="tab" aria-selected="false" aria-controls="panel${e}${t.id}" tabindex="${e}">${t.title}</label>
  </li>`),
        this.ttab
      );
    }),
    (GO_TABS.prototype.tabBody = function (t, e) {
      let i = [""][0];
      return (
        (t.id ||= "tab" + this.uuid + e),
        t.active && (i += " tab-active"),
        (this.ttab = `<li class="tab-body ${i} body-${t.id}" body="${e}">
    <div id="tab-content${e}${t.id}" class="tab-content" role="tabpanel" aria-labelledby="specification" aria-hidden="true">
      <div>${t.content || ""}</div>
    </div>
  </li>`),
        (Go.set("tab", t)[this.uuid] = function (t, e) {
          e.target.checked && (Go.uniqueClass("tab-active", `[handler="${t}"], [body="${t}"]`, ".tabs-" + this.uuid), Go.attrs(".tabs-" + this.uuid, { current: t }));
        }.bind(this)),
        this.ttab
      );
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOTABSJS),
    function (t = {}) {
      (this.data = t || {}), (this.view = null), (this.timeout = null), (this.duration = this.data.duration || Go.config("toastDuration") || 1e4), this.show();
    }),
  MODULE_LUIGI_OS_GOTOASTJS = {
    toast: function () {
      return new GO_TOAST(...arguments);
    },
  },
  GO_URL =
    ((GO_TOAST.prototype.show = function () {
      Go.is(this.data, "string") && (this.data = { message: this.data }),
        (this.data.icon ||= Go.config("toastIcon") || Go.config("appIcon")),
        (this.data.animation ||= Go.config("toastAnimation") || "midTopIn"),
        (this.data.position = "" + (this.data.position || "left-bottom")),
        (this.data.class = `${this.data.class || ""} toast ` + this.data.position),
        (this.data.html = '<div class="toastContent">'),
        this.data.icon && (this.data.html += `<div class="toastIcon"><div img style="--size:44px;--img:url('${this.data.icon}');"></div></div>`),
        (this.data.html += `<div class="toastMessage">${this.data.message}</div>`),
        (this.data.html += "</div>"),
        (this.data.header = !1),
        (this.data.lockBody = !1),
        (this.data.onview = !1),
        (this.data.onOpen = async function (t) {
          (this.content = await Go.awaitElement(".toastContent", t)),
            this.data.keepOpen || (this.timeout = setTimeout(this.close.bind(this), this.duration)),
            (this.content.onclick = async function () {
              await this.close(),
                Go.is(this.data.onClose, "function") && this.data.onClose(),
                Go.is(this.data.onclose, "function") && this.data.onclose(),
                Go.is(this.data.onclick, "function") && this.data.onclick();
            }.bind(this));
        }.bind(this)),
        (this.view = Go.view(this.data));
    }),
    (GO_TOAST.prototype.close = function () {
      if (Go.is(this.view.close, "function")) return this.view.close();
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOTOASTJS),
    function (t) {
      (this.url = t || window.location.href), (this.parts = []);
    }),
  GO_NAV = function (t) {
    (this.to = t), Go.is(t, "string") && this.push(t);
  },
  MODULE_LUIGI_OS_GOURLJS = {
    url: function () {
      return new GO_URL(...arguments);
    },
    nav: function () {
      return new GO_NAV(...arguments);
    },
  },
  GO_USER =
    ((GO_URL.prototype.query = function (t) {
      return this.url && new URL(this.url).searchParams.get(t);
    }),
    (GO_URL.prototype.removeHost = function () {
      return this.url && new URL(this.url).pathname;
    }),
    (GO_URL.prototype.removeBase = function () {
      return this.url && this.url.split(Go.base())[1];
    }),
    (GO_URL.prototype.param = function (t = 0) {
      return (
        this.url.startsWith("/") && (this.url = this.url.substring(1)),
        this.url.includes("://") && (this.url = this.url.split("://")[1]),
        (this.parts = this.url.split("/")),
        this.parts[t] && decodeURIComponent(this.parts[t])
      );
    }),
    (GO_URL.prototype.params = function () {
      return (
        this.url.startsWith("/") && (this.url = this.url.substring(1)),
        this.url.includes("://") && (this.url = this.url.split("://")[1]),
        (this.parts = this.url.split("/")),
        this.parts
      );
    }),
    (GO_URL.prototype.file = function () {
      return this.url.startsWith("/") && (this.url = this.url.substring(1)), (this.parts = this.url.split("/")), this.parts[this.parts.length - 1];
    }),
    (GO_URL.prototype.addPort = function (o) {
      if (this.url) {
        let [[t, e], i] = [this.url.split("://"), ""];
        (e = e.includes(":") ? e.split(":")[0] : e).split("/").map((t, e) => {
          e && (i += "/" + t);
        }),
          (e = e.split("/")[0]),
          (this.url = `${t}://${e}:` + o + i);
      }
      return this.url;
    }),
    (GO_URL.prototype.getHost = function () {
      var t;
      return this.url && (t = new URL(this.url)).protocol + "//" + t.host;
    }),
    (GO_URL.prototype.getProtocol = function () {
      return this.url && new URL(this.url).protocol;
    }),
    (GO_URL.prototype.fix = function () {
      var t = this.url.startsWith("https://") ? "https://" : "http://",
        e = (/^https?:\/\//i.test(this.url) || (this.url = location.protocol + "//" + this.url), new URL(this.url));
      (e.pathname = e.pathname.replace(/\/+/g, "/")), (e.pathname = encodeURI(decodeURI(e.pathname)));
      let i = e.toString();
      return (i = "https://" == t ? i.replace(/^http:\/\//, "https://") : i);
    }),
    (GO_NAV.prototype.push = function (t) {
      Go.do("nav/push", t);
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOURLJS),
    function (t, e) {
      (this.ssid = t), (this.key = e);
    }),
  MODULE_LUIGI_OS_GOUSERJS = {
    user: function () {
      return (arguments.length <= 1 ? new GO_USER(void 0, arguments[0]) : new GO_USER(...arguments)).get();
    },
  },
  GO_USER_PROTOTYPE =
    ((GO_USER.prototype.get = function () {
      return (this.data = Go.session.user(this.ssid)), this.key ? Go.getProperty(this.data, this.key) || "" : this.data ? new GO_USER_PROTOTYPE(this.data) : void 0;
    }),
    function (t = {}) {
      Object.assign(this, t);
    });
function GO_VIEW(t = {}) {
  this.beforeOpen(t);
}
(GO_USER_PROTOTYPE.prototype.hasRole = function (t) {
  return this.roles.includes(t);
}),
  (GO_USER_PROTOTYPE.prototype.hasSomeRole = function (...t) {
    return t.some((t) => this.roles.includes(t));
  }),
  (GO_USER_PROTOTYPE.prototype.hasAllRoles = function (...t) {
    return t.every((t) => this.roles.includes(t));
  }),
  (GO_USER_PROTOTYPE.prototype.hasAnyRole = function (...t) {
    return t.some((t) => this.roles.includes(t));
  }),
  (GO_USER_PROTOTYPE.prototype.hasPermission = function (t) {
    return this.permissions.includes(t);
  }),
  (GO_USER_PROTOTYPE.prototype.hasSomePermission = function (...t) {
    return t.some((t) => this.permissions.includes(t));
  }),
  (GO_USER_PROTOTYPE.prototype.hasAllPermissions = function (...t) {
    return t.every((t) => this.permissions.includes(t));
  }),
  (GO_USER_PROTOTYPE.prototype.hasAnyPermission = function (...t) {
    return t.some((t) => this.permissions.includes(t));
  }),
  Object.assign(GO, MODULE_LUIGI_OS_GOUSERJS),
  (window.views ||= {});
const GO_VIEW_AUX_PROTOTYPE = {},
  MODULE_LUIGI_OS_GOVIEWJS = {
    view: (t) => new GO_VIEW(t),
    closeAllViews: (t = {}) => GO_VIEW_AUX_PROTOTYPE.closeAllViews(t),
    viewIndexSelector: () => GO_VIEW_AUX_PROTOTYPE.viewIndexSelector(),
    closeView: function () {
      Go.close(...arguments);
    },
  },
  MODULE_LUIGI_OS_GOVIEWSJS =
    ((GO_VIEW_AUX_PROTOTYPE.viewIndexSelector = function () {
      return "go-view:not(.keepOnTop)";
    }),
    (GO_VIEW_AUX_PROTOTYPE.closeAllViews = function (i = {}) {
      document.querySelectorAll("go-view, .element").forEach((t) => {
        let e = !0;
        (e = i.exept && t.classList.contains(i.exept) ? !1 : e) && Go.close(t);
      }),
        Go.is(i, "function") && i(),
        Go.is(i.cb, "function") && i.cb();
    }),
    (GO_VIEW.prototype.beforeOpen = function (t = {}) {
      return (
        (this.configData = Go.config("view") || {}),
        (this.data = Object.assign({}, this.configData, t)),
        t.srcElement && (this.data = t.srcElement.dataset),
        (this.id = this.data.id || Go.uuid()),
        (this.class = this.data.class || ""),
        this.open(),
        this
      );
    }),
    (GO_VIEW.prototype.open = async function () {
      let [t, e] = [!0, ""];
      if ((Go.device.vibrate(this.data.vibrate || 200), Go.is(this.data.if, "set") && (t = this.data.if), (t = Go.is(t, "function") ? await t() : t))) {
        if ((Go.is(this.data.closeOthersViews, "true") && Go.closeAllViews(), this.data.delay && (await Go.delay(this.data.delay)), this.data.unique))
          if (document.querySelector("#view-" + this.id)) return;
        this.data.replace && ((i = document.querySelector("#view-" + this.id)) && Go.is(i.close, "function") ? await i.close() : i && i.remove()),
          this.data.animation || ((this.data.animation = "fadeIn"), (this.data.animationDuration ||= Go.config("animationDuration") || 200)),
          this.data.keepOnTop && ((e += " keepOnTop"), (this.data.index = 1e3 + this.countViews())),
          (this.target = this.data.target || "body");
        var i = document.querySelector(Go.viewIndexSelector() + ":last-child");
        i && Go.is(i, "HTMLElement") && (this.lastViewIndex = Number(Go.attr(i, "index"))),
          (this.index = this.data.index || this.lastViewIndex || this.countViews()),
          (this.view = document.createElement("go-view")),
          (this.view.data = this.data),
          (this.view.style.zIndex = 100 + Number(this.index) + 1),
          (this.lockBody = Go.prop("lockBody", this.data)),
          Go.is(this.data.parent, "object") && Object.assign(this.view, this.data.parent),
          Go.setAttrs(this.view, { id: "view-" + this.id, class: `View ${this.class} view ` + e, index: this.index + 1 }),
          this.provisioingTarget(),
          Go.appendChild(this.target, this.view),
          this.postOpen(),
          (this.isBlockScreen = !Go.is(this.lockBody, "false")),
          (this.isBlockScreen &= !Go.is(this.lockScreen, "false")),
          (this.isBlockScreen &= !Go.is(this.data.onview, "false")),
          this.isBlockScreen && Go.addClass(document.body, "onview");
      }
    }),
    (GO_VIEW.prototype.close = async function (t) {
      try {
        var e = await Go.awaitElement("#view-" + this.id);
        e && Go.is(e.close, "function") && e.close(t);
      } catch (t) {}
    }),
    (GO_VIEW.prototype.countViews = function () {
      return Go.countElements(Go.viewIndexSelector());
    }),
    (GO_VIEW.prototype.provisioingTarget = function () {
      var t;
      Go.is(this.data.targetClean, "selector") &&
        ((t = document.querySelector(this.target)),
        [].forEach.call(t.querySelectorAll(this.data.targetClean), (t) => {
          t.remove();
        }));
    }),
    (GO_VIEW.prototype.postOpen = async function () {
      Go.is(this.data.onOpen, "function") && this.data.onOpen(this.view),
        Go.is(this.data.onOpen, "string") && Go.eval(this.data.onOpen),
        this.data.autoClose && Go.sleep(this.data.autoClose, () => this.close());
    }),
    (GO_VIEW.prototype.find = function (t) {
      return this.view.querySelector(t);
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOVIEWJS),
    {
      views: function (t = {}) {
        return window.views || (window.views = {}), Object.assign(window.views, t), this.analizeViews(t), t;
      },
      analizeViews: function (t = {}) {
        let i;
        Go.for(t, (t, e) => {
          (i = "function" != typeof e && "object" == typeof e) && (e.key = t),
            Go.includes(t, "*") && ((t = t.split("*")[0]), i && (e.parent = t || ""), i) && Go.is(e.routes, "object") && this.analizeViews(e.routes);
        });
      },
    }),
  GoVue = (Object.assign(GO, MODULE_LUIGI_OS_GOVIEWSJS), {}),
  MODULE_LUIGI_OS_GOVUEJS = ((GoVue.methods = {}), (GoVue.computed = {}), (GoVue.watch = {}), (GoVue.components = {}), { vue: GoVue, Vue: {} }),
  GO_XHR = (Object.assign(GO, MODULE_LUIGI_OS_GOVUEJS), {});
function XHR(t, e = {}, i) {
  return (
    Go.extend(this, Go.Events), (this.host = Go.route.fixPath(t || e.url || e.host)), (this.host = Go.fix(this.host).url()), (this.data = null), (this.options = e), this.init()
  );
}
const MODULE_LUIGI_OS_GOXHRJS = { xhr: (t, e) => new XHR(t, e) },
  GO_INCLUDES =
    ((XHR.prototype.init = function () {
      return (
        this.host && !this.host.startsWith("/") && Go.app && Go.app.keyName && (this.host = `/app/${Go.app.keyName}/` + this.host),
        this.options.cache && GO_XHR[this.host] ? Promise.resolve(GO_XHR[this.host]) : this.host ? this.host && this[Go.lower(this.options.method) || "get"]() : void 0
      );
    }),
    (XHR.prototype.get = async function () {
      return new Promise((t, e) => {
        var i = new XMLHttpRequest();
        i.open("GET", this.host, !0), (i.responseType = this.options.responseType || this.options.type || "json"), this.setHeaders(i), this.listeners(i, t, e), i.send();
      });
    }),
    (XHR.prototype.post = async function () {
      return new Promise((t, e) => {
        var i = new XMLHttpRequest();
        i.open("POST", this.host, !0),
          (i.responseType = this.options.responseType || this.options.type || "json"),
          this.setHeaders(i),
          this.listeners(i, t, e),
          i.send(this.body(this.options.body || this.options.data, i));
      });
    }),
    (XHR.prototype.setHeaders = function (t) {
      var e,
        i = localStorage.getItem("go-ss"),
        o = localStorage.getItem("lang") || "en",
        n = this.options.headers || {},
        o = { api: "true", lang: o, "go-ss": i, app: Go.app.keyName || "" },
        i = { map: this.map() },
        s = Go.storage("headers").get() || { nostore: "true" },
        r = Go.config("headers") || {},
        a = Object.assign({}, n, o, i, s, r);
      for (e in a) t.setRequestHeader(e, a[e]);
    }),
    (XHR.prototype.body = function (t, e) {
      return Go.is(t, "FormData") ? t : Go.is(t, "Object") ? (e.setRequestHeader("Content-Type", "application/json"), Go.json(t)) : void 0;
    }),
    (XHR.prototype.map = function () {
      const i = { files: {}, total_files_size: 0, total_files: 0 };
      return (
        Go.is(this.options.body, "FormData") &&
          this.options.body.forEach((t, e) => {
            Go.is(t, "File") && t.size
              ? ((i.files[e] = { type: t.type, name: t.name, size: t.size }), (i.total_files_size += Number(t.size)), (i.total_files += 1))
              : Go.is(t, "File") || (i[e] = t);
          }),
        Go.json(i)
      );
    }),
    (XHR.prototype.listeners = function (t, e, i) {
      t.addEventListener("loadstart", this.loadstart.bind(this, t, e, i)),
        t.addEventListener("load", this.load.bind(this, t, e, i)),
        t.addEventListener("loadend", this.loadend.bind(this, t, e, i)),
        t.addEventListener("progress", this.progress.bind(this, t, e, i)),
        t.addEventListener("error", this.error.bind(this, t, e, i)),
        t.addEventListener("abort", this.abort.bind(this, t, e, i));
    }),
    (XHR.prototype.loadstart = function (t, e, i) {}),
    (XHR.prototype.load = function (t, e, i) {
      return 200 !== t.status
        ? i(t)
        : ((this.data = t.response),
          "json" === t.responseType && this.data?.success && this.emit("success", this.data),
          this.options.cache && (GO_XHR[this.host] = this.data),
          e(this.data));
    }),
    (XHR.prototype.loadend = function (t, e, i) {}),
    (XHR.prototype.progress = function (t, e, i) {}),
    (XHR.prototype.error = function (t, e, i) {
      return this.emit("error", t), i(t);
    }),
    (XHR.prototype.abort = function (t, e, i) {
      return this.emit("abort", t), i(t);
    }),
    Object.assign(GO, MODULE_LUIGI_OS_GOXHRJS),
    {}),
  MODULE_LUIGI_OS_INCLUDESJS =
    ((GO_INCLUDES.includes = function (t, e) {
      return !!t && !!e && (Go.is(t, "String") && e.includes(" ") ? GO_INCLUDES.includesMultipleString(t, e) : Go.is(t, "String") ? t.includes(e) : -1 !== t.indexOf(e));
    }),
    (GO_INCLUDES.includesMultipleString = function (t, e) {
      var i,
        o = [];
      for (i of (e = e.includes(" ") ? e.split(" ") : e)) Go.includes(t, i) && o.push(i);
      return o.length === e.length;
    }),
    GO_INCLUDES),
  GO_VALIDATE =
    (Object.assign(GO, MODULE_LUIGI_OS_INCLUDESJS),
    function (t = {}, e = [], i = {}) {
      (this.requires = e), (this.obj = t), (this.config = i), (this.error = {});
    }),
  MODULE_LUIGI_OS_GOVALIDATEJS = {
    validate: function () {
      return new GO_VALIDATE(...arguments).valid();
    },
  };
(GO_VALIDATE.prototype.valid = function () {
  !Go.is(this.requires, "array") && Go.is(this.requires, "object") && ((this.config = this.requires), (this.requires = Object.keys(this.requires)));
  for (var t of this.requires) if ((this.verifyItem(t), this.error.message)) return this.error;
  return !!this.error.message && this.error;
}),
  (GO_VALIDATE.prototype.verifyItem = function (t) {
    if (((this.keyItem = "string" == typeof t ? t : t.name), this.obj[this.keyItem])) {
      if (((this.iConfig = this.config[this.keyItem] || {}), this.iConfig.length || (this.iConfig.length = {}), this.obj[this.keyItem].originalFilename))
        return this.verifyFile(this.obj[this.keyItem]);
      this.iConfig.length.min && this.obj[this.keyItem].length < this.iConfig.length.min
        ? ((this.error.item = t), (this.error.message = this.keyItem + "_is_too_short"), (this.error.name = this.keyItem))
        : this.iConfig.length.max && this.obj[this.keyItem].length > this.iConfig.length.max
        ? ((this.error.item = t), (this.error.message = this.keyItem + "_is_too_long"), (this.error.name = this.keyItem))
        : this.iConfig.length.exact && this.obj[this.keyItem].length !== this.iConfig.length.exact
        ? ((this.error.item = t), (this.error.message = this.keyItem + "_is_length_not_valid"), (this.error.name = this.keyItem))
        : this.iConfig.type &&
          !Go.is(this.obj[this.keyItem], this.iConfig.type) &&
          ((this.error.item = t), (this.error.message = `${this.keyItem}_is_not_${this.iConfig.type}_valid`), (this.error.name = this.keyItem));
    } else (this.error.item = t), (this.error.message = this.keyItem + "_is_required"), (this.error.name = this.keyItem);
    return this.error;
  }),
  (GO_VALIDATE.prototype.verifyFile = function (t) {
    return (
      this.iConfig.length.min && t.size < this.iConfig.length.min
        ? ((this.error.item = t), (this.error.message = this.keyItem + "_is_too_short"), (this.error.name = this.keyItem))
        : this.iConfig.length.max && t.size > this.iConfig.length.max
        ? ((this.error.item = t), (this.error.message = this.keyItem + "_is_too_long"), (this.error.name = this.keyItem))
        : this.iConfig.length.exact && t.size !== this.iConfig.length.exact
        ? ((this.error.item = t), (this.error.message = this.keyItem + "_is_length_not_valid"), (this.error.name = this.keyItem))
        : !this.iConfig.type ||
          ((this.filetypes = new RegExp(this.iConfig.type, "i")),
          (this.mimetype = this.filetypes.test(t.mimetype)),
          (this.extname = this.filetypes.test(Go.getFileExtension(t.originalFilename).toLowerCase())),
          this.mimetype && this.extname) ||
          ((this.error.item = t), (this.error.message = `${this.keyItem}_is_not_${this.iConfig.type}_valid`), (this.error.name = this.keyItem)),
      this.error
    );
  }),
  Object.assign(GO, MODULE_LUIGI_OS_GOVALIDATEJS),
  (GO.loadComponents = function () {
    Go.component("go-app", function () {
      return {
        default: {
          beforeRender: function () {},
          render: function () {},
          afterRender: function () {
            document.body.onclick = function () {
              Go.emit("click", this);
            }.bind(this);
          },
        },
      };
    }),
      Go.component("go-block", function () {
        return {
          default: {
            beforeRender: function () {
              (this.if = this.attrs.if || Go.attr(this, "if") || this.is), this.if && !eval(this.if) && this.remove();
            },
            render: function () {},
          },
        };
      }),
      Go.component("go-button", function () {
        return {
          default: {
            beforeRender: function () {
              (this.icon ||= this.attrs.icon || Go.attr(this, "icon")),
                (this.label ||= this.attrs.label || Go.attr(this, "label")),
                (this.color ||= this.attrs.color || Go.attr(this, "color")),
                (this.iconright ||= this.attrs.iconright || Go.attr(this, "iconright")),
                (this.ciconAttr = this.attrs.ciconattr || Go.attr(this, "ciconattr")),
                (this.iconRightTemplate = ""),
                Go.is(this.icon, "json") && ((this.dataIcon = JSON.parse(this.icon)), (this.icon = this.dataIcon.name), (this.ciconAttr = this.dataIcon.attr)),
                Go.is(this.label, "json") &&
                  ((this.dataLabel = JSON.parse(this.label)),
                  (this.label = this.dataLabel.text || this.dataLabel.title),
                  (this.labelAttr = this.dataLabel.attr),
                  (this.desc = this.dataLabel.desc)),
                this.color && (this.style.color = this.color),
                (this.iconTemplate = `<go-icon name="${this.icon}" ${this.ciconAttr || ""}></go-icon>`),
                (this.labelTemplate = `<go-label ${this.labelAttr || ""}>`),
                this.desc
                  ? ((this.labelTemplate += `<div class="btitle">${this.label}</div>`), (this.labelTemplate += `<div class="desc">${this.desc}</div>`))
                  : (this.labelTemplate += "" + this.label),
                (this.labelTemplate += "</go-label>"),
                this.iconright && (this.iconRightTemplate = `<go-icon class="iconRight" name="${this.iconright}"></go-icon>`),
                this.icon || (this.iconTemplate = ""),
                this.label || (this.labelTemplate = ""),
                (this.template = this.iconTemplate + this.labelTemplate + this.iconRightTemplate);
            },
            render: function () {
              this.innerHTML = this.template;
            },
            setIcon: function (t) {
              this.querySelector("go-icon").icon(t);
            },
          },
        };
      }),
      Go.component("go-carousel", function () {
        return {
          default: {
            beforeRender: async function () {
              (this.options = this.attrs.options || Go.attr(this, "options") || {}), (this.carouselClass = "carousel-" + Go.uuid()), Go.addClass(this, this.carouselClass);
            },
            render: function () {
              this.slickMount();
            },
            slickMount: async function () {
              var t = this;
              (t.options = Go.json(this.options)),
                (t.prevArrow = '<div class="prev"><a button="active"><go-icon name="chevronLeft"></go-icon></a></div>'),
                (t.nextArrow = '<div class="next"><a button="active"><go-icon name="chevronRight"></go-icon></a></div>'),
                Go.cssVars(this, { "--slidesToShow": t.options.slidesToShow || 1 }),
                $(this).slick({ prevArrow: t.prevArrow, nextArrow: t.nextArrow, ...t.options });
            },
          },
        };
      }),
      Go.component("go-carrousel-2", function () {
        return {
          default: {
            beforeRender: function () {
              const e = this;
              if (
                ((this.slots = this.children),
                (this.current = 0),
                (this.moved = 0),
                (this.slidesToScroll = this.attrs.slidesToScroll || Go.attr(this, "slidesToScroll") || 1),
                (this.slidesToShow = this.attrs.slidesToShow || Go.attr(this, "slidesToShow") || 1),
                (this.id = Go.uuid()),
                this.slots && 0 != this.slots.length)
              ) {
                this.template = '<div class="track">';
                for (let t = 0; t < this.slots.length; t++) this.template += `<div class="item" slide="${t}">${this.slots[t].outerHTML}</div>`;
                (this.template += "</div>"),
                  (this.template += '<div class="arrow prev"><a button="active"><go-icon name="chevronLeft"></go-icon></a></div>'),
                  (this.template += '<div class="arrow next"><a button="active"><go-icon name="chevronRight"></go-icon></a></div>'),
                  Go.cssVars(this, { "--slidesToShow": this.slidesToShow, "--slidesToScroll": this.slidesToScroll, "--slides": this.slots.length, "--moved-x": "0px" }),
                  (this.observer = Go.observer(this, { intersection: !0, attributes: !0, childList: !0, subtree: !0 })),
                  this.observer.on("intersection", ({ entry: t = {} } = {}) => {
                    t.isIntersecting && e.initStyles();
                  });
              }
            },
            render: function () {
              this.html(this.template), this.initStyles();
            },
            afterRender: async function () {
              const [t, e] = [Go.drag(this), this];
              let i = [0][0];
              (this.track = this.child(".track")),
                (this.carouselWidth = this.offsetWidth),
                (this.numSlots = this.slots.length),
                (this.limitWidth = this.getLimitWidth()),
                t.on("moveStart", (t) => {
                  (e.track.style.transition = "none"), e.initStyles();
                }),
                t.on("moving", (t) => {
                  (i = e.moved + t.x), e.setStyles({ ...t, distance: i });
                }),
                t.on("moveEnd", (t) => {
                  (e.track.style.transition = "all 0.3s ease-in-out"), (i = e.moved + t.x), 0 < (e.moved = i) && ((e.moved = 0), (i = 0)), e.setEndStyles({ ...t, distance: i });
                }),
                this.initStyles(),
                Go.on("resizeEnd:" + this.id, () => {
                  this.initStyles();
                }),
                this.handlers();
            },
            initStyles: function () {
              Go.cssVars(this, { "--carousel-width": "100%" });
              var t = Go.screen()["width"];
              let e = this.offsetWidth;
              e > t && (e = t), Go.cssVars(this, { "--carousel-width": e + "px" });
            },
            setStyles: function ({ distance: t, nextIndex: e }) {
              (e ||= this.current), Go.cssVars(this, { "--moved-x": t + "px", "--current-slide": e });
            },
            setEndStyles: function ({ distance: t, x: e, event: i }) {
              var o = this.offsetWidth / this.slidesToShow,
                n = Go.getPercent(Go.positive(e), this.offsetWidth),
                i = i.srcElement.closest("[slide]"),
                i = Go.attr(i, "slide"),
                s = 0 < e ? "left" : "right";
              let [r, a] = [i, 0];
              (this.numSlots = this.querySelectorAll("[slide]").length),
                (this.limitWidth = this.getLimitWidth()),
                ("left" != s && "right" != s) ||
                  (20 <= n && "right" == s
                    ? ((r = Number(i) + Number(this.slidesToScroll)),
                      (t = a = Go.negative(o * r)),
                      (this.moved = t),
                      this.querySelector(`[slide="${r}"]`) || ((t = Go.negative(this.limitWidth)), (this.moved = t), (r = this.numSlots - 1)))
                    : 20 <= n && "left" == s
                    ? ((r = Number(i) - Number(this.slidesToScroll)), (t = a = Go.negative(o * r)), (this.moved = t), r < 0 && ((this.moved = t = 0), (r = 0)))
                    : n < 20 && ((r = Number(i)), (t = Go.negative(o * i)), (this.moved = t)),
                  Go.positive(t) > Go.positive(this.limitWidth) && ((t = Go.negative(this.limitWidth)), (this.moved = t)),
                  e && ((this.current = r), this.setStyles({ distance: t, nextIndex: r, x: e })));
            },
            destroy: function () {
              Go.off("resizeEnd:" + this.id), this.observer.disconnect();
            },
            handlers: function () {
              (this.prevButton = this.child(".arrow.prev")),
                (this.nextButton = this.child(".arrow.next")),
                (this.prevButton.onclick = () => this.prev()),
                (this.nextButton.onclick = () => this.next());
            },
            prev: async function () {
              (this.arrowMoved ||= 0),
                (this.itemWidth = this.getItemWidth()),
                (this.prevDistance = this.arrowMoved + this.itemWidth),
                (this.moved = this.prevDistance),
                (this.arrowMoved = this.prevDistance),
                this.setStyles({ distance: this.prevDistance }),
                0 < this.prevDistance &&
                  ((this.moved = 0),
                  (this.prevDistance = 0),
                  (this.arrowMoved = 0),
                  await Go.sleep(Go.env("view_transition_time") / 4),
                  this.setStyles({ distance: this.prevDistance }));
            },
            next: async function () {
              (this.arrowMoved ||= 0),
                (this.limitWidth = this.getLimitWidth()),
                (this.itemWidth = this.getItemWidth()),
                (this.prevDistance = this.arrowMoved - this.itemWidth),
                (this.moved = this.prevDistance),
                (this.arrowMoved = this.prevDistance),
                this.setStyles({ distance: this.prevDistance }),
                Go.positive(this.prevDistance) > Go.positive(this.limitWidth) &&
                  ((this.prevDistance = Go.negative(this.limitWidth)),
                  (this.moved = this.prevDistance),
                  (this.arrowMoved = this.prevDistance),
                  await Go.sleep(Go.env("view_transition_time") / 4),
                  this.setStyles({ distance: this.prevDistance }));
            },
            getLimitWidth: function () {
              return (
                (this.itemWidth = this.getItemWidth()),
                (this.numSlots = this.querySelectorAll("[slide]").length),
                (this.limitWidth = this.itemWidth * this.numSlots - this.offsetWidth),
                this.limitWidth
              );
            },
            getItemWidth: function () {
              return (this.itemWidth = this.offsetWidth / this.slidesToShow), this.itemWidth;
            },
          },
        };
      }),
      Go.component("go-circle", function () {
        return {
          default: {
            beforeRender: function () {
              (this.img = this.img || this.attrs.img || Go.attr(this, "img") || ""), this.img && this.style.setProperty("--img", `url(${this.img})`);
            },
            render: function () {},
          },
        };
      }),
      Go.component("go-collapse", function () {
        return {
          default: {
            beforeRender: function () {
              (this.details = document.createElement("details")),
                (this.summary = document.createElement("summary")),
                (this.slotContent = this.innerHTML),
                (this.title ||= Go.attr(this, "title")),
                (this.iconName = this.attrs.icon || Go.attr(this, "icon")),
                (this.content = document.createElement("div")),
                (this.icon = document.createElement("go-icon")),
                Go.addClass(this, "go-collapse"),
                Go.addClass(this.icon, "go-collapse-icon"),
                Go.setAttr(this.icon, "name", this.iconName || "close"),
                (this.summary.innerHTML = `<span class="go-collapse-title">${this.title}</span>`),
                this.details.appendChild(this.summary),
                this.details.appendChild(this.content),
                Go.addClass(this.details, "go-collapse-details"),
                Go.addClass(this.summary, "go-collapse-summary"),
                Go.addClass(this.content, "go-collapse-slot"),
                this.summary.appendChild(this.icon),
                (this.content.innerHTML = this.slotContent),
                (this.innerHTML = "");
            },
            render: function () {
              this.appendChild(this.details);
            },
            afterRender: function () {
              Go.addClass(this, "rendered");
            },
          },
        };
      }),
      Go.component("go-component", function () {
        return {
          default: {
            useMethod: function () {
              return (
                (this.method ||= this.attrs.method || Go.attr(this, "method")),
                this.method || Go.includes(location.origin, "luigios.com") ? this.method || (this.method = "POST") : (this.method = "GET"),
                this.method
              );
            },
            beforeRender: async function () {
              if (
                (this.evaluateProps(),
                (this.payload ||= this.data || Go.fromJson(Go.attr(this, "payload") || Go.attr(this, "data"))),
                (this.databox ||= Go.attr(this, "databox")),
                (this.cache ||= Go.attr(this, "cache")),
                (this.skeleton ||= Go.attr(this, "skeleton") || Go.prop(this.data, "skeleton") || {}),
                (this.template = ""),
                (this.method = this.useMethod()),
                this.data.src && ((this.src = Go.eval(this.data.src)), Go.is(this.cache, "true") && (this.template = Go.config(Go.keyId(this.src))), !this.template))
              ) {
                (this.template = this.getLoader()), Go.html(this, this.template);
                try {
                  (this.req = await Go.xhr(this.src, { method: this.method, responseType: "text", body: { component: !0, ...this.payload, databox: this.databox } })),
                    (this.template = this.req);
                } catch (t) {
                  this.template = `<div class="error">${Go.getErrorMessage(t)}</div>`;
                }
                this.cache && this.req && Go.config(Go.keyId(this.src), this.req);
              }
            },
            render: function () {
              Go.html(this, Go.eval(this.template, this));
            },
            getLoader: function () {
              let t = '<div class="loader" gap f200 dcolor><go-icon name="gspinner"></go-icon></div>';
              return (t = this.skeleton ? this.getSkeleton() : t);
            },
            getSkeleton: function () {
              let [t, e, i, o] = [this.skeleton, "", "", ""],
                n =
                  (Go.is(this.skeleton, "json") && (this.skeleton = Go.fromJson(this.skeleton)),
                  (t = this.skeleton.items || 1),
                  (e = this.skeleton.style || ""),
                  (i = this.skeleton.itemStyle || ""),
                  `<div class="skeletonLoading" style="${e}">`);
              return (
                Go.for(Number(t), (t) => {
                  (o = "" + (this.skeleton["style" + (t + 1)] || "")), (n += `<div class="skeleton item" gap style="${i}${o}"></div>`);
                }),
                (n += "</div>")
              );
            },
          },
        };
      }),
      Go.component("go-confirm", function () {
        return {
          default: {
            loader: function (t = !1) {
              t ? this.html('<div gap tcenter f200 dcolor><go-icon name="gspinner"></go-icon></div>') : (this.clean(), this.render());
            },
            beforeRender: function () {
              (this.acceptLabel = Go.attr(this, "acceptLabel") || Go.lang("accept")),
                (this.cancelLabel = Go.attr(this, "cancelLabel") || Go.lang("cancel")),
                (this.content = document.createElement("div")),
                (this.acceptButton = document.createElement("a")),
                (this.cancelButton = document.createElement("a")),
                this.content.appendChild(this.cancelButton),
                this.content.appendChild(this.acceptButton),
                Go.addClass(this.content, "content"),
                Go.addClass(this.acceptButton, "button accept primary-button"),
                Go.addClass(this.cancelButton, "button cancel secondary-button"),
                (this.acceptButton.innerText = this.acceptLabel),
                (this.cancelButton.innerText = this.cancelLabel);
            },
            render: async function () {
              this.appendChild(this.content);
            },
            afterRender: function () {
              (this.acceptButton.onclick = () => this.onAccept()), (this.cancelButton.onclick = () => this.onCancel());
            },
            onAccept: function () {
              var t = this.attrs.onaccept || Go.attr(this, "onaccept") || this.onaccept,
                e = ((t ||= this.attrs.onconfirm || Go.attr(this, "onconfirm") || this.onconfirm), this.attrs.parent || Go.attr(this, "parent"));
              let i = null;
              (i = e ? this.closest(e) : i) && i.close(), t && Go.eval(t);
            },
            onCancel: function () {
              var t = this.attrs.oncancel || Go.attr(this, "oncancel") || this.oncancel,
                e = this.attrs.parent || Go.attr(this, "parent");
              let i = null;
              (i = e ? this.closest(e) : i) && i.close(), t && Go.eval(t);
            },
          },
        };
      }),
      Go.component("go-country", function () {
        return {
          default: {
            beforeRender: function () {
              (this.name = this.attrs.name || Go.attr(this, "name") || "country"),
                (this.value = this.attrs.value || Go.attr(this, "value") || ""),
                (this.viewBody = ""),
                (this.template = `<ul class="list">
      <li class="list-item list-item--chevron list-item--tappable countryItem">
        <div class="list-item__center">${Go.lang("country")}</div>
        <div class="list-item__right list-item--chevron__right">
          <div class="list-item__label labelValue">${this.value}</div>
          <input class="value" type="hidden" name="${this.name}" value="${this.value}" />
        </div>
      </li>
    </ul>`),
                (this.viewBody += '<div class="search" sticky-top>'),
                (this.viewBody += '<go-input icon="search" placeholder="Buscar" type="text"></go-input>'),
                (this.viewBody += "</div>");
            },
            render: function () {
              this.html(this.template);
            },
            afterRender: function () {
              const o = this;
              (this.item = this.child(".countryItem")),
                (this.item.onclick = function () {
                  o.view = Go.view({
                    title: `<div padding-x>${Go.lang("country_select")}</div>`,
                    class: "default menu bottom fillHeight countrySelect",
                    animation: "bottomIn",
                    html: o.viewBody,
                    onOpen: async function (i) {
                      var t = await Go.awaitElement(`#${i.id} go-view-body`),
                        e = document.createElement("go-list");
                      (e.src = "/api/global/country/list"),
                        (e.item = function ({ item: t }) {
                          var e = [null][0];
                          return ((e = document.createElement("div")).innerHTML = o.itemTemplate(t)), (e.onclick = () => o.clickedItem(t, i)), e;
                        }),
                        t.appendChild(e);
                    },
                  });
                });
            },
            itemTemplate: function (t) {
              return `<div class="list-item list-item--chevron list-item--tappable content">
      <div class="list-item__center">
        <div class="icon flag"><img src="${t.flag}" /></div>
        <div class="name">${t.name}</div>
      </div>
      <div class="list-item__right list-item--chevron__right">
        <div class="list-item__label">${t.callingCodes[0]}</div>
      </div>
    </div>`;
            },
            clickedItem: function (t, e) {
              var i = this.child(".value"),
                o = this.child(".labelValue");
              (i.value = t.name), (o.innerHTML = t.name), e.close(), this.onchange && this.onchange(t);
            },
          },
        };
      }),
      Go.component("go-emoji", function () {
        return {
          default: {
            beforeRender: function () {
              (this.name ||= Go.attr(this, "name")), (this.emoji = Go.emoji(this.name) || Go.emoji("exclamation"));
            },
            render: function () {
              this.innerHTML = this.emoji;
            },
          },
        };
      }),
      Go.component("go-fileimage", function () {
        return {
          default: {
            beforeRender: function () {
              (this.content = document.createElement("label")),
                (this.input = document.createElement("input")),
                (this.preview = document.createElement("img")),
                (this.input.type = "file"),
                (this.input.accept = "image/*"),
                this.content.appendChild(this.input),
                (this.width = this.attrs.width || Go.attr(this, "width") || 200),
                (this.height = this.attrs.height || Go.attr(this, "height") || 200),
                (this.preview.src = this.attrs.value || Go.attr(this, "value") || ""),
                (this.input.name = this.attrs.name || Go.attr(this, "name") || ""),
                Go.cssVar(this, "--width", this.width + "px"),
                Go.cssVar(this, "--height", this.height + "px"),
                Go.addClass(this.content, "content"),
                Go.addClass(this.preview, "preview"),
                this.content.appendChild(this.preview),
                (this.info = document.createElement("input")),
                (this.info.type = "hidden"),
                (this.info.name = this.input.name + "_info"),
                this.content.appendChild(this.info);
            },
            render: function () {
              this.child(this.content);
            },
            afterRender: function () {
              const i = this;
              (this.input.onchange = function (t) {
                Go.addClass(i, "loading"),
                  t.target.files.length &&
                    ((t = t.target.files[0]),
                    Go.readFIle(t, "image").then((t) => {
                      i.setInfo(t), Go.removeClass(i, "loading"), i.emit("change", t);
                    }));
              }),
                (this.ondragover = function (t) {
                  Go.prevent(t);
                }),
                (this.ondrop = function (t) {
                  Go.prevent(t);
                  const e = t.dataTransfer.files;
                  e.length &&
                    ((t = e[0]),
                    Go.readFIle(t, "image").then((t) => {
                      i.setInfo(t), i.emit("change", t);
                      t = new CustomEvent("change", { detail: { files: e } });
                      i.dispatchEvent(t), Go.removeClass(i, "loading");
                    }));
                });
            },
            setInfo: function (e) {
              const [i, t] = [this, new Image()];
              (t.onload = function () {
                var t = { width: this.width, height: this.height, size: this.size };
                i.emit("info", t), (i.preview.src = e), (i.info.value = Go.json(t)), Go.addClass(i, "loaded");
              }),
                (t.src = e);
            },
          },
        };
      }),
      Go.component("go-html", function () {
        return {
          default: {
            beforeRender: async function () {
              if (
                ((this.tempHtml = this.attrs["temp-html"] || Go.attr(this, "temp-html") || this.attrs.tmp || Go.attr(this, "tmp") || '<go-icon name="gspinner"></go-icon>'),
                (this.method = this.attrs.method || Go.attr(this, "method") || "GET"),
                (this.cache = this.attrs.cache || Go.attr(this, "cache") || Go.getProp(this, "cache") || ""),
                (this.src = this.attrs.src || Go.attr(this, "src") || Go.getProp(this, "src")),
                this.html(this.tempHtml),
                (this.store = Go.store(Go.keyString(this.cache || this.src))),
                (this.dataTemplate = this.store.get("template")),
                Go.is(this.cache, "false") && (this.dataTemplate = ""),
                this.dataTemplate)
              )
                this.render();
              else
                try {
                  (this.dataTemplate = await Go.xhr(this.src, { method: this.method, responseType: "text" })), this.store.set("template", this.dataTemplate), this.render();
                } catch (t) {
                  (this.dataTemplate = '<div class="error">'), (this.dataTemplate += Go.getErrorMessage(t, Go.lang("error_loading_template"))), (this.dataTemplate += "</div>");
                }
            },
            render: function () {
              this.attrs.noeval || Go.attr(this, "noeval") ? this.html(this.dataTemplate) : $(this).html(Go.eval(this.dataTemplate));
            },
          },
        };
      }),
      Go.component("go-icon", function () {
        return {
          default: {
            beforeRender: function () {
              (this.name ||= this.attrs.name || Go.attr(this, "name")),
                (this.name ||= this.attrs.icon || Go.attr(this, "icon")),
                (this.attr ||= this.attrs.attr || Go.attr(this, "attr")),
                (this.svg = this.getSVG(this.name)),
                this.attr && Go.setAttr(this, this.attr);
            },
            render: function () {
              "this" !== this.name && (this.innerHTML = this.svg);
            },
            getSVG: function () {
              return Go.is(this.name, "path")
                ? `<img class="image" src="${this.name}"></img>`
                : ((this.lowename = this.name && this.name.replace(/-/g, "_")), (this.lowename = Go.lower(this.lowename)), Go.icons(this.name) || Go.icons(this.lowename) || "?");
            },
            icon: function (t) {
              (this.name = t), Go.attr(this, "name", t), (this.svg = this.getSVG(this.name)), this.render();
            },
          },
        };
      }),
      Go.component("go-input", function () {
        return {
          default: {
            beforeRender: function () {
              (this.bind = this.bind || Go.attr(this, "bind")),
                (this.name = this.name || Go.attr(this, "name")),
                (this.label = this.label || Go.attr(this, "label")),
                (this.decode = this.decode || Go.attr(this, "decode")),
                (this.encode = this.encode || Go.attr(this, "encode")),
                (this.value = this.value || Go.attr(this, "value")),
                (this.oninput = this.oninput || Go.attr(this, "oninput") || this.onInput || Go.attr(this, "onInput")),
                (this.idClass = "input" + Go.uuid()),
                (this.template = ""),
                (this.format ||= Go.attr(this, "format")),
                (this.events = ""),
                (this.isFile = !1),
                Go.addClass(this, this.idClass),
                this.attrs.icon && ((this.icon = `<go-icon name="${this.attrs.icon}"></go-icon>`), (this.hasIcon = !0)),
                (this.readonly = ""),
                (this.autocomplete = ""),
                this.label && (this.template += `<label>${this.label}</label>`),
                (this.template += `<div class="contain ${this.hasIcon ? "__icon" : ""}">`),
                (this.template += "" + (this.icon || "")),
                Go.hasAttr(this, "readonly") && (this.readonly = `readonly="${this.attrs.readonly}"`),
                Go.hasAttr(this, "autocomplete") && (this.autocomplete = `autocomplete="${this.attrs.autocomplete}"`);
              let t = {
                textarea: "textarea" === this.attrs.type,
                textbox: "textbox" === this.attrs.type,
                filebox: "filebox" === this.attrs.type || "file" === this.attrs.type,
                default: this.attrs.type,
              };
              t.textarea
                ? ((t = {}),
                  (this.template += `<textarea class="input textarea" name="${this.attrs.name}" placeholder="${this.attrs.placeholder || this.attrs.label || ""}" ${
                    this.readonly
                  } ${this.autocomplete}>${this.value || ""}</textarea>`))
                : t.textbox
                ? ((t = {}),
                  (Go.is(this.decode, "true") || Go.is(this.encode, "true")) && (this.value = decodeURIComponent(this.value)),
                  Go.is(this.format, "false") && (this.events += "onpaste='Go.clipboard(event).clean()' "),
                  (this.template += `<div contenteditable="true" class="input textarea" name="${this.attrs.name}" 
      placeholder="${this.attrs.placeholder || this.attrs.label || ""}" 
      ${this.readonly} ${this.autocomplete} ${this.events}>${this.value || ""}</div>
      <input role="texboxValue" type="hidden" name="${this.attrs.name}" value="${(this.value && encodeURIComponent(this.value)) || ""}" />`))
                : t.filebox
                ? ((t = {}),
                  (this.isFile = !0),
                  (this.template += '<label class="fileWrap" w100>'),
                  (this.template += `<input class="input" name="${this.attrs.name}" type="file" ${this.readonly} ${this.accept} />`),
                  (this.template += `<div class="finput input">${this.attrs.placeholder || Go.lang("not_file_selected") || ""}</div>`),
                  (this.template += "</label>"))
                : t.default &&
                  (this.template += `<input class="input" name="${this.attrs.name}" type="${this.attrs.type}" 
      placeholder="${this.attrs.placeholder || this.attrs.label || ""}" value="${this.value || ""}" 
      ${this.readonly} ${this.autocomplete} />`),
                (this.template += "</div>"),
                Go.addClass(this, "go-input");
            },
            render: async function () {
              this.innerHTML = Go.eval(this.template);
            },
            fileInput: function () {
              this.isFile &&
                ((this.fileNameBox = this.querySelector(".finput")),
                (this.inputBox.onchange = function (t) {
                  (this.hasFile = !!t.target.files[0]),
                    (this.fileNameBox.innerHTML = this.hasFile ? t.target.files[0].name : Go.lang("not_file_selected")),
                    this.setAttribute("filled", this.hasFile);
                }.bind(this)));
            },
            afterRender: async function () {
              (this.textbox = this.querySelector("div[contenteditable]")), (this.textboxValue = this.querySelector("input[role=texboxValue]"));
              try {
                this.inputBox = this.querySelector(`input[name=${this.name}]`);
              } catch (error) {}
              this.fileInput(),
                this.textbox &&
                  this.textbox.addEventListener("input", () => {
                    this.textboxValue.value = encodeURIComponent(this.textbox.innerHTML);
                  }),
                this.bind &&
                  ((this.isBindSelector = Go.is(this.bind, "HTMLInputElement")),
                  this.setBind(this.value),
                  this.inputBox.addEventListener("input", (e) => {
                    this.setBind(e.target.value), Go.is(this.oninput, "function") && this.oninput(e), Go.is(this.oninput, "string") && eval(this.oninput);
                  }));
            },
            setBind: function (value) {
              if (this.isBindSelector) {
                const el = document.querySelector(this.bind);
                el.value = value;
              } else eval(this.bind + ' = "' + value + '"');
            },
          },
        };
      }),
      Go.component("go-intrinsic", function () {
        return {
          default: {
            beforeRender: function () {
              (this.width = Go.prop("width", this) || Go.prop("width", this.attrs) || 100), (this.height = Go.prop("height", this) || Go.prop("height", this.attrs) || 100);
              var t = document.createElement("canvas");
              (t.width = this.width),
                (t.height = this.height),
                t.getContext("2d").clearRect(0, 0, t.width, t.height),
                (this.imagenTransparente = new Image()),
                (this.imagenTransparente.src = t.toDataURL("image/png"));
            },
            render: function () {
              this.clean(), this.appendChild(this.imagenTransparente);
            },
          },
        };
      }),
      Go.component("go-list", function () {
        return {
          default: {
            beforeRender: async function () {
              (this.items = []),
                (this.page ||= 1),
                (this.tagList = this.tagList || this.attrs.tagList || Go.attr(this, "tagList") || ""),
                (this.src = this.src || this.attrs.src || Go.attr(this, "src")),
                (this.itemHeight = this.itemHeight || this.attrs.itemHeight || Go.attr(this, "itemHeight") || 70),
                (this.item = this.item || this.attrs.item || Go.attr(this, "item")),
                (this.heightGap = this.heightGap || this.attrs.heightGap || Go.attr(this, "heightGap") || 100),
                (this.query = {}),
                Go.html(this, '<loading centered absolute><go-icon name="gspinner"></go-icon></loading>');
              try {
                (this.req = await Go.http.get(`${this.src}?page=${this.page}&` + Go.objectToQuery(this.query))), (this.items = this.req.items);
              } catch (t) {
                this.html(Go.getErrorMessage(t, Go.lang("error_loading_items")));
              }
              this.tagList && Go.changeTagName(this, this.tagList);
            },
            render: function () {
              if (!this.items || !this.items.length) return this.html(Go.app.noItemsTemplate());
              var { height: t, isMobile: e } = Go.screen();
              e && ((this.itemHeight = this.itemHeight), (this.heightGap = this.heightGap)),
                (this.list = Go.list({ target: this, itemHeight: this.itemHeight, height: t - this.heightGap, padding: { bottom: "20px" } })),
                Go.is(this.item, "string") && (this.item = this.evalItem(this.item)),
                (this.list.item = (t, e) => this.item({ item: t, index: e, itemHeight: this.itemHeight })),
                Number(this.page) <= 1 ? this.list.render(this.items) : this.list.append(this.items);
            },
            evalItem: function (string) {
              let _function = string;
              return Go.is(string, "stringFunction") && (_function = string.split("(")[0].trim()), (data) => eval(_function).bind(this)(data);
            },
            setQuery: function (t) {
              Object.assign(this.query, t);
            },
          },
        };
      }),
      Go.component("go-progress", function () {
        return {
          default: {
            beforeRender: function () {
              (this.id = "progress-" + Go.uuid()),
                (this.height = `${this.attrs.height || 10}px`),
                (this.width = `${this.attrs.width || 100}%`),
                (this.color = this.attrs.color || Go.attr(this, "color") || Go.prop(this, "color") || "var(--primary-color)"),
                (this.line = document.createElement("go-progress-line")),
                (this.line.id = "line-" + this.id),
                Go.style(this, { width: this.width, height: this.height, display: "block", position: "relative", overflow: "hidden", "background-color": "#000" }),
                Go.style(this.line, { width: "0%", height: "100%", display: "block", "background-color": this.color });
            },
            render: function () {
              this.clean(), this.appendChild(this.line);
            },
            progress: function (t) {
              t && Go.style(this.line, { width: Go.removeSpecialChars(t) + "%" });
            },
          },
        };
      }),
      Go.component("go-script", function () {
        return {
          default: {
            beforeRender: function () {
              (this.script = this.innerText), (this.src = this.attrs.src || Go.attr(this, "src")), (this.style.display = "none"), this.src && Go.load(this.src);
            },
            render: function () {
              this.script && eval(this.script);
            },
          },
        };
      }),
      Go.component("go-search", function () {
        return {
          default: {
            beforeRender: function () {
              (this.icon = document.createElement("go-icon")),
                (this.input = document.createElement("input")),
                (this.label = this.prop("attrs.label") || Go.lang("Search")),
                Go.attrs(this.input, { type: "text", name: "q", placeholder: this.label + "...", autocomplete: "off" }),
                Go.attrs(this.icon, { name: "search" }),
                Go.style(this, { position: "relative", display: "flex", color: "currentColor", width: "100%", "align-items": "center" }),
                Go.style(this.icon, { position: "absolute", left: "calc(var(--gap) * 1.5)", color: "currentColor", "margin-right": "10px", "pointer-events": "none" }),
                Go.style(this.input, {
                  width: "100%",
                  border: "none",
                  outline: "none",
                  padding: "calc(var(--gap) * 0.5) calc(var(--gap) * 1.5) calc(var(--gap) * 0.5) calc(var(--gap) * 4)",
                  color: "currentColor",
                  "font-size": "100%",
                  "background-color": "rgba(0, 0, 0, 0)",
                });
            },
            render: function () {
              this.appendChild(this.icon), this.appendChild(this.input);
            },
            afterRender: function () {
              (this.input.oninput = () => {
                this.emit("input", this.input.value);
              }),
                (this.input.onkeyup = (t) => {
                  13 === t.keyCode && this.emit("enter", this.input.value);
                }),
                (this.input.onfocus = () => {
                  this.emit("focus", this.input.value);
                }),
                (this.input.onblur = () => {
                  this.emit("blur", this.input.value);
                }),
                (this.input.onchange = () => {
                  this.emit("change", this.input.value);
                });
            },
          },
        };
      }),
      Go.component("go-select-content", function () {
        return {
          default: {
            getData: async function () {
              return Go.http.get(this.src + "?q=" + this.q, { responseType: "text" });
            },
            beforeRender: async function () {
              if (
                ((this.id = "select-" + Go.uuid()),
                (this.src = this.src || Go.attr(this, "src") || ""),
                (this.search = this.search || Go.attr(this, "search") || ""),
                (this.q = this.q || Go.attr(this, "q") || ""),
                (this.goSearch = null),
                (this.template = ""),
                this.src && this.html(Go.spinnerLoading),
                this.search &&
                  ((this.template += '<div class="search">'),
                  (this.template += `<div><go-input type="text" icon="search" placeholder="${Go.lang("search")}" autocomplete="off" 
      value="${this.q}"></go-input><div>`),
                  (this.template += "</div>")),
                this.src)
              )
                try {
                  (this.data ||= await this.getData()), (this.template += '<div class="src_content">'), (this.template += this.data), (this.template += "</div>");
                } catch (t) {
                  (this.template += '<div class="src_error" padding>'), (this.template += Go.getErrorMessage(t)), (this.template += "</div>");
                }
            },
            render: function () {
              this.src && this.html(this.template), this.slotDefault && this.append(this.slotDefault);
            },
            afterRender: async function () {
              (this.input = await Go.awaitElement(`#${this.id} .search input`)),
                this.input &&
                  (this.input.onkeyup = function (t) {
                    (this.q = t.target.value),
                      clearTimeout(this.goSearch),
                      (this.goSearch = setTimeout(async () => {
                        (this.template = await this.getData()), Go.html(`#${this.id} .src_content`, this.template);
                      }, 400));
                  }.bind(this));
            },
          },
        };
      }),
      Go.component("go-select", function () {
        return {
          default: {
            beforeRender: async function () {
              (this.id = "select-" + Go.uuid()),
                (this.label = this.label || this.attrs.label || Go.attr(this, "label") || Go.lang("select")),
                (this.name = this.name || this.attrs.name || Go.attr(this, "name") || ""),
                (this.value = this.value || this.attrs.value || Go.attr(this, "value") || ""),
                (this.src = this.src || this.attrs.src || Go.attr(this, "src") || ""),
                (this.slotDefault = this.querySelector("[slot]")),
                (this.content = document.createElement("go-select-content")),
                (this.content.className = "go-select-content"),
                (this.content.innerHTML = this.innerHTML),
                (this.input = document.createElement("input")),
                (this.input.type = "hidden"),
                (this.input.name = this.name),
                (this.input.value = this.value),
                (this.content.slotDefault = this.slotDefault),
                Go.extends(this.content, this.attrs),
                this.label && this.put(`<div class="go-select-label list-item--tappable"><span class="text">${this.label}</span></div>`);
            },
            afterRender: function () {
              (this.handler = this.child(".go-select-label")),
                (this.x = 0),
                (this.y = 0),
                (this.handler.onclick = function (t) {
                  t.stopPropagation(), this.classList.toggle("open"), this.open(t);
                }.bind(this)),
                Go.once("click:select", (t) => {});
            },
            close: function () {
              this.classList.remove("open");
            },
            open: function (t) {
              (this.x = t.clientX),
                (this.y = t.clientY),
                (this.info = Go.info(this.handler)),
                (this.y = this.info.screenTop + this.info.height),
                (this.x = this.info.screenLeft),
                (this.view = Go.view({
                  header: !1,
                  style: `--x: ${this.x}px; --y: ${this.y}px;--parent-width: ${this.info.width}px;`,
                  class: "select go-select",
                  closeOutside: !0,
                  html: this.content,
                  onClose: () => this.close(),
                  animate: { duration: 200, from: { opacity: 0, transform: "translateY(-1rem)" }, to: { opacity: 1, transform: "translateY(0)" } },
                })),
                (this.content.onclick = function (t) {
                  let [e, i] = [Go.attr(t.target, "value"), t.target.innerHTML];
                  var o;
                  e &&
                    Go.is(t.target, "tagName", "go-option") &&
                    (t.stopPropagation(),
                    (o = Go.attr(t.target, "label")) && (i = o),
                    Go.putHTML(this.child(".go-select-label .text"), i),
                    (this.input.value = e),
                    Go.attr(this, "value", e),
                    Go.uniClass("selected", t.target, this.content),
                    this.view.close(),
                    this.trigger("change", { value: e, text: i, e: t }));
                }.bind(this));
            },
            trigger: function (t, e) {},
          },
        };
      }),
      Go.component("go-shadow", function () {
        return {
          default: {
            beforeRender: async function () {
              if (
                ((this.payload ||= Go.fromJson(Go.attr(this, "payload") || Go.attr(this, "data"))),
                (this.databox ||= Go.attr(this, "databox")),
                (this.src ||= Go.attr(this, "src")),
                (this.dataTemplate = ""),
                (this.dataStyle = ""),
                (this.dataScript = ""),
                (this.shadow = this.attachShadow({ mode: "open" })),
                (this.req ||= Go.config(Go.keyId(this.src), this.req)),
                !this.req)
              )
                try {
                  (this.req = await Go.http.get(this.src, { responseType: "text", body: { component: !0, ...this.payload, databox: this.databox } })),
                    Go.config(Go.keyId(this.src), this.req);
                } catch (t) {
                  this.req = `<template><div class="error">${Go.getErrorMessage(t)}</div></template>`;
                }
            },
            render: function () {
              (this.req = Go.eval(this.req, this)),
                (this.dataTemplate = Go.getBetween("<template>", "</template>", this.req)),
                (this.dataStyle = Go.getBetween("<style>", "</style>", this.req)),
                (this.dataScript = Go.getBetween("<script>", "</script>", this.req));
              var t = new CSSStyleSheet();
              t.replaceSync(this.dataStyle),
                (this.shadow.adoptedStyleSheets = [t]),
                (this.template = document.createElement("div")),
                (this.template.innerHTML = this.dataTemplate),
                this.shadow.appendChild(this.template),
                this.dataScript && (((t = document.createElement("script")).textContent = this.dataScript), this.shadow.appendChild(t));
            },
            select: function (t) {
              return this.shadow.querySelector(t);
            },
          },
        };
      }),
      Go.component("go-slideshow", function () {
        return {
          default: {
            beforeRender: async function () {
              (this.id ||= "slide-" + Go.uuid()),
                (this.images = Go.json(Go.prop("images", this.attrs) || Go.attr(this, "images"))),
                (this.options = Go.json(Go.prop("options", this.attrs) || Go.attr(this, "options"))),
                (this.options ||= this.dataset || {});
            },
            render: function () {
              this.slickMount();
            },
            slickMount: async function () {
              (this.prevArrow = '<div class="prev"><a button="active"><go-icon name="chevronLeft"></go-icon></a></div>'),
                (this.nextArrow = '<div class="next"><a button="active"><go-icon name="chevronRight"></go-icon></a></div>'),
                $(this).slick({ infinite: !0, slidesToShow: 1, slidesToScroll: 1, prevArrow: this.prevArrow, nextArrow: this.nextArrow, ...this.options });
            },
          },
        };
      }),
      Go.component("go-spacer", function () {
        return {
          default: {
            beforeRender: function () {
              (this.num = this.attrs.num || Go.attr(this, "num") || 1), this.style.setProperty("--num", this.num);
            },
            render: function () {},
          },
        };
      }),
      Go.component("go-style", function () {
        return {
          default: {
            beforeRender: function () {
              (this.id = this.id || this.attrs.id || Go.attr(this, "id") || Go.uuid()),
                (this.styleText = this.innerText),
                this.styleText && Go.cssTag("go-style-" + this.id, this.styleText);
            },
          },
        };
      }),
      Go.component("go-tabs", function () {
        return {
          default: {
            beforeRender: function () {
              (this.tabs = this.querySelectorAll("[tab]")),
                (this.handlers = this.querySelectorAll("[handler]")),
                this.handlers.forEach((t) => (t.onclick = () => this.handClick.bind(this)(t)));
            },
            render: function () {},
            afterRender: function () {
              (this.opened = this.attrs.opened || Go.attr(this, "opened")), this.opened && this.activeTab(this.opened);
            },
            handClick: function (t) {
              t = Go.attr(t, "handler");
              this.activeTab(t);
            },
            activeTab: function (t) {
              Go.uniqueClass("active", `[handler="${t}"], [tab="${t}"]`, this);
            },
          },
        };
      }),
      Go.component("go-tag", function () {
        return {
          default: {
            beforeRender: function () {
              (this.style.padding = "calc(var(--mpadding)/4) calc(var(--mpadding)/1.5)"),
                (this.style.borderRadius = "2pc"),
                (this.style.backgroundColor = "var(--tag-background)"),
                (this.style.color = "var(--tag-color)"),
                (this.style.display = "inline-block");
            },
            render: function () {
              this.attrs.label && (this.innerHTML = this.attrs.label);
            },
          },
        };
      }),
      Go.component("go-template", function () {
        return {
          default: {
            content: function () {
              return (
                (this.content = `<template id="my-component-template">
        <!-- Contenido del componente -->
    </template>
    <style>
        /* Estilos del componente */
    </style>
    `),
                this.content
              );
            },
            beforeRender: function () {},
            afterRender: async function () {},
            destroy: async function () {},
          },
        };
      }),
      Go.component("go-toggle", function () {
        return {
          default: {
            beforeRender: function () {
              (this.tOggle = document.createElement("label")),
                (this.sWitch = document.createElement("div")),
                (this.input = document.createElement("input")),
                (this.input.style.display = "none"),
                (this.input.name = this.attrs.name),
                (this.offValue = this.attrs["off-value"] || "off"),
                (this.onValue = this.attrs["on-value"] || "on"),
                (this.onName = this.attrs["on-name"] || ""),
                (this.offName = this.attrs["off-name"] || ""),
                this.tOggle.classList.add("toggle"),
                this.sWitch.classList.add("switch"),
                this.tOggle.appendChild(this.sWitch);
            },
            render: function () {
              this.appendChild(this.tOggle), this.appendChild(this.input);
            },
            afterRender: function () {
              const i = this,
                o = this.attrs.oninput || Go.attr(this, "oninput"),
                n = this.attrs.onchecked || Go.attr(this, "onchecked"),
                s = this.attrs.onunchecked || Go.attr(this, "onunchecked");
              (this.onclick = function () {
                var t = Go.is(Go.attr(this, "checked"), "true"),
                  e = ((this.input.value = t ? i.offValue : i.onValue), this.input.value === i.onValue);
                (i.result = { value: this.input.value }),
                  this.onName && (this.input.name = t ? this.offName : this.onName),
                  t
                    ? (Go.attr(this, "checked", !1), i.emit("unchecked", i.result), this.goOnUnchecked())
                    : (Go.attr(this, "checked", !0), i.emit("checked", i.result), this.goOnChecked()),
                  i.emit("input oninput", i.result),
                  Go.is(o, "Function") && o(i.result),
                  Go.is(o, "stringFunction") && Go.eval(o, i.result),
                  e && Go.is(n, "stringFunction") && Go.eval(n, i.result),
                  !e && Go.is(s, "stringFunction") && Go.eval(s, i.result),
                  (this.form = i.closest("form")),
                  this.form && Go.is(this.form.onchange, "Function") && this.form.onchange(i.result),
                  this.form && Go.is(this.form.onchange, "stringFunction") && Go.eval(this.form.onchange, i.result);
              }),
                this.attrs.value === this.onValue
                  ? (Go.attr(this, "checked", !0), (this.input.value = this.onValue), (this.input.name = this.onName || this.input.name))
                  : (Go.attr(this, "checked", !1), (this.input.value = this.offValue), (this.input.name = this.onName ? this.offName : this.input.name));
            },
            check: function () {
              Go.attr(this, "checked", !0), (this.input.value = this.onValue), (this.input.name = this.onName || this.input.name);
            },
            uncheck: function () {
              Go.attr(this, "checked", !1), (this.input.value = this.offValue), (this.input.name = this.onName ? this.offName : this.input.name);
            },
            goOnChecked: function () {
              Go.is(this.onchecked, "function") && this.onchecked(this.result);
            },
            goOnUnchecked: function () {
              Go.is(this.onunchecked, "function") && this.onunchecked(this.result);
            },
          },
        };
      }),
      Go.component("go-view-background", function () {
        return { default: { beforeRender: function () {}, render: function () {}, afterRender: function () {} } };
      }),
      Go.component("go-view-body", function () {
        return {
          default: {
            beforeRender: async function () {
              if (
                ((this.template = this.attrs.template || Go.attr(this, "template") || Go.getProp(this, "template")),
                (this.template ||= this.attrs.src || Go.attr(this, "src") || Go.getProp(this, "src")),
                (this.method = this.attrs.method || Go.attr(this, "method") || Go.getProp(this, "method") || "GET"),
                (this.payload = this.attrs.payload || Go.attr(this, "payload") || Go.getProp(this, "payload") || ""),
                (this.cache = this.attrs.cache || Go.attr(this, "cache") || Go.getProp(this, "cache") || ""),
                (this.iframe = this.attrs.iframe || Go.attr(this, "iframe") || Go.getProp(this, "iframe") || ""),
                (this.dataTemplate = ""),
                (this.isCache = !1),
                this.template)
              )
                if (this.iframe) this.dataTemplate = this.iframeTemplate();
                else {
                  if (
                    (Go.html(this, Go.spinnerLoading),
                    Go.is(this.cache, "true") && (this.isCache = !0),
                    this.isCache && ((this.store = Go.store(Go.keyString(this.template))), (this.dataTemplate = this.store.get("template"))),
                    this.dataTemplate)
                  )
                    return this.render();
                  try {
                    (this.dataTemplate = await Go.xhr(this.template, { method: this.method, responseType: "text", body: this.payload })),
                      this.isCache && this.store.set("template", this.dataTemplate),
                      this.render();
                  } catch (t) {
                    (this.dataTemplate = ""), this.html(Go.getErrorMessage(t, Go.lang("error_loading_content")));
                  }
                }
            },
            render: function () {
              if (this.dataTemplate) {
                this.html(Go.eval(this.dataTemplate));
                const scripts = this.getElementsByTagName("script");
                for (var script of scripts) eval(script.innerHTML);
              }
            },
            iframeTemplate: function () {
              let [t, e, i] = [this.iframe, "", ""];
              return (
                Go.is(this.iframe, "object") && ((t = this.iframe.src), this.iframe.attrs),
                (i += "width: 100%; height: 100%; border: none"),
                (e += `<iframe class="bodyFrame" src="${t}" style="${i}"></iframe>`)
              );
            },
            afterRender: async function () {
              Go.is(this.data.afterRender, "function") && (await this.data.afterRender(this.view, this));
            },
          },
        };
      }),
      Go.component("go-view-content", function () {
        return {
          default: {
            beforeRender: function () {
              (this.viewId = this.prop("viewId")), Go.attrs(this, { center: this.prop("centerContent") });
            },
            afterRender: async function () {
              Go.on("resizeEnd:" + Go.keyId(this.viewId), this.setInfo.bind(this)), Go.sleep(Go.env("view_transition_time"), () => this.setInfo());
            },
            destroy: async function () {
              Go.off("resizeEnd:" + Go.keyId(this.viewId));
            },
            setInfo: function () {
              (this.header = this.querySelector("go-view-header")),
                (this.headerHeight = this.header ? this.header.offsetHeight : 0),
                Go.setCssVars(this, {
                  "--width": this.offsetWidth + "px",
                  "--height": this.offsetHeight + "px",
                  "--content-header-height": this.headerHeight + "px",
                  "--content-height": `calc(${this.offsetHeight}px - ${this.headerHeight}px)`,
                  "--content-width": this.offsetWidth + "px",
                });
            },
          },
        };
      }),
      Go.component("go-view-header", function () {
        return {
          default: {
            beforeRender: function () {
              (this.closeButton = { tagName: "go-button", icon: "times", role: "close" }),
                Go.is(this.data.close, "false") && (this.closeButton = ""),
                this.closeButton && (this.closeButton.onclick = () => this.view.close()),
                (this.templateLeft = Go.create({
                  tagName: "go-view-header-left",
                  html: `<go-view-title>${this.data.title || ""}</go-view-title>`,
                  ...(this.data?.header || {}),
                  style: { display: "flex", gap: "var(--gap)", ...(this.data?.header?.style || {}) },
                })),
                (this.templateRight = Go.create({ tagName: "go-view-header-right", child: this.closeButton }));
            },
            render: function () {
              this.appendChild(this.templateLeft), this.appendChild(this.templateRight);
            },
          },
        };
      }),
      Go.component("go-view", function () {
        return {
          default: {
            beforeRender: function () {
              (this.bodyTemplate = this.data.template || ""),
                (this.bodyHTML = this.data.html || this.data.body || ""),
                (this.bodyStyle = this.data.style || ""),
                (this.lockBody = this.data.lockBody),
                (this.onview = this.data.onview),
                (this.template = this.bodyHTML),
                (this.backgroundElement = document.createElement("go-view-background")),
                this.backgroundElement.classList.add("ViewBackground"),
                (this.htmlIn = this.data.htmlIn || ""),
                (this.viewAttrs = Go.json(Go.prop("viewAttrs", this.data)) || {}),
                (this.targetClean = Go.prop("targetClean", this.data)),
                (this.headerHeight = Go.prop("headerHeight", this.data) || Go.config("headerHeight") || Go.config("header-height")),
                (this.viewAttrs.onview = this.onview),
                this.viewAttrs && Go.attrs(this, this.viewAttrs);
              var t = { view: this, viewId: this.id, cache: this.data.cache || this.data.body?.cache || "", data: this.data };
              Go.is(this.data.parent, "object") && Object.assign(this, this.data.parent),
                Go.is(this.data.background, "object") && Object.assign(this.backgroundElement, this.data.background),
                Go.is(this.bodyHTML, "selector")
                  ? ((this.template = document.querySelector(this.bodyHTML)),
                    this.template && this.htmlIn ? (this.template = this.template.innerHTML) : (this.template = this.template.outerHTML))
                  : Go.is(this.bodyHTML, "path") && (this.bodyHTML = { template: this.bodyHTML }),
                (this.contentElement = document.createElement("go-view-content")),
                this.contentElement.setAttribute("view-id", this.id),
                this.contentElement.classList.add("ViewContent"),
                Go.style(this.contentElement, this.data.style || {}),
                (this.headerElement = document.createElement("go-view-header")),
                this.headerElement.classList.add("ViewHeader"),
                (this.bodyElement = document.createElement("go-view-body")),
                this.bodyElement.classList.add("ViewBody"),
                (this.body = this.bodyElement),
                (this.header = this.headerElement),
                Object.assign(this.backgroundElement, t),
                Object.assign(this.bodyElement, t),
                Object.assign(this.headerElement, t),
                Object.assign(this.contentElement, t),
                this.data.background && this.data.background.style && Go.style(this.backgroundElement, this.data.background.style),
                this.data.body && this.data.body.style && Go.style(this.bodyElement, this.data.body.style),
                this.data.header && this.data.header.style && Go.style(this.headerElement, this.data.header.style),
                this.data.content && this.data.content.style && Go.style(this.contentElement, this.data.content.style),
                Go.is(this.bodyHTML, "object") && (Object.assign(this.bodyElement, this.bodyHTML), (this.template = this.bodyHTML.html || this.bodyHTML.template || "")),
                Go.attrs(this.bodyElement, { "view-id": this.id, template: this.bodyTemplate }),
                Go.is(this.template, "string") && (this.bodyElement.innerHTML = Go.eval(this.template)),
                Go.is(this.data.content, "object") && Object.assign(this.contentElement, this.data.content),
                Go.is(this.data.header, "object") && Object.assign(this.headerElement, this.data.header),
                Go.is(this.data.body, "object") && Object.assign(this.bodyElement, this.data.body),
                Go.is(this.data.header, "false") || this.contentElement.appendChild(this.headerElement),
                this.contentElement.appendChild(this.bodyElement),
                this.data.footer &&
                  ((this.footerElement = document.createElement("go-view-footer")),
                  this.footerElement.classList.add("ViewFooter"),
                  Object.assign(this.footerElement, t),
                  Go.is(this.data.footer, "object") && Object.assign(this.footerElement, this.data.footer),
                  this.contentElement.appendChild(this.footerElement));
            },
            render: async function () {
              Go.appendChild(this, this.backgroundElement),
                Go.appendChild(this, this.contentElement),
                (this.body = this.querySelector("go-view-body")),
                Go.is(this.bodyHTML, "HTMLElement") && this.body.appendChild(this.bodyHTML),
                Go.addClass(document.body, "opening"),
                Go.sleep(1).then(() => {
                  Go.addClass(this.backgroundElement, "visible");
                }),
                this.animateIn(() => {
                  this.afterOpen(), Go.removeClass(document.body, "opening");
                });
            },
            afterRender: async function () {
              (this.data.closeOutside || this.data.closeoutside) &&
                ((this.backgroundWrap = this.querySelector("go-view-background")), (this.backgroundWrap.onclick = () => this.close())),
                (this.data.closeOnClick || this.data.closeonclick) && (this.onclick = () => this.close()),
                await Go.sleep(Go.env("app_transition_time"));
              var t = this.querySelector("go-view-header");
              t && ((t = this.headerHeight || t.offsetHeight + "px"), Go.cssVar(this, "--header-height", t));
            },
            afterOpen: async function () {
              Go.addClass(this, "opened"),
                Go.is(this.data.onOpened, "function") && this.data.onOpened(this),
                Go.is(this.data.onOpened, "string") && Go.eval(this.data.onOpened, this);
            },
            close: async function (t) {
              Go.addClass(document.body, "closing"),
                Go.removeClass(this, "opened"),
                Go.removeClass(this.backgroundElement, "visible"),
                this.animateOut(() => {
                  this.remove(), this.afterRemove(t), Go.removeClass(document.body, "closing");
                });
            },
            animateIn: function (t) {
              (this.viewContent = this.querySelector("go-view-content")), Go.animate({ ...this.data, el: this.viewContent }).open(t);
            },
            animateOut: function (t) {
              (this.viewContent = this.querySelector("go-view-content")),
                this.data.animationClose && (this.data.animation = this.data.animationClose),
                Go.animate({ ...this.data, el: this.viewContent }).close(t);
            },
            afterRemove: function (t) {
              (this.numViews = this.countViews()),
                (this.onCloseEvent = this.onClose || this.onclose || this.data.onClose || this.data.onclose),
                0 === this.numViews && Go.removeClass(document.body, "onview"),
                Go.is(this.onCloseEvent, "function") && this.onCloseEvent(this),
                Go.is(this.onCloseEvent, "string") && Go.eval(this.onCloseEvent),
                Go.is(t, "function") && t(this);
            },
            countViews: function () {
              return document.querySelectorAll('go-view:not([onview="false"])').length;
            },
          },
        };
      }),
      Go.component("web-component", function () {
        return {
          default: {
            beforeRender: async function () {
              this.evaluateProps(),
                this.classList.add("loading"),
                (this.shadowDOM = this.attachShadow({ mode: "open" })),
                (this.cssFile = Go.fix(this.data.src + "/index.css").url()),
                (this.jsFile = Go.fix(this.data.src + "/index.js").url()),
                (this.htmlFile = Go.fix(this.data.src + "/index.html").url()),
                (this.styleData = await Go.http.get(this.cssFile, { responseType: "text", cache: !0 })),
                (this.htmlData = await Go.http.get(this.htmlFile, { responseType: "text", cache: !0 }));
              var t = document.createElement("style"),
                t = ((t.textContent = Go.eval(this.styleData, this.data)), this.shadowDOM.appendChild(t), document.createElement("template"));
              (t.innerHTML = Go.eval(this.htmlData, this.data)), this.shadowDOM.appendChild(t.content);
            },
            render: function () {
              this.classList.remove("loading"),
                this.shadowDOM.addEventListener("click", (t) => {
                  Go.do("nav/event", t);
                });
            },
          },
        };
      }),
      Go.component("go-lang", function () {
        return {
          default: {
            beforeRender: async function () {
              (this.key = Go.prop("key", this.attrs) || this.innerText),
                (this.result = Go.lang(this.key)),
                this.result === this.key && ((this.req = await luigios.api("lang/get", { key: this.key })), (this.result = Go.prop("result", this.req)));
            },
            render: function () {
              this.innerHTML = Go.eval(this.result);
            },
          },
        };
      }),
      Go.component("user-master", function () {
        return {
          default: {
            beforeRender: async function () {
              (this.image = document.createElement("img")),
                (this.image.src = Go.user("picture") || "/geek-avatar"),
                Go.style(this, {
                  "--picture": `url(${this.picture})`,
                  width: "calc(var(--gap) * 3)",
                  height: "calc(var(--gap) * 3)",
                  margin: "calc(var(--gap) * 1)",
                  overflow: "hidden",
                  display: "inline-flex",
                  "align-items": "center",
                  "justify-content": "center",
                  "border-radius": "50%",
                }),
                Go.style(this.image, { "max-width": "100%", "max-height": "100%" });
            },
            render: async function () {
              this.appendChild(this.image), (this.onclick = (t) => this.onClick(t));
            },
            onClick: async function () {
              if (((this.user = Go.user()), !this.user)) return luigios.order("user/login.float");
              this.menu = Go.view({
                header: !1,
                closeOutside: !0,
                body: '<luigi-html src="user/system.menu"></luigi-html>',
                animation: "bottomIn",
                class: "MasterMenu",
                onOpen: () => {
                  Go.load("/system/db/user/user.css", { hash: !0 });
                },
              });
            },
          },
        };
      });
  }),
  (GO.windowInit = function () {
    GO.setReactive(), GO.initHyperList(), GO.loadComponents();
  }),
  (GO.setReactive = function () {
    window.addEventListener("resize", () => {
      var t = document.querySelectorAll(".ge");
      let e;
      for (e = 0; e < t.length; e++) t[e].reactive();
    });
  }),
  !(function (t) {
    var e;
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define([], t)
      : (((e =
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : this).Go = t()),
        "function" == typeof e.Go.windowInit && e.Go.windowInit());
  })(function () {
    return new Proxy(GO, {
      get(t, e, i) {
        let o = Reflect.get(t, e, i);
        return (o = o || Reflect.get(GO_EXTENDS, e, i));
      },
      set(t, e, i, o) {
        return GO.hasOwnProperty(e) ? (console.warn(`La propiedad "${e}" No se puede reescribir.`), !1) : Reflect.set(t, e, i, GO_EXTENDS);
      },
    });
  });
