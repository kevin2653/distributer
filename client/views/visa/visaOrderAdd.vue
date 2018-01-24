<template>
  <div style="background-color: #f2f2f2" align="center">
    <div style="background-color: #ffffff;width:90%" align="left">
      <br>
      <div style="width: 95%;margin-left: 5rem">
        <el-form label-width="200px">
          <div>
            <label>联系人信息</label>
          </div>
          <br>
          <div>
            <el-form-item label="联系人姓名">
              <el-input style="width: 23.2rem"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input style="width: 23.2rem"></el-input>
            </el-form-item>
            <el-form-item label="联系地址">
              <el-input style="width: 23.2rem"></el-input>
            </el-form-item>
          </div>
          <br>
          <div>
            <label>签证产品订单信息</label>
          </div>
          <br>
          <div>
            <el-form-item label="签证产品名称">
              <el-button style="width: 23.2rem" @click="dialogM.dialogProduct = true">{{selectProduct}}</el-button>
              <el-dialog title="选择签证产品" :visible.sync="dialogM.dialogProduct" :modal-append-to-body="false"
                         :before-close="handleClose" center class="modelStyle" width="50%">
                <el-container>
                  <el-aside width="50%">
                    <el-input v-model="proName" @change="inputChangePro" placeholder="输入签证产品名称或产品编号"></el-input>
                    <el-table :data="lineData" border @row-click="rowClickProduct" style="width: 100%">
                      <el-table-column prop="pName">
                      </el-table-column>
                    </el-table>
                  </el-aside>
                  <el-main width="50%">
                    <div style="margin-top: -1rem"><label>已选签证产品</label></div>
                    <br>
                    <div>
                      <label>产品编号：<br>
                        {{productData.pid}}<br><br>
                      </label>
                      <label>产品名称：<br>
                        {{productData.pName}}
                      </label>
                    </div>
                  </el-main>
                </el-container>
                <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="BackFillProduct">确 定</el-button>
                        <el-button @click="dialogM.dialogProduct = false">取 消</el-button>
                      </span>
              </el-dialog>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select v-model="type" @change="" placeholder="支付方式" style="width: 23.2rem">
                <el-option v-for="item in selectManOp.payOp" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单金额">
              <el-input style="width: 23.2rem"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select v-model="type" @change="" placeholder="订单状态" style="width: 23.2rem">
                <el-option v-for="item in selectManOp.provinceOp" :key="item.areaId" :label="item.areaName" :value="item.areaId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运营负责人">
              <el-select v-model="type" @change="" placeholder="运营负责人" style="width: 23.2rem">
                <el-option v-for="item in selectManOp.managerOp" :key="item.managerId" :label="item.managerName" :value="item.managerId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="代理商名称">
              <el-button style="width: 23.2rem" @click="dialogM.dialogDistributer = true">{{selectDistributer}}</el-button>
              <el-dialog title="选择代理商" :visible.sync="dialogM.dialogDistributer" :modal-append-to-body="false"
                         :before-close="handleClose" center class="modelStyle">
                <el-container>
                  <el-aside width="50%">
                    <el-input v-model="disName" @change="inputChangeDis" placeholder="输入代理商名称"></el-input>
                    <el-table :data="tableData" border @row-click="rowClickDistributer" height="250" style="width: 100%">
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
                        <el-button @click="dialogM.dialogDistributer = false">取 消</el-button>
                      </span>
              </el-dialog>
            </el-form-item>
            <el-form-item label="结算状态">
              <el-select v-model="type" @change="" placeholder="结算状态" style="width: 23.2rem">
                <el-option v-for="item in selectManOp.provinceOp" :key="item.areaId" :label="item.areaName" :value="item.areaId">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <br>
          <div>
            <label>签证申请人信息</label>
          </div>
          <br>
          <div v-for="(applicant, $index) in domesticList">
            <div style="margin-left: 10rem"><label>出行人{{ $index + 1}}：</label></div><br>
            <div style="width: 95%" align="left">
              <el-form :model="applicant" label-width="200px">
                <div>
                  <el-form-item label="签证申请人">
                    <el-input v-model="applicant.applicantName"  style="width: 23.2rem"></el-input>
                  </el-form-item>
                  <el-form-item label="旅客身份">
                    <el-select v-model="applicant.Identity" placeholder="请选择" style="width: 23.2rem">
                      <el-option v-for="item in selectManOp.travelerOp" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </div>
          <br>
          <div align="right" style="margin-right: 5rem">
            <el-form-item>
              <a @click="addTraveler">+  添加申请人</a>
            </el-form-item>
          </div>
          <br>
          <div align="center">
            <el-form-item>
              <el-button type="primary" @click="">保  存</el-button>
            </el-form-item>
          </div>
          <br>
        </el-form>
      </div>
    </div>
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
        domesticList: [{}],
        selectManOp: {
          provinceOp: [],   /** 省 */
          cityOp: [],  /** 市 */
          countyOp: [],   /** 县 */
          managerOp: [],  /** 运营人员 */
          /** 支付方式 */
          payOp: [{
            value: 0,
            label: '在线支付'
          }, {
            value: 1,
            label: '运营代付'
          }, {
            value: 2,
            label: '代理代付'
          }],
          /** 旅客身份 */
          travelerOp: [{
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
        },
        /** 弹框管理 */
        dialogM: {
          dialogProduct: false,   /** 产品弹框 */
          dialogDistributer: false /** 代理商弹框 */
        },
        /** 代理商详情 */
        distributerData: {},
        /** 代理商详情运营人员 */
        managerData: {},
        /** 代理商弹框表格 */
        tableData: [],
        disLikeTableData: [],
        type: '',
        /** 当前请求头 */
        authorization: '',
        /** 线路产品弹框表格 */
        lineData: [],
        lineLikeData: [],
        productData: {},  /** 产品详情 */
        selectDistributer: '选择代理商',  /** 回填代理商 */
        selectProduct: '选择产品',  /** 回填产品 */
        disName: '',   /** 代理商模糊查询 */
        proName: ''   /** 产品模糊查询 */
      }
    },
    created: function () {
      this.dataProArea(37)
      this.dataGet()
      this.proData()
//      this.domesticList.push(this.applicants)
    },
    updated: function () {
      console.log('打印当前申请人列表')
      console.log(this.domesticList)
    },
    methods: {
      /** 回填代理商 */
      BackFillPdistributer () {
        this.dialogM.dialogDistributer = false
        if (this.distributerData.distributerName == null) {
          this.selectDistributer = '选择代理商'
        } else {
          this.selectDistributer = this.distributerData.distributerName
        }
      },
      /** 选择代理商显示详情 */
      rowClickDistributer (row) {
        var that = this
        for (var i = 0; i < that.tableData.length; i++) {
          if (that.tableData[i].distributerId === row.distributerId) {
            if (that.tableData[i].distributerName === '悦旅会') {
              that.distributerData.distributerName = '悦旅会'
              that.distributerData.distributerCode = '无'
              that.managerData = '无'
            } else {
              that.distributerData = that.tableData[i]
              that.managerData = that.tableData[i].sManager.managerName
            }
          }
        }
//        that.commoissionForm.distributerId = row.distributerId
      },
      /** input改变，模糊查询代理商 */
      inputChangeDis () {
        var that = this
        for (var i = 0; i < that.tableData.length; i++) {
          if (that.tableData[i].distributerName.indexOf(that.disName) > -1) {
            that.disLikeTableData.push(that.tableData[i])
          }
        }
        that.tableData = that.disLikeTableData
      },
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
      /** 添加出行人 */
      addTraveler () {
        console.log('添加')
        this.domesticList.push({})
        console.log('打印当前数组')
        console.log(this.domesticList)
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      /** input改变，查询产品 */
      inputChangePro () {
        var that = this
        for (var i = 0; i < that.lineData.length; i++) {
          if (that.lineData[i].pName.indexOf(that.proName) > -1) {
            that.lineLikeData.push(that.lineData[i])
          }
        }
        console.log(that.lineLikeData)
        that.lineData = that.lineLikeData
      },
      /** 回填产品 */
      BackFillProduct () {
        if (this.productData.pName == null) {
          this.selectProduct = '选择产品'
        } else {
          this.selectProduct = this.productData.pName
        }
        this.dialogM.dialogProduct = false
      },
      /** 选择产品显示详情 */
      rowClickProduct (row) {
        console.log('打印当前选择row')
        console.log(row)
        var that = this
        for (var i = 0; i < that.lineData.length; i++) {
          if (that.lineData[i].pid === row.pid) {
            that.productData = that.lineData[i]
          }
        }
//        that.lineOrder.pid = row.pid
      },
      /** 获取线路产品 */
      proData () {
        var that = this
        axios.get("https://qa-api.yuelvhui.com/distrbuter/product/list/1/''", {
          headers: {
            'Authorization': 'Sys ' + that.getCookie('authorization'),
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          that.lineData = response.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 获取省 */
      dataProArea: function (value) {
        var that = this
        axios.get('https://qa-api.yuelvhui.com/common/search/getInternalArea/' + value, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function (response) {
          that.provinceOp = response.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 获取市 */
      dataCiArea: function (value) {
        var that = this
        axios.get('https://qa-api.yuelvhui.com/common/search/getInternalArea/' + value, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function (response) {
          that.cityOp = response.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 获取县 */
      dataCoArea: function (value) {
        var that = this
        axios.get('https://qa-api.yuelvhui.com/common/search/getInternalArea/' + value, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function (response) {
          that.countyOp = response.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 刷新界面获取数据 */
      dataGet: function (event) {
        var that = this
        /** 获取代理商运营人员 */
        axios.get('/api/systemManager/queryAllSystemManagerByJoin', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.managerOp = response.data.systemManagerDTOList
//          console.log(that.managerOp)
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
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>
