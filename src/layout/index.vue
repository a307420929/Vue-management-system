<template>
  <div class="root">
    <div class="top-bar">
      <div class="title">系统管理后台</div>
      <div class="right-menu">
        <el-dropdown class="theme-container" @command="handleTheme" trigger="click">
          <span class="el-dropdown-link">
            当前主题色：{{curTheme}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in themeList"
              :key="item.value"
              :command="{value:item.value,label:item.label}"
            >{{item.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>Home</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/a307420929/Vue-management-system">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://www.jianshu.com/p/da271034d409">
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
import { mapGetters } from 'vuex'
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
    ...mapGetters(['avatar']),
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
  data() {
    return {
      curTheme: '红色主题',
      themeList: [
        { value: 'red', label: '红色主题' },
        { value: 'blue', label: '蓝色主题' },
        { value: 'green', label: '绿色主题' }
      ]
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    handleTheme(command) {
      this.curTheme = command.label
      window.document.documentElement.setAttribute('data-theme', command.value)
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
      border-right: px solid #fff;
    }
    .right-menu {
      position: absolute;
      right: 0px;
      top: 0;
      height: 100%;
      line-height: 55px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }
      .theme-container {
        position: absolute;
        top: 0;
        right: 60px;
        width: 200px;
        color: #000;
        .el-dropdown-link {
          cursor: pointer;
        }
        .el-icon-arrow-down {
          font-size: 12px;
        }
      }
      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
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
