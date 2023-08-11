// eslint-disable-next-line no-unused-vars
import React, { useEffect, Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import BoardPreview from './BoardPreview';
import LoadingCircular from './LoadingCircular';
import db from './db';
import '../css/index.css';
import '../css/total.css';
import '../css/board.css';
import '../css/variables.css';

const PAGE_SIZE = 3; // 한 번에 가져올 게시글 수

const BoardListForm2 = () => {
  const getBoardInfoListInfinitely = async (lastBoardId = 999, size) => {
    try {
      const res = await db.get(`/api/boardss?lastBoardId=${lastBoardId}&size=${size}`);
      const boardList = res.data;

      return {
        boardList,
        nextLastBoardId: boardList[boardList.length - 1]?.boardId,
        isLast: boardList.length < size,
      };
    } catch (error) {
      console.error('Error fetching board list:', error);
      return {
        boardList: [],
        nextLastBoardId: null,
        isLast: true,
      };
    }
  };

  function InfiniteBoardListSection() {
    const { ref, inView } = useInView();
    const {
      data: boardInfoList,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage,
    } = useInfiniteQuery(
        ['infiniteBoardList'],
        ({ pageParam }) => getBoardInfoListInfinitely(pageParam, PAGE_SIZE),
        {
          getNextPageParam: (lastPage) =>
              lastPage.isLast ? undefined : lastPage.nextLastBoardId,
        }

    );

    useEffect(() => {

      console.log('boardInfoList:', boardInfoList); // 로그 추가
      console.log('isFetchingNextPage:', isFetchingNextPage); // 로그 추가
      console.log('hasNextPage:', hasNextPage); // 로그 추가

      console.log("inView : =========> ", inView)



      if (inView && !isFetchingNextPage && hasNextPage) {
        fetchNextPage();
      }
    }, [boardInfoList, inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

    return (
        <section>
          {boardInfoList?.pages.map((page, pageIndex) => (
              <Fragment key={pageIndex}>
                {page.boardList.map((boardInfo) => (
                    <BoardPreview key={boardInfo.id} boardInfo={boardInfo} />
                ))}
              </Fragment>
          ))}
          {isFetchingNextPage ? <LoadingCircular /> : <div ref={ref}></div>}
        </section>
    );
  }

  return (
      <div className="body">
        <div className="header-inner">
          <section className="coffee-board">
            <div className="board-kind">
              <a href="board-coffee.html" className="active">
                커피한잔할래요
              </a>
              <a href="#none">같이여행갈래요</a>
              <a href="#none">같이식사할래요</a>
              <a href="#none">술한잔할래요</a>
            </div>
            <div className="search-area">
              <div className="search">
                <input type="text" placeholder="검색어를 입력해주세요" />
                <i className="fa fa-search" aria-hidden="true"></i>
              </div>
              <div className="write-button">
                <a href="#none">
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <ul className="borad-main">
              <InfiniteBoardListSection />
            </ul>
          </section>


        </div>
      </div>
  );
};

export default BoardListForm2;
