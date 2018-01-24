<template>
  <div id="app">
    <nprogress-container></nprogress-container>
    <navbar :show="show"></navbar>
    <sidebar :show="show"></sidebar>
    <app-main></app-main>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import { Navbar, Sidebar, AppMain, FooterBar } from 'components/layout/'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Navbar,
    Sidebar,
    AppMain,
    FooterBar,
    NprogressContainer
  },
  data () {
    return {
      show: true
    }
  },
  watch: {
    '$route' () {
//      console.log(this.$route.name)
      // 不等于登录页面的时候为true
//      window.addEventlistener('beforeunload', F5)
//      console.log('登陆界面STRAT')
      if (this.$route.path !== '/login') {
        this.show = true
      } else {
        this.show = false
      }
//      this.show = (this.$route.path !== '/login')
//      console.log('登陆界面END')
    }
  },
  mounted: function () {
    var that = this
//    console.log('监听界面刷新')
    window.onload = function () {
//      console.log('监听界面刷新111111')
      if (that.$route.path === '/login') {
        that.show = false
//        console.log('监听界面刷新22222')
      } else {
//        console.log('监听界面刷新33333')
        that.show = true
      }
    }
  },
  beforeMount () {
    const { body } = document
    const WIDTH = 768
    const RATIO = 3

    const handler = () => {
      if (!document.hidden) {
        let rect = body.getBoundingClientRect()
        let isMobile = rect.width - RATIO < WIDTH
        this.toggleDevice(isMobile ? 'mobile' : 'other')
        this.toggleSidebar({
          opened: !isMobile
        })
      }
    }

    document.addEventListener('visibilitychange', handler)
    window.addEventListener('DOMContentLoaded', handler)
    window.addEventListener('resize', handler)
  },

  computed: mapGetters({
    sidebar: 'sidebar'
  }),

  methods: mapActions([
    'toggleDevice',
    'toggleSidebar'
  ])
}
</script>

<style lang="scss">
@import '~animate.css';
.animated {
  animation-duration: .377s;
}

@import '~bulma';

@import '~wysiwyg.css/wysiwyg.sass';

$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';

html {
  background-color: whitesmoke;
}

.nprogress-container {
  position: fixed !important;
  width: 100%;
  height: 50px;
  z-index: 2048;
  pointer-events: none;

  #nprogress {
    $color: #48e79a;

    .bar {
      background: $color;
    }
    .peg {
      box-shadow: 0 0 10px $color, 0 0 5px $color;
    }

    .spinner-icon {
      border-top-color: $color;
      border-left-color: $color;
    }
  }
}
</style>
