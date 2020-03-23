<template>
  <div class="root">
    <div class="top-bar">
      <div class="title">系统管理后台</div>
    </div>
    <div :class="classObj" class="app-wrapper">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar />
        </div>
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
.root {
  position: relative;
  height: 100%;
  .top-bar {
    position: absolute;
    top: 0;
    height: 55px;
    width: 100%;
    background: #ed6e00;
    .title {
      display: inline-block;
      width: 170px;
      height: 35px;
      margin: 10px 0;
      line-height: 35px;
      color: #fff;
      margin-left: 40px;
      font-size: 25px;
      border-right: 2px solid #fff;
    }
  }
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: calc(100% - 55px);
    width: 100%;
    top: 55px;
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
    .sidebar-container {
      top: 55px;
      height: calc(100% - 55px);
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }

  .mobile .fixed-header {
    width: 100%;
  }
}
</style>
