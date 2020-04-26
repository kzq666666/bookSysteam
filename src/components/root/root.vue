<template>
  <div id="root">
    <Header></Header>
    <div class="left" @click="changeColor">
      <div class="name">
        {{ name }}
      </div>
      <div class="allBook active">
        图书预览
      </div>
      <div class="addBook">添加图书</div>
      <div class="allBorrow">借阅记录</div>
      <div class="logout" @click="logOut">退出</div>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import header from "../header";

export default {
  data() {
    return {
      name: "admin",
      isClick:null
    };
  },
  methods: {
    changeColor(e) {
      let tempCN = e.target.classList;
      if (tempCN[0] !== "name" && tempCN[0]!== "left" && tempCN[0]!== "logout") {
        if (this.isClick) {
          document
            .getElementsByClassName(this.isClick)[0]
            .classList.remove("active");
        }
        this.isClick = tempCN[0];
        document
          .getElementsByClassName(this.isClick)[0]
          .classList.add("active");
        switch (this.isClick) {
          case "allBook":
            this.$router.push("/root/books");
            break;
          case "addBook":
            this.$router.push("/root/addBook");
            break;
          case "allBorrow":
            this.$router.push("/root/allBorrow");
            break;
            //case "setting":
            //this.$router.push("/root/setting");
            break;
        }
      }
    },
    logOut(){
      localStorage.removeItem('Authorization');
      this.$router.push('/');
    },
  },
  created() {
    this.$router.push('/root/books');
    this.isClick = "allBook"
  },
  components: {
    Header: header
  }
};
</script>

<style>
#root {
  width: 100%;
  height: 100%;
}
</style>
