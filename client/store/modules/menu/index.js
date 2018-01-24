import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'
import distributer from './distributer'
import line from './line'
import visa from './visa'
import tables from './tables'
import commission from './commission'
import system from './system'
// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    {
      name: '首页',
      path: '/',
      meta: {
        icon: 'fa-tachometer',
        link: 'Home.vue'
      },
      component: lazyLoading('Home', true)
    },
    distributer,
    line,
    visa,
    tables,
    commission,
    system
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
