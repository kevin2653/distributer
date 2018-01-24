<template>
  <div style="background-color: #f2f2f2" align="center">
    <div style="background-color: #ffffff;width:90%" align="left">
      <br>
      <div style="margin-right: 5rem" align="right">
        <a @click="returnToUpLevel">返回</a>
      </div>
      <div style="width: 45%;margin-left: 5rem">
        <el-form label-width="200px">
          <div>
            <label>代理商银行账户信息</label>
          </div>
          <br>
          <div>
            <el-form-item label="代理商银行账户类型:">
              {{distrubuterInfo.bankAccountType}}
            </el-form-item>
            <el-form-item label="收款开户名:">
              {{distrubuterInfo.bankAccountName}}
            </el-form-item>
            <el-form-item label="开户地:">
              {{distrubuterInfo.bankProvinceId}}-{{distrubuterInfo.bankCityId}}-{{distrubuterInfo.bankCountyId}}
            </el-form-item>
            <el-form-item label="开户银行:">
              {{distrubuterInfo.bankName}}
            </el-form-item>
            <el-form-item label="开户银行卡号:">
              {{distrubuterInfo.bankAccount}}
            </el-form-item>
          </div>
          <br>
          <div>
            <label>代理商代理信息</label>
          </div>
          <div>
            <el-form-item label="上级代理商:">
              {{distrubuterInfo.distributerPid}}
            </el-form-item>
            <el-form-item label="代理商名称:">
              {{distrubuterInfo.distributerName}}
            </el-form-item>
            <el-form-item label="代理商分成比例:">
              {{distrubuterInfo.distributerDivideProportion}}
            </el-form-item>
            <el-form-item label="代理商渠道分类:">
              {{distrubuterInfo.dChannel.channelName}}
            </el-form-item>
            <el-form-item label="代理商等级:">
              {{distrubuterInfo.dGrade.gradeName}}
            </el-form-item>
            <el-form-item label="代理商运营负责人:">
              {{distrubuterInfo.sManager.managerName}}
            </el-form-item>
            <el-form-item label="代理商合同编号:">
              {{distrubuterInfo.distributerContractNo}}
            </el-form-item>
            <el-form-item label="代理商注册日期:">
              {{distrubuterInfo.distributerRegistTime}}
            </el-form-item>
          </div>

          <br>
          <div>
            <label>代理商联系信息</label>
          </div>
          <div>
            <el-form-item label="联系人:">
              {{distrubuterInfo.contactName}}
            </el-form-item>
            <el-form-item label="联系电话:">
              {{distrubuterInfo.contactPhone}}
            </el-form-item>
            <el-form-item label="联系邮箱:">
              {{distrubuterInfo.contactEmail}}
            </el-form-item>
            <el-form-item label="所在地区:">
              {{distrubuterInfo.provinceId}}-{{distrubuterInfo.cityId}}-{{distrubuterInfo.countyId}}
            </el-form-item>
            <el-form-item label="详细地址:">
              {{distrubuterInfo.contactAddress}}
            </el-form-item>
          </div>
          <br>
          <div align="right">
            <el-form-item>
              <el-button type="primary" @click="handleEdit">编辑</el-button>
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
      Vue,
      api
    },
    data () {
      return {
        distributerInfoDTO: {},
        distrubuterInfo: {
          dChannel: {
            channelName: ''
          },
          sManager: {
            managerName: ''
          },
          dGrade: {
            gradeName: ''
          },
          tableData: []
        },
        areaData: []
      }
    },
    created: function () {
      this.distributerInfoDTO = this.$route.params.distributerInfoDTO
//      console.log('DDDDDDDDDDDDD')
//      console.log(this.distributerInfoDTO)
      this.dataPGet()
//      this.areaGet()
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
      /** 返回上一层 */
      returnToUpLevel () {
        this.$router.push({name: '代理商列表', params: {distributerId: this.distrubuterInfo.distributerId, distributerInfoDTO: this.distributerInfoDTO}})
      },
      /** 编辑 */
      handleEdit () {
//        this.$router.push('/distributer/代理商列表/代理商详情')
        this.$router.push({name: '新建代理商', params: {distributerId: this.distrubuterInfo.distributerId}})
        console.log('编辑')
        console.log(this.distrubuterInfo.distributerId)
      },
      /** 查询省市县名称 */
      areaGet: function () {
        var that = this
        axios.get(Vue.prototype.api + 'common/search/getChinaAreas', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': that.getCookie('authorization')
          }
        }).then(function (response) {
          that.areaData = response.data
          for (var j = 0; j < that.areaData.length; j++) {
            if (that.distrubuterInfo.provinceId === that.areaData[j].id) {
              that.distrubuterInfo.provinceId = that.areaData[j].name
            }
            if (that.distrubuterInfo.cityId === that.areaData[j].id) {
              that.distrubuterInfo.cityId = that.areaData[j].name
            }
            if (that.distrubuterInfo.countyId === that.areaData[j].id) {
              that.distrubuterInfo.countyId = that.areaData[j].name
            }
            if (that.distrubuterInfo.bankProvinceId === that.areaData[j].id) {
              that.distrubuterInfo.bankProvinceId = that.areaData[j].name
            }
            if (that.distrubuterInfo.bankCityId === that.areaData[j].id) {
              that.distrubuterInfo.bankCityId = that.areaData[j].name
            }
            if (that.distrubuterInfo.bankCountyId === that.areaData[j].id) {
              that.distrubuterInfo.bankCountyId = that.areaData[j].name
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 获取上级代理商 */
      dataPGet: function () {
        var that = this
        /** 获取代理商 */
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {depath: ''}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.tableData = response.data.listDto
          that.dataGet()
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 查询当前代理商信息 */
      dataGet: function () {
        console.log(this.$route.params.distributerId)
        var that = this
        if (that.$route.params.distributerId > 0) {
          axios.get('/api/distributerInfo/findDistributerInfoById?distributerId=' + that.$route.params.distributerId, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Admin ' + that.getCookie('admin_token')
            }
          }).then(function (response) {
            that.distrubuterInfo = response.data
  //          that.distrubuterInfo.dChannel.channelName = response.data.dChannel.channelName
            if (that.distrubuterInfo.bankAccountType === 1) {
              that.distrubuterInfo.bankAccountType = '企业'
            }
            if (that.distrubuterInfo.bankAccountType === 0) {
              that.distrubuterInfo.bankAccountType = '个人'
            }
            var date = new Date(that.distrubuterInfo.distributerRegistTime)
            that.distrubuterInfo.distributerRegistTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
//            moment(10000000000).format("YYYY-MM-DD hh:mm:ss a")
            for (var i = 0; i < that.tableData.length; i++) {
              if (that.tableData[i].distributerId === that.distrubuterInfo.distributerPid) {
                that.distrubuterInfo.distributerPid = that.tableData[i].distributerName
              }
            }
            that.areaGet()
          }).catch(function (error) {
            console.log(error)
          })
        }
      }
    }
  }
</script>
