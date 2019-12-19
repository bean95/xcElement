<template>
<div>
  <el-form :model="templateForm" :rules="templateFormRules" label-width="80px" ref="templateFormRulesRef">
  <el-form-item label="所属站点" prop="siteId">
    <el-select v-model="templateForm.siteId" clearable  placeholder="请选择站点">
      <el-option
      v-for="item in siteList"
      :key="item.siteId"
      :label="item.siteName"
      :value="item.siteId">
      </el-option>
    </el-select>
  </el-form-item>
  </el-form-item>
  <el-form-item label="模板名称" prop="templateName" >
    <el-input v-model="templateForm.templateName" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="模板参数" prop="templateParameter">
    <el-input v-model="templateForm.templateParameter" auto-complete="off"></el-input>
  </el-form-item>

  <el-upload
    class="upload-demo"
    ref="upload"
    action=""
    multiple
    :limit="1"
    accept=".ftl"
    :on-change="changeFile"
    :file-list="fileList"
    :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <div slot="tip" class="el-upload__tip" style="margin-bottom:10px;">只能上传ftl文件</div>
</el-upload>

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
        fileList:[],
        templateForm:{
          siteId:'',
          templateName:'',
          templateParameter: '',
          file:''
        },
        templateFormRules:{
          siteId: [
            {required: true, message: '请选择站点', trigger: 'blur'}
          ],
          templateName: [
            { required: true, message: '请输入模板名称', trigger: 'blur' }
          ],
          templateParameter: [
            { required: true, message: '请输模板参数', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      addSubmit:function(){
        this.$refs['templateFormRulesRef'].validate((valid) => {
          if(valid){
            //二次确认
            this.$confirm('Sure?', 'tip', {
              confirmButtonText: 'sure',
              cancelButtonText: 'cancel'
            }).then(() => {

              var that = this;
              console.log(this.templateForm.file)
            //将需要提交的文件，和附带的数据，append  FormData中 然后提交
              var formData = new FormData();
              formData.append('file', this.templateForm.file)
              formData.append('siteId', this.templateForm.siteId)
              formData.append('templateName', this.templateForm.templateName)
              formData.append('templateParameter', this.templateForm.templateParameter)
              console.log(this.templateForm);

              cmsApi.template_add(formData).then((res)=>{
                if(res.success){
                  this.$message.success("Add successfully.");
                  this.$refs['templateFormRulesRef'].resetFields();
                }else if(res.message){
                  this.$message.error(res.message);
                }else{
                  this.$message.error("Failed.");
                }
              });

              //调用add接口
              /*cmsApi.template_add(this.templateForm).then((res)=>{
                if(res.success){
                  this.$message.success("Add successfully.");
                  this.$refs['templateFormRulesRef'].resetFields();
                }else if(res.message){
                  this.$message.error(res.message);
                }else{
                  this.$message.error("Failed.");
                }
              });*/


            })
          }
        });
      },
      changeFile:function(file){

          this.templateForm.file = file.raw
      },
      go_back:function(){
        this.$router.push({
          path: '/cms/template/list',
          query:{
            page: this.$route.query.page,
            templateName: this.$route.query.templateName,
            siteId: this.$route.query.siteId,
            templateParameter: this.$route.query.templateParameter
          }
        });
      },
      submitUpload:function(){
        this.$refs.upload.submit();
      }
    },
    mounted(){
      //get CmsSite datas
      cmsApi.site_list().then((res)=>{
        this.siteList = res.queryResult.list;
      });
    }

  }
</script>

<style>
/*css*/
</style>
