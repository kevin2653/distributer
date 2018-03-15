<template >
  <div >
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div>
            <nav class="nav">
              <div class="nav-left">
                <img src="~assets/number.png" class="img"/>
              </div>
              <div class="nav-right" >
                {{dataOrder.totalOrderNum}}<br/>全年订单总量
              </div>
            </nav>
          </div>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div>
            <nav class="nav">
              <div class="nav-left">
                <img src="~assets/load.png" class="img"/>
              </div>
              <div class="nav-right" >
                {{dataOrder.unpaidOrderNum}}<br/>待付款订单数
              </div>
            </nav>
          </div>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div>
            <nav class="nav">
              <div class="nav-left">
                <img src="~assets/success (1).png" class="img"/>
              </div>
              <div class="nav-right" >
                {{dataOrder.paidOrderNum}}<br/>已付款订单数
              </div>
            </nav>
          </div>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div>
            <nav class="nav">
              <div class="nav-left">
                <img src="~assets/success.png" class="img"/>
              </div>
              <div class="nav-right" >
                {{dataOrder.finishedNum}}<br/>已完成订单数
              </div>
            </nav>
          </div>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div>
            <nav class="nav">
              <div class="nav-left">
                <img src="~assets/NewBI-money.png" class="img"/>
              </div>
              <div class="nav-right">
                {{dataAmount.totalAmount}}<br/>已结算佣金
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
    <hr>
    <div>
      <h4 class="title">订单概况</h4>
      <h5 class="subtitle">标准线路订单</h5>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <h6 class="subtitle">订单量</h6>
            <div  v-cloak class="block">
              <chartist class="lines-bars" :type="'Line'" :data="linesStandData" :options="linesOptions"></chartist>
              <p>订单量</p>
            </div>
          </article>
        </div>
      </div>
      <h5 class="subtitle">定制线路订单</h5>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <h6 class="subtitle">订单量</h6>
            <div  v-cloak class="block">
              <chartist class="lines-bars" :type="'Line'" :data="linesMadeData" :options="linesOptions"></chartist>
              <!--<chartist class="lines-bars" :type="'Line'" :data="madeAreaData" :options="lineAreaOptions" ></chartist>-->
              <p>订单量</p>
            </div>
          </article>
        </div>
      </div>
      <h5 class="subtitle">签证线路订单</h5>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <h6 class="subtitle">订单量</h6>
            <div class="block">
              <chartist class="lines-bars" :type="'Line'" :data="linesVisaData" :options="linesOptions"></chartist>
              <!--<chartist class="lines-bars" :type="'Line'" :data="visaAreaData" :options="lineAreaOptions"></chartist>-->
              <p>订单量</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Chartist from 'vue-bulma-chartist'
  import global from '../global'
  import axios from 'axios'
  export default {
    components: {
      Chartist,
      axios,
      global
    },
    data () {
      console.log('function data () start Run!')
      return {
        year: '',
        /** 头部信息 */
        authorization: '',
        standSeries: [[]],
        standLabels: [],
        madeSeries: [[]],
        madeLabels: [],
        visaSeries: [[]],
        visaLabels: [],
        linesOptions: {
          fullWidth: true,
          showArea: true,
          chartPadding: {
            right: 40
          }
        },
        // 接收订单数据
        dataOrder: {},
        dataMonth: {},
        dataNum: {},
        // 接收佣金数据
        dataAmount: {}
      }
    },
    computed: {
      linesStandData () {
        return {
          labels: this.standLabels,
          series: this.standSeries
        }
      },
      linesMadeData () {
        return {
          labels: this.madeLabels,
          series: this.madeSeries
        }
      },
      linesVisaData () {
        return {
          labels: this.visaLabels,
          series: this.visaSeries
        }
      }
    },
    beforeCreate: function () {
    },
    created: function () {
      var date = new Date()
      var year = date.getFullYear()
      this.year = year
    },
    beforeMount: function () {},
    mounted: function () {
      if (this.getCookie('sysManagerName') !== '' && this.getCookie('admin_token') !== '') {
        this.getData()
        this.getAmount()
      } else {
        this.$router.push({path: '/login'})
      }
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
      getData () {
        var that = this
        axios.get(global.API + 'distrbuter/admin/order/preview/' + that.year, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Sys ' + that.getCookie('authorization')
          }
        }).then((response) => {
//          console.log('全年订单数')
//          console.log(response.data)
          that.dataOrder = response.data
          // 按照订单类型分别将订单添加到数组中
          for (var i = 0; i < response.data.typeList.length; i++) {
            if (response.data.typeList[i].type === 1) {
              for (var j = 0; j < response.data.typeList[i].month.length; j++) {
                that.standLabels.push(response.data.typeList[i].month[j])
                that.standSeries[0].push(response.data.typeList[i].orderNum[j])
              }
            } else if (response.data.typeList[i].type === 100) {
              for (var k = 0; k < response.data.typeList[i].month.length; k++) {
                that.madeLabels.push(response.data.typeList[i].month[k])
                that.madeSeries[0].push(response.data.typeList[i].orderNum[k])
              }
            } else if (response.data.typeList[i].type === 8) {
              for (var m = 0; m < response.data.typeList[i].month.length; m++) {
                that.visaLabels.push(response.data.typeList[i].month[m])
                that.visaSeries[0].push(response.data.typeList[i].orderNum[m])
              }
            }
          }
//          console.log(that.standLabels)
//          console.log(that.standSeries[0])
        }).catch(function (error) {
          console.log(error)
        })
      },
      getAmount () {
        var that = this
        axios.post('/api/commissionDetails/calculateAmount', {settlementYear: that.year}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.dataAmount = response.data
          that.dataAmount.totalAmount = that.dataAmount.totalAmount / 100
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}
.lines-bars {
  height: 30rem;
}
 .img{
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 1.5rem;
   margin-left: 1rem;
 }
  .span{
    margin-right: 15rem;
  }
  .nav-right{
    margin-right: 2rem;
    margin-top: 0.5rem;
  }
[v-cloak] {
  display: none;
}
</style>
