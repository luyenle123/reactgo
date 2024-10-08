import React, { memo, useEffect, useState } from 'react'
import '../../styles/bannerfull.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Bannerfull = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const bannerImages = [
      '../images/banners/hero_banner.avif',
      '../images/banners/banner_002_400.jpg',
      '../images/banners/banner_003_400.jpg',
      '../images/banners/banner_004_400.jpg',
    ];

  useEffect(() => {
    // Set up an interval to change the image every 10 seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => 
        (prevIndex + 1) % bannerImages.length
      );
    }, 10000); // 10000 milliseconds = 10 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [bannerImages.length]);

  return (
    <div className='banner-full-container'>
      {/* {bannerImages.map((image, index) => (     
        <img 
          key={index}
          src={image}
          alt={`Banner ${index + 1}`} 
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: currentImageIndex === index ? 1 : 0,
            transition: 'opacity 1s ease-in-out'
          }} 
        />
      ))} */}

      <LazyLoadImage className='banner-image' alt='' src={bannerImages[0]}/>
      {/* <img src={bannerImages[0]} alt='banner image' /> */}

        <div className='text-area'>
            <div className='header'>
                GO GO REACT
            </div>

            <div className='description'>
                Welcome to the React documentation! This page will give you an introduction to the 80% of React concepts that you will use on a daily basis.
            </div>
        </div>
    </div>
  )
}

export default memo(Bannerfull)