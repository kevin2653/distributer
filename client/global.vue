<script type="text/javascript">
  // 职业身份
  const titleOp = [{
    value: 1,
    label: '学龄前儿童'
  }, {
    value: 2,
    label: '在校学生'
  }, {
    value: 3,
    label: '在职人员'
  }, {
    value: 4,
    label: '自由职业者'
  }, {
    value: 5,
    label: '退休人员'
  }]
  // 性别
  const genderOp = [{
    value: 0,
    label: '未知'
  }, {
    value: 1,
    label: '男'
  }, {
    value: 2,
    label: '女'
  }]
  // 年龄分组
  const ageGroupOp = [{
    value: 1,
    label: '婴儿'
  }, {
    value: 2,
    label: '儿童'
  }, {
    value: 3,
    label: '成人'
  }, {
    value: 4,
    label: '老人'
  }]
  // 证件类型
  const cardTypeOp = [{
    value: 1,
    label: '身份证'
  }, {
    value: 2,
    label: '军官证'
  }, {
    value: 3,
    label: '护照'
  }, {
    value: 4,
    label: '港澳通行证'
  }, {
    value: 5,
    label: '台湾通行证'
  }, {
    value: 99,
    label: '其它'
  }]
  // 洲
  const chau = [{
    value: 1,
    label: '亚洲'
  }, {
    value: 2,
    label: '美洲(北美,南美)'
  }, {
    value: 3,
    label: '美洲(北美)'
  }, {
    value: 4,
    label: '美洲(南美)'
  }, {
    value: 5,
    label: '欧洲'
  }, {
    value: 6,
    label: '大洋洲'
  }]
  // 系统渠道
  const sysChannel = [{
    value: 10,
    label: '悦旅会'
  }, {
    value: 20,
    label: '代理商分销小程序'
  }]
  // 线路类型
  const lineType = [{
    value: 1,
    label: '国内'
  }, {
    value: 2,
    label: '港澳'
  }, {
    value: 3,
    label: '台湾'
  }, {
    value: 4,
    label: '国际'
  }]
  // 行程概览模板标识
  const stroke = [{
    value: 'normal',
    label: '标准模板'
  }, {
    value: 'simple',
    label: '简要模板'
  }, {
    value: 'custom',
    label: '自定义模板'
  }]
  // 订单/产品类别
  const orderType = [{
    value: 1,
    label: '标准线路订单'
  }, {
    value: 8,
    label: '签证订单'
  }, {
    value: 100,
    label: '定制线路订单'
  }]
  // 标准线路订单状态
  const orderStandStatus = [{
    value: 101,
    label: '待支付'
  }, {
    value: 102,
    label: '待确认(支付成功)'
  }, {
    value: 111,
    label: '已确认'
  }, {
    value: 115,
    label: '已出发'
  }, {
    value: 200,
    label: '完成'
  }, {
    value: 201,
    label: '待审核'
  }, {
    value: 205,
    label: '已审核'
  }, {
    value: 211,
    label: '退款失败'
  }, {
    value: 213,
    label: '退款成功(人工)'
  }, {
    value: 215,
    label: '退款成功(系统)'
  }]
  // 签证订单状态
  const orderVisaStatus = [{
    value: 101,
    label: '待支付'
  }, {
    value: 102,
    label: '待确认(支付成功)'
  }, {
    value: 121,
    label: '待送签'
  }, {
    value: 123,
    label: '签证受理中'
  }, {
    value: 125,
    label: '拒签'
  }, {
    value: 200,
    label: '签证通过'
  }, {
    value: 201,
    label: '待审核'
  }, {
    value: 202,
    label: '已审核'
  }, {
    value: 211,
    label: '退款失败'
  }, {
    value: 213,
    label: '退款成功(人工)'
  }, {
    value: 215,
    label: '退款成功(系统)'
  }]
  // 飞机机型
  const model = [{
    value: 1,
    label: '直达'
  }, {
    value: 1,
    label: '转机'
  }, {
    value: 99,
    label: '无需求'
  }]
  // 飞机仓位
  const cabin = [{
    value: 1,
    label: '经济舱'
  }, {
    value: 2,
    label: '公务舱'
  }, {
    value: 3,
    label: '头等舱'
  }]
  // 酒店类型
  const hotelType = [{
    value: 1,
    label: '国家连锁'
  }, {
    value: 2,
    label: '常规15km'
  }, {
    value: 3,
    label: '市区10km'
  }, {
    value: 4,
    label: '市中心5km'
  }, {
    value: 99,
    label: '无需求'
  }]
  // 酒店星级
  const hotelStar = [{
    value: 1,
    label: '三星级'
  }, {
    value: 2,
    label: '四星级'
  }, {
    value: 3,
    label: '五星级'
  }]
  // 酒店客房标准
  const hotelRoomStand = [{
    value: 1,
    label: '标准双人间'
  }, {
    value: 2,
    label: '单间'
  }, {
    value: 3,
    label: '套房'
  }]
  // 车辆要求
  const car = [{
    value: 1,
    label: '司导分离'
  }, {
    value: 2,
    label: '司兼导'
  }]
  // 活动邀请函
  const invitation = [{
    value: 1,
    label: '邀请函客人自备'
  }, {
    value: 2,
    label: '邀请函我司提供'
  }]
  // 签证原因
  const visaReasion = [{
    value: 1,
    label: '因公'
  }, {
    value: 2,
    label: '因私'
  }]
  // 签证类型
  const visaType = [{
    value: 1,
    label: '个人旅游签证'
  }, {
    value: 2,
    label: 'ADS团队旅游签'
  }, {
    value: 3,
    label: '商签'
  }]
  // 取消类型
  const cancelType = [{
    value: 1,
    label: '用户取消'
  }, {
    value: 2,
    label: '后台取消'
  }]
  // 支付渠道
  const payChannel = [{
    value: 1,
    label: '微信支付'
  }, {
    value: 2,
    label: '支付宝支付'
  }]
  // 支付方式
  const payType = [{
    value: 1,
    label: '线上支付'
  }, {
    value: 2,
    label: '线下支付'
  }]
  // 发票类型
  const invoiceType = [{
    value: 1,
    label: '个人'
  }, {
    value: 2,
    label: '企业'
  }]
  // 护照
  const passportOp = [{
    value: 0,
    label: '普通因私护照'
  }, {
    value: 1,
    label: '公务护照'
  }, {
    value: 2,
    label: '外交护照'
  }]
  // 获取cookie方法
  function getCookie (cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
    }
    return ''
  }
  // 全局API
  //  https://api.yuelvhui.com
  // https://qa-api.yuelvhui.com/
  const API = 'https://qa-api.yuelvhui.com/'
  // 支付接口
  const payApi = 'https://payment.yuelvhui.com/prepay'
  // 分页显示数组
  const pageSizeArr = [5, 7, 9, 11]
  // 判断是否为空
  function isNull (object) {
    var flag = true
    if (typeof object === 'undefined' || object === '' || object === 0) {
      flag = false
    }
    return flag
  }
  // 护照类别
  const passportType = [{
    value: 1,
    label: '会员本人护照'
  }, {
    value: 2,
    label: '会员常旅客护照'
  }]
  // 转换日期格式
  function changeFormat (long) {
    var date = new Date(long * 1000)
    var timeStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    return timeStr
  }
  export default {
    titleOp, // 职业身份
    genderOp, // 性别
    ageGroupOp,  // 年龄分组
    cardTypeOp, // 证件类型
    chau, // 洲
    sysChannel, // 系统渠道
    lineType, // 线路类型
    stroke, // 行程概览模板标识
    orderType,  // 订单/产品类别
    orderStandStatus, // 标准线路订单状态
    orderVisaStatus, // 签证订单状态
    model, // 飞机机型
    cabin, // 飞机仓位
    hotelType, // 酒店类型
    hotelStar,  // 酒店星级
    hotelRoomStand, // 酒店客房标准
    car, // 车辆要求
    invitation, // 活动邀请函
    visaReasion, // 签证原因
    visaType, // 签证类型
    cancelType, // 取消类型
    payChannel, // 支付渠道
    payType, // 支付方式
    invoiceType, // 发票类型
    getCookie,  // 获取cookie
    API,
    pageSizeArr, // 全局分页数组
    isNull,  // 是否为空
    passportOp, // 护照
    payApi,  // 支付接口
    passportType, // 护照类别
    changeFormat  // 转换日期格式
  }
</script>
