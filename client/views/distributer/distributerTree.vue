<template>
  <div>
    <div>
      <div class="table_container">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-input v-model="Fname" @change="FinputChange" placeholder="输入一级代理商名称"></el-input>
              <el-table :data="FtableData" border :show-header="false" @row-click="rowClick" height="350" style="width: 100%">
                <el-table-column prop="distributerName" align="center">
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-input v-model="Sname" @change="SinputChange" placeholder="输入二级代理商名称"></el-input>
              <el-table :data="StableData" :show-header="false" @row-click="rowClick" border height="350" style="width: 100%" >
                <el-table-column prop="distributerName" align="center">
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-input v-model="Tname" @change="TinputChange" placeholder="输入三级代理商名称"></el-input>
              <el-table :data="TtableData" :show-header="false" border height="350" style="width: 100%">
                <el-table-column prop="distributerName" align="center">
                </el-table-column>
              </el-table>
           </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    components: {
      axios
    },
    data () {
      return {
        FtableData: [],
        StableData: [],
        TtableData: [],
        Fname: '',
        Sname: '',
        Tname: ''
      }
    },
    created: function () {
      this.firstData()
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
      /** input改变，模糊查询一级代理商 */
      FinputChange () {
        var that = this
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {depath: 1, distributerName: that.Fname}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          if (response.data.listDto.length > 0) {
            that.FtableData = response.data.listDto
          } else {
            that.FtableData = [{}]
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** input改变，模糊查询二级代理商 */
      SinputChange () {
        var that = this
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {depath: 2, distributerName: that.Sname}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          if (response.data.listDto.length > 0) {
            that.StableData = response.data.listDto
          } else {
            that.StableData = [{}]
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** input改变，模糊查询三级代理商 */
      TinputChange () {
        var that = this
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {depath: 3, distributerName: that.Tname}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          if (response.data.listDto.length > 0) {
            that.TtableData = response.data.listDto
          } else {
            that.TtableData = [{}]
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 显示下级代理商 */
      rowClick (row) {
        console.log('row id')
        console.log(row.distributerId)
        console.log('row 深度')
        console.log(row.depath)
        var that = this
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {distributerPid: row.distributerId, depath: (row.depath + 1)}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          console.log('长度')
          console.log(response.data.listDto.length)
          if (response.data.listDto.length > 0) {
            if (row.depath === 1) {
              that.StableData = response.data.listDto
            } else if (row.depath === 2) {
              that.TtableData = response.data.listDto
            }
          } else if (response.data.listDto.length === 0) {
            if (row.depath === 1) {
              that.StableData = []
              that.TtableData = []
            } else if (row.depath === 2) {
              that.TtableData = []
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      firstData: function (event) {
        var that = this
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {depath: 1}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.FtableData = response.data.listDto
          console.log(response)
        }).catch(function (error) {
          console.log(error)
        })
//        axios.get('http://localhost:8080/yuelvhui_distributer/distributerInfo/queryAllDistributerByJoin?depath=2', {
//          headers: {
//            'Content-Type': 'application/x-www-form-urlencoded'
//          }
//        }).then(function (response) {
//          that.StableData = response.data.listDto
//          console.log(response)
//        }).catch(function (error) {
//          console.log(error)
//        })
      }
    }
  }
</script>
<style>
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: white;
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
