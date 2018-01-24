import lazyLoading from './lazyLoading'

export default {
  name: '签证管理',
  path: '/visa',
  meta: {
    icon: 'fa-location-arrow',
    expanded: false,
    link: 'visa/index.vue'
  },
  component: lazyLoading('visa', true),
  children: [
    {
      name: '签证订单管理',
      path: 'visaOrderManage',
      component: lazyLoading('visa/visaOrderManage'),
      meta: {
        link: 'visa/visaOrderManage.vue'
      }
    },
    {
      name: '签证订单退款管理',
      path: 'visaOrderTransferManage',
      component: lazyLoading('visa/visaOrderTransferManage'),
      meta: {
        link: 'visa/visaOrderTransferManage.vue'
      }
    }
  ]
}
