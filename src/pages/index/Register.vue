<template>
  <div style="padding-top: 45px">
    <el-row>
      <el-col :span="11" :offset="1">
        <div class="banner" style="margin-right: 0px;margin-left:20%;width:100%">
          <img src="../../assets/img/logo-banner.jpeg" alt style="height: 420px;min-width:800px" />
        </div>
      </el-col>
      <el-col :span="9" :offset="2">
        <div class="banner shadow">
          <div style="text-align: center;font-size: 28px;font-weight: bold;padding-top:30px">欢迎注册</div>
          <div class="form">
            <el-form
              :model="form"
              :rules="registerRules"
              ref="form"
              style="width: 80%;padding: 20px"
            >
              <el-form-item prop="key">
                <el-input placeholder="请输入用户名" v-model="form.key"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" v-model="form.password" type="password" show-password></el-input>
              </el-form-item>
              <el-form-item prop="Repassword">
                <el-input placeholder="请输入确认密码" v-model="form.Repassword" type="password" show-password></el-input>
              </el-form-item>
              <el-form-item style="margin-top:-10px">
                <el-checkbox class="agree"  v-model="form.agreement">
                  我已阅读并同意遵守
                  <a href="javascript:;">法律声明</a> 和
                  <a href="javascript:;">隐私条款</a>
                </el-checkbox>
                    <glimpse-canvans :code="form.code" />
              </el-form-item>
              <div style="display: flex;justify-content: center;font-size:14px;margin-top:-10px">
                <el-button type="primary" style="width: 100%" @click="dispatchSubmit()">注册</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { register, login } from "@/api/user";

export default {
  name: "Register",
  data() {
    var vaildRepassword = (rule, value, callback) => {
      if (value !== this.form.password) {
        return callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        key: "",
        password: "",
        Repassword: "",
        agreement : false,
      },
      registerRules: {
        key: [
          { required: true, message: "请输入用户名", trigger: ["blur","change"] },
          { min: 6, max: 50, message: "长度在6到50之间", trigger: ["blur"] },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: ["blur","change"] },
          { min: 8, max: 32, message: "长度在8到32之间", trigger: ["blur"] },
        ],
        Repassword: [
          { required: true, message: "请输入重复密码", trigger: ["blur","change"] },
          { validator: vaildRepassword, trigger: ["blur"] },
        ],
      },
    };
  },

  methods: {
    register() {
      register({ ...this.form, username: this.form.key }).then(() => {
        this.$message({
          showClose: true,
          message: `注册成功`,
          type: "success",
          isSingle: true,
        });
        const loginInfo = {
          key: this.form.key,
          password: this.form.password,
          remember: true,
        };
        login(loginInfo).then((res) => {
          localStorage.setItem("id", res.id);
          this.$router.push({ path: "/" });
        });
      });
    },
    dispatchSubmit() {
      if(!this.form.agreement){
          this.$message({
            type : 'warning',
            message : "请您先同意打勾我们的相关注册协议！",
            isSingle: true,
            showClose: true
          })
      }
      else{
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.register();
        } else {
          this.$message({
            showClose: true,
            message: `注册信息不符合要求，请重新输入`,
            type: "error",
            isSingle: true,
          });
          return false;
        }
      });        
      }

    },
  },
};
</script>

<style scoped>
.banner {
  margin-left: 150px;
  height: 420px;
  overflow: hidden;
  min-width: 360px;
}
.form {
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  min-width: 360px;
}
.agree {
  padding-top:-20px;
}
a {
  text-decoration: none;
}
a:link {
  color: blue;
}
a:visited {
  color:  blue;
}
a:hover {
  color: green;
}
a:active {
  color: blue;
}
.shadow {
  border-radius: 10px;
  -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
}
</style>
