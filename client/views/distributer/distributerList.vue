<template>
  <div style="min-height: 1150px">
        <el-form :model="distributerInfoDTO" class="demo-form-inline">
          <el-row :gutter="20">
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="渠道分类">
                  <el-select v-model="distributerInfoDTO.channelId" placeholder="请选择" style="width: 15rem">
                    <el-option
                      v-for="item in channelOp"
                      :key="item.channelId"
                      :label="item.channelName"
                      :value="item.channelId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <div>
                  <el-form-item label="代理商名称">
                    <el-button style="width: 15rem" @click="dialogVisible = true">{{selectPDistributer}}</el-button>
                    <el-dialog title="选择代理商" :visible.sync="dialogVisible" :modal-append-to-body="false"
                               :before-close="handleClose" center class="modelStyle">
                      <el-container>
                        <el-aside width="50%">
                          <el-input v-model="name" @change="inputChange" placeholder="输入代理商名称"></el-input>
                          <el-table :data="tableData" :show-header="false" border @row-click="rowClick" height="250" style="width: 100%">
                            <el-table-column prop="distributerName">
                            </el-table-column>
                          </el-table>
                        </el-aside>
                        <el-main width="50%">
                          <div style="margin-top: -1rem"><label>已选代理商信息</label></div>
                          <br>
                          <div>
                            <label>代理商名称：{{distributerData.distributerName}}<br><br> </label>
                            <label>代理商编号：{{distributerData.distributerCode}}<br><br></label>
                            <label>运营负责人：{{managerData}}<br><br></label>
                          </div>
                        </el-main>
                      </el-container>
                      <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="BackFillPdistributer">确 定</el-button>
                        <el-button @click="dialogVisible = false">取 消</el-button>
                      </span>
                    </el-dialog>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content bg-purple">
                <el-form-item label="地域">
                  <el-select v-model="distributerInfoDTO.provinceId" @change="dataCiArea" placeholder="省"
                             class="selWidth">
                    <el-option
                      v-for="item in provinceOp"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <label>-</label>
                  <el-select v-model="distributerInfoDTO.cityId" @change="dataCoArea" placeholder="市" class="selWidth">
                    <el-option
                      v-for="item in cityOp"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <label>-</label>
                  <el-select v-model="distributerInfoDTO.countyId" placeholder="县" class="selWidth">
                    <el-option
                      v-for="item in countyOp"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="运营人员">
                  <el-select v-model="distributerInfoDTO.managerId" placeholder="请选择" style="width: 15rem">
                    <el-option
                      v-for="item in managerOp"
                      :key="item.managerId"
                      :label="item.managerName"
                      :value="item.managerId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="代理商等级">
                  <el-select v-model="distributerInfoDTO.gradeId" placeholder="请选择" style="width: 15rem">
                    <el-option
                      v-for="item in gradeOp"
                      :key="item.gradeId"
                      :label="item.gradeName"
                      :value="item.gradeId">
                    </el-option>
                  </el-select>
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
    <el-table :data="ContableData" border style="width: 100%">
      <el-table-column prop="distributerCode" align="center" label="代理商编号" >
      </el-table-column>
      <el-table-column  align="center" width="180" label="代理商名称/姓名/手机" >
        <el-table-column prop="distributerName" label="代理商名称" align="center">
        </el-table-column>
        <el-table-column prop="contactName" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="contactPhone" label="手机" align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="dChannel.channelName" align="center" label="渠道分类" >
      </el-table-column>
      <el-table-column prop="dGrade.gradeName" align="center" label="代理商等级" >
      </el-table-column>
      <el-table-column prop="name" align="center" width="180" label="地域" >
        <el-table-column prop="provinceId" label="省" align="center">
        </el-table-column>
        <el-table-column prop="cityId" label="市" align="center">
        </el-table-column>
        <el-table-column prop="countyId" label="县" align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="sManager.managerName" align="center" label="运营负责人">
      </el-table-column>
      <el-table-column prop="distributerDivideProportion" align="center" label="分成比例(%)">
      </el-table-column>
      <el-table-column align="center" label="操作" width="280">
        <template slot-scope="scope" center>
          <el-button round size="mini" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
          <el-button round size="mini" @click="handleDelete(scope.$index, scope.row)">查看下级</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" align="center" >
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page=distributerInfoDTO.currentPage
        :page-sizes="[3, 5, 7, 9]"
        :page-size=distributerInfoDTO.pageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total=totalPage>
      </el-pagination>
    </div>
      <!--</el-main>-->
    <!--</el-container>-->
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
        /** 数据总条数 */
        totalPage: 0,
        /** 代理商弹框 */
        dialogVisible: false,
        /** 等级 */
        gradeOp: [],
        /** 渠道 */
        channelOp: [],
        /** 运营人员 */
        managerOp: [],
        /** 省 */
        provinceOp: [],
        /** 市 */
        cityOp: [],
        /** 县 */
        countyOp: [],
        /** 表格数据 */
        ContableData: [],
        /** 省市县全部 */
        areaData: [],
        /** 代理商弹框表格 */
        tableData: [],
        /** 代理商模糊查询 */
        name: '',
        /** 代理商详情 */
        distributerData: {},
        /** 回填代理商 */
        selectPDistributer: '选择代理商',
        /** 代理商详情运营人员 */
        managerData: {},
        /** form表单数据 */
        distributerInfoDTO: {
          distributerId: '', /** 代理商id */
          channelId: '', /** 渠道 */
          gradeId: '', /** 等级 */
          managerId: '', /** 运营管理人员 */
          provinceId: '', /** 省id */
          cityId: '', /** 市id */
          countyId: '', /** 县id */
          currentPage: 1, /** 当前页 */
          pageSize: 5 /** 每页显示条数 */
        }
      }
    },
    created: function () {
      if (this.$route.params.distributerId > 0) {
        this.dataGet()
//        this.dataProArea(37)
        this.areaGet()
        this.distributerInfoDTO = this.$route.params.distributerInfoDTO
        this.onSubmit()
      } else {
        this.dataGet()
//        this.dataProArea(37)
        this.areaGet()
      }
    },
    mounted: function () {},
    updated: function () {},
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
      /** 分页方法 */
      handleSizeChange (val) {
        this.distributerInfoDTO.pageSize = val
        this.onSubmit()
//        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.distributerInfoDTO.currentPage = val
        this.onSubmit()
//        console.log(`当前页: ${val}`)
      },
      /** 关闭代理商弹框提示 */
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      /** 查看代理商详情 */
      handleEdit (index, row) {
//        this.$router.push('/distributer/代理商列表/代理商详情')
        this.$router.push({name: '代理商详情', params: {distributerId: row.distributerId, distributerInfoDTO: this.distributerInfoDTO}})
//        console.log(row)
      },
      /** 查看下级代理 */
      handleDelete (index, row) {
        if (row.distributerId > 0) {
          this.$router.push({name: '下级代理商', params: {distributerPid: row.distributerId, distributerInfoDTO: this.distributerInfoDTO}})
        }
//        console.log(row.distributerId)
      },
      /** 重置表单 */
      onReset () {
        this.distributerInfoDTO.distributerId = ''
        this.distributerInfoDTO.channelId = ''
        this.distributerInfoDTO.gradeId = ''
        this.distributerInfoDTO.managerId = ''
        this.distributerInfoDTO.provinceId = ''
        this.distributerInfoDTO.cityId = ''
        this.distributerInfoDTO.countyId = ''
        this.selectPDistributer = '选择代理商'
        this.ContableData = []
        this.distributerInfoDTO.currentPage = 1
        this.distributerInfoDTO.pageSize = 5
      },
      /** input改变，模糊查询代理商 */
      inputChange () {
        var that = this
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {distributerName: that.name}, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.tableData = response.data.listDto
          that.managerData = ''
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 回填上级代理商 */
      BackFillPdistributer () {
        this.dialogVisible = false
        if (this.distributerData.distributerName == null) {
          this.selectPDistributer = '选择代理商'
        } else {
          this.selectPDistributer = this.distributerData.distributerName
        }
      },
      /** 查询省市县名称 */
      areaGet: function () {
//        console.log('开始查询名称')
        var that = this
        axios.get(api + 'common/search/getChinaAreas', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Sys ' + that.getCookie('authorization')
          }
        }).then(function (response) {
          that.areaData = response.data
          for (var k = 0; k < that.areaData.length; k++) {
            if (that.areaData[k].pid === 37) {
              that.provinceOp.push(that.areaData[k])
//              that.provinceBOp.push(that.areaData[k])
            }
          }
          if (that.$route.params.distributerId > 0) {
            for (var i = 0; i < that.ContableData.length; i++) {
              for (var j = 0; j < that.areaData.length; j++) {
                if (that.ContableData[i].provinceId === that.areaData[j].id) {
                  that.ContableData[i].provinceId = that.areaData[j].name
                }
                if (that.ContableData[i].cityId === that.areaData[j].id) {
                  that.ContableData[i].cityId = that.areaData[j].name
                }
                if (that.ContableData[i].countyId === that.areaData[j].id) {
                  that.ContableData[i].countyId = that.areaData[j].name
                }
              }
            }
          }
//          console.log('省市县名称')
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** form表单提交 */
      onSubmit () {
        var that = this
        var BODY = {
          distributerId: that.distributerInfoDTO.distributerId,
          channelId: that.distributerInfoDTO.channelId,
          gradeId: that.distributerInfoDTO.gradeId,
          managerId: that.distributerInfoDTO.managerId,
          provinceId: that.distributerInfoDTO.provinceId,
          cityId: that.distributerInfoDTO.cityId,
          countyId: that.distributerInfoDTO.countyId,
          currentPage: that.distributerInfoDTO.currentPage,
          pageSize: that.distributerInfoDTO.pageSize
        }
//        console.log('当前页吗')
//        '/api/distributerInfo/queryAllDistributerByJoin?distributerId=' + that.distributerInfoDTO.distributerId + '&channelId=' + that.distributerInfoDTO.channelId + '&gradeId=' + that.distributerInfoDTO.gradeId + '&managerId=' + that.distributerInfoDTO.managerId + '&provinceId=' + that.distributerInfoDTO.provinceId + '&cityId=' + that.distributerInfoDTO.cityId + '&countyId=' + that.distributerInfoDTO.countyId + '&currentPage=' + that.distributerInfoDTO.currentPage + '&pageSize=' + that.distributerInfoDTO.pageSize
        console.log(that.distributerInfoDTO.currentPage)
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', BODY,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Admin ' + that.getCookie('admin_token')
            }
          }).then(response => {
            that.ContableData = response.data.listDto
            that.totalPage = response.data.totalPage
            for (var i = 0; i < that.ContableData.length; i++) {
              for (var j = 0; j < that.areaData.length; j++) {
                if (that.ContableData[i].provinceId === that.areaData[j].id) {
                  that.ContableData[i].provinceId = that.areaData[j].name
                }
                if (that.ContableData[i].cityId === that.areaData[j].id) {
                  that.ContableData[i].cityId = that.areaData[j].name
                }
                if (that.ContableData[i].countyId === that.areaData[j].id) {
                  that.ContableData[i].countyId = that.areaData[j].name
                }
              }
            }
          })
          .catch(error => {
            console.log(error.response)
            console.log('错误结束提交表单')
          })
      },
      /** 选择代理商显示详情 */
      rowClick (row) {
        var that = this
        axios.get('/api/distributerInfo/findDistributerInfoById?distributerId=' + row.distributerId, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          if (response.data.distributerId === null) {
            that.distributerData.distributerName = '悦旅会'
            that.distributerData.distributerCode = '无'
            that.managerData = '无'
          } else {
            that.distributerData = response.data
            that.managerData = response.data.sManager.managerName
          }
          that.distributerInfoDTO.distributerId = row.distributerId
        }).catch(function (error) {
          console.log(error)
        })
//        console.log('选择行结束')
      },
      dataGet: function (event) {
        var that = this
        /** 获取代理商等级 */
        axios.get('/api/distributerGrade/queryAllDistributerGrade', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.gradeOp = response.data
        }).catch(function (error) {
          console.log(error)
        })
        /** 获取代理商渠道 */
        axios.get('/api/distributerChannel/queryAllDistributerChannel', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.channelOp = response.data
        }).catch(function (error) {
          console.log(error)
        })
        /** 获取代理商运营人员 */
        axios.get('/api/systemManager/queryAllSystemManagerByJoin', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.managerOp = response.data.systemManagerDTOList
        }).catch(function (error) {
          console.log(error)
        })
        /** 获取代理商 */
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {depath: ''}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.tableData = response.data.listDto
          that.managerData = ''
          if (that.$route.params.distributerId > 0) {
            for (var i = 0; i < that.tableData.length; i++) {
              if (that.distributerInfoDTO.distributerId === that.tableData[i].distributerId) {
//                console.log('ssssssssssssss')
                that.selectPDistributer = that.tableData[i].distributerName
              }
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 获取省 */
//      dataProArea: function (value) {
//        var that = this
//        axios.get(api + '/common/search/getInternalArea/' + value, {
//          headers: {
//            'Content-Type': 'application/x-www-form-urlencoded',
//            'Authorization': 'Sys ' + that.getCookie('authorization')
//          }
//        }).then(function (response) {
//          that.provinceOp = response.data
//        }).catch(function (error) {
//          console.log(error)
//        })
//      },
      /** 获取联系市 */
      dataCiArea: function (value) {
        var that = this
        that.cityOp = []
        that.countyOp = []
        that.distributerInfoDTO.cityId = ''
        that.distributerInfoDTO.countyId = ''
        for (var i = 0; i < that.areaData.length; i++) {
          if (that.areaData[i].pid === value) {
            that.cityOp.push(that.areaData[i])
          }
        }
      },
      /** 获取联系县 */
      dataCoArea: function (value) {
        var that = this
        that.countyOp = []
        that.distributerInfoDTO.countyId = ''
        for (var i = 0; i < that.areaData.length; i++) {
          if (that.areaData[i].pid === value) {
            that.countyOp.push(that.areaData[i])
          }
        }
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

  .selWidth {
    width: 7rem;
  }

  /* 相对浏览器绝对定位*/
  /*.modelStyle {*/
  /*position:fixed;*/
  /*top:30rem*/
  /*}*/
</style>
