import {useState, useEffect} from 'react'
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
      <div className="slide-inner">
        <div className="slide-items">
          <div className="slide-item">
            <img src="./images/slide-banner1.png" alt="" />
          </div>
          <div className="slide-item">
            <img src="./images/slide-banner2.png" alt="" />
          </div>
          <div className="slide-item">
            <img src="./images/slide-banner3.png" alt="" />
          </div>
        </div>
      </div>
    </section>
    <section className="category-area">
      <div className="category-inner">
        <div className="category-items">
          <div className="category-item">
            <a href="none">
              <img src="./images/cofee-together.jpg" alt=""/>
            </a>
          </div>
          <div className="category-item">
            <a href="#none">
              <img src="./images/trip-together.jpg" alt=""/>
            </a>
          </div>
          <div className="category-item">
            <a href="none">
              <img src="./images/eat-together.jpg" alt=""/>
            </a>
          </div>
          <div className="category-item">
            <a href="none">
              <img src="./images/drink-together.jpg" alt=""/>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section className="noticeAndfaq">
      <div className="notice-link">
        <a href="#none">공지사항</a>
      </div>
      <div className="faq-link">
        <a href="#none">FAQ</a> 
      </div>
    </section>
    </div>
  )
}

export default HomePage
