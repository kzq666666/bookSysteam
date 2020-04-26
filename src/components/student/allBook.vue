<template>
  <div id="stuAllBook">
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
    <!--<div class="hotBook" v-if="tags">
      <el-tag>Top5=></el-tag>
      <el-tag v-for="tag in tags" :key="tag.name" :type="tag.type">
        {{ tag.name }}
      </el-tag>
    </div>
  -->
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
      <!--
        <el-table-column align="center" >
          
          <template slot="header" slot-scope="scope" >
            
          </template>
          <template slot-scope="scope">
           
            <el-button
              size="mini"
              type="primary"
              @click="handleBorrow(scope.$index, scope.row)"
              >借阅</el-button
            >
          </template>
        </el-table-column>
      -->
      </el-table>
      <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="perPage"
      v-if="flag"
      @current-change="handleChange">
  </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      tags: [
        { name: "《人间失格》", type: "" },
        { name: "标签二", type: "success" },
        { name: "标签三", type: "info" },
        { name: "标签四", type: "warning" },
        { name: "标签五", type: "danger" }
      ],
      tableData: [],
      flag : false,
      allTableData:[],
      total:0,
      perPage:10
    };
  },
  methods: {
    handleChange(page){
      let index = (page-1)*this.perPage;
      this.tableData = this.allTableData.slice(index,index+this.perPage);
      if(!this.tableData.length){
        this.$http.get(`http://139.199.66.15:8003/book/books?page=${page}&perPage=${this.perPage}`).then(res =>{
          this.tableData = res.data.data.books;
        })
      }
      console.log(this.allTableData);

    },
    filterFun(data){
      return !this.search || data[this.searchType].toLowerCase().includes(this.search.toLowerCase())
    },
    handleBorrow(index,data){
        console.log(index,data)
    }
  },
  created() {
    this.$http.get(`http://139.199.66.15:8003/book/books?page=1&perPage=${this.perPage}`).then(res =>{
      this.tableData = res.data.data.books;
      this.flag = true;
      this.total = res.data.data.total;
      this.allTableData = this.tableData;
      for(let i=2;i<=Math.ceil(this.total/this.perPage);i++){
        this.$http.get(`http://139.199.66.15:8003/book/books?page=${i}&perPage=${this.perPage}`).then(res =>{
          this.allTableData = [...this.allTableData,...res.data.data.books];
        })
      }
    })
  },
};
</script>

<style>
#allBook {
  width: 100%;
  height: 100%;
  text-align: center;
}

.hotBook {
  width: 70%;
  margin: 0 auto;
  min-width: 700px;
  overflow: hidden;
  margin: 30px auto;
}
.hotBook span {
  margin-right: 35px;
  cursor: pointer;
}
#stuAllBook .bookShow {
  width: 60%;
  margin: 0 auto;
  min-width: 600px;
  text-align: center;
}

.search{
  width: 70%;
  display: flex;
  justify-content: center;
  margin: 20px auto;

}
.search .el-select {
  width: 94px;
  height: 40px;
  margin-right: 10px;
}

.search>.el-input{
  width: 300px;

}

.el-pagination{
  margin-top: 10px;
}
</style>
