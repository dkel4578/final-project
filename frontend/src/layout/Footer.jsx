import React from 'react'; // eslint-disable-line no-unused-vars
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import "../css/footer.css";
import "../script/custom.js";
import '../css/variables.css';
import '../css/total.css';

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <p className="company-title">(주) 같이갈래?</p>
        <address>
          사업자번호 : 1234-456 | 대표자 : 김현재
          <br />
          개인정보책임관리자 : 이한빈
          <br />
          통신판매 신고번호 : 제 1213245665
          <br />사랑시 고백구 111
          (1234) - 사랑시 고백구 행복동 486
          <br />
          copyright &copy; (주)현재디스모먼트
        </address>
        <p className="company-marketing">마케팅 제휴 : 010-1234-5678 </p>
        <p className="copy-right">해당사이트의 모든 저작권은 (주) 현재디스모먼트에게 있습니다.</p>
      </div>
      <a href="#" className="to-top"></a>
    </footer>
  );
}

export default Footer;
