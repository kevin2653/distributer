import lazyLoading from './lazyLoading'

export default {
  name: '线路管理',
  path: '/line',
  meta: {
    icon: 'fa-line-chart',
    expanded: false,
    link: 'line/index.vue'
  },
  component: lazyLoading('line', true),

  children: [
    {
      name: '标准线路订单管理',
      path: 'lineStandOrder',
      component: lazyLoading('line/lineStandOrder'),
      meta: {
        link: 'line/lineStandOrder.vue'
      }
    },
    {
      name: '定制需求订单管理',
      path: 'lineCustomOrder',
      component: lazyLoading('line/lineCustomOrder'),
      meta: {
        link: 'line/lineCustomOrder.vue'
      }
    },
    {
      name: '标准线路订单退款管理',
      path: 'lineStandRefund',
      component: lazyLoading('line/lineStandRefund'),
      meta: {
        link: 'line/lineStandRefund.vue'
      }
    }
  ]
}
