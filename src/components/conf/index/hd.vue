<template>
  <div class="clearfix mod-hd">
    <div class="mod-shadow"></div>
    <el-col :span="24" class="mod-header">
      <!-- <el-col class="logo">
        <div :class="collapsed?'logo-collapse-width':'logo-inner'">{{collapsed?'':sysName}}</div>
      </el-col> -->
      <el-col :span="10" class="mod-hor-nav" v-if="!hiddenMenu">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :name="item.path" v-for="item in routes" :key="item.path">
            <span slot="label">
              <i class="iconfont" v-html="item.iconCls" v-if="item.iconCls"></i>
              {{ item.name }}
            </span>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="2" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont">&#xe798;</i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
  </div>
</template>
<script>
import util from '@/assets/js/util'
// import config from "@/config.js";
export default {
  computed: {
    routes: function() {
      return this.$router.options.routes.filter(function(item) {
        return item.children;
      });
    }
  },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      collapsed: false,
      sysName: "coin-profit",
      sysUserAvatar: "",
      activeName: "/" + util.pathname(),
      sysUserName: "admin",
      currentShopName: "",
      //临时代码
      dialogVisible: false,
      permissionList: [],
      shopType: "",
      oldShop: false //是否有老店铺后台权限
    };
  },
  methods: {
    modifyPwd() {
      this.$router.push({ name: "找回密码" });
    },
    handleClick(tab, event) {
      this.$router.push(tab.name);
      this.bus.$emit("hd/navClick", { parentPath: tab.name });
    },
    logout() {
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    //临时代码
    goOtherSystem() {
      var url = this.$apiUrl.goOldSystemUrl;
      this.$ajax.get(url).then(res => {
        if (res.error == 0) {
          if (res.data.shopInfo) {
            //如果有权限直接跳转
            // window.location.href = config.exchangeProduct + "rest/index";
          } else {
            //无权限弹出对话if
            // if(res.data.shopInfos&&res.data.shopInfos.length>0){
            // 	this.dialogVisible=true;
            // 	this.permissionList=res.data.shopInfos;
            // 	this.shopType=res.data.shopInfos[0].id
            // }else{
            // 	this.$message({
            // 		type:'warning',
            // 		message:'无店铺后台权限！'
            // 	})
            // }
            this.$message({
              type: "warning",
              message: "无店铺后台权限！"
            });
          }
        }
      });
    },
    goShop() {
      //获取选中的店铺名
      for (var i = 0; i < this.permissionList.length; i++) {
        var item = this.permissionList[i];
        if (this.shopType == item.id) {
          localStorage.setItem("header-shopName", item.shopName);

          break;
        }
      }
      var url = this.$apiUrl.selectShopUrl + "?shopId=" + this.shopType;

      this.$ajax.get(url).then(res => {
        if (res.error == 0) {
          window.location.href = "http://shopmanage.yunhou.com/rest/index";
        }
      });
    }
  },
  props: ["bus", "hiddenMenu", "isHide"],
  mounted() {
    let self = this;
    // 如果刷新页面，需要重新获取当前店铺
    this.currentShopName = localStorage.getItem("header-shopName");
    this.oldShop = localStorage.getItem("oldShop") ? true : false;
    this.bus.$on("goList", function(obj) {
      self.handleClick(obj);
    });
  },
  watch: {
    $route() {
      this.activeName = "/" + util.pathname();
    }
  }
};
</script>
<style scoped lang="scss">
.mod-shadow {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  //box-shadow: 0 5px 18px rgba(0, 0, 0, 0.69);
  height: 1px;
  overflow: hidden;
  z-index: 1;
  background: #dfdfdf;
}
.mod-header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  color: #fff;
  position: relative;
  //z-index: 3000;
  .userinfo {
    span.shopName {
      color: #999;
      text-align: right;
      height: 20px;
      vertical-align: middle;
      line-height: 20px;
      display: inline-block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    text-align: right;
    padding-right: 20px;
    float: right;
    .userinfo-inner {
      cursor: pointer;
      color: #333;
      line-height: normal;
      font-size: 14px;
      i {
        margin: 8px 0px 13px 10px;
        float: right;
        font-size: 40px;
      }
    }
  }
  .logo {
    width: 204px;
    height: 60px;
    font-size: 20px;
    // padding-left: 18px;
    border-color: rgba(238, 241, 146, 0.3);
    border-right-width: 1px;
    border-right-style: solid;
    // background:url('http://img1.bbgstatic.com/15dba8305fb_bc_5df8f270dd506fc8d0d3c992de68a85f_7x60.jpeg') repeat-x;
    box-shadow: 5px 0 20px #ccc;
    .logo-inner {
      padding-left: 38px;
      background-color: #1e1e1e;
      // background:url('http://img1.bbgstatic.com/15dba9e4c57_bc_3f28329c45d4f8f8b4d8a0f7de3b3bac_28x26.png') 0px 50% no-repeat;
    }
  }
}

.permission-dailog li {
  height: 30px;
  line-height: 30px;
  text-align: left;
  width: 50%;
  display: inline-block;
}
</style>
<style lang="scss">
.mod-hor-nav {
  padding-left: 40px;
  .el-tabs__item {
    padding: 0 12px;
  }
}
</style>
