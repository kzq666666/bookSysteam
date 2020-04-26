<template>
  <div id="register" class="lr">
        <el-form class="rgBox">
            
           
            <h2 class="title">
                <img src="../assets/logo.png" alt="" class="logo">
                南昌大学图书馆管理系统(注册)
            </h2>
            <div>
                <label>用户名：</label>
                <el-input v-model="registerForm.username" placeholder="用户名" size="200px"></el-input>
            </div>
            <div>
                <label>邮箱：</label>
                <el-input type="email" v-model="registerForm.email" placeholder="邮箱" size="200px"></el-input>
            </div>
            <div>
                <label>密码：</label>
                <el-input v-model="registerForm.password" type="password" show-password  placeholder="请输入密码"></el-input>
                
            </div>
            <div>
                <label>确认密码：</label>
                <el-input v-model="registerForm.rePassword" type="password" show-password  placeholder="请再次输入密码"></el-input>
                
            </div>
            <div>
                <el-button type="primary" @click="register" class="bigSizeBt">注册</el-button>
                <el-button @click="goToLogin" class="bigSizeBt">返回</el-button>

            </div>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        registerForm:{
            "username":null,
            "password":null,
            "rePassword":null,
            "email":null
        }
    };
  },
  methods: {
    goToLogin(){
        this.$router.push('/');

    },
    register(){
        if(this.test()){
            this.$http.post('http://139.199.66.15:8003'+'/user/register',this.registerForm).then((res)=>{
                this.$message({
                    type:res.data.code==1?"error":"success",
                    message : res.data.message,
                    duration : 1500
                })
                if(res.data.code == 0){
                    this.$router.push('/');
                }
          
            })
        }
       
    },
    test(){
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        console.log(this.registerForm.username == null)
        if(this.registerForm.username == null){
            this.$message({
                message: '用户名不能为空',
                type: 'error',
                duration : 1500
            })
            return false;
        
        }else if(this.registerForm.email == null){
            this.$message({
                message: '邮箱不能为空',
                type: 'error',
                duration : 1500
            })
            return false;
        }
        if (this.registerForm.email != null && !regEmail.test(this.registerForm.email)) {
            this.$message({
                message: '邮箱格式不正确',
                type: 'error'
            })
            return false;
        }
        return true;
      }
  },
 
  
};
</script>

<style>
    #register label{
        display: inline-block;
        width: 100px;
        text-align: right;
    }

    #register input{
        margin-bottom: -10px;
    }
    .bigSizeBt{
        width: 100px;
    }

    #register .rgBox{
        height: 420px;
    }

</style>
