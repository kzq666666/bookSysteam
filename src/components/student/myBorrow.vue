<template>
  <div id="myBorrow">
    <el-table
      :data="borrowData"
      style="width: 100%"
      height= "700"
    >
      <el-table-column label="借阅时间" prop="LentTime"> </el-table-column>
      <el-table-column label="书名" prop="BookName"> </el-table-column>
      <el-table-column label="作者" prop="Author"> </el-table-column>
      <el-table-column label="出版社" prop="PublishingHouse"> </el-table-column>
      <el-table-column label="应归还时间" prop="ShouldReturnTime"> </el-table-column>
      <el-table-column label="归还时间" prop="returnTime"> </el-table-column>
      <el-table-column width="200">
        
        <!-- <template slot-scope="scope" >
            <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.$index, scope.row)"
            >续借</el-button
          >
         
        </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default{
        data() {
            return {
                borrowData:[]
            }
        },
        created() {
          this.$http.get('http://139.199.66.15:8003/book/booklents').then((res)=>{

            this.borrowData = res.data.data.lents;
            console.log(this.borrowData);

            for(let i=0;i<this.borrowData.length;i++){
              let time1 = this.borrowData[i].LentTime;
              let time2 = this.borrowData[i].ShouldReturnTime * 1000;
              this.borrowData[i].LentTime = String(new Date(time2).getFullYear()) + '-' +String(new Date(time2).getMonth()) + '-' +String(new Date(time2).getDate());
              this.borrowData[i].ShouldReturnTime  = String(new Date(time2).getFullYear()+1) + '-' +String(new Date(time2).getMonth()) + '-' +String(new Date(time2).getDate())
            }
          })
        },
    }

</script>

<style>
    #myBorrow{
        padding: 50px;
    }
</style>