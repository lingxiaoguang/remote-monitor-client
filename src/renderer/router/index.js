import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'screen-monitor',
      component: require('@/components/ScreenMonitor').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
