import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import "../css/index.css";
import "../css/total.css";
import "../css/variables.css";
import "../css/slides.scss";

function HomePage() {
  const slides = [
    './images/slide-banner1.png',
    './images/slide-banner2.png',
    './images/slide-banner3.png'
  ]

  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    //슬라이드 자동 재생을 위한 타이머 설정
    const timer = setInterval(() =>{
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () =>{
      clearInterval(timer);
    };
  }, [slides.length]);

  // const goToSlide = (index) =>{
  //   setCurrentSlide(index);
  // }

  return (
    <div className="body">
      <section className="slide-area">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide})` }}
        ></div>
      ))}
     
    </section>
    <section className="category-area">
      <div className="category-inner">
        <div className="category-items">

            <div className="category-item">
              <Link to={"/board"}>
                <img src="./images/cofee-together.jpg" alt="커피한잔 할래요"/>
              </Link>
            </div>
            <div className="category-item">
              <Link to={"/board/trip"}>
                <img src="./images/trip-together.jpg" alt="여행같이 할래요"/>
              </Link>
            </div>
            <div className="category-item">
              <Link to={"/board/food"}>
                <img src="./images/eat-together.jpg" alt="식사같이 할래요"/>
              </Link>
            </div>
            <div className="category-item">
              <Link to={"/board/drink"}>
                <img src="./images/drink-together.jpg" alt="술한잔 할래요"/>
              </Link>
            </div>
        </div>
      </div>
    </section>
    <section className="noticeAndfaq">
        <div className="notice-link">
          <Link to={"/board/notice"}>
            공지사항
          </Link>
        </div>
        <div className="faq-link">
          <Link to={"/board/faq"}>
            FAQ
          </Link>
        </div>

    </section>
    </div>
  )
}

export default HomePage
