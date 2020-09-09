<template>
  <el-menu
    :default-active="$route.path"
    class="sider-nav__container"
    :default-openeds="['1', '2']"
    :unique-opened="true"
    theme=dark
    background-color="#F6F6F8"
    router
  >
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-user-solid"></i>账号中心</template>
        <el-menu-item-group>
        <el-menu-item index="/person/dashboard"><i class="el-icon-setting"></i>基本资料</el-menu-item>
        <el-menu-item index="/person/reset-pwd"><i class="el-icon-key"></i>修改密码</el-menu-item>
        <el-menu-item index="/person/reset-phone"><i class="el-icon-mobile-phone"></i>修改手机号</el-menu-item>
        <el-menu-item index="/person/address"><i class="el-icon-map-location"></i>修改联系地址</el-menu-item>
        <el-menu-item index="/person/settled"><i class="el-icon-thumb"></i>入驻审核</el-menu-item>
        
        <el-menu-item index="1-5"><i class="el-icon-star-off"></i>第三方账号绑定</el-menu-item>

        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-opportunity"></i>课程中心</template>
        <el-menu-item-group>
        <el-menu-item index="/person/pre-entry"><i class="el-icon-notebook-1"></i>预报名课程</el-menu-item>
        <el-menu-item index="/person/alr-entry"><i class="el-icon-notebook-2"></i>已报名课程</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

</template>


<script>
export default {
    name:"SiderNav"
}
</script>
<style lang="scss" scoped>
.e1-menu {
    border: 0 !important;
}
.logo-header {
    color : #409EFF;
    height : 50px;
    line-height:50px;
}
</style>