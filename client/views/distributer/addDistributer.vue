<template>
  <div style="background-color: #f2f2f2" align="center">
    <div style="background-color: #ffffff;width:90%" align="left">
      <br>
      <div style="width: 45.5%;margin-left: 3rem">
        <el-form :model="distributerInfoDTO" :rules="rules" ref="distributerInfoDTO" label-width="200px" class="demo-ruleForm">
          <label>代理商银行账户信息</label>
          <el-form-item label="代理商银行账户类型" prop="bankAccountType">
            <el-radio v-model="distributerInfoDTO.bankAccountType" label="1">企业</el-radio>
            <el-radio v-model="distributerInfoDTO.bankAccountType" label="0">个人</el-radio>
          </el-form-item>
          <el-form-item label="收款开户名" prop="bankAccountName">
            <el-input v-model="distributerInfoDTO.bankAccountName" style="width: 23.2rem"></el-input>
          </el-form-item>
          <el-form-item label="开户地" prop="bankProvinceId">
            <el-select v-model="distributerInfoDTO.bankProvinceId" @change="dataBCiArea(distributerInfoDTO.bankProvinceId, true)" placeholder="省" class="selWidth">
              <el-option
                v-for="item in provinceBOp"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <label>-</label>
            <el-select v-model="distributerInfoDTO.bankCityId" @change="dataBCoArea(distributerInfoDTO.bankCityId, true)" placeholder="市" class="selWidth">
              <el-option
                v-for="item in cityBOp"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <label>-</label>
            <el-select v-model="distributerInfoDTO.bankCountyId" placeholder="县" class="selWidth">
              <el-option
                v-for="item in countyBOp"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行" prop="bankName">
            <el-input v-model="distributerInfoDTO.bankName" style="width: 23.2rem"></el-input>
          </el-form-item>
          <el-form-item label="开户银行卡号" prop="bankAccount">
            <el-input v-model.number="distributerInfoDTO.bankAccount" style="width: 23.2rem"></el-input>
          </el-form-item>
          <div align="center">
            <label>注：企业代理商请填写对公银行账户信息</label>
          </div>
          <br>
          <label>代理商代理信息</label>
          <div>
            <el-form-item label="上级代理商" prop="distributerPid">
              <el-button style="width: 23.2rem" @click="dialogVisible = true">{{selectPDistributer}}</el-button>
              <el-dialog title="选择代理商" :visible.sync="dialogVisible" :modal-append-to-body="false" :before-close="handleClose" center class="modelStyle">
                  <el-container>
                    <el-aside width="50%">
                      <el-input v-model="name" @change="inputChange" placeholder="输入代理商名称"></el-input>
                      <el-table :data="tableData" border @row-click="rowClick" height="250" style="width: 100%">
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
          <el-form-item label="代理商名称" prop="distributerName">
            <el-input v-model="distributerInfoDTO.distributerName" style="width: 23.2rem"></el-input>
          </el-form-item>
          <el-form-item label="代理商分成比例" prop="distributerDivideProportion">
            <el-input v-model.number="distributerInfoDTO.distributerDivideProportion" style="width: 23.2rem"></el-input>
          </el-form-item>
          <el-form-item label="代理商渠道分类" prop="channelId">
            <el-select v-model="distributerInfoDTO.channelId" placeholder="请选择" style="width: 23.2rem">
              <el-option
                v-for="item in channelOp"
                :key="item.channelId"
                :label="item.channelName"
                :value="item.channelId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理商等级">
            <el-select v-model="distributerInfoDTO.gradeId" placeholder="请选择" style="width: 23.2rem">
              <el-option
                v-for="item in gradeOp"
                :key="item.gradeId"
                :label="item.gradeName"
                :value="item.gradeId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理商运营负责人" prop="managerId">
            <el-select v-model="distributerInfoDTO.managerId" placeholder="请选择" style="width: 23.2rem">
              <el-option
                v-for="item in managerOp"
                :key="item.managerId"
                :label="item.managerName"
                :value="item.managerId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理商合同编号" prop="distributerContractNo">
            <el-input v-model="distributerInfoDTO.distributerContractNo" style="width: 23.2rem"></el-input>
          </el-form-item>
          <el-form-item label="代理商注册日期" prop="distributerRegistTime">
            <el-date-picker
              v-model="distributerInfoDTO.distributerRegistTime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              style="width: 23.2rem">
            </el-date-picker>
          </el-form-item>
          <br>
          <label>代理商联系信息</label>
          <el-form-item label="联系人">
            <el-input v-model="distributerInfoDTO.contactName" style="width: 23.2rem"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="contactPhone">
            <el-input v-model="distributerInfoDTO.contactPhone" style="width: 23.2rem"></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱" prop="contactEmail">
            <el-input type="email" v-model.email="distributerInfoDTO.contactEmail" style="width: 23.2rem"></el-input>
          </el-form-item>
          <el-form-item label="所在地区">
            <el-select v-model="distributerInfoDTO.provinceId" @change="dataCiArea(distributerInfoDTO.provinceId, true)" placeholder="省" class="selWidth">
              <el-option
                v-for="item in provinceOp"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <label>-</label>
            <el-select v-model="distributerInfoDTO.cityId" @change="dataCoArea(distributerInfoDTO.cityId, true)" placeholder="市" class="selWidth">
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
          <el-form-item label="详细地址">
            <el-input v-model="distributerInfoDTO.contactAddress" style="width: 23.2rem"></el-input>
          </el-form-item>
          <br>
          <div align="right">
            <el-form-item>
              <el-button type="primary" @click="exitDistributer" v-if="this.$route.params.distributerId > 0">编辑</el-button>
              <el-button type="primary" @click="onSubmit" v-else>保存</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!--新建代理商成功提示框-->
    <el-dialog :visible.sync="addSuccess" width="30%" :modal-append-to-body="false" center>
      <div align="center">
        <i class="el-icon-success"></i><br>
        <span>
          代理商创建成功！
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="createContinue">继续新建</el-button>
    <el-button type="primary" @click="goDistributerList">去代理商列表</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import Qs from 'qs'
  import Vue from 'vue'
  var api = Vue.prototype.api
  export default {
    components: {
      axios,
      Qs,
      api
    },
    data () {
      return {
        addSuccess: false,
        dialogVisible: false,
        gradeOp: [],
        channelOp: [],
        managerOp: [],
        provinceOp: [],
        cityOp: [],
        countyOp: [],
        provinceBOp: [],
        cityBOp: [],
        countyBOp: [],
        tableData: [],
        areaData: [],
        name: '',
        distributerData: {},
        selectPDistributer: '选择上级代理商',
        managerData: {},
        distributerInfoDTO: {
          bankAccountType: '', /** 银行账户类型 */
          bankAccountName: '', /** 收款开户名称 */
          bankProvinceId: '', /** 开户省id */
          bankCityId: '', /** 开户市id */
          bankCountyId: '', /** 开户区id */
          bankName: '', /** 开户银行 */
          bankAccount: '', /** 开户卡号 */
          distributerPid: '', /** 上级代理商id */
          distributerName: '', /** 代理商名称 */
          distributerDivideProportion: '', /** 分成比例 */
          distributerContractNo: '', /** 合同编号 */
          channelId: '', /** 渠道 */
          gradeId: '', /** 等级 */
          managerId: '', /** 运营管理人员 */
          distributerRegistTime: '', /** 代理商注册日期 */
          contactName: '', /** 联系人 */
          contactPhone: '', /** 联系电话 */
          provinceId: '', /** 省id */
          cityId: '', /** 市id */
          countyId: '', /** 县id */
          contactAddress: '', /** 联系详细地址 */
          contactEmail: '' /** 联系邮箱 */
        },
        rules: {
          bankAccountType: [
            {required: true, message: '请选择银行账户类型', trigger: 'change'}
          ],
          bankAccountName: [
            {required: true, message: '请输入收款开户名称', trigger: 'blur'}
          ],
          bankProvinceId: [
            { required: true, message: '请选择开户地', trigger: 'change' }
          ],
          bankName: [
            { required: true, message: '请输入开户银行', trigger: 'blur' }
          ],
          bankAccount: [
            { required: true, message: '请输入开户银行卡号', trigger: 'blur' },
            { type: 'number', message: '银行卡号必须是数字' }
          ],
          distributerPid: [
            { required: true, message: '请选择上级代理商', trigger: 'change' }
          ],
          distributerName: [
            { required: true, message: '请输入代理商名称', trigger: 'blur' }
          ],
          distributerDivideProportion: [
            { required: true, message: '请输入代理商分成比例', trigger: 'blur' },
            { type: 'number', min: 0, max: 100, message: '大小在0-100之间' }
          ],
          distributerContractNo: [
            { required: true, message: '请输入代理商合同编号', trigger: 'change' }
          ],
          channelId: [
            { required: true, message: '请选择代理商渠道', trigger: 'change' }
          ],
          managerId: [
            { required: true, message: '请选择运营人员', trigger: 'change' }
          ],
          distributerRegistTime: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          contactPhone: [
            { min: 11, max: 11, message: '长度必须是11位' }
          ],
          contactEmail: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ]
        }
      }
    },
    created: function () {
      if (this.$route.params.distributerId > 0) {
        this.showExit()
      } else {
        this.dataGet()
        this.areaGet()
//        this.dataProArea(37)
      }
    },
    updated: function () {
      console.log(this.distributerInfoDTO)
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
      /** 继续创建 */
      createContinue () {
        this.distributerInfoDTO.bankCityId = ''
        this.distributerInfoDTO.bankCountyId = ''
        this.distributerInfoDTO.gradeId = ''
        this.distributerInfoDTO.distributerRegistTime = ''
        this.distributerInfoDTO.contactName = ''
        this.distributerInfoDTO.contactPhone = ''
        this.distributerInfoDTO.provinceId = ''
        this.distributerInfoDTO.cityId = ''
        this.distributerInfoDTO.countyId = ''
        this.distributerInfoDTO.contactAddress = ''
        this.distributerInfoDTO.contactEmail = ''
        this.$refs.distributerInfoDTO.resetFields()
        this.managerData = {}
        this.distributerData = {}
        this.selectPDistributer = '选择上级代理商'
        this.addSuccess = false
      },
      /** 去代理商列表 */
      goDistributerList () {
        this.$router.push({name: '代理商列表'})
        this.addSuccess = false
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      /** 显示编辑页面 */
      showExit: function () {
//        console.log(this.$route.params.distributerId)
        var that = this
        if (that.$route.params.distributerId > 0) {
          axios.get('/api/distributerInfo/findDistributerInfoById?distributerId=' + that.$route.params.distributerId, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Admin ' + that.getCookie('admin_token')
            }
          }).then(function (response) {
            that.distributerInfoDTO = response.data
            that.areaGet()
            that.dataGet()
            that.distributerInfoDTO.bankAccount = Number(response.data.bankAccount)
            var date = new Date(that.distributerInfoDTO.distributerRegistTime)
            that.distributerInfoDTO.distributerRegistTime = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()).toString()
            that.distributerInfoDTO.bankAccountType = that.distributerInfoDTO.bankAccountType.toString()
          }).catch(function (error) {
            console.log(error)
          })
        }
      },
      /** 编辑代理商 */
      exitDistributer () {
        console.log('开始提交编辑表单')
        console.log(this.distributerInfoDTO)
        var that = this
        for (var j = 0; j < that.areaData.length; j++) {
          if (that.distributerInfoDTO.provinceId === that.areaData[j].name) {
            that.distributerInfoDTO.provinceId = that.areaData[j].id
          }
          if (that.distributerInfoDTO.cityId === that.areaData[j].name) {
            that.distributerInfoDTO.cityId = that.areaData[j].id
          }
          if (that.distributerInfoDTO.countyId === that.areaData[j].name) {
            that.distributerInfoDTO.countyId = that.areaData[j].id
          }
          if (that.distributerInfoDTO.bankProvinceId === that.areaData[j].name) {
            that.distributerInfoDTO.bankProvinceId = that.areaData[j].id
          }
          if (that.distributerInfoDTO.bankCityId === that.areaData[j].name) {
            that.distributerInfoDTO.bankCityId = that.areaData[j].id
          }
          if (that.distributerInfoDTO.bankCountyId === that.areaData[j].name) {
            that.distributerInfoDTO.bankCountyId = that.areaData[j].id
          }
        }
        var BODY = {
          distributerId: that.$route.params.distributerId,
          bankAccountType: that.distributerInfoDTO.bankAccountType, /** 银行账户类型 */
          bankAccountName: that.distributerInfoDTO.bankAccountName, /** 收款开户名称 */
          bankProvinceId: that.distributerInfoDTO.bankProvinceId, /** 开户省id */
          bankCityId: that.distributerInfoDTO.bankCityId, /** 开户市id */
          bankCountyId: that.distributerInfoDTO.bankCountyId, /** 开户区id */
          bankName: that.distributerInfoDTO.bankName, /** 开户银行 */
          bankAccount: that.distributerInfoDTO.bankAccount, /** 开户卡号 */
          distributerPid: that.distributerInfoDTO.distributerPid, /** 上级代理商id */
          distributerName: that.distributerInfoDTO.distributerName, /** 代理商名称 */
          distributerDivideProportion: that.distributerInfoDTO.distributerDivideProportion, /** 分成比例 */
          distributerContractNo: that.distributerInfoDTO.distributerContractNo, /** 合同编号 */
          channelId: that.distributerInfoDTO.channelId, /** 渠道 */
          gradeId: that.distributerInfoDTO.gradeId, /** 等级 */
          managerId: that.distributerInfoDTO.managerId, /** 运营管理人员 */
          distributerRegistTime: that.distributerInfoDTO.distributerRegistTime, /** 代理商注册日期 */
          contactName: that.distributerInfoDTO.contactName, /** 联系人 */
          contactPhone: that.distributerInfoDTO.contactPhone, /** 联系电话 */
          provinceId: that.distributerInfoDTO.provinceId, /** 省id */
          cityId: that.distributerInfoDTO.cityId, /** 市id */
          countyId: that.distributerInfoDTO.countyId, /** 县id */
          contactAddress: that.distributerInfoDTO.contactAddress, /** 联系详细地址 */
          contactEmail: that.distributerInfoDTO.contactEmail /** 联系邮箱 */
        }
//        var BODY = Qs.stringify(this.form)
        console.log('######')
        console.log(BODY)
        console.log('######')
        axios.post('/api/distributerInfo/updateDistributerInfo', BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(response => {
          console.log(response)
          if (response.data === 'OK') {
            this.$router.push({path: 'distributerList'})
          }
          console.log('返回结束提交编辑表单')
        })
          .catch(error => {
            console.log(error.response)
            console.log('错误结束提交编辑表单')
          })
      },
      /** 查询省市县名称 */
      areaGet: function () {
        var that = this
        axios.get(api + 'common/search/getChinaAreas', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': that.getCookie('authorization')
          }
        }).then(function (response) {
          that.areaData = response.data
          for (var i = 0; i < that.areaData.length; i++) {
            if (that.areaData[i].pid === 37) {
              that.provinceOp.push(that.areaData[i])
              that.provinceBOp.push(that.areaData[i])
            }
          }
          if (that.$route.params.distributerId > 0) {
            that.dataCiArea(that.distributerInfoDTO.provinceId, false)
            that.dataCoArea(that.distributerInfoDTO.cityId, false)
            that.dataBCiArea(that.distributerInfoDTO.bankProvinceId, false)
            that.dataBCoArea(that.distributerInfoDTO.bankCityId, false)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** input改变，模糊查询代理商 */
      inputChange () {
        var that = this
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {distributerName: that.name}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'hero'
          }
        }).then(function (response) {
          that.tableData = response.data.listDto
          that.managerData = ''
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** form表单提交 */
      onSubmit () {
        this.$refs.distributerInfoDTO.validate((valid) => {
          if (valid) {
            console.log('success submit!!')
            console.log('开始提交表单')
            console.log(this.distributerInfoDTO)
            var that = this
            var BODY = {
              bankAccountType: that.distributerInfoDTO.bankAccountType, /** 银行账户类型 */
              bankAccountName: that.distributerInfoDTO.bankAccountName, /** 收款开户名称 */
              bankProvinceId: that.distributerInfoDTO.bankProvinceId, /** 开户省id */
              bankCityId: that.distributerInfoDTO.bankCityId, /** 开户市id */
              bankCountyId: that.distributerInfoDTO.bankCountyId, /** 开户区id */
              bankName: that.distributerInfoDTO.bankName, /** 开户银行 */
              bankAccount: that.distributerInfoDTO.bankAccount, /** 开户卡号 */
              distributerPid: that.distributerInfoDTO.distributerPid, /** 上级代理商id */
              distributerName: that.distributerInfoDTO.distributerName, /** 代理商名称 */
              distributerDivideProportion: that.distributerInfoDTO.distributerDivideProportion, /** 分成比例 */
              distributerContractNo: that.distributerInfoDTO.distributerContractNo, /** 合同编号 */
              channelId: that.distributerInfoDTO.channelId, /** 渠道 */
              gradeId: that.distributerInfoDTO.gradeId, /** 等级 */
              managerId: that.distributerInfoDTO.managerId, /** 运营管理人员 */
              distributerRegistTime: that.distributerInfoDTO.distributerRegistTime, /** 代理商注册日期 */
              contactName: that.distributerInfoDTO.contactName, /** 联系人 */
              contactPhone: that.distributerInfoDTO.contactPhone, /** 联系电话 */
              provinceId: that.distributerInfoDTO.provinceId, /** 省id */
              cityId: that.distributerInfoDTO.cityId, /** 市id */
              countyId: that.distributerInfoDTO.countyId, /** 县id */
              contactAddress: that.distributerInfoDTO.contactAddress, /** 联系详细地址 */
              contactEmail: that.distributerInfoDTO.contactEmail /** 联系邮箱 */
            }
            console.log('######')
            console.log(that.form)
            console.log('######')
            axios.post('/api/distributerInfo/saveDistributerInfo', BODY, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Admin ' + that.getCookie('admin_token')
              }
            }).then(response => {
              console.log(response)
              if (response.data === 'OK') {
                that.addSuccess = true
              }
              console.log('返回结束提交表单')
            })
              .catch(error => {
                console.log(error.response)
                console.log('错误结束提交表单')
              })
          } else {
            console.log('error submit!!')
            return false
          }
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
          that.distributerInfoDTO.distributerPid = row.distributerId
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
        /** 获取上级代理商 */
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
              if (that.tableData[i].distributerId === that.distributerInfoDTO.distributerPid) {
                that.selectPDistributer = that.tableData[i].distributerName
              }
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 获取联系市 */
      dataCiArea: function (value, isChange) {
        var that = this
        that.cityOp = []
        that.countyOp = []
        if (isChange === true) {
          that.distributerInfoDTO.cityId = ''
          that.distributerInfoDTO.countyId = ''
        } else {
          if (that.$route.params.distributerId > 0) {
          } else {
            that.distributerInfoDTO.cityId = ''
            that.distributerInfoDTO.countyId = ''
          }
        }
        for (var i = 0; i < that.areaData.length; i++) {
          if (that.areaData[i].pid === value) {
            that.cityOp.push(that.areaData[i])
          }
        }
      },
      /** 获取联系县 */
      dataCoArea: function (value, isChange) {
        var that = this
        that.countyOp = []
        if (isChange === true) {
          that.distributerInfoDTO.countyId = ''
        } else {
          if (that.$route.params.distributerId > 0) {
          } else {
            that.distributerInfoDTO.countyId = ''
          }
        }
        for (var i = 0; i < that.areaData.length; i++) {
          if (that.areaData[i].pid === value) {
            that.countyOp.push(that.areaData[i])
          }
        }
      },
      /** 获取银行市 */
      dataBCiArea: function (value, isChange) {
        var that = this
        that.cityBOp = []
        that.countyBOp = []
        if (isChange === true) {
          that.distributerInfoDTO.bankCityId = ''
          that.distributerInfoDTO.bankCountyId = ''
        } else {
          if (that.$route.params.distributerId > 0) {
          } else {
            that.distributerInfoDTO.bankCityId = ''
            that.distributerInfoDTO.bankCountyId = ''
          }
        }
        for (var i = 0; i < that.areaData.length; i++) {
          if (that.areaData[i].pid === value) {
            that.cityBOp.push(that.areaData[i])
          }
        }
      },
      /** 获取银行县 */
      dataBCoArea: function (value, isChange) {
        var that = this
        that.countyBOp = []
        if (isChange === true) {
          that.distributerInfoDTO.bankCountyId = ''
        } else {
          if (that.$route.params.distributerId > 0) {
          } else {
            that.distributerInfoDTO.bankCountyId = ''
          }
        }
        for (var i = 0; i < that.areaData.length; i++) {
          if (that.areaData[i].pid === value) {
            that.countyBOp.push(that.areaData[i])
          }
        }
      }
    }
  }
</script>
<style>
  .selWidth {
    width: 7.1rem;
  }
  /* 相对浏览器绝对定位*/
  .modelStyle {
    position:fixed;
    top:30rem
  }
</style>
