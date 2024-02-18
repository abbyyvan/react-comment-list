import { useState } from "react";
import './index.css'
import user from './user.png'



// 1.渲染评论列表
    //  -使用useState维护评论列表
    //  -使用map方法对列表数据进行遍历渲染，要加key
// 2.删除评论实现
// 3.渲染导航tab和高亮实现
// 4.评论列表排序功能实现
const list = [
  'comment1',
  'comment2'
]

function App() {
  // 1.渲染评论列表
    //  -使用useState维护评论列表
  const [commentList, setCommentList] = useState(list)


  return (
    <div className="App">
      {/* header */}
      <div className="header">
        <span>评论</span> <span>最新</span> <span>|</span><span>最热</span> 
      </div>

      {/* avatar + textarea + button */}
      <div className="comment-reply">
        <img src={user} alt="" />
        <textarea name="" id="" cols="30" rows="10" placeholder="发布一条友善的评论"></textarea>
        <button>发布</button>
      </div>

      {/* commnet display list */}
      <div className="comment-list">
        <div className="username">jack</div>
        <div className="comment-content">这是一条评论</div>
        <div className="date">2023-11-11</div> <span>点赞数：100</span> <span>删除</span>

      </div>
    </div>
  );
}

export default App;
