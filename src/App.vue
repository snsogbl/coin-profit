<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import CustomRouter from "./router/custom-router.js";

export default {
  components: {},
  methods: {
    initRoute: function() {
      var addRouter = [];
      addRouter = CustomRouter;
      this.$router.options.routes = this.$router.options.routes.concat(
        addRouter
      );
      this.$router.addRoutes(addRouter);
    }
  },
  mounted() {
    this.initRoute();
    // this.$router.push("login");
  }
};
</script>

<style>
</style>
