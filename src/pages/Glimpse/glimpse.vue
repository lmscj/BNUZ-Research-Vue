<template>
  <div class="glimpse_container">
    <div class="search-group">
      <el-input placeholder="请输入内容" v-model="title"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <div class="glimpse_wrap">
      <el-row :gutter="48">
        <el-col :span="8" v-for="glimpse in glimpseList" :key="glimpse.uid">
          <el-card :body-style="{ padding: '0px'}" shadow="hover" @click="seeGlimpse">
            <div class="card" style="overflow: hidden;position: relative;">
              <img v-lazy="glimpse.fileList[0].url" :key="glimpse.uid" class="image" />
              <div class="info">
                <span>
                  <i class="el-icon-user"></i>
                  {{glimpse.uid}}
                </span>
                <div class="info-icon" style="float:right;margin-right:20px">
                  <span>
                    <i class="el-icon-download"></i>
                  </span>
                  <span>
                    <i class="el-icon-star-off"></i>
                  </span>
                  <span>
                    <i class="el-icon-plus"></i>
                  </span>
                </div>
                <!-- <div class="bottom clearfix">
                <span><time class="time">{{glimpse.createTime}}</time></span>
                <span style="float:right;padding-right:12px"><i class="el-icon-view"/>{{glimpse.viewCount}}</span>
                </div>-->
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="display: flex;justify-content: center;margin-top: 20px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="limit"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "glimpse",
  data() {
    return {
      glimpseList: [],
      title: "",
      limit: 18,
      total: 0,
      page: 1,
    };
  },
  methods: {
    async getGlimpseList() {
      const { data } = await this.$http.get("/api/glimpseList", {
        limit: this.limit,
        page: this.page,
      });
      const { total, glimpses } = data;

      this.glimpseList = glimpses;
      this.total = total;
      // this.pages = Math.floor(this.glimpseList.length / this.limit);
    },
    async search() {},
    async handleSizeChange(limit) {
      this.limit = limit;
      // await this.getGlimpseList()
    },
    async handleCurrentChange(page) {
      this.page = page;
      await this.getGlimpseList();
    },
    async seeGlimpse() {

    }
  },
  mounted() {
    this.getGlimpseList();
  },
};
</script>
<style scoped lang="scss">
.search-group {
  display: flex;
  width: 50%;
  margin: 0 auto;
}
.glimpse {
  &_container {
    width: 70%;
    margin: 40px auto;
  }
  &_wrap {
    cursor: pointer;
  }
}
.el-card {
  font-family: "Raleway";
  margin-top: 50px;
}

.info {
  background: #333;
  color: #fff;
  padding: 10px;
  font-size: 14px;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: none;
  -moz-opacity: 0.8;
  opacity: 0.8;
}
.info .info-icon span {
  margin-right: 10px;
}


.image {
  width: 100%;
  height: 280px;
  display: block;
  transition: all 0.5s ease-in-out;
}

.image:hover {
  transform: scale(1.2);
}
.card:hover .info {
  display: inline-block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>