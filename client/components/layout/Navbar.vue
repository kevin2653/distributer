<template>
  <section class="hero is-bold app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }">
    <div class="hero-head">
      <nav class="nav">
        <div class="nav-left">
          <a class="nav-item hero-brand" href="/">
            <img src="~assets/levelLog.png" :alt="pkginfo.description" style="width: 15rem">
            <!--<tooltip :label="'v' + pkginfo.version" placement="right" type="success" size="small" :no-animate="true" :always="true" :rounded="true">-->
            <div class="is-hidden-mobile" style="margin-top: 2rem;margin-left: 2rem">
              <span><h1>环球悦旅会代理商管理系统</h1></span>
            </div>
            <!--</tooltip>-->
          </a>
          <a class="nav-item is-hidden-tablet" @click="toggleSidebar({opened: !sidebar.opened})">
            <i class="fa fa-bars" aria-hidden="true" v-show="!sidebar.hidden"></i>
          </a>
        </div>
        <!--<div class="nav-center">-->

        <!--</div>-->
        <div class="nav-right is-flex">
          <!--<div class="r-left">-->
          <img src="~assets/account.png" class="img"/>
          <span>&nbsp;&nbsp;</span>
          <span class="span">{{systemMangerName}}</span>
          <!--</div>-->
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <img src="~assets/exit.png" class="img"/>
          <span>&nbsp;&nbsp;</span>
          <a class="span"><span  @click="logout">退出</span></a>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import Tooltip from 'vue-bulma-tooltip'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
export default {

  components: {
    Tooltip,
    axios
  },
  data () {
    return {
      systemMangerName: ''
    }
  },
  props: {
    show: Boolean
  },

  computed: mapGetters({
    pkginfo: 'pkg',
    sidebar: 'sidebar'
  }),
  created: function () {
    var name = this.getCookie('sysManagerName')
    this.systemMangerName = decodeURIComponent(name)
//    console.log('运营人员登陆')
    console.log(this.systemMangerName)
  },
  updated: function () {
  },
  methods: {
    ...mapActions([
      'toggleSidebar'
    ]),
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
    logout () {
      var that = this
      axios.get('/api/systemManager/loginOut', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'hero'
        }
      }).then(function (response) {
        console.log('退出登陆返回结果')
        console.log(response.data)
//        if (response.data.code === 'OK') {
        that.$router.push({path: '/login'})
//        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/variables';

.app-navbar {
  position: fixed;
  min-width: 100%;
  z-index: 1024;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

  .container {
    margin: auto 10px;
  }

  .nav-right {
    align-items: stretch;
    align-items: stretch;
    flex: 1;
    justify-content: flex-end;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
    .img{
      width: 2.5rem;
      height: 2.5rem;
      margin-top: 1rem;
    }
    .span{
      margin-top: 1.5rem;
    }
  }
}

.hero-brand {
  .text{
    float: right;
  }
}
</style>
