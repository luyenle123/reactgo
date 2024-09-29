import React, { useEffect, useState } from 'react'

import '../../styles/bannerfull.css';

export default function Bannerfull(){
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const bannerImages = [
      '../images/banners/banner_001_400.jpg',
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
      {bannerImages.map((image, index) => (     
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
      ))}
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
