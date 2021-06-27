import loading from "./loading";
export default {
  install(Vue) {
    const Loading = Vue.extend(loading);
    const Profile = new Loading({
      el: document.createElement("div"),
    });
    document.body.appendChild(Profile.$el);
    const loadingMethod = {
      open() {
        Profile.show = true;
      },
      hide() {
        Profile.show = false;
      },
    };
    Vue.prototype.$loading = loadingMethod;
  },
};
