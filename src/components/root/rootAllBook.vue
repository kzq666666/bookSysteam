<template>
  <div id="allBook">
    <div class="search">
      <el-select v-model="searchType" placeholder="请选择" >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        v-model="search"
        placeholder="输入关键字搜索"
      ></el-input>
    </div>
    
    <div class="bookShow">
      <el-table
        :data="
          search?allTableData.filter(filterFun):tableData
        "
        style="width: 100%"
        height="700"
      >
        <el-table-column label="书名" prop="name"> </el-table-column>
        <el-table-column label="作者" prop="author"> </el-table-column>
        <el-table-column label="出版社" prop="publishing_house"> </el-table-column>
        <el-table-column label="可借数量" prop="now_stock"> </el-table-column>
        <el-table-column label="总藏书" prop="stock"> </el-table-column>
        <el-table-column  width="200">
          <template slot-scope="scope">
            
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
          
        </el-table-column>
        
        
      </el-table>
      <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="perPage"
          v-if="flag"
          @current-change="handleChange">
      </el-pagination>
      <el-dialog title="更新图书信息" :visible.sync="dialogFormVisible" width="450px" center>
        <el-form :model="updateForm" center>
          <el-form-item label="书名" :label-width="formLabelWidth">
            <el-input v-model="updateForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="作者" :label-width="formLabelWidth">
            <el-input v-model="updateForm.author" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出版社" :label-width="formLabelWidth">
            <el-input v-model="updateForm.publishing_house" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="总藏书" :label-width="formLabelWidth">
            <el-input v-model="updateForm.stock" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" center="true">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateBook">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible:false,
      formLabelWidth: '60px',
      search: null,
      searchType:"name",
      options:[
        { 
          value:'name',
          label:"书名"
        },
        { 
          value:'author',
          label:"作者"
        },
        { 
          value:'publishing_house',
          label:"出版社"
        }
        
      ],
      flag : false,
      tableData: [],
      updateForm:{
        id:"",
        name:"",
        publishing_house:"",
        author:"",
        stock:""  
      },
      currentIndex:null,
      total:0,
      perPage:10,
      allTableData:[],
      nowS:0,

    };
  },
  methods: {
    handleChange(page){
      let index = (page-1)*this.perPage;
      this.tableData = this.allTableData.slice(index,index+this.perPage);
      if(!this.tableData.length){
        this.$http.get(`http://139.199.66.15:8003/book/books?page=${page}&perPage=${this.perPage}` ).then(res =>{
          this.tableData = res.data.data.books;
        })
      }
    },
    filterFun(data){
      return !this.search || data[this.searchType].toLowerCase().includes(this.search.toLowerCase())
    },
    handleEdit(index,row){
      this.dialogFormVisible = true;
      this.updateForm.name = row.name;
      this.updateForm.publishing_house = row.publishing_house;
      this.updateForm.author = row.author;
      this.updateForm.id = row.id;
      this.updateForm.stock = row.stock;
      this.currentIndex = index;
      this.nowS = row.now_stock;
    },
    updateBook(){
      this.updateForm.stock = Number(this.updateForm.stock);
      this.$http.put('http://139.199.66.15:8003/book/books',this.updateForm).then((res)=>{
        if(res.data.code==0){
          this.$message.success({"message":"更新成功","duration":1500});
          this.tableData[this.currentIndex].name = this.updateForm.name;
          this.tableData[this.currentIndex].author = this.updateForm.author;
          this.tableData[this.currentIndex].now_stock = this.nowS + this.updateForm.stock - this.tableData[this.currentIndex].stock;
          this.tableData[this.currentIndex].stock = this.updateForm.stock;
          this.tableData[this.currentIndex].publishing_house = this.updateForm.publishing_house;
        }
      })
      this.dialogFormVisible = false;
    },
    handleDelete(index,row){
      this.$confirm('此操作将删除该图书的所有信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let deleteBookID = JSON.stringify({"id":row.id});
        console.log(deleteBookID)
        this.$http.delete('http://139.199.66.15:8003/book/books?id='+row.id).then(res =>{
          if(res.data.code==0){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
          this.tableData.splice(index,1);
        })
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },
  
  created() {
    this.$http.get('http://139.199.66.15:8003/book/books?page=1&perPage=10').then(res =>{
      this.tableData = res.data.data.books;
      this.flag = true;
      this.total = res.data.data.total;
      this.allTableData = this.tableData;
      for(let i=2;i<=Math.ceil(this.total/this.perPage);i++){
        this.$http.get('http://139.199.66.15:8003/book/books?page='+i + '&perPage' + this.perPage).then(res =>{
          this.allTableData = [...this.allTableData,...res.data.data.books];
        })
      }
    })
    
  }
};
</script>

<style>
  #allBook .bookShow{
    width: 60%;
    margin: 0 auto;
    min-width: 600px;
  }
</style>


