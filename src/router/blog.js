
const handleBlogRouter = (req,res) => {

    const method = req.method;
     const url=  req.url
     const path= url.split('?')[0]
    console.log(url)
     if(method === 'GET' && url === '/api/blog/list') {
         return {
             msg:'这是博客列表接口'
         }
     }

     if(method === 'GET' && url === '/api/blog/detail') {
        return {
            msg:'这是博客详情接口'
        }
    }
    if(method === 'POST' && url === '/api/blog/new') {
        return {
            msg:'这是新建博客接口'
        }
    }
    if(method === 'POST' && url === '/api/blog/update') {
        return {
            msg:'这是博客更新接口'
        }
    }
}

module.exports = handleBlogRouter