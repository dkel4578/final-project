import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'
import dayjs from 'dayjs';
import "../css/index.css";
import "../css/total.css";
import "../css/board.css";
import "../css/variables.css";

function BoardViewForm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id'); // Extract id from URL parameter

  const [data, setData] = useState('');



  const fetchData = () => {
    fetch(`/api/board/${id}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setData(data);
        })
  }

  useEffect(() => {
    fetchData();
  },[id]);



  return (

      <div className="body">
        <div className="header-inner">

          <section className="coffee-board">
            <div className="board-kind">
              <Link to={"/board"}>
                <a href="board-coffee.html" className="active">커피한잔할래요</a>
              </Link>
              <a href="#none">같이여행갈래요</a>
              <a href="#none">같이식사할래요</a>
              <a href="#none">술한잔할래요</a>
            </div>
            <div className="search-area">

              <div className="write-button">
                <a href="#none">
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <ul className="borad-main">
              <li className="board-content">
                <div className="board-info">
                  <div className="board-title">
                    <span>커피한잔할래요</span>
                    <p>
                      {data.title}
                    </p>
                  </div>
                  <div className ="content-height" >
                    {data.content}
                  </div>
                  <div className="board-user-log">
                    <span>글쓴이 홍찰찰</span>
                    <span>/ 시간 : {dayjs(data.creatAt).format('YYYY/MM/DD HH:mm:ss')} </span>
                    <span>/ 조회수 {data.cnt} </span>
                  </div>
                </div>

                <a href="#none" className="board-comment">
                  <span>10</span>
                  <span>댓글</span>
                </a>
              </li>

            </ul>
            <div className="board-paging">

            </div>
          </section>
        </div>

      </div>
  )
}

export default BoardViewForm
