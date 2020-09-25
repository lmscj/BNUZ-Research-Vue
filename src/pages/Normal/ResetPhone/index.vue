<template>
  <div class="reset-phone_container">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-top:2px"
    >
      <el-breadcrumb-item :to="{ path: '/normal' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号中心</el-breadcrumb-item>
      <el-breadcrumb-item>修改手机号</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="reset-phone_wrap">
      <div class="reset-phone_form">
        <el-form
          label-width="100px"
          :model="form"
          ref="form"
          :rules="rules"
        >
          <el-form-item
            label="原手机号码"
            prop="current_phone"
          >
            <el-input
              v-model="form.current_phone"
              style="width:45% ; margin-bottom : 20px"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="新手机号码"
            prop="phone"
          >
            <el-input
              v-model="form.phone"
              style="width:45% ; margin-bottom : 20px"
            ></el-input>
            
          </el-form-item>
          <el-form-item
            label="短信验证码"
            prop="code"
          >
            <el-input
              v-model="form.code"
              style="width:45% ; margin-bottom : 20px"
            ><el-button slot="append" type="primary">点击获取验证码</el-button></el-input>
          </el-form-item>
          <el-form-item style="margin-left:8%">
            <el-button
              style="width : 100px"
              type="primary"
              @click="onSubmit"
            >提交</el-button>
            <el-button
              style="margin-left:20px ; width : 100px"
              @click="handleCancel()"
            >取消</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>

  </div>

</template>

<script>



export default {
  name: "ResetPhone",
  data() {
    let checkPhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      console.log(reg.test(value));
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('手机格式有误'));
      }
    };   
    return {
      form:{
      },
      rules: {
        password : [
          {required : true , message : "密码不能为空" , trigger: ["blur","change"] },
        ],
        phone : [
          { required: true, message: "电话不能为空", trigger: ["blur","change"] },
          {validator : checkPhone , trigger : ['blur' , 'change']},

        ],
        code : [
          {required : true , message : "短信验证码不能为空" , trigger : ["blur",'change']}
        ]
      } 
     
    };
  },
  async mounted() {
      await this.getPhone();
  },


  methods: {
    async handleCancel(){
      window.location.reload();
    },
    async getPhone() {  
       this.form.id = this.$store.getters.userInfo.id;
        console.log(this.form.id);
        await this.$http.get('/api/accounts/' + this.form.id).then(res => {
            console.log(res.data)
            this.form.current_phone = res.data.phone
            console.log(this.form.current_phone)
        })
    },
  }
};
</script>
<style lang="scss" scoped>
.reset-phone {
  &__header {
    display: flex;
    width: 100%;
    padding-bottom: 13px;
    background: #fff;
  }
  &_wrap {
    margin-top: 20px;
    padding: 10px;
    background: #fff;
  }
  &_form {
    margin-top: 8%;
    margin-left: 25%;
    margin-bottom: 10%;
  }

  
}
</style>