<template>
  <div style="padding-top: 45px;">
    <el-row>
      <el-col :span="11" :offset="1">
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
              <el-form-item prop="code">
                <el-row :span="24">
                  <el-col :span="16" >
                    <el-input placeholder="请输入验证码" v-model="form.code" type="text"></el-input>
                  </el-col>
                  <el-col :span="8">
                    <div class="login-code" @click="refreshCode">
                      <captcha-canvans :identifyCode="identifyCode" />
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item style="margin-top:-15px">
                <el-checkbox class="auto-login">记住密码</el-checkbox>
                <div style="float:right">
                  <a href="javascript:;" style="padding: 1px 0px 0px 10px">忘记密码 ?</a>
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
import CaptchaCanvans from "@/components/Captcha/index";
export default {
  name: "Login",
  components: {
    CaptchaCanvans,
  },
  data() {
    const validateCode = (rule, value, callback) => {
      if (this.identifyCode !== value) {
        this.form.code = "";
        this.refreshCode();
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      form: {
        key: "",
        password: "",
        code: "",
        loginStatus : false
      },
      identifyCode: "",
      identifyCodes: "1234567890",
      loginRules: {
        key: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code : [{validator: validateCode, trigger: 'blur'}],
      },
    };
  },
  created() {
    this.refreshCode();
  },
  watch: {
    identifyCode(v) {
      this.loginStatus && (this.loginForm.code = v);
    },
  },
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
      this.loginStatus= true
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          this.$message({
            showClose: true,
            message: `   您的用户账号密码或验证码有误，请重新输入`,
            type: "warring",
            isSingle: true,
          });
          return false;
        }
      });
      this.loginStatus = false
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
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
a:link {
  color: blue;
}
a:visited {
  color: blue;
}
a:hover {
  color: rgb(107, 0, 128);
}
a:active {
  color: blue;
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
