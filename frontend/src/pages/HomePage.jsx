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
      image: require("../images/slide-banner1.png"),
      link: "/coffeeEventPage",
    },
    {
      image: require("../images/slide-banner2.png"),
      link: "/criminalPage",
    },
    {
      image: require("../images/slide-banner3.png"),
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

  const handleCategoryClick = (kind) => {
    navigate(`/board/${kind}`);
  };


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
              <Link to={`/board/C`}>
                <img src={require("../images/cofee-together.jpg")} alt="카페가치" />
              </Link>
            </div>
            <div className="category-item">
              <Link to={`/board/T`}>
                <img src={require("../images/trip-together.jpg")} alt="놀러가치" />
              </Link>
            </div>
            <div className="category-item">
              <Link to={`/board/F`}>
                <img src={require("../images/eat-together.jpg")} alt="한끼가치" />
              </Link>
            </div>
            <div className="category-item">
              <Link to={`/board/A`}>
                <img src={require("../images/drink-together.jpg")} alt="한잔가치" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="noticeAndfaq">
        <Link to={`/board/N`}>
          공지사항
        </Link>
        <Link to={`/board/Q`}>
          FAQ
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
