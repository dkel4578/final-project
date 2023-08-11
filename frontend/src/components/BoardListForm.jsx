import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import "../css/index.css";
import "../css/total.css";
import "../css/board.css";
import "../css/variables.css";


const BoardListForm = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const pageSize = 5;
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchData = (pageNumber) => {
    setLoading(true);
    fetch(`/api/boards?page=${pageNumber}&size=${pageSize}`)
        .then(res => res.json())
        .then(data => {
          setData(prevData => [...prevData, ...data.content]);
          setTotalPages(data.totalPages);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
  };

  const handlePageChange = () => {
    if (page < totalPages - 1) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleScroll = () => {
    if (
        !loading &&
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100
    ) {
      handlePageChange();
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
      <div className="body">
        <div className="header-inner">
          <section className="coffee-board">
            <div className="board-kind">
              <a href="board-coffee.html" className="active">커피한잔할래요</a>
              <a href="#none">같이여행갈래요</a>
              <a href="#none">같이식사할래요</a>
              <a href="#none">술한잔할래요</a>
            </div>
            <div className="search-area">
              <div className="search">
                <input type="text" placeholder="검색어를 입력해주세요"/>
                <i className="fa fa-search" aria-hidden="true"></i>
              </div>
              <div className="write-button">
                <a href="#none">
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <ul className="borad-main">
              {data.map(board => (

                  <li className="board-content" key={board.id}>
                    <div className="board-info">



                      <div className="board-title" >
                        <span>커피한잔할래요</span>
                        <a href={`/board/view?id=${board.id}`}
                        >{board.title}</a
                        >
                      </div>
                      <div className="board-user-log">
                        <span>글쓴이 홍찰찰</span>
                        <span> / 시간:{dayjs(board.createAt).format('YYYY/MM/DD HH:mm:ss')}
                      </span>
                        <span> / 조회수: {board.cnt}</span>
                      </div>
                    </div>
                    <a href="#" className="board-comment">
                      <span>10</span>
                      <span>댓글</span>
                    </a>
                  </li>

              ))}

            </ul>
            <div className="board-paging">
              <a href="#"
                 className="paging-arrow left">
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
              </a>
              <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 0}>
                privios
              </button>

              <a href="#none" className="paging-arrow right">
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
              </a>

              <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages - 1}
              >
                Next
              </button>

            </div>
          </section>
        </div>

      </div>
  )

}


export default BoardListForm
