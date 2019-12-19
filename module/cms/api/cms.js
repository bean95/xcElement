import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//定义方法
//请求服务端的页面查询接口
export const page_list = (page,size,params)=>{
  //http://localhost:31001/cms/page/list/1/10
  let queryStr = querystring.stringify(params);
  return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size+"?"+queryStr);
}

//获取CmsSite列表数据
export const site_list = ()=>{
  //http://localhost:31001/cms/site/list
  return http.requestQuickGet(apiUrl+'/cms/site/list/');
}

//获取CmsTemplate列表数据
export const template_all = ()=>{
  //http://localhost:31001/cms/site/list
  return http.requestQuickGet(apiUrl+'/cms/template/list');
}

//获取CmsSite列表数据
export const page_add = (params)=>{
  //http://localhost:31001/cms/site/list
  return http.requestPost(apiUrl+'/cms/page/add',params);
}

//get
export const page_get = (id)=>{
  //http://localhost:31001/cms/site/list
  return http.requestQuickGet(apiUrl+'/cms/page/get/'+id);
}

//编辑后更新
export const page_edit = (id,params)=>{
  //http://localhost:31001/cms/site/list
  return http.requestPut(apiUrl+'/cms/page/edit/' + id,params);
}

//删除页面
export const page_del = (id)=>{
  //http://localhost:31001/cms/site/list
  return http.requestDelete(apiUrl+'/cms/page/del/' + id);
}


//模板相关操作

//定义方法
//请求服务端的页面查询接口
export const template_list = (page,size,params)=>{
  //http://localhost:31001/cms/page/list/1/10
  let queryStr = querystring.stringify(params);
  return http.requestQuickGet(apiUrl+'/cms/template/list/'+page+'/'+size+"?"+queryStr);
}

/*export const template_add = (params)=>{
  return http.requestPost(apiUrl+'/cms/template/add',params);
}*/
export const template_del = (id)=>{
  return http.requestDelete(apiUrl+'/cms/template/del/' + id);
}
export const template_get = (id)=>{
  return http.requestQuickGet(apiUrl+'/cms/template/get/'+id);
}
/*export const template_edit = (id,params)=>{
  return http.requestPut(apiUrl+'/cms/template/edit/' + id,params);
}*/

//form + upload file
export const template_add = (params)=>{
  return http.requestUploadPost(apiUrl+'/cms/template/add',params);
}
export const template_edit = (id,params)=>{
  return http.requestUploadPost(apiUrl+'/cms/template/edit/' + id,params);
}
