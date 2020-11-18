<template>
  <div style="padding-top: 45px;">
    <el-row>
      <el-col :span="12" >
        <div class="banner" style="margin-right: 0px;margin-left:20%;width:100%">
          <img src="../../assets/img/logo-banner.jpeg" alt style="height: 480px;min-width:800px" />
        </div>
      </el-col>
      <el-col :span="9" :offset="2">
        <div class="banner shadow">
          <div style="text-align: center;font-size: 28px;font-weight: bold;padding-top:30px">欢迎登录</div>
          <div class="form">
            <el-form
              :model="form"
              :rules="loginRules"
              ref="form"
              style="width: 80%;padding-top:20px;"
            >
              <el-form-item prop="key">
                <el-input placeholder="用户名" v-model="form.key"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  placeholder="密码"
                  v-model="form.password"
                  @keyup.enter.native="dispatchSubmit()"
                  type="password"
                ></el-input>
              </el-form-item>

              <el-form-item prop="confirm">
                <drag-canvans ref="dragCanvans"></drag-canvans>
              </el-form-item>
              <el-form-item style="margin-top:-15px">
                <el-checkbox class="auto-login">记住密码</el-checkbox>
                <div style="float:right">
                  <a href="javascript:;">忘记密码 ?</a>
                </div>
              </el-form-item>
              <div style="margin-top:-10px;display: flex;justify-content: center;font-size:14px">
                <el-button type="primary" style="width: 100%" @click="dispatchSubmit()">登录</el-button>
              </div>
              <div style="margin-top:10px;display: flex;justify-content: center;font-size:14px">
                <el-button style="width: 100%" @click="$router.go(-1);">返回</el-button>
              </div>
              <div>
                <el-divider></el-divider>
              </div>
              <div class="footer">
                <div class="other">其它账号登录：</div>
                <a>
                  <img
                    src="../../assets/img/wechat.png"
                    alt
                    style="height: 16px;width:16px;margin-right:5px;"
                  />
                </a>
                <a>
                  <img
                    src="../../assets/img/qq.png"
                    alt
                    style="height: 16px;width:16px;margin-right:5px;"
                  />
                </a>
                <a>
                  <img src="../../assets/img/weibo.png" alt style="height: 16px;width:16px" />
                </a>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from "@/api/user";
import DragCanvans from "@/components/Captcha/drag";

export default {
  name: "Login",
  components: {
    DragCanvans,
  },
  data() {
    const validateConfirm = (rule, value, callback) => {
      if (!this.$refs.dragCanvans.confirmSuccess) {
        callback(new Error("请拖动滑块完成验证！"));
      } else {
        callback();
      }
    };
    return {
      form: {
        key: "",
        password: "",

        // code: "",
        // loginStatus : false
      },
      dragShow : false,
      // identifyCode: "",
      // identifyCodes: "1234567890",
      loginRules: {
        key: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirm: [{ validator: validateConfirm, trigger: "blur" }],
      },
    };
  },
  // created() {
  //   this.refreshCode();
  // },
  // watch: {
  //   identifyCode(v) {
  //     this.loginStatus && (this.loginForm.code = v);
  //   },
  // },
  methods: {
    login() {
      const loginInfo = {
        key: this.form.key,
        password: this.form.password,
        remember: true,
      };
      login(loginInfo).then((res) => {
        localStorage.setItem("id", res.id);
        this.$router.push({ path: "/" });
      });
    },
    dispatchSubmit() {
      if (!this.$refs.dragCanvans.confirmSuccess) {
        this.$message({
          showClose: true,
          message: `   请先完成滑动验证！`,
          type: "warring",
          isSingle: true,
        });
        this.refresh = false;
        this.$nextTick(() => {
          this.refresh = true;
        });
        // this.$refs.dragCanvans.refreshDrag()
        return false;
      } else {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.login();
          } else {
            this.$message({
              showClose: true,
              message: `   您的用户账号密码有误，请重新输入`,
              type: "danger",
              isSingle: true,
            });
            this.refresh = false;
            this.$nextTick(() => {
              this.refresh = true;
            });
            // this.$refs.dragCanvans.refreshDrag()
            return false;
          }
        });
      }
    },
    // randomNum(min, max) {
    //   return Math.floor(Math.random() * (max - min) + min);
    // },
    // refreshCode() {
    //   this.identifyCode = "";
    //   this.makeCode(this.identifyCodes, 4);
    // },
    // makeCode(o, l) {
    //   for (let i = 0; i < l; i++) {
    //     this.identifyCode += this.identifyCodes[
    //       this.randomNum(0, this.identifyCodes.length)
    //     ];
    //   }
    // },
  },
};
</script>

<style scoped>
.banner {
  margin-left: 150px;
  height: 480px;
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
.register {
  padding: 1px 10px 0;
  border-right: 1px solid #ccc;
}
a {
  text-decoration: none;
}


.auto-login {
  position: absolute;
  top: 0px;
  left: 2px;
}
.other {
  width: auto;
  color: #bbb;
  font-size: 12px;
  cursor: default;
}
.login-code {
  cursor: pointer;
}
.footer {
  display: flex;
  flex-direction: row;
  margin-top: -10px;
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
