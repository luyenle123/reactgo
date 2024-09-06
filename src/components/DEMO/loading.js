import '../styles/loading.css';

export const Loader = () => {
  return (
    <>
        <div className="loading-container">
            <div className="loading-bg"></div>
            {/* <div className="loading"><p>Loading...</p></div> */}
            <span className="loader"></span>
        </div>
    </>
  )
}
