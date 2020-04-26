<template>
    <div id="setting">
        <label>归还天数</label>
        <el-input type="number" v-model="returnDay" ></el-input>
        <el-button type="primary">确定</el-button>
    </div>
</template>

<script>

    export default{
        data() {
            return {
                returnDay:30
            }
        },
    }
</script>


<style>
    #setting{
        padding: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #setting .el-input{
        width: 300px;
        margin-right: 20px;
    }
    #setting label{
        margin-right: 20px;
    }
</style>