import Vue from 'vue';

export default {
  install(Vue) {
    // создаем шину событий
    Vue.prototype.$dataPlugin = new Vue();
  }
}
