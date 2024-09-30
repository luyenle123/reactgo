import React, { memo } from 'react'
import '../../styles/footer.css';

const Footer = () => {
  console.log('>> render FOOTER');
  return (
    <div className='footer'>
      <p>GO GO</p>
    </div>
  )
}

export default memo(Footer);