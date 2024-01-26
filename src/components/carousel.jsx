// MissionCarousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
 // Create this file for styling

const MissionCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Adjust the speed as needed
    autoplay: true,
    autoplaySpeed: 3000, // 5 seconds for each slide
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {/* Add your card components here */}
      <div className="card">
        <div className='card-title'>
          MISSION
        </div>
        <div className='card-info'>
          Working towards the improvement of the campus's coding culture by organizing regular coding classes and contests.
        </div>
      </div>
      <div className="card">
        <div className='card-title'>
          VISION
        </div>
        <div className='card-info'>
        To grow as a strong coding community and uphold the integrity of NIT Durgapur as a technical institution.
        </div>
      </div>
      <div className="card">
        <div className='card-title'>
          VALUE
        </div>
        <div className='card-info'>
        We believe that helping each other is the only way. We take care and always look to get the best out of everyone.
        </div>
      </div>
      
    </Slider>
  );
};

export default MissionCarousel;
