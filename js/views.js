export default {
  "/app/": Go.context("apps/route"),
  404: Go.context("template/404"),
};
