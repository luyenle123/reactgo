import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../../styles/fourcolumnblock.css';

export default function Fourcolumnblock(props){
    const defaultImage1 = "/images/blocks/image_4col_01.jpg";
    const defaultImage2 = "/images/blocks/image_4col_02.jpg";
    const defaultImage3 = "/images/blocks/image_4col_03.jpg";  
    const defaultImage4 = "/images/blocks/image_4col_04.jpg";

    let image1 = defaultImage1;
    let image2 = defaultImage2;
    let image3 = defaultImage3;
    let image4 = defaultImage4;
  
    if(props.image1){
      image1 = props.image1;
    }
    if(props.image2){
      image2 = props.image2;
    }
    if(props.image3){
      image3 = props.image3;
    }
    if(props.image4){
        image4 = props.image4;
      }     

  return (
    <div className='block4c-container'>
        <div className='block4c-item-wrapper'>
            <div className='block4c-body'>
              <LazyLoadImage className='block4c-image' alt='image1' src={image1}/>
            </div>
        </div>
        <div className='block4c-item-wrapper'>
            <div className='block4c-body'>
              <LazyLoadImage className='block4c-image' alt='image2' src={image2}/>
            </div>
        </div>
        <div className='block4c-item-wrapper'>
            <div className='block4c-body'>
              <LazyLoadImage className='block4c-image' alt='image3' src={image3}/>
            </div>
        </div>
        <div className='block4c-item-wrapper'>
            <div className='block4c-body'>
              <LazyLoadImage className='block4c-image' alt='image4' src={image4}/>
            </div>
        </div>
    </div>
  )
}
