<template>
    <div id="student">
        <Header></Header> 
        <div class="left" @click="changeColor">
            <div class="name">
                {{name}}
                
            </div>
            <div class="allBook active" >
                图书馆
            </div>
            <div class="myBorrow">我的借阅</div>
            <div class="logout" @click="logOut">退出</div>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import header from '../header';

    export default{
        data() {
            return {
                name:null,
                isClick:null
            }
        },
        methods: {
            changeColor(e){
                let tempCN = e.target.classList;
                if(tempCN[0]!=="name" && tempCN[0]!=="left" &&tempCN[0]!=="logout"){
                    if(this.isClick){
                        document.getElementsByClassName(this.isClick)[0].classList.remove('active');
                        
                    }
                    this.isClick = tempCN[0];
                    document.getElementsByClassName(this.isClick)[0].classList.add('active')
                    switch(this.isClick){
                        case "allBook":
                            this.$router.push('/student/books')
                            break;
                        case "myBorrow":
                            this.$router.push('/student/myBorrow')
                            break;
                    }
                }
            },
            logOut(){
                localStorage.clear();
                this.$router.push('/');
            }
        },
        components:{
            Header:header
        },
        created() {
            this.$router.push('/student/books');
            this.isClick = "allBook";
            this.name = localStorage.getItem("username");
        },
    }
</script>

<style>
    #student{
        width: 100%;
        height: 100%;
    }
    .left{
        width: 12%;
        min-width: 150px;
        height: 90%;
        float: left;
        border-right: 1px solid #dcdfe6;
    }
    .left .name{
       height: 60px;
    }
    .left div{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-bottom: 1px solid #dcdfe6;
    }
    .left div:not(.name){
        color:#428bca;
    }
    .left div:not(.name):not(.active):hover{
        background: rgb(233,236,242);
    }
    .active {
        background: #428bca;
        color: #fff !important;
    }

    .right{
        height: 90%;
        overflow: hidden;
    }
</style>