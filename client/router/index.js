import Vue from 'vue'
import Router from 'vue-router'
import menuModule from 'vuex-store/modules/menu'
Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: require('../views/Home')
    },
    {
      name: '代理商详情',
      path: '/distributer/distributerList/distributerDetails',
      component: require('../views/distributer/distributerDetails')
    },
    {
      name: '下级代理商',
      path: '/distributer/distributerList/subDistributer',
      component: require('../views/distributer/subDistributer')
    },
    {
      name: '新建代理商账号',
      path: '/distributer/accountManagement/addDisAccount',
      component: require('../views/distributer/addDisAccount')
    },
    {
      name: '订单详情',
      path: '/line/lineStandOrder/lineStandDetails',
      component: require('../views/line/lineStandDetails')
    },
    {
      name: '定制需求详情',
      path: '/line/lineCustomOrder/customOrderDetails',
      component: require('../views/line/customOrderDetails')
    },
    {
      name: '编辑定制需求',
      path: '/line/lineCustomOrder/editCostomOrder',
      component: require('../views/line/editCostomOrder')
    },
    {
      name: '标准线路订单录入',
      path: '/line/lineStandOrder/lineStandOrderAdd',
      component: require('../views/line/lineStandOrderAdd')
    },
    {
      name: '团订单详情',
      path: '/line/lineStandOrder/orderGroupDetails',
      component: require('../views/line/orderGroupDetails')
    },
    {
      name: '上传资料',
      path: '/visa/visaOrderManage/visaOrderDetails/uploadData',
      component: require('../views/visa/uploadData')
    },
    {
      name: '签证订单详情',
      path: '/visa/visaOrderManage/visaOrderDetails',
      component: require('../views/visa/visaOrderDetails')
    },
    {
      name: '订单录入',
      path: '/visa/visaOrderManage/visaOrderAdd',
      component: require('../views/visa/visaOrderAdd')
    },
    {
      name: '添加账号',
      path: '/system/sysAccountManage/addSystemAccount',
      component: require('../views/system/addSystemAccount')
    },
    {
      path: '/login',
      component: require('../views/auth/Login')
    },
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// Menu should have 2 levels.
function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}
