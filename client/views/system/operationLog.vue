<template>
  <div style=" min-height: 650px">
    <el-form :model="operationLogForm" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <div>
              <el-form-item label="功能模块">
                <el-input v-model="operationLogForm.moduel" placeholder="输入功能模块" style="width: 12rem"></el-input>
              </el-form-item>
            </div>
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
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="oprrationTableData" tooltip-effect="dark" border style="width: 100%" >
            <el-table-column label="操作账户" prop="sManager.managerName" align="center">
            </el-table-column>
            <el-table-column label="功能模块" prop="module" align="center">
            </el-table-column>
            <el-table-column label="操作内容" prop="content" align="center">
            </el-table-column>
            <el-table-column label="操作日期" prop="createTime" align="center">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <div class="block" align="center" >
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page=operationLogForm.currentPage
        :page-sizes=pageSizeArr
        :page-size=operationLogForm.pageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total=totalPage>
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import global from '../../global'
  export default {
    components: {
      axios,
      global
    },
    data () {
      return {
        pageSizeArr: global.pageSizeArr,
        totalPage: 0,
        oprrationTableData: [],
        operationLogForm: {
          currentPage: 1,
          pageSize: 5,
          module: ''
        }
      }
    },
    created: function () {
//      this.dataGet()
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
      /** 分页 */
      handleSizeChange (val) {
        this.operationLogForm.pageSize = val
        this.onSubmit()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.operationLogForm.currentPage = val
        this.onSubmit()
        console.log(`当前页: ${val}`)
      },
      /** 重置表单 */
      onReset () {
        this.operationLogForm.moduel = ''
        this.operationLogForm.currentPage = 1
        this.operationLogForm.pageSize = 5
        this.oprrationTableData = [{}]
        this.totalNum = 0
      },
      onSubmit () {
        var that = this
        var BODY = {
          module: that.operationLogForm.moduel,
          currentPage: that.operationLogForm.currentPage,
          pageSize: that.operationLogForm.pageSize
        }
//        console.log(BODY)
        axios.post('/api/operationLog/queryByModule', BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
//          console.log('修改状态开始')
          that.totalPage = response.data.totalPage
          that.oprrationTableData = response.data.operationLogDtoList
          for (var i = 0; i < that.oprrationTableData.length; i++) {
            var date = new Date(that.oprrationTableData[i].createTime)
            that.oprrationTableData[i].content = that.oprrationTableData[i].action + that.oprrationTableData[i].content
            that.oprrationTableData[i].createTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
          }
//          console.log('修改状态结束')
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }

</script>
