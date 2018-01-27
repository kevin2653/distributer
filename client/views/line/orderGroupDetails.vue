<template>
  <div style="min-height: 650px">
    <br>
    <div style="margin-right: 5rem" align="right">
      <a @click="returnToUpLevel">返回</a>
    </div>
    <el-form class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="团号">
              <el-input style="width: 10rem" v-model="tourGroup"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-form-item>
              <el-button type="primary" @click="onReset">重置</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <hr>
    <el-row :gutter="20">
      <el-col :span="20"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">
        <el-button type="primary" @click="getPdf">导出表单</el-button>
        <el-button type="primary" @click="">打印</el-button>
      </div></el-col>
    </el-row>
    <div class="pdf-dom" id="pdfDom" style="width: 100%">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple" >
            <table border="1"  style="line-height: 4rem">
              <tr>
                <th colspan="14" class="th">{{groupDetails.pName}}</th>
              </tr>
              <tr>
                <th class="th" colspan="1">产品编号</th>
                <td colspan="4" class="th">{{groupDetails.pid}}</td>
                <th class="th">团号</th>
                <td colspan="2" class="th">{{groupDetails.tourGroup}}</td>
                <th class="th" colspan="2">出行日期</th>
                <td colspan="5" class="th">{{groupDetails.travelDate}}</td>
              </tr>
              <tr>
                <th class="th">出行人数</th>
                <td colspan="4" class="th">{{groupDetails.tourersNum}}</td>
                <th class="th" colspan="1">总支付金额(元)</th>
                <td colspan="2" class="th">{{groupDetails.amountStr}}</td>
                <th class="th" colspan="2"></th>
                <td colspan="5" class="th"></td>
              </tr>
              <tr>
                <th class="th" :rowspan="userCount">出行人信息</th>
                <td class="th">参团人姓名</td>
                <td colspan="3" class="th">联系电话</td>
                <td class="th">性 别</td>
                <td class="th">成人/儿童</td>
                <td class="th">证件类型</td>
                <td colspan="2" class="th">证件号码</td>
                <td colspan="2" class="th">所属代理商名称</td>
                <td class="th">运营负责人</td>
              </tr>
              <tr v-for="item in groupDetails.tourers">
                <!--<th class="th"></th>-->
                <td class="th">{{item.tourerName}}</td>
                <td colspan="3" class="th">{{item.mobile}}</td>
                <td class="th">{{item.genderStr}}</td>
                <td class="th">{{item.ageGroupStr}}</td>
                <td class="th">{{item.cardTypeStr}}</td>
                <td colspan="2" class="th">{{item.cardNumber}}</td>
                <td colspan="2" class="th">{{item.distributerName}}</td>
                <td class="th">{{item.operatorName}}</td>
              </tr>
            </table>
          </div>
      </el-col>
    </el-row>
    </div>
    <!--</el-main>-->
    <!--</el-container>-->
  </div>
</template>
<script>
  import axios from 'axios'
  import global from '../../global'
  import html2canvas from 'html2canvas'
  import JSPDF from 'jspdf'
  export default {
    components: {
      axios,
      global,
      html2canvas,
      JSPDF
    },
    data () {
      return {
        authorization: '',   /** 当前请求头 */
        /** 团号 */
        tourGroup: '',
        groupDetails: {},  // 团数据
        lineData: [], // 线路产品数据
        arrManage: {
          /** 运营人员 */
          managerOp: [],
          /** 代理商 */
          tableData: [],
          /** 证件类型 */
          cardTypeOp: [{
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
          }],
          /** 年龄分组 */
          ageGroupOp: [{
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
          }],
          /** 性别 */
          genderOp: [{
            value: 0,
            label: '未知'
          }, {
            value: 1,
            label: '男'
          }, {
            value: 2,
            label: '女'
          }]
        },
        userCount: 0
      }
    },
    created: function () {
      this.dataGet()
      this.proData()
    },
    updated: function () {
    },
    methods: {
      getPdf: function () {
//        var _this = this
        var pdfDom = document.querySelector('#pdfDom')
//        console.log('打印当前div')
//        console.log(pdfDom)
        html2canvas(pdfDom).then(
          function (canvas) {
            var contentWidth = canvas.width
            var contentHeight = canvas.height
            var pageHeight = contentWidth / 592.28 * 841.89
            var leftHeight = contentHeight
            var position = 20
            var imgWidth = 555.28
            var imgHeight = 555.28 / contentWidth * contentHeight

            var pageData = canvas.toDataURL('image/jpeg', 1.0)

            var PDF = new JSPDF('', 'pt', 'a4')

            if (leftHeight < pageHeight) {
              PDF.addImage(pageData, 'JPEG', 20, 20, imgWidth, imgHeight)
            } else {
              while (leftHeight > 0) {
                PDF.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
                leftHeight -= pageHeight
                position -= 841.89
                if (leftHeight > 0) {
                  PDF.addPage()
                }
              }
            }
            PDF.save('团订单详情' + '.pdf')
          }
        )
//        html2canvas()
      },
      /** 重置表单 */
      onReset () {
        this.tourGroup = ''
        this.groupDetails = {}
      },
      /** 获取线路产品 */
      proData () {
        var that = this
        axios.get(global.API + "distrbuter/product/list/1/''", {
          headers: {
            'Authorization': 'Sys ' + global.getCookie('authorization'),
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          that.lineData = response.data
          console.log(that.lineData)
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 查询团订单 */
      onSubmit () {
        var that = this
        axios.get(global.API + 'distrbuter/admin/order/tour/list/' + that.tourGroup, {
          headers: {
            'Authorization': 'Sys ' + global.getCookie('authorization'),
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          console.log('开始接收数据')
          console.log(response.data)
          that.groupDetails = response.data
          // 出行人数
          that.groupDetails.tourersNum = ''
          if (that.groupDetails.adultNum !== 0) {
            that.groupDetails.tourersNum = that.groupDetails.tourersNum + that.groupDetails.adultNum + '成人'
          }
          if (that.groupDetails.childNum !== 0) {
            that.groupDetails.tourersNum = that.groupDetails.tourersNum + that.groupDetails.childNum + '儿童'
          }
          if (that.groupDetails.oldNum !== 0) {
            that.groupDetails.tourersNum = that.groupDetails.tourersNum + that.groupDetails.oldNum + '老人'
          }
//          that.groupDetails.tourersNum = that.groupDetails.adultNum + '成人' + that.groupDetails.childNum + '儿童' + that.groupDetails.oldNum + '老人'
          // 总支付金额
          that.groupDetails.amountStr = (that.groupDetails.amount / 100) + '.00'
          for (var w = 0; w < that.groupDetails.tourers.length; w++) {
            for (var i = 0; i < that.arrManage.tableData.length; i++) {
              if (that.arrManage.tableData[i].distributerId === that.groupDetails.tourers[w].distributerId) {
                that.groupDetails.tourers[w].distributerName = that.arrManage.tableData[i].distributerName
              }
            }
            // 转换运营负责人名称
            for (var j = 0; j < that.arrManage.managerOp.length; j++) {
              if (that.arrManage.managerOp[j].managerId === that.groupDetails.tourers[w].operatorId) {
                that.groupDetails.tourers[w].operatorName = that.arrManage.managerOp[j].managerName
              }
            }
            for (var t = 0; t < that.arrManage.cardTypeOp.length; t++) {
              if (that.arrManage.cardTypeOp[t].value === that.groupDetails.tourers[w].cardType) {
                that.groupDetails.tourers[w].cardTypeStr = that.arrManage.cardTypeOp[t].label
              }
            }
            for (var h = 0; h < that.arrManage.ageGroupOp.length; h++) {
              if (that.arrManage.ageGroupOp[h].value === that.groupDetails.tourers[w].ageGroup) {
                that.groupDetails.tourers[w].ageGroupStr = that.arrManage.ageGroupOp[h].label
              }
            }
            for (var l = 0; l < that.arrManage.genderOp.length; l++) {
              if (that.arrManage.genderOp[l].value === that.groupDetails.tourers[w].gender) {
                that.groupDetails.tourers[w].genderStr = that.arrManage.genderOp[l].label
              }
            }
          }
          for (var r = 0; r < that.lineData.length; r++) {
            if (that.lineData[r].pid === that.groupDetails.pid) {
              that.groupDetails.pName = that.lineData[r].pName
            }
          }
//          that.groupDetails.pName = that.lineData[0].pName
          console.log(that.groupDetails)
          console.log('接收数据结束')
        }).catch(function (error) {
          console.log(error)
        })
      },
      dataGet: function (event) {
        var that = this
        /** 获取代理商运营人员 */
        axios.get('/api/systemManager/queryAllSystemManagerByJoin', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + global.getCookie('admin_token')
          }
        }).then(function (response) {
          that.arrManage.managerOp = response.data.systemManagerDTOList
//          that.authorization = response.data.authorization
          that.userCount = that.arrManage.managerOp.length + 1
        }).catch(function (error) {
          console.log(error)
        })
        /** 获取代理商 */
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {depath: ''}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + global.getCookie('admin_token')
          }
        }).then(function (response) {
          that.arrManage.tableData = response.data.listDto
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 返回上一层 */
      returnToUpLevel () {
        this.$router.push({path: '/line/lineStandOrder', query: {lineOrder: this.$route.query.lineOrder}})
      }
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 10px;
  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    /*background: #d3dce6;*/
    background: #F5F5F5;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .th{
    text-align: center;
   }
  th{
    padding-right: 5.4px;
  }
</style>
