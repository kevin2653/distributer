<template>
  <div style="min-height: 1200px">
    <el-form v-model="commoissionForm" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="订单完成时间">
              <el-date-picker v-model="commoissionForm.settlementYear" align="right" type="date" placeholder="开始时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 10rem">
              </el-date-picker>
              <label>-</label>
              <el-date-picker v-model="commoissionForm.settlementMonth" type="date" placeholder="结束时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 10rem">
              </el-date-picker>
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
      <el-col :span="22"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button round @click="exportReport">导出报表</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="commissionData" tooltip-effect="dark" border style="width: 100%" >
            <el-table-column label="线路产品名称" prop="dInfo.distributerName" align="center">
            </el-table-column>
            <el-table-column label="在线支付金额(元)" prop="order.orderAmount" align="center">
            </el-table-column>
            <el-table-column label="代收金额(元)" prop="commissionAmount" align="center">
            </el-table-column>
            <el-table-column label="订单总金额(元)" prop="commissionAmount" align="center">
            </el-table-column>
            <el-table-column label="排名" prop="order.orderPayTime" align="center">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import axios from 'axios'
  import Vue from 'vue'
  var api = Vue.prototype.api
  export default {
    components: {
      axios,
      api
    },
    data () {
      return {
        /** 代理商分佣列表 */
        commissionData: [],
        totalNum: 0, /** 查询总条数 */
        /** 分佣报表提交form */
        commoissionForm: {
          distributerId: '', /** 代理商id */
          settlementYear: '', /** 结算年 */
          settlementMonth: '', /** 结算月 */
          orderType: '' /** 产品类别 */
        }
      }
    },
    created: function () {
      this.dataGet()
    },
    updated: function () {
    },
    methods: {
      // 获取cookie
      getCookie: function (cname) {
        var name = cname + '='
        var ca = document.cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i]
          while (c.charAt(0) === ' ') c = c.substring(1)
          if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
        }
        return ''
      },
      /** form表单提交 */
      onSubmit () {
        var that = this
        var BODY = {
        }
        axios.post('/api/commissionDetails/queryCommissionDetailsByJoin', BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 重置表单 */
      onReset () {
      },
      dataGet: function (event) {
        var that = this
        /** 获取代理商 */
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {depath: ''}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.tableData = response.data.listDto
          that.managerData = ''
//          window.location.reload(true)
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 导出报表 */
      exportReport () {
        console.log('开始导出excel')
        window.location.href = ('/api/commissionDetails/exportExcelCom?distributerId=' + this.commoissionForm.distributerId + '&settlementYear=' + this.commoissionForm.settlementYear + '&settlementMonth=' + this.commoissionForm.settlementMonth +
          '&orderType=' + this.commoissionForm.orderType)
      }
    }
  }
</script>
<style>
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
</style>
