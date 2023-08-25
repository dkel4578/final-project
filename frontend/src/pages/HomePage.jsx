import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/index.css";
import "../css/total.css";
import "../css/variables.css";
import "../css/slides.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/custom.js";

const SLIDE_INTERVAL = 5000;

function HomePage() {
  const slides = [
    {
      image: "./images/slide-banner1.png",
      link: "/coffeeEventPage", 
    },
    {
      image: "./images/slide-banner2.png",
      link: "/criminalPage", 
    },
    {
      image: "./images/slide-banner3.png",
      link: "/launching", 
    },
  ];

  const navigate = useNavigate();
  
  const handlebannerClick = (slide)=>{
    console.log("handle: "+JSON.stringify(slide));
    navigate(slide.link);
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, [slides.length]);

  // const goToSlide = (index) =>{
  //   setCurrentSlide(index);
  // }
  // console.log('zzzzzzzzzzzzzzzzzzzzz');

  return (
    <div className="body">
      <section className="slide-area">
      {slides.map((slide, index) => (
          // <Link to={slide.link} key={index}>
            <div
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
              onClick={()=>{handlebannerClick(slides[currentSlide])}}
              key={index}
            ></div>
          //</Link> 
        ))}
      </section>
      <section className="category-area">
        <div className="category-inner">
          <div className="category-items">
            <div className="category-item">
              <a href="/board/C">
                <img src="./images/cofee-together.jpg" alt="커피한잔 할래요" />
              </a>
            </div>
            <div className="category-item">
              <a href="/board/T">
                <img src="./images/trip-together.jpg" alt="여행같이 할래요" />
              </a>
            </div>
            <div className="category-item">
              <Link to={"/board/F"}>
                <img src="./images/eat-together.jpg" alt="식사같이 할래요" />
              </Link>
            </div>
            <div className="category-item">
              <Link to={"/board/A"}>
                <img src="./images/drink-together.jpg" alt="술한잔 할래요" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="noticeAndfaq">
        <a href="/board/notice" className="notice-link">
          공지사항
        </a>

        <a href="/faq" className="faq-link">
          FAQ
        </a>
      </section>
    </div>
  );
}

export default HomePage;
