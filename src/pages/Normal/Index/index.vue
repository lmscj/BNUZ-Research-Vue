<template>
  <el-container>
    <el-header>
      <my-header />
    </el-header>
    <el-container>
      <el-aside width="201px">
        <sider-nav />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import appHeader from '../../../components/header-component/index.vue';
import SiderNav from "@/components/Normal/SiderNav";
export default {
  components: { MyHeader: appHeader,SiderNav },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  color: #333;
  line-height: 60px;
}

.el-footer {
  padding: 0;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  left: 0;
  background: #202329;
  overflow-x: hidden;
  height: calc(100vh - 60px);
  height : 100%;
  
  text-align: left;
  line-height: 200px;

  &::-webkit-scrollbar {
    width: 15px;
    height: 15px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background: #d7d7d7;
    // border-radius: 20px;
  }
}

.el-main {
  margin-left: 200px;
  // height: calc(100vh - 120px);
  background-color: #f7f7f7;
  color: #333;
  text-align: left;
}

.el-container{
  background: white;
}
</style>