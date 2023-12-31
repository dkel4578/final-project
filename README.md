<h1>✅final_project_gachi</h1>
<hr>
<h2>프로젝트 개요</h2>
<p>최근 늘어나는 1인 가구에 따라 같이 늘어나고 있는 혼행족들이 있다. 혼자 여행하는 혼행족들의 고민인 2인분 이상 식사 가능한 맛집에서의 식사를 해결하기 위해서 여행지에서 간단하게 사람과 매칭할 수 있는 웹페이지를 만드는 것을 목표로 하였다.</p>
<p>PPT : https://github.com/dkel4578/final-project/files/12520206/default.pptx</p>
<br>
<h1>👨‍💻Project Member</h1>
<hr>
<ul>
  <li>팀장 : 김현재 / https://github.com/dkel4578</li>
  <li>팀원 : 김성진 / https://github.com/kimsungjin1423</li>
  <li>팀원 : 김세양 / https://github.com/tpdid2645</li>
  <li>팀원 : 서종기 / https://github.com/Seojongki</li>
  <li>팀원 : 이한빈 / https://github.com/Dev21V</li>
</ul>
<br>
<h1>📹시연 영상</h1>
<ul>
  <li>
    <p>김현재 파트</p>
    <p>https://youtu.be/6Y08JwQcQcU</p>
  </li>
  <li>
    <p>김성진 파트</p>
    <p>https://youtu.be/GzmM2__8f70</p>
  </li>
  <li>
    <p>서종기 파트</p>
    <p>https://youtu.be/HPG8FRImqFQ</p>
  </li>
  <li>
    <p>이한빈 파트</p>
    <p>https://youtu.be/IugjDekLoOo</p>
  </li>
</ul>
<br>
<h1>⚙개발 환경</h1>
<hr>
<p> 개발언어 : Java</p>
<p> 사전 구상 : Figma, ERD </p>
<p> 프레임워크 : SpringBoot</p>
<p> 개발 관리 : intelliJ, VS Code</p>
<p> DB 관리 : mariaDb, DBeaver</p>
<p> 프론트엔드 : React, HTML, CSS, JavaScript, sass, nodeJs, jQuerry </p>
<p> 백엔드 : WebSocket, SpringSecurity, PostMan, Redis, JPAHibernate</p>
<p> 배포 : docker</p>
<br>
<h1> 💻가치 주요 기능</h1>
<ol>
  <li> 모바일 친화적인 웹페이지 구현에 힘썼다. </li>
  <li> 실시간 채팅 등 커뮤니티 기능 구현에 힘썼다. </li>
  <li> 유저 신고, 유저 리뷰 기능을 통해 유저 관리에 힘썼다. </li>
</ol>
<hr>
<h2> 실시간 채팅</h2>
<ul>
  <li> WebSocket을 이용하여 실시간 채팅 기능 구현</li>
  <li> 1:1 뿐만 아니라 다대 다 채팅도 가능하게 하였다.</li>
  <li> 채팅창에서 신고뿐만 아니라 유저 리뷰를 통해 유저 관리를 더욱 용이하게 하였다.</li>
  <li> 채팅방 공유 버튼을 통해 채팅방에 다른 유저를 초대할 수 있게 하였다.</li>
</ul>
<h2> 게시판 </h2>
<ul>
  <li> 같이 밥을 먹거나 동행하면서 사진찍기, 기상 악화 등으로 인해 생긴 여유 시간에 카페 갈 사람 등을 구할 수 있는 게시판이다.</li>
  <li> 게시판은 무한 스크롤 기능을 이용하여 구현하였고 게시글 검색, 댓글 작성 기능을 구현하였다.</li>
  <li> 게시글과 댓글은 신고버튼을 이용하여 유저 관리를 더욱 용이하게 하였다.</li>
  <li> 이미지 첨부로 해당 음식점의 음식 등을 더욱 자세히 설명할 수 있게 하였고 지도 첨부 기능으로 해당 음식점이 어디에 위치해있는지 파악할 수 있게 하였다.</li>
</ul>
<h2> 회원가입 / 로그인</h2>
<ul>
  <li> 프론트에서 JQuery를 이용하여 정규식 검사를 진행하였고 백엔드에서 유효성 검사를 진행하였다.</li>
  <li> Redis 를 통해 이메일 인증 시스템을 구현하였다. </li>
  <li> Google OAuth2를 이용하여 로그인 기능을 구현하였다.</li>
  <li> JwtToken을 이용하여 로그인 상태를 관리하였다.</li>
  <li> SpringSecurity를 이용하여 보안을 강화하였다.</li>
</ul>
<h2>회원 정보</h2>
<ul>
  <li> 이메일을 인증을 통한 아이디 찾기/ 비밀번호 변경 기능을 구현하였다.</li>
  <li> 아이디를 제외한 회원정보 수정 기능을 구현하였다. </li>
  <li> 프로필 이미지 추가 기능을 구현하였다. </li>
</ul>
<h2>여행지 페이지</h2>
<ul>
  <li>관광지 api를 이용하여 관광지를 검색할 수 있게 하였다. </li>
  <li>지도 api를 통하여 관광지의 위치를 화면에 표시할 수 있게 하였다. </li>
  <li>지도 api를 통하여 로드뷰를 화면에 띄울 수 있게 하였다. </li>
</ul>
<h2>캘린더 페이지</h2>
<ul>
  <li>React를 이용하여 달력을 만들고 그 달력에 일정을 추가/수정/삭제 할 수 있게 하였다.</li>
  <li>일정 공유 버튼을 클릭하여 다른 유저에게 일정을 보여줄 수 있는 기능을 구현하였다. </li>
</ul>
<h2>관리자 페이지</h2>
<ul>
  <li> 여러 조건으로 신고당한 유저를 검색할 수 있게 하였다.</li>
  <li> 여러 조건으로 게시글을 검색한 후 해당 게시글을 삭제/복구를 가능하게 하였다.</li>
  <li> 유저의 정지 상태를 변경하여 유저를 관리할 수 있게 하였다.</li>
  <li> 시간이 지나 자동으로 정지상태가 해제될 수 있도록 구현하였다. </li>
  <li> 관리자가 아니라면 관리자 페이지에 접속할 수 없도록 구현하였다. </li>
</ul>
