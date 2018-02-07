<template>
  <div style="background-color: #f2f2f2" align="center">
    <div style="background-color: #ffffff;width:90%" align="left">
      <br>
      <div style="margin-right: 5rem" align="right">
        <a @click="returnToUpLevel">返回</a>
      </div>
      <div style="width: 95%;margin-left: 3rem">
        <el-form label-width="200px" :model="orderForm" :rules="rules" ref="orderForm">
          <div>
            <label>联系人信息</label>
          </div>
          <br>
          <div>
            <el-form-item label="联系人姓名" prop="linkMan">
              <el-input style="width: 23.2rem" v-model="orderForm.linkMan"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="linkTel">
              <el-input style="width: 23.2rem" v-model="orderForm.linkTel"></el-input>
            </el-form-item>
            <el-form-item label="联系地址">
              <el-input style="width: 23.2rem" v-model="orderForm.linkAdress"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址">
              <el-input style="width: 23.2rem" v-model="orderForm.linkEmail"></el-input>
            </el-form-item>
            <el-form-item label="微信号">
              <el-input style="width: 23.2rem" v-model="orderForm.linkWeixin"></el-input>
            </el-form-item>
          </div>
          <br>
          <div>
            <label>线路产品订单信息</label>
          </div>
          <div>
            <el-form-item label="线路产品" prop="pid">
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
            <el-form-item label="团号" prop="tourGroup">
              <!--{{orderDetails.ordersn}}-->
            </el-form-item>
            <el-form-item label="出行人数" prop="tourersNum">
              <label>成人  </label><el-input style="width: 9.2rem" v-model="orderForm.tourers.subNum.adult"></el-input>
              <label>儿童  </label><el-input style="width: 9.2rem" v-model="orderForm.tourers.subNum.child"></el-input>
            </el-form-item>
            <el-form-item label="出行时间" prop="travelDate">
              <!--{{orderDetails.tourGroup}}-->
            </el-form-item>
            <el-form-item label="套餐" prop="suitId">
              <!--{{travelerNum}}-->
            </el-form-item>
            <el-form-item label="出发地" prop="fromCity">
              <!--{{orderDetails.travelDate}}-->
            </el-form-item>
            <el-form-item label="支付方式" prop="payType">
              <!--{{orderDetails.travelDate}}-->
            </el-form-item>
            <el-form-item label="订单金额" prop="amount">
              <!--{{orderDetails.travelDate}}-->
            </el-form-item>
            <el-form-item label="发票类型" prop="orderBillType">
              <el-radio label="1" v-model="orderForm.orderBill.type">个人</el-radio>
              <el-radio label="0" v-model="orderForm.orderBill.type">单位</el-radio>
            </el-form-item>
            <el-form-item label="抬头:" prop="orderBillTitle">
              <el-input style="width: 23.2rem" v-model="orderForm.orderBill.title"></el-input>
            </el-form-item>
            <el-form-item label="税号:" prop="orderBillTaxNum">
              <el-input style="width: 23.2rem" v-model="orderForm.orderBill.taxNum"></el-input>
            </el-form-item>
            <el-form-item label="收件人姓名:" prop="receiverName">
              <el-input style="width: 23.2rem" v-model="orderForm.receiverName"></el-input>
            </el-form-item>
            <el-form-item label="收件人电话:" prop="receiverTel">
              <el-input style="width: 23.2rem" v-model="orderForm.receiverTel"></el-input>
            </el-form-item>
            <el-form-item label="收件地址:" prop="receiverAddress">
              <el-select v-model="orderForm.provinceId" @change="" placeholder="省" class="selWidth">
                <el-option v-for="item in provinceOp" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
              <label>-</label>
              <el-select v-model="orderForm.cityId" @change="" placeholder="市" class="selWidth">
                <el-option v-for="item in cityOp" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
              <label>-</label>
              <el-select v-model="orderForm.countyId" placeholder="县" class="selWidth">
                <el-option v-for="item in countyOp" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
                <label>    </label>
              </el-select>
              <el-input style="width: 23.2rem" v-model="orderForm.receiverAddress"></el-input>
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
                  <el-form :model="traveler" :rules="rules" ref="orderForm" label-width="200px">
                    <div>
                      <el-form-item >
                        <el-radio v-model="traveler.ageGroup" label="1">成人</el-radio>
                        <el-radio v-model="traveler.ageGroup" label="2">儿童</el-radio>
                      </el-form-item>
                      <el-form-item label="出行人姓名" prop="tourerName">
                        <el-input v-model="traveler.tourerName" style="width: 23.2rem"></el-input>
                      </el-form-item>
                      <el-form-item label="联系电话" prop="linkPhone">
                        <el-input v-model="traveler.tourerName" style="width: 23.2rem"></el-input>
                      </el-form-item>
                      <el-form-item label="证件类型" prop="cardType">
                        <el-select v-model="traveler.cardType" placeholder="请选择" style="width: 23.2rem">
                          <el-option v-for="item in selectManOp.cardType" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="证件号码" prop="cardNumber">
                        <el-input v-model="traveler.cardNumber"  style="width: 23.2rem"></el-input>
                      </el-form-item>
                      <el-form-item label="性别" prop="gender">
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
          <br>
        </el-form>
      </div>
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
        domesticList: [{}],
        selectManOp: {
          /** 性别 */
          sexOp: global.genderOp,
          /** 护照 */
          passportOp: global.passportOp,
          /** 证件类型 */
          cardType: global.cardTypeOp
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
        provinceOp: [],
        /** 市 */
        cityOp: [],
        /** 县 */
        countyOp: [],
        areaData: [],
        orderForm: {
          linkMan: '', // 联系人
          linkTel: '', // 联系电话
          linkAdress: '', // 联系地址
          linkEmail: '', // 联系邮箱
          linkWeixin: '', // 联系微信
          pid: '', // 产品id
          tourGroup: '', // 团号
          tourersNum: '', // 出行人数
          tourers: {
            subNum: {child: '', adult: ''},
            domesticList: [], // 国内出行人
            abroadList: [] // 国际出行人
          },
          travelDate: '', // 出行时间
          suitId: '', // 套餐id
          fromCity: '', // 出发地
          payType: '', // 支付方式
          amount: '', // 订单金额
          orderBillType: '', // 发票类型
          orderBillTitle: '', // 发票抬头
          orderBillTaxNum: '', // 税号
          orderBill: {
            title: '',
            type: '',
            taxNum: ''
          },
          receiverName: '', // 收件人姓名
          receiverTel: '', // 收件人电话
          provinceId: '', /** 省id */
          cityId: '', /** 市id */
          countyId: '', /** 县id */
          receiverAddress: '', // 收件人地址
          tourerName: '', // 出行人姓名
          linkPhone: '', // 联系电话
          cardType: '', // 证件类型
          cardNumber: '', // 证件号码
          gender: '' // 性别
        },
        rules: {
          linkMan: [
          {required: true, message: '请输入联系人', trigger: 'change'}
          ],
          linkTel: [
            {required: true, message: '请输入联系电话', trigger: 'blur'}
          ],
          pid: [
            { required: true, message: '请选择线路产品', trigger: 'change' }
          ],
          tourGroup: [
            { required: true, message: '请输入团号', trigger: 'blur' }
          ],
          tourersNum: [
            { required: true, message: '请输入出行人', trigger: 'blur' },
            { type: 'number', message: '必须是数字' }
          ],
          travelDate: [
            { required: true, message: '出行时间不为空', trigger: 'change' }
          ],
          suitId: [
            { required: true, message: '套餐不为空', trigger: 'blur' }
          ],
          fromCity: [
            { required: true, message: '出发地不为空', trigger: 'blur' }
          ],
          payType: [
            { required: true, message: '支付方式不为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '订单金额不为空', trigger: 'blur' }
          ],
          orderBillType: [
            { required: true, message: '请选择发票类型', trigger: 'blur' }
          ],
          orderBillTitle: [
            { required: true, message: '请输入发票抬头', trigger: 'blur' }
          ],
          orderBillTaxNum: [
            { required: true, message: '请输入发票税号', trigger: 'blur' }
          ],
          receiverName: [
            { required: true, message: '请输入收件人姓名', trigger: 'blur' }
          ],
          receiverTel: [
            { required: true, message: '请输入收件人电话', trigger: 'blur' }
          ],
          receiverAddress: [
           { required: true, message: '请输入收件地址', trigger: 'blur' }
          ],
          tourerName: [
            { required: true, message: '请输入出行人姓名', trigger: 'blur' }
          ],
          linkPhone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' }
          ],
          cardType: [
            { required: true, message: '请选择证件类型', trigger: 'blur' }
          ],
          cardNumber: [
            { required: true, message: '请输入证件号码', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'blur' }
          ]}
      }
    },
    created: function () {
      this.areaGet()
      this.proData()
    },
    updated: function () {},
    methods: {
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
      /** 查询省市县名称 */
      areaGet: function () {
//        console.log('开始查询名称')
        var that = this
        axios.get(global.API + 'common/search/getChinaAreas', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Sys ' + global.getCookie('authorization')
          }
        }).then(function (response) {
          that.areaData = response.data
          for (var k = 0; k < that.areaData.length; k++) {
            if (that.areaData[k].pid === 37) {
              that.provinceOp.push(that.areaData[k])
//              that.provinceBOp.push(that.areaData[k])
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 获取联系市 */
      dataCiArea: function (value) {
        var that = this
        that.cityOp = []
        that.countyOp = []
        that.orderForm.cityId = ''
        that.orderForm.countyId = ''
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
        that.orderForm.countyId = ''
        for (var i = 0; i < that.areaData.length; i++) {
          if (that.areaData[i].pid === value) {
            that.countyOp.push(that.areaData[i])
          }
        }
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
      /** 返回上一层 */
      returnToUpLevel () {
        this.$router.push({path: '/line/lineStandOrder', query: {lineOrder: this.$route.query.lineOrder}})
      },
      /** 获取线路产品 */
      proData () {
        var that = this
        axios.get(global.API + 'distrbuter/product/list/1', {
          headers: {
            'Authorization': 'Sys ' + global.getCookie('authorization'),
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          that.lineData = response.data
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>
