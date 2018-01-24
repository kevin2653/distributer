import lazyLoading from './lazyLoading'

export default {
  name: '统计报表',
  path: '/tables',
  meta: {
    icon: 'fa-table',
    expanded: false,
    link: 'tables/index.vue'
  },
  component: lazyLoading('tables', true),
  children: [
    {
      name: '代理商销售汇总统计',
      path: 'disSaleSumCount',
      component: lazyLoading('tables/disSaleSumCount'),
      meta: {
        link: 'tables/disSaleSumCount.vue'
      }
    },
    {
      name: '代理商产品销售明细统计',
      path: 'disProSaleDetailsCount',
      component: lazyLoading('tables/disProSaleDetailsCount'),
      meta: {
        link: 'tables/disProSaleDetailsCount.vue'
      }
    },
    {
      name: '代理商退款汇总统计',
      path: 'disRefundSumCount',
      component: lazyLoading('tables/disRefundSumCount'),
      meta: {
        link: 'tables/disRefundSumCount.vue'
      }
    },
    {
      name: '线路产品汇总统计',
      path: 'lineProSumCount',
      component: lazyLoading('tables/lineProSumCount'),
      meta: {
        link: 'tables/lineProSumCount.vue'
      }
    },
    {
      name: '定制行程汇总统计',
      path: 'customSumCount',
      component: lazyLoading('tables/customSumCount'),
      meta: {
        link: 'tables/customSumCount.vue'
      }
    },
    {
      name: '签证产品汇总统计',
      path: 'visaProSumCount',
      component: lazyLoading('tables/visaProSumCount'),
      meta: {
        link: 'tables/visaProSumCount.vue'
      }
    },
    {
      name: '产品退款汇总统计',
      path: 'proRefundSumCount',
      component: lazyLoading('tables/proRefundSumCount'),
      meta: {
        link: 'tables/proRefundSumCount.vue'
      }
    }
  ]
}
