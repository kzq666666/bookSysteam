<template>
  <div id="myBorrow">
    <el-table :data="borrowData" style="width: 100%" height="700">
      <el-table-column label="用户" prop="LentUser"> </el-table-column>
      <el-table-column label="书名" prop="BookName"> </el-table-column>
      <el-table-column label="作者" prop="Author"> </el-table-column>
      <el-table-column label="出版社" prop="PublishingHouse"> </el-table-column>
      <el-table-column label="借阅时间" prop="LentTime"> </el-table-column>
      <el-table-column label="归还时间" prop="ShouldReturnTime"> </el-table-column>

      
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      borrowData: null
    }
  },
  created() {
    this.$http.get('http://139.199.66.15:8003/book/booklents').then((res)=>{
      this.borrowData = res.data.data.lents;
      for(let i=0;i<this.borrowData.length;i++){
        let time1 = this.borrowData[i].LentTime * 1000;
        if(time1<10000){
          time1 = 1583976158*1000;
        }
        let time2 = this.borrowData[i].ShouldReturnTime * 1000;
        this.borrowData[i].LentTime = String(new Date(time1).getFullYear()) + '-' +String(new Date(time1).getMonth()) + '-' +String(new Date(time1).getDate());
        this.borrowData[i].ShouldReturnTime = '';

      }
    })
  },
};
</script>

<style>
#myBorrow {
  padding: 50px;
}
</style>
