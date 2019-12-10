<template>
<div>
  <el-form :model="pageForm" :rules="pageFormRules" label-width="80px" ref="pageFormRef">
  <el-form-item label="所属站点" prop="siteId">
    <el-select v-model="pageForm.siteId" placeholder="请选择站点">
      <el-option
      v-for="item in siteList"
      :key="item.siteId"
      :label="item.siteName"
      :value="item.siteId">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="选择模板" prop="templateId">
    <el-select v-model="pageForm.templateId" placeholder="请选择">
      <el-option
      v-for="item in templateList"
      :key="item.templateId"
      :label="item.templateName"
      :value="item.templateId">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="页面名称" prop="pageName" >
    <el-input v-model="pageForm.pageName" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="别名" prop="pageAliase">
    <el-input v-model="pageForm.pageAliase" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="访问路径" prop="pageWebPath">
    <el-input v-model="pageForm.pageWebPath" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="物理路径" prop="pagePhysicalPath">
    <el-input v-model="pageForm.pagePhysicalPath" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="类型" prop="pageType">
  <el-radio-group v-model="pageForm.pageType">
  <el-radio class="radio" label="0">静态</el-radio>
  <el-radio class="radio" label="1">动态</el-radio>
  </el-radio-group>
  </el-form-item>
  <el-form-item label="创建时间">
    <el-date-picker type="datetime" placeholder="创建时间" v-model="pageForm.pageCreateTime">
  </el-date-picker>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog‐footer">
    <el-button type="primary" @click="addSubmit">提交</el-button>
    <el-button type="primary" @click="go_back">返回</el-button>
  </div>
 </div>
</template>

<script>
import * as cmsApi from '../api/cms'
export default {
    data() {
      return {
        siteList: [],
        templateList: [],
        pageForm:{
          siteId:'',
          templateId:'',
          pageName: '',
          pageAliase: '',
          pageWebPath: '',
          pageParameter:'',
          pagePhysicalPath:'',
          pageType:'',
          pageCreateTime: new Date()
        },
        pageFormRules:{
          siteId: [
            {required: true, message: '请选择站点', trigger: 'blur'}
          ],
          templateId: [
            {required: true, message: '请选择模板', trigger: 'blur'}
          ],
          pageName: [
            { required: true, message: '请输入页面名称', trigger: 'blur' }
          ],
          pageWebPath: [
            { required: true, message: '请输入访问路径', trigger: 'blur' }
          ],
          pagePhysicalPath: [
            { required: true, message: '请输入物理路径', trigger: 'blur' }
          ],
          pageType: [
            { required: true, message: '请选择类型', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      addSubmit:function(){
        this.$refs['pageFormRef'].validate((valid) => {
          if(valid){
            //二次确认
            this.$confirm('Sure?', 'tip', {
              confirmButtonText: 'sure',
              cancelButtonText: 'cancel'
            }).then(() => {
              //调用add接口
              cmsApi.page_add(this.pageForm).then((res)=>{
                if(res.success){
                  this.$message.success("Add successfully.");
                  this.$refs['pageFormRef'].resetFields();
                }else{
                  this.$message.error("Failed.");
                }
              });
            })
          }
        });
      },
      go_back:function(){
        this.$router.push({
          path: '/cms/page/list',
          query:{
            page: this.$route.query.page,
            pageAliase: this.$route.query.pageAliase,
            siteId: this.$route.query.siteId
          }
        });
      }
    },
    mounted(){
      //get CmsSite datas
      cmsApi.site_list().then((res)=>{
        this.siteList = res.queryResult.list;
      });
      //get CmsTemplate datas
      cmsApi.template_list().then((res)=>{
        this.templateList = res.queryResult.list;
      })
    }

  }
</script>

<style>
/*css*/
</style>
