<template>
    <div id="addBook">
        <el-form :model="addBookForm" status-icon  ref="addBookForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="书名" prop="name">
            <el-input type="text" v-model="addBookForm.name" width="20%"    ></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input type="text" v-model="addBookForm.author" width  ></el-input>
          </el-form-item>
          <el-form-item label="出版社" prop="publishing_house">
            <el-input type="text" v-model="addBookForm.publishing_house"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="stock">
              <el-input type="number" v-model="addBookForm.stock"></el-input>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">添加</el-button>
            <el-button @click="resetForm('addBookForm')">重置</el-button>
          </el-form-item>
        </el-form>

        
    </div>
</template>

<script>
    export default{
        data(){
            return{
                addBookForm:{
                    name:null,
                    author:null,
                    publishing_house:null,
                    stock:null
                }
            }
        },
        methods: {
            submitForm(){
              this.addBookForm.stock = Number(this.addBookForm.stock)
                this.$http.post('http://139.199.66.15:8003/book/books',this.addBookForm).then((res)=>{
                  if(res.data.code==0){
                    this.$message.success({"message":"添加成功","duration":1500})
                    this.resetForm("addBookForm");
                  }else{
                    this.$message.error({"message":res.data.message,"duration":1500})
                  }
                
                })
            },
            resetForm(formName){
                 this.$refs[formName].resetFields();
            }
        },
    }
</script>

<style>
    
#addBook form{
    width: 50%;
    margin: 0 auto;
    margin-top: 50px;
}

#addBook .el-input{
    width: 300px;
}
</style>