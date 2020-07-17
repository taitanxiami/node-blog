const getList = (author,keyword) => {

    return [
        {
            id:1,
            title:'标题1',
            content:'内容1',
            creatTime:15662627277272,
            author: '张海'
        },
        {
            id:1,
            title:'标题1',
            content:'内容1',
            creatTime:15662627277272,
            author: '张海'
        },
        {
            id:1,
            title:'标题1',
            content:'内容1',
            creatTime:15662627277272,
            author: '张海'
        }
    ]
}

const getDetail = (id)=> {
    return {
        id:1,
        title:'标题1',
        content:'内容1',
        creatTime:15662627277272,
        author: '张海'
    }
}

module.exports = {
    getList,
    getDetail
}