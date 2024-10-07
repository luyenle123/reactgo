import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../../styles/threecolumnblock.css';

export default function Threecolumnblock(props){
  const defaultImage1 = "/images/blocks/image_3col_01.jpg";
  const defaultImage2 = "/images/blocks/image_3col_02.jpg";
  const defaultImage3 = "/images/blocks/image_3col_03.jpg";

  let image1 = defaultImage1;
  let image2 = defaultImage2;
  let image3 = defaultImage3;

  if(props.image1){
    image1 = props.image1;
  }
  if(props.image2){
    image2 = props.image2;
  }
  if(props.image3){
    image3 = props.image3;
  }  
  
  return (
    <div className='block3c-container'>
        <div className='block3c-item-wrapper'>
            <div className='block3c-body'>
              <LazyLoadImage className='block3c-image' alt='image1' src={image1}/>
            </div>
        </div>
        <div className='block3c-item-wrapper'>
            <div className='block3c-body'>
              <LazyLoadImage className='block3c-image' alt='image2' src={image2}/>
            </div>
        </div>
        <div className='block3c-item-wrapper'>
            <div className='block3c-body'>
              <LazyLoadImage className='block3c-image' alt='image3' src={image3}/>
            </div>
        </div>        
    </div>
  )
}
