<template>
  <div>
    <el-form   :model="templateForm" label-width="80px" :rules="templateFormRules" ref="pageFormRef" >
  <el-form-item label="所属站点" prop="siteId">
  <el-select v-model="templateForm.siteId" placeholder="请选择站点">
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
    </div>
  </div>
</template>
<script>
  import * as cmsApi from '../api/cms'
  export default{
    data(){
      return {
        templateId:'',
        //模版列表
        templateList:[],
        fileList:[],
        addLoading: false,//加载效果标记
        //新增界面数据
        templateForm: {
          siteId:'',
          templateName:'',
          templateParameter: '',
          file: ''
        },
        templateFormRules: {
          siteId: [
            {required: true, message: '请选择站点', trigger: 'blur'}
          ],
          templateName: [
            { required: true, message: '请输入模板名称', trigger: 'blur' }
          ],
          templateParameter: [
            { required: true, message: '请输模板参数', trigger: 'blur' }
          ]
        },
        siteList:[]
      }
    },
    methods:{
      go_back(){
        this.$router.push({
          path: '/cms/template/list', query: {
            page: this.$route.query.page,
            siteId:this.$route.query.siteId
          }
        })
      },
      changeFile:function(file){
        this.templateForm.file = file.raw
      },
      editSubmit(){
        this.$refs.pageFormRef.validate((valid) => {
          if (valid) {
            this.$confirm('Sure？', 'tip', {}).then(() => {
              this.addLoading = true;


              var formData = new FormData();
              formData.append('file', this.templateForm.file)
              formData.append('siteId', this.templateForm.siteId)
              formData.append('templateName', this.templateForm.templateName)
              formData.append('templateParameter', this.templateForm.templateParameter)

              cmsApi.template_edit(this.templateId,formData).then((res)=>{
                if(res.success){
                  this.addLoading = false;
                  this.$message({
                    message: 'succeed.',
                    type: 'success'
                  });
                  //返回
                  this.go_back();
                }else{
                  this.addLoading = false;
                  this.$message.error('Failed.');
                }
              });


              /*cmsApi.template_edit(this.templateId,this.templateForm).then((res) => {
                if(res.success){
                  this.addLoading = false;
                  this.$message({
                    message: 'succeed.',
                    type: 'success'
                  });
                  //返回
                  this.go_back();

                }else{
                  this.addLoading = false;
                  this.$message.error('Failed.');
                }
              });*/



            });
          }
        });
      }

    },
    created: function () {
      this.templateId=this.$route.params.templateId;
      //根据主键查询页面信息
      cmsApi.template_get(this.templateId).then((res) => {
        if(res){
          this.templateForm = res;
        }
      });
    },
    mounted:function(){
      //初始化站点列表
      cmsApi.site_list().then((res) => {
        this.siteList = res.queryResult.list;
      });
    }
  }
</script>
<style>

</style>
