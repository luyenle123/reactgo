import '../../styles/loader.css';

const Loader = ({isActive}) => {
  var display = isActive ? 'loader-main active' : 'loader-main inActive';
  if(isActive === undefined)
  {
    display = 'loader-main active';
  }

  return (
    <>
      <div id='loader' className={display} >
        <div className="loader-bg"></div>        
        <div className='loader-container'>          
          <span className="loader"></span>
        </div>
      </div> 
    </>
  )
}


const LoaderToggle = (display) => {
  const loader = document.getElementById('loader');  
  if(display){
    ShowLoader(loader, true)
  }
  else{
    FadeLoader();
  }
}

function ShowLoader(show){
  var loader = document.getElementById('loader');
  if(loader)
  {
    if(show){
      loader.style.opacity = 1;
      loader.classList.remove('inActive');
      loader.classList.add('active');      
    }
    else{
      loader.classList.remove('active');
      loader.classList.add('inActive');
    }
  }
}

function FadeLoader() {
  try{

    var loader = document.getElementById('loader');
    if(!loader){
      return;
    }

    var opacity = loader.style.opacity;
    if (opacity > 0) {
       opacity -= 0.1;
       setTimeout(function(){FadeLoader()},10);
    }
    loader.style.opacity = opacity;
  
    if(opacity <=0 )
    {
      ShowLoader(false);
    } 
  }
  catch(err){
    ShowLoader(false);
  }
 
} 

export { Loader, LoaderToggle }