<template>
  <div align="center" style="min-height: 1150px">
    <div style="width:90%" align="left">
      <br>
      <div style="width: 95%">
        <el-form label-width="200px">
          <div>
            <el-form-item label="一级运营审核人员设置"></el-form-item>
            <el-form-item>
              一级运营审核人员为各代理商运营负责人
            </el-form-item>
          </div>
          <hr>
          <div>
            <el-form-item label="二级运营审核人员设置"></el-form-item>
            <el-form-item>
              <el-radio-group  v-model="settleAuditForm.radio2">
                <el-radio v-for="manager in selectManOp.managerOp" :label=manager.managerId border>{{manager.managerName}}</el-radio>
                <!--<el-radio :label="9">备选项</el-radio>-->
              </el-radio-group>
            </el-form-item>
          </div>
          <hr>
          <div>
            <el-form-item label="三级运营审核人员设置"></el-form-item>
            <el-form-item>
              <el-radio-group  v-model="settleAuditForm.radio3">
                <el-radio v-for="manager in selectManOp.managerOp" :label=manager.managerId border>{{manager.managerName}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <hr>
          <div>
            <el-form-item label="四级运营审核人员设置"></el-form-item>
            <el-form-item>
              <el-radio-group  v-model="settleAuditForm.radio4">
                <el-radio v-for="manager in selectManOp.managerOp" :label=manager.managerId border>{{manager.managerName}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div align="center">
            <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!--设置成功提示框-->
    <el-dialog :visible.sync="setAuditVisible" width="30%" :modal-append-to-body="false" center>
      <div align="center">
        <i class="el-icon-success"></i><br>
        <span>
          结算审核流设置成功！<br>
          5s之后跳转至代理商结算管理页
        </span>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="AuditVisible" width="30%" :modal-append-to-body="false" center>
      <div align="center">
        <!--<i class="el-icon-success"></i><br>-->
        <span>
         请选择审核人员
        </span>
      </div>
    </el-dialog>
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
        AuditVisible: false,
        /** 设置成功弹框 */
        setAuditVisible: false,
        /** 运营管理人员 */
        selectManOp: {
          managerOp: [{}]
        },
        settleAuditForm: {
          radio1: 0,
          radio2: 0,
          radio3: 0,
          radio4: 0
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
      /** 定时执行函数 */
      timeMsg () {
        var that = this
        console.log('开始执行定时任务')
        setTimeout(function () {
          console.log('定时任务 Go!')
          that.setAuditVisible = false
          that.$router.push({name: '结算管理'})
        }, 5000)
        console.log('执行定时任务结束')
      },
      /** 保存设置 */
      onSubmit () {
        var that = this
        var auditLevel = []
        var managerId = []
        if (that.settleAuditForm.radio2 !== 0) {
          auditLevel.push(2)
          managerId.push(that.settleAuditForm.radio2)
        }
        if (that.settleAuditForm.radio3 !== 0) {
          auditLevel.push(3)
          managerId.push(that.settleAuditForm.radio3)
        }
        if (that.settleAuditForm.radio4 !== 0) {
          auditLevel.push(4)
          managerId.push(that.settleAuditForm.radio4)
        }
//        console.log('审核等级设置')
//        console.log(auditLevel)
//        console.log(managerId)
        if (auditLevel.length < 1 || managerId.length < 1) {
          this.AuditVisible = true
        } else {
          var BODY = {
            auditLevel: auditLevel,
            managerId: managerId
          }
          axios.post('/api/systemManager/updateLevelByPrimaryKey', BODY, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Admin ' + that.getCookie('admin_token')
            }
          }).then(function (response) {
//          console.log('设置审核等级成功')
//          console.log(response.data)
            if (response.data === 'OK') {
              that.setAuditVisible = true
              that.timeMsg()
            }
          }).catch(function (error) {
            console.log(error)
          })
        }
      },
      dataGet: function (event) {
        var that = this
        /** 获取代理商运营人员 */
        axios.get('/api/systemManager/queryAllSystemManagerByJoin', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.selectManOp.managerOp = response.data.systemManagerDTOList
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>
