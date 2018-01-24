<template>
  <div style="background-color: #f2f2f2" align="center">
    <div style="background-color: #ffffff;width:90%" align="left">
      <br>
      <div style="width: 95%;margin-left: 3rem">
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
            <el-form-item label="邮箱地址">
              <el-input style="width: 23.2rem"></el-input>
            </el-form-item>
            <el-form-item label="微信号">
              <el-input style="width: 23.2rem"></el-input>
            </el-form-item>
          </div>
          <br>
          <div>
            <label>线路产品订单信息</label>
          </div>
          <div>
            <el-form-item label="线路产品">
              <el-button style="width: 23.2rem" @click="dialogM.dialogProduct = true">{{selectProduct}}</el-button>
              <el-dialog title="选择线路产品" :visible.sync="dialogM.dialogProduct" :modal-append-to-body="false"
                         :before-close="handleClose" center class="modelStyle" width="70%">
                <el-container>
                  <el-aside width="25%">
                    <el-input v-model="proName" @change="inputChangePro" placeholder="输入线路名称或产品编号"></el-input>
                    <el-table :data="lineData" border @row-click="rowClickProduct" style="width: 100%">
                      <el-table-column prop="pName">
                      </el-table-column>
                    </el-table>
                  </el-aside>
                  <el-main width="25%">
                    <div style="margin-top: -1rem"><label>已选线路产品</label></div>
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
                  <el-main width="25%">
                    <div><label>出行时间</label></div>
                    <br>
                    <div>
                      <el-date-picker type="date" placeholder="选择日期">
                      </el-date-picker>
                    </div>
                    <br>
                    <div>
                      <lebal>套餐</lebal>
                        <div>
                          <el-table border @row-click="" height="250" style="width: 100%">
                            <el-table-column prop="pName">
                            </el-table-column>
                          </el-table>
                        </div>
                    </div>
                    <br>
                    <div>
                      <lebal>出发地</lebal><br>
                      <el-select v-model="type" placeholder="请选择">
                        <el-option v-for="item in provinceOp" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </el-main>
                  <el-main width="25%">
                    <div style="margin-top: -1rem"><label>已选出行信息</label></div>
                    <br>
                    <div>
                      <label>出行时间：<br>
                        {{productData.pid}}<br><br>
                      </label>
                      <label>套餐：<br>
                        {{productData.pName}}<br><br>
                      </label>
                      <label>出发地：<br>
                        {{productData.pName}}<br><br>
                      </label>
                      <label>产品价格(成人/人)：<br>
                        {{productData.pName}}<br><br>
                      </label>
                      <label>产品价格(儿童/人)：<br>
                        {{productData.pName}}<br>
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
            <el-form-item label="团号">
              <!--{{orderDetails.ordersn}}-->
            </el-form-item>
            <el-form-item label="出行人数">
              <label>成人  </label><el-input style="width: 9.2rem"></el-input>
              <label>儿童  </label><el-input style="width: 9.2rem"></el-input>
            </el-form-item>
            <el-form-item label="出行时间">
              <!--{{orderDetails.tourGroup}}-->
            </el-form-item>
            <el-form-item label="套餐">
              <!--{{travelerNum}}-->
            </el-form-item>
            <el-form-item label="出发地">
              <!--{{orderDetails.travelDate}}-->
            </el-form-item>
            <el-form-item label="支付方式">
              <!--{{orderDetails.travelDate}}-->
            </el-form-item>
            <el-form-item label="订单金额">
              <!--{{orderDetails.travelDate}}-->
            </el-form-item>
            <el-form-item label="发票类型">
              <el-radio v-model="type" label="1">个人</el-radio>
              <el-radio v-model="type" label="0">单位</el-radio>
            </el-form-item>
            <el-form-item label="抬头:">
              <el-input style="width: 23.2rem"></el-input>
            </el-form-item>
            <el-form-item label="税号:">
              <el-input style="width: 23.2rem"></el-input>
            </el-form-item>
            <el-form-item label="收件人姓名:">
              <el-input style="width: 23.2rem"></el-input>
            </el-form-item>
            <el-form-item label="收件人电话:">
              <el-input style="width: 23.2rem"></el-input>
            </el-form-item>
            <el-form-item label="收件地址:">
              <el-select v-model="type" @change="" placeholder="省" class="selWidth">
                <el-option v-for="item in provinceOp" :key="item.areaId" :label="item.areaName" :value="item.areaId">
                </el-option>
              </el-select>
              <label>-</label>
              <el-select v-model="type" @change="" placeholder="市" class="selWidth">
                <el-option v-for="item in cityOp" :key="item.areaId" :label="item.areaName" :value="item.areaId">
                </el-option>
              </el-select>
              <label>-</label>
              <el-select v-model="type" placeholder="县" class="selWidth">
                <el-option v-for="item in countyOp" :key="item.areaId" :label="item.areaName" :value="item.areaId">
                </el-option>
                <label>    </label>
              </el-select>
              <el-input style="width: 23.2rem"></el-input>
            </el-form-item>
          </div>
          <br>
          <div>
            <label>出行人信息</label>
          </div>
          <br>
          <div style="display: none" v-for="(traveler, $index) in domesticList">
          <div style="margin-left: 10rem"><label>出行人{{$index + 1}}：</label></div><br>
          <div style="width: 95%" align="left">
            <el-form :model="traveler" label-width="200px">
              <div>
                <el-form-item>
                  <el-radio v-model="traveler.ageGroup" label="1">成人</el-radio>
                  <el-radio v-model="traveler.ageGroup" label="2">儿童</el-radio>
                </el-form-item>
                <el-form-item label="中文姓">
                  <el-input v-model="traveler.ageGroup" style="width: 23.2rem"></el-input>
                </el-form-item>
                <el-form-item label="中文名">
                  <el-input v-model="traveler.ageGroup" style="width: 23.2rem"></el-input>
                </el-form-item>
                <el-form-item label="拼音/英文姓">
                  <el-input v-model="traveler.ageGroup" style="width: 23.2rem"></el-input>
                </el-form-item>
                <el-form-item label="拼音/英文名">
                  <el-input v-model="traveler.ageGroup" style="width: 23.2rem"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                  <el-select v-model="traveler.ageGroup" placeholder="请选择" style="width: 23.2rem">
                    <el-option v-for="item in selectManOp.passportOp" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="国家码">
                  <el-input v-model="traveler.ageGroup" style="width: 23.2rem"></el-input>
                </el-form-item>
                <el-form-item label="护照号">
                  <el-input v-model="traveler.ageGroup" style="width: 23.2rem"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-select v-model="traveler.ageGroup" placeholder="请选择" style="width: 23.2rem">
                    <el-option v-for="item in selectManOp.sexOp" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="出生日期">
                  <el-date-picker type="date" placeholder="出生日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 23.2rem">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="出生地点">
                  <el-input v-model="traveler.ageGroup" style="width: 23.2rem"></el-input>
                </el-form-item>
                <el-form-item label="签发日期">
                  <el-date-picker type="date" placeholder="签发日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 23.2rem">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="有效日期">
                  <el-date-picker type="date" placeholder="有效日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 23.2rem">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="签发地点">
                  <el-input v-model="traveler.ageGroup" style="width: 23.2rem"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                  <el-input v-model="traveler.ageGroup" style="width: 23.2rem"></el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>
      </div>
          <div v-for="(traveler, $index) in domesticList">
            <div style="margin-left: 10rem"><label>出行人{{$index + 1}}：</label></div><br>
                <div style="width: 95%" align="left">
                  <el-form :model="traveler" label-width="200px">
                    <div>
                      <el-form-item>
                        <el-radio v-model="traveler.ageGroup" label="1">成人</el-radio>
                        <el-radio v-model="traveler.ageGroup" label="2">儿童</el-radio>
                      </el-form-item>
                      <el-form-item label="出行人姓名">
                        <el-input v-model="traveler.tourerName" style="width: 23.2rem"></el-input>
                      </el-form-item>
                      <el-form-item label="联系电话">
                        <el-input v-model="traveler.tourerName" style="width: 23.2rem"></el-input>
                      </el-form-item>
                      <el-form-item label="证件类型">
                        <el-select v-model="traveler.cardType" placeholder="请选择" style="width: 23.2rem">
                          <el-option v-for="item in selectManOp.cardType" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="证件号码">
                        <el-input v-model="traveler.cardNumber"  style="width: 23.2rem"></el-input>
                      </el-form-item>
                      <el-form-item label="性别">
                        <el-select v-model="traveler.gender" placeholder="请选择" style="width: 23.2rem">
                          <el-option v-for="item in selectManOp.sexOp" :key="item.value" :label="item.label" :value="item.value">
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
              <a @click="addTraveler">+  添加出行人</a>
            </el-form-item>
          </div>
          <br>
          <div align="center">
            <el-form-item>
            <el-button type="primary" @click="">编辑</el-button>
            </el-form-item>
          </div>
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
          /** 性别 */
          sexOp: [{
            value: 0,
            label: '未知'
          }, {
            value: 1,
            label: '男'
          }, {
            value: 2,
            label: '女'
          }],
          /** 护照 */
          passportOp: [{
            value: 0,
            label: '普通因私护照'
          }, {
            value: 1,
            label: '公务护照'
          }, {
            value: 2,
            label: '外交护照'
          }],
          /** 证件类型 */
          cardType: [{
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
            label: '其他'
          }]
        },
        /** 弹框管理 */
        dialogM: {
          dialogProduct: false    /** 产品弹框 */
        },
        type: '',
        /** 当前请求头 */
        authorization: '',
        /** 线路产品弹框表格 */
        lineData: [],
        lineLikeData: [],
        /** 产品详情 */
        productData: {},
        /** 回填产品 */
        selectProduct: '选择产品',
        /** 产品模糊查询 */
        proName: '',
        /** 省 */
        provinceOp: [{
        }],
        /** 市 */
        cityOp: [{
        }],
        /** 县 */
        countyOp: [{
        }]
      }
    },
    created: function () {
      this.dataProArea(37)
//      this.authorization = this.$route.params.authorization
      this.proData()
//      this.domesticList.push(this.traveler)
    },
    updated: function () {
//      console.log(this.distributerInfoDTO)
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
      }
    }
  }
</script>
