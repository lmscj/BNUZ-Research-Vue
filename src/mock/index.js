import Mock from 'mockjs'
var dottedBase = + new Date();
//系统管理员课程列表审核
Mock.mock('/api/courses/examine','post',function(options){
    const o = JSON.parse(options.body)
    return o.id
})
const {values} = Mock.mock({
    'values|7': [{
      'number|100-1000': 1,
      'date': function() {
        dottedBase--;
        var date = new Date((dottedBase -= 1000 * 3600 * 24));
        var category= date.getMonth() + 1 + "-" + date.getDate();
        return category;
      }
    }] 
})

const imageSrcs = ["https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-oranges-ice.jpg",
                   "https://i0.pickpik.com/photos/395/626/523/bled-slovenia-lake-mountains-preview.jpg",
                   "https://i0.pickpik.com/photos/591/313/261/alberta-amazing-banff-beautiful-preview.jpg",
                   "https://i0.pickpik.com/photos/653/876/844/road-forest-season-autumn-preview.jpg",
                   "https://i0.pickpik.com/photos/320/918/427/sky-clouds-sunlight-dark-preview.jpg",
                   "https://i1.pickpik.com/photos/230/230/425/sunset-color-evening-sky-evening-preview.jpg",
                   "https://i1.pickpik.com/photos/979/796/888/tree-lake-pakistan-nature-preview.jpg",
                   "https://i0.pickpik.com/photos/856/151/610/panorama-sunrise-dawn-bled-preview.jpg",
]

const {glimpseList} = Mock.mock({
    'glimpseList|40-80' : [{
        "uid": '@cname',      
        "title": '@ctitle',        
        "content": '@cparagraph',      
        "isPublish": '@boolean',      
        "createTime": '@date', 
        "viewCount|0-1000":1,
        'fileList|1-10': [{        
            "name": '@integer(0,8)',        
            "uid": '@name',        
            "url|1": imageSrcs,        
        }]
    }] 
})

var { LogList } = Mock.mock({
    'LogList|50-80' : [
      {
        "log_id":"@increment(1)",
        "log_type|1" : ['0','1','2'],
        "log_desc" : "@cword(5-8)",
        "log_title|1" : ['用户登录','用户登出','添加用户','编辑用户','冻结用户','机构审核','课程审核','资讯审核'],
        "log_source|1" : ['普通用户','机构管理员','系统管理员'],
        "handle_name" : "@first()",
        "handle_time" : '@date(yyyy-MM-dd hh:mm:ss)',
        "ip" : "@ip()",
        "role|1" : ['1' , '16' , '99']
      }
    ]
})
const getQuery = (url , name)=>{
    const index = url.indexOf('?')
    if(index !== -1){
        const queryStrArr = url.substr(index + 1).split('&')
        for(var i=0;i<queryStrArr.length;i++){
            const itemArr = queryStrArr[i].split('=')
            if(itemArr[0] === name){
                return itemArr[1]
            }
        }
    }
    return null
}
//系统日志删除
Mock.mock(/\/api\/log\/delete/,'post',(options)=>{
    const index = options.url.lastIndexOf('/');
    const id = options.url.substr(index+1);
    // const i = LogList.findIndex(item=>{
    //     if(item.log_id === id){
    //         console.log(1)
    //         return true
    //     }
    // })
    LogList.splice(id,1)
    return {
        status : 200, 
        log_id : id,
        LogList : LogList,
        total : LogList.length,
    }   
})

//掠影
Mock.mock(/\/api\/glimpseList/,'get',(options) => {
    const limit = getQuery(options.url,'limit')
    const page = getQuery(options.url,'page')
    const start = (page - 1) * limit
    const end = page * limit
    const totalPage = Math.ceil(glimpseList.length / limit)
    const list = page > totalPage? [] : glimpseList.slice(start,end)
    return {
        status : 200,
        message : "success",
        glimpses : list,
        total : glimpseList.length,  
    }
})

//最近七天登录人数
Mock.mock(/\/api\/LoginCount/,'get',() => {
    return {
        status : 200,
        message : "获取系统日志成功",
        LoginAcount : values,
        total : values.length,
    }
})

//系统日志
Mock.mock(/\/api\/log\/list/,'get',(options)=>{
    const type = getQuery(options.url,'type')
    const name = getQuery(options.url,'name')
    const limit = getQuery(options.url,'limit')
    const page = getQuery(options.url,'page')
    let mockList = LogList.filter(item => {
        if (type && item.log_type !==  type) {return false}
        if (name && item.handle_name.indexOf(name) < 0) {return false}
        else{return true}
    })
    const start = (page - 1) * limit
    const end = page * limit
    const totalPage = Math.ceil(mockList.length / limit)
    const list = page > totalPage?[]:mockList.slice(start,end)
    return {
        status : 200,
        message : "获取系统日志成功",
        LogList : list,
        total : mockList.length,
    }
})