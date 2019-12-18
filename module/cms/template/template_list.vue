<template>
<div>
  <el-form :model="params">
  所属站点:<el-select v-model="params.siteId" placeholder="请选择" clearable>
    <el-option
    v-for="item in siteList"
    :key="item.siteId"
    :label="item.siteName"
    :value="item.siteId">
    </el-option>
  </el-select>
  模板名称:<el-input v-model="params.templateName" style="width:150px;" placeholder="请输入内容"></el-input>
  参数:<el-input v-model="params.templateParameter" style="width:150px;" placeholder="请输入内容"></el-input>
  <el-button type="primary" size="small" v-on:click="query">Search</el-button>
  <router-link class="mui‐tab‐item" :to="{path:'/cms/template/add/',query:{page:this.params.page,templateName:this.params.templateName,siteId:this.params.siteId}}">
    <el-button type="primary" size="small">新增模板</el-button>
  </router-link>
  </el-form>
  <el-table
     :data="list"
     stripe
     style="width: 100%">
     <el-table-column
       prop="templateId"
       label="ID"
       width="250">
     </el-table-column>
     <el-table-column
       prop="siteId"
       label="站点"
       width="250">
     </el-table-column>
     <el-table-column
       prop="templateName"
       label="模板名称"
       width="250">
     </el-table-column>
     <el-table-column
       prop="templateParameter"
       label="模板参数"
       width="150">
     </el-table-column>
     <el-table-column
       prop="templateFileId"
       label="模板文件id">
     </el-table-column>

     <el-table-column label="操作" width="200">
      <template slot-scope="page">
        <el-button
          size="small" type="text"
          @click="edit(page.row.templateId)">编辑
        </el-button>
        <el-button
          size="small" type="text"
          @click="del(page.row.templateId)">删除
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
          templateName:'',
          templateParameter:''
        }
      }
    },
    methods:{
      query:function(){
        cmsApi.template_list(this.params.page,this.params.size,this.params).then((res)=>{
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
      },
      changePage:function(page){
        this.params.page = page;
        this.query();
      },
      edit:function(templateId){
        this.$router.push({
          path: '/cms/template/edit/' + templateId,
          query:{page:this.params.page,templateName:this.params.templateName,siteId:this.params.siteId}
        });
      },
      del:function(templateId){
        this.$confirm('Sure？', 'tip', {}).then(() => {
          this.addLoading = true;
          cmsApi.template_del(templateId).then((res) => {
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
      this.params.siteId = this.$route.query.siteId || '';
      this.params.templateName = this.$route.query.templateName || '';
      this.params.templateParameter = this.$route.query.templateParameter || '';
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
