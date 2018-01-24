import lazyLoading from './lazyLoading'
export default {
  name: '分账统计',
  path: '/commission',
  meta: {
    icon: 'fa-leaf',
    expanded: false,
    link: 'commission/index.vue'
  },
  component: lazyLoading('commission', true),
  children: [
    {
      name: '代理商分佣报表',
      path: 'distributerComReport',
      component: lazyLoading('commission/distributerComReport'),
      meta: {
        link: 'commission/distributerComReport.vue'
      }
    },
    {
      name: '结算管理',
      path: 'disSettleManage',
      component: lazyLoading('commission/disSettleManage'),
      meta: {
        link: 'commission/disSettleManage.vue'
      }
    },
    {
      name: '代理商结算转账日志',
      path: 'disSettleLog',
      component: lazyLoading('commission/disSettleLog'),
      meta: {
        link: 'commission/disSettleLog.vue'
      }
    },
    {
      name: '审核流程设置',
      path: 'auditSetting',
      component: lazyLoading('commission/auditSetting'),
      meta: {
        link: 'commission/auditSetting.vue'
      }
    }
  ]
}
