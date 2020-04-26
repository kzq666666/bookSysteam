<template>
    <div id="login" class="lr"  @keydown="keyDown">
        <el-form class="lgBox rgBox" >
            
            <h2 class="title">
                <img src="../assets/logo.png" alt="" class="logo">
                南昌大学图书馆管理系统
            </h2>
            <div>
                <img src="../assets/login.png" alt="" class="imgL">
                <el-input v-model="loginForm.username" placeholder="请输入用户名" size="200px"></el-input>
            </div>
            <img src="../assets/pwd.png" alt="" class="imgL">
            <el-input v-model="loginForm.password" type="password" show-password  placeholder="请输入密码"></el-input>
            <div class="choiceBox">
                <el-radio-group v-model="loginForm.isRoot">
                    <el-radio :label="0">学生</el-radio>
                    <el-radio :label="1">管理员</el-radio>
                </el-radio-group>
            </div>
            <el-button  type="primary" @click="login">登陆</el-button>
            <el-button @click="register">注册</el-button>
        </el-form>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        data(){
            return{
                loginForm:{
                    username:null,
                    password:null,
                    isRoot:0
                },
            }
        },
        methods: {
            ...mapMutations(['changeLogin']),
            keyDown(e){
                if(e.keyCode==13){
                    this.login();
                }
            },
            login(){
                this.$http.post('http://139.199.66.15:8003/user/login',this.loginForm).then((res)=>{
                    this.$message({
                        type:res.data.code==0?"success":"error",
                        message:res.data.message
                    })
                    if(res.data.code == 0){
                        this.userToken = "Bearer " + res.data.data.token;
                        this.changeLogin({"Authorization":this.userToken});
                        localStorage.setItem("username",this.loginForm.username)
                        if(this.loginForm.isRoot){
                            this.$router.push('/root')
                        }else{
                            this.$router.push('/student')
                        }
                    }
                
                })
            },
            register(){
                this.$router.push('/register')
            }
        },

    }
</script>

<style>
    #login,.lr{
        position: relative;
        width: 100%;
        height: 100%;
        background: url(../assets/loginBG.jpg)  no-repeat;
        background-size: cover;
       
    }
    
    .lgBox,.rgBox{
        position: absolute;
        width: 500px;
        height: 380px;
        box-sizing: border-box;
        background: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 10px;
        box-shadow: 1px 1px 10px 1px grey;
        text-align: center;
        padding: 30px;
    }
    
    .logo{
        width: 50px;
        height: 50px;
        vertical-align: middle;
    }
    .title{
        margin-bottom: 30px;
    }
    .lr .el-input{
        width: 60%;
        margin-bottom: 30px;
        font-size: 1rem;
    }
    .choiceBox{
        margin-bottom: 30px;
    }
    .lr button{
        margin: 0 10px;
    }
    .imgL{
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 10px;
    }
</style>