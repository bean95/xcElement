<template>
<div>
  <el-form :model="params">
  <el-select v-model="params.siteId" placeholder="请选择">
    <el-option
    v-for="item in siteList"
    :key="item.siteId"
    :label="item.siteName"
    :value="item.siteId">
    </el-option>
  </el-select>
  页面别名:<el-input v-model="params.pageAliase" style="width:150px;" placeholder="请输入内容"></el-input>
  <el-button type="primary" size="small" v-on:click="query">Search</el-button>
  <router-link class="mui‐tab‐item" :to="{path:'/cms/page/add/',query:{page:this.params.page,pageAliase:this.params.pageAliase,siteId:this.params.siteId}}">
    <el-button type="primary" size="small">新增页面</el-button>
  </router-link>
  </el-form>
  <el-table
     :data="list"
     stripe
     style="width: 100%">
     <el-table-column
       prop="pageName"
       label="页面名称"
       width="180">
     </el-table-column>
     <el-table-column
       prop="pageAliase"
       label="别名"
       width="180">
     </el-table-column>
     <el-table-column
       prop="pageType"
       label="页面类型"
       width="100">
     </el-table-column>
     <el-table-column
       prop="pageWebPath"
       label="访问路径">
     </el-table-column>
     <el-table-column
       prop="pagePhysicalPath"
       label="物理路径">
     </el-table-column>
     <el-table-column
       prop="pageCreateTime"
       label="创建时间">
     </el-table-column>
     <el-table-column label="操作" width="120">
      <template slot-scope="page">
        <el-button
          size="small" type="text"
          @click="edit(page.row.pageId)">编辑
        </el-button>
        <el-button
          size="small" type="text"
          @click="del(page.row.pageId)">删除
        </el-button>
      </template>
     </el-table-column>
   </el-table>
   <el-pagination
     layout="prev, pager, next"
     :total="total"
     :current-page="params.page"
     :page-size="params.size"
     @current-change="changePage"
     style="float:left">
   </el-pagination>
 </div>
</template>

<script>
import * as cmsApi from '../api/cms'
export default {
    data() {
      return {
        siteList: [],
        list: [],
        total:0,
        params:{
          page:1,
          size:10,
          siteId:'',
          pageAliase:''
        }
      }
    },
    methods:{
      query:function(){
        cmsApi.page_list(this.params.page,this.params.size,this.params).then((res)=>{
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
      },
      changePage:function(page){
        console.log(page);
        this.params.page = page;
        this.query();
      },
      edit:function(pageId){
        this.$router.push({
          path: '/cms/page/edit/' + pageId,
          query:{page:this.params.page,pageAliase:this.params.pageAliase,siteId:this.params.siteId}
        });
      },
      del:function(pageId){
        this.$confirm('Sure？', 'tip', {}).then(() => {
          this.addLoading = true;
          cmsApi.page_del(pageId).then((res) => {
            if(res.success){
              this.addLoading = false;
              this.$message({
                message: 'succeed.',
                type: 'success'
              });
            this.query();
            }else{
              this.addLoading = false;
              this.$message.error('Failed.');
            }
          });
        });
      }
    },
    created(){//view还未渲染
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      this.params.pageAliase = this.$route.query.pageAliase || '';
      this.params.siteId = this.$route.query.siteId || '';
    },
    mounted(){
      this.query();
      //get CmsSite datas
      cmsApi.site_list().then((res)=>{
        this.siteList = res.queryResult.list;
      })
    }

  }
</script>

<style>
/*css*/
</style>
