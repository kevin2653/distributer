import lazyLoading from './lazyLoading'

export default {
  name: '代理商管理',
  path: '/distributer',
  meta: {
    icon: 'fa-male',
    expanded: false,
    link: 'distributer/index.vue'
  },
  component: lazyLoading('distributer', true),

  children: [
    {
      name: '新建代理商',
      path: 'addDistributer',
      component: lazyLoading('distributer/addDistributer'),
      meta: {
        link: 'distributer/addDistributer.vue'
      }
    },
    {
      name: '代理商关系树',
      path: 'distributerTree',
      component: lazyLoading('distributer/distributerTree'),
      meta: {
        link: 'distributer/distributerTree.vue',
        keepAlive: true
      }
    },
    {
      name: '代理商列表',
      path: 'distributerList',
      component: lazyLoading('distributer/distributerList'),
      meta: {
        link: 'distributer/distributerList.vue'
        // keepAlive: true
      }
    },
    {
      name: '代理商账号管理',
      path: 'accountManagement',
      component: lazyLoading('distributer/accountManagement'),
      meta: {
        link: 'distributer/accountManagement.vue'
      }
    }
  ]
}
