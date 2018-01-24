import lazyLoading from './lazyLoading'
export default {
  name: '系统管理',
  path: '/system',
  meta: {
    icon: 'fa-cog',
    expanded: false,
    link: 'system/index.vue'
  },
  component: lazyLoading('system', true),
  children: [
    {
      name: '账号管理',
      path: 'sysAccountManage',
      component: lazyLoading('system/sysAccountManage'),
      meta: {
        link: 'system/sysAccountManage.vue'
      }
    },
    {
      name: '修改密码',
      path: 'updatePassword',
      component: lazyLoading('system/updatePassword'),
      meta: {
        link: 'system/updatePassword.vue'
      }
    },
    {
      name: '操作日志',
      path: 'operationLog',
      component: lazyLoading('system/operationLog'),
      meta: {
        link: 'system/operationLog.vue'
      }
    }
  ]
}
