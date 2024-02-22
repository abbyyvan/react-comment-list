import { useState } from "react";
import "./index.css";
import avatar from "./avatar.jpeg";
import _ from 'lodash';

// 1.渲染评论列表
//  -使用useState维护评论列表
//  -使用map方法对列表数据进行遍历渲染，要加key
// 2.删除评论实现
//  -只有自己评论才能删除
//  -点击删除按钮， 删除评论， 列表中不再显示
//  思路： 删除显示-条件渲染   删除功能-用id对评论做filter过滤
// 3.渲染导航tab和高亮实现
//  -点击tab，就出现高亮
//  思路：点击tab，记录下type，与遍历到的item做对比，谁匹配搭配就设置成高亮
// 4.评论列表排序功能实现
//  -时间排序，点赞数排序
//  思路排序后，当成新值传给set
const list = [
  {
    rpid: 3,
    user: {
      uid: "111",
      avatar:
        "https://avo-magazine.com/wp-content/uploads/2023/12/ado-wish-worldtour-2024-banner.jpg",
      username: "ado",
    },
    content: "i like this video",
    time: "10-18 08:15",
    like: 25,
  },
  {
    rpid: 2,
    user: {
      uid: "112",
      avatar:
        "https://d3544la1u8djza.cloudfront.net/APHI/Blog/2016/10_October/persians/Persian+Cat+Facts+History+Personality+and+Care+_+ASPCA+Pet+Health+Insurance+_+white+Persian+cat+resting+on+a+brown+sofa-min.jpg",
      username: "Alan",
    },
    content: "i like the food",
    time: "10-18 12:15",
    like: 33,
  },
  {
    rpid: 1,
    user: {
      uid: "123",
      avatar:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/14934c25-cdec-43f2-bae7-5cd94459af0d/dgb2c3r-de4ac46f-f0aa-4250-8bca-e0e478fc149e.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE0OTM0YzI1LWNkZWMtNDNmMi1iYWU3LTVjZDk0NDU5YWYwZFwvZGdiMmMzci1kZTRhYzQ2Zi1mMGFhLTQyNTAtOGJjYS1lMGU0NzhmYzE0OWUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.kQLHz_5WBT1n9eeiD8grslX4BkugcAx0j5R6FGSIzLs",
      username: "ryan",
    },
    content: "i like this song",
    time: "10-19 18:15",
    like: 5,
  },
];
let count = 0;

const user = {
  uid: "123",
  avatar,
  username: "abby",
};

const tabs = [
  {type:'popular', text:'最热'},
  {type:'newest', text:'最新'}
];

function App() {
  // 1.渲染评论列表
  //  -使用useState维护评论列表
  const [commentList, setCommentList] = useState(_.orderBy(list, 'like','desc'));

  const handleDel = (id) =>{
    // 对commentList做过滤处理
    setCommentList(commentList.filter(item => item.rpid !== id))
    console.log(id)
  }

  //tab切换
  //1.点击记录type
  //2.通过记录的type匹配，激活类名的显示
  const [type, setType] = useState('popular')
  const handleTabChange = (type) =>{
    console.log(type)
    setType(type)
    //排序
    if(type === 'popular') {
      //lodash orderBy()
      setCommentList(_.orderBy(commentList, 'like', 'desc'))

    }else{
      setCommentList(_.orderBy(commentList, 'time', 'desc'))
    }
  }

  return (
    <div className="App">
      {/* header */}
      <div className="header">
        <span>评论</span>
        {tabs.map((item) => <span key={item.type} className={`nav-item ${type === item.type && 'active'}`} onClick={() =>handleTabChange(item.type)}>{item.text}</span> )}
       
      </div>

      {/* avatar + textarea + button */}
      <div className="comment-reply">
        <img src={avatar} alt="" />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="发布一条友善的评论"
        ></textarea>
        <button>发布</button>
      </div>

      {/* commnet display list */}

      
      {commentList.map((item) => (
        <div className="comment-list" key={item.rpid}>
          <img src={item.user.avatar} alt="" />
        <div className="username">{item.user.username}</div>
        <div className="comment-context">{item.content}</div>
        <div className="comment-bottom"> <span>{item.time}</span><span>点赞数：{item.like}</span>
        {/* 条件user.id === item.user.id */}
        {user.uid ===item.user.uid && <span className="delete-btn" onClick={() =>{handleDel(item.rpid)}}>删除</span> }</div> 
        <hr />
      </div>
      ))}
    </div>
  );
}

export default App;
