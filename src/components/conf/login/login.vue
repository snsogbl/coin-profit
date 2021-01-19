<template>
  <div class="login-page" :style="{ height: screenHeight +'px' }">
    <video src="../../../assets/images/bgvideo.mp4" autoplay="autoplay" muted type="video/mp4" loop="loop"></video>
    <div class="login-content">
      <div style="fontSize:24px;">登录</div>
      <div style="height:50px"></div>
      <div>
        <el-input v-model="userName" placeholder="请输入内容">
          <template slot="prepend">
            <div style="width:50px">用户名：</div>
          </template>
        </el-input>
      </div>
      <div>
        <el-input v-model="password" type="password" placeholder="请输入内容" @keyup.enter.native="login">
          <template slot="prepend">
            <div style="width:50px">密码：</div>
          </template>
        </el-input>
      </div>
      <button type="button" class="btn-login" @click="login" v-loading.body="loading">登录</button>
    </div>
    <div style="height:200px"></div>
  </div>
</template>
<script>
import md5 from "js-md5";
import { Message } from "element-ui";
export default {
  components: {},
  data() {
    return {
      userName: "",
      password: "",
      screenHeight: "",
      loading: false // 加载动画
    };
  },
  mounted() {
    this.screenHeight = document.documentElement.clientHeight;
  },
  methods: {
    allowLogin: function() {
      if (this.userName && this.password) {
        return true;
      } else {
        return false;
      }
    },

    login: function() {
      this.loading = true;
      var data = {
        userName: this.userName,
        passWord: md5(this.password)
      };
      var that = this;
      this.$ajax.get(this.$apiUrl.loginUrl, data).then(res => {
        that.loading = false;
        if (res.code == 0) {
          sessionStorage.setItem("token", res.data.userToken);
          that.$router.push("memberCenter");
        }
      });
    }
  }
};
</script>
<style scope="scope" lang="scss">
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fff;

  video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .login-content {
    display: flex;
    z-index: 10;
    flex-direction: column;
    align-items: center;
    margin-left: 250px;
    justify-content: center;
    padding: 80px;
    border-radius: 10px;
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 20px 60px 3px rgba(142, 142, 142, 0.5);
  }

  .btn-login {
    width: 320px;
    height: 50px;
    border-radius: 5px;
    background-color: #3dcaf5;
    color: #fff;
    border: 1px solid #3dcaf5;
    margin-top: 50px;
    font-size: 18px;
  }
}
</style>
