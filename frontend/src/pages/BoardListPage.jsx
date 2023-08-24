import BoardListForm3 from '../components/BoardListForm3';
import PropTypes from 'prop-types'; // prop-types 라이브러리 import


const BoardListPage = ({kind}) => {

  console.log("BoardListForm3 > kind ========> ",kind)


  return (
      <BoardListForm3 kind={kind} />
  );
};


// kind 프로퍼티의 propTypes 설정
BoardListPage.propTypes = {
  kind: PropTypes.oneOf(['N', 'Q', 'F', 'C', 'A', 'T']).isRequired,
};


export default BoardListPage;
