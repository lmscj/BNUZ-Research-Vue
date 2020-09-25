<template>
  <el-menu
    :default-active="activeMenu"
    class="sider-nav__container"
    :default-openeds="['1', '2']"
    theme=dark
    text-color="#fff"
    background-color="#202329"
    router
  >
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-user-solid"></i>账号中心</template>
        <el-menu-item-group>
        <el-menu-item index="/normal/dashboard"><i class="el-icon-setting"></i>基本资料</el-menu-item>
        <el-menu-item index="/normal/reset-pwd"><i class="el-icon-key"></i>修改密码</el-menu-item>
        <el-menu-item index="/normal/reset-phone"><i class="el-icon-mobile-phone"></i>修改手机号</el-menu-item>
        <el-menu-item index="/normal/address"><i class="el-icon-map-location"></i>修改联系地址</el-menu-item>
        <el-menu-item index="/normal/settled"><i class="el-icon-thumb"></i>入驻审核</el-menu-item>
        
        <el-menu-item index="1-5"><i class="el-icon-star-off"></i>第三方账号绑定</el-menu-item>

        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-opportunity"></i>课程中心</template>
        <el-menu-item-group>
        <el-menu-item index="/normal/pre-entry"><i class="el-icon-notebook-1"></i>预报名课程</el-menu-item>
        <el-menu-item index="/normal/alr-entry"><i class="el-icon-notebook-2"></i>已报名课程</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

</template>


<script>
export default {
  name:"SiderNav",
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
  }
}
</script>
<style lang="scss" scoped>
.el-menu {
  height : 100%;
  border: 0 !important;
}

</style>