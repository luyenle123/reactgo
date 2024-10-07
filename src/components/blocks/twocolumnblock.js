import React from 'react'

import '../../styles/twocolumnblock.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Twocolumnblock(props){
  const defaultImage1 = "/images/blocks/image_2col_01.jpg";
  const defaultImage2 = "/images/blocks/image_2col_02.jpg";

  let image1 = defaultImage1;
  let image2 = defaultImage2;

  if(props.image1){
    image1 = props.image1;
  }
  if(props.image2){
    image2 = props.image2;
  }

  return (
    <div className='block2c-container'>
        <div className='block2c-item-wrapper'>
            <div className='block2c-body'>
              <LazyLoadImage className='block2c-image' alt='image1' src={image1}/>
            </div>
        </div>
        <div className='block2c-item-wrapper'>
            <div className='block2c-body'>
              <LazyLoadImage className='block2c-image' alt='image2' src={image2}/>
            </div>
        </div>
    </div>
  )
}
