import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
Vue.config.optionMergeStrategies.validations = function (toVal, fromVal) {
  if (!toVal) return fromVal
  if (!fromVal) return toVal

  return {
    ...toVal,
    ...fromVal,
  }
}
