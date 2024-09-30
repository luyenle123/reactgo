import '../../styles/pagination.css';

const handleAddToCartClick = (e) => {};
const handleLoadMoreClick = (e) => {};
const handleItemDisplayChanged = (e) => {};
const PageChanged = (page, paggeSize) => {}  

export const GetConfig = (isLoading, hasData, pageInfo) => {
    return {
        isLoading: isLoading,
        pageInfo: pageInfo,
        hasData: hasData,
        hideSortOption: false,
        hideDisplayOption: false,
        hideDisplayPageInfo: false,
        hidePageOption: false,

        handleAddToCartClick:handleAddToCartClick,
        handleLoadMoreClick:handleLoadMoreClick,

        handleItemDisplayChanged: handleItemDisplayChanged,
        PageChanged: PageChanged
    } 
}

export const CloneConfig = (config) => {
    return {
        isLoading: config.isLoading,
        pageInfo: config.pageInfo,
        hasData: config.hasData,
        hideSortOption: config.hideSortOption,
        hideDisplayOption: config.hideDisplayOption,
        hideDisplayPageInfo: config.hideDisplayPageInfo,
        hidePageOption: config.hidePageOption,

        handleAddToCartClick:config.handleAddToCartClick,
        handleLoadMoreClick: config.handleLoadMoreClick,

        PageChanged: config.PageChanged,
    } 
}

export const Pagination = ({config}) => {
    const handlePaginationNumberClick = (e) => {
        if(parseInt(e.target.value) === config.pageInfo.page) return;
        if(config.PageChanged)
        {
            config.PageChanged(e.target.value, config.pageInfo.pageSize);
        }
    };
    const handleBackClick = (e) => {
        if(config.pageInfo.page <= 1) return;
        var page = config.pageInfo.page-1;
        if(page <= 0){ page = 1}
        
        if(config.PageChanged)
        {
            config.PageChanged(page, config.pageInfo.pageSize);
        }
    };

    const handleNextClick = (e) => {
        if(config.pageInfo.page >= config.pageInfo.totalPage) return;
        var page = config.pageInfo.page + 1;
        if(page > config.pageInfo.totalPage){ 
            page = config.pageInfo.page
        }
        
        if(config.PageChanged)
        {
            config.PageChanged(page, config.pageInfo.pageSize);
        }
    };

    const handleItemDisplayChanged = (e) => {
        var newPageSize = parseInt(e.target.value);

        if(config.PageChanged)
        {
            config.PageChanged(config.pageInfo.page, newPageSize);
        }        
    };  

    if(config === undefined){
        config = GetConfig(false, false, {});       
    }

    return(
        <div className="pagination">
            <button onClick={handleBackClick} className="pagination-number">&lt;&lt;</button>
            {config.pageInfo.paginationNumbers.map((p) => (
                <PaginationButton key={p} pageinfo={config.pageInfo} page={p} pageNumberBlick={handlePaginationNumberClick}/>
            ))}
            <button onClick={handleNextClick} className="pagination-number">&gt;&gt;</button>

            {!config.hidePageOption && 
                <select onChange={handlePaginationNumberClick} value={config.pageInfo.page}>
                    {config.pageInfo.allPaginationNumbers.map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            }

            <DisplayPageInfo config={config}/>

            <DisplayOption config={config} handleItemDisplayChanged={handleItemDisplayChanged}/>

        </div>
    );
};

export function DisplayPageInfo ({config}) {
    if(config === undefined){ return;}
    if(config.hideDisplayPageInfo){
        return(
            <></>
        );
    }
    else{
        return(
            <span className="page-number">page {config.pageInfo.page} of {config.pageInfo.totalPage} / Showing {config.pageInfo.showFrom} to {config.pageInfo.showTo} of {config.pageInfo.total} entries</span>
        );
    }
};

export function DisplayOption (props) {
    if(props.config === undefined){ return;}
    if(props.config.hideDisplayOption){
        return(
            <></>
        );
    }
    else{
        return(
            <>
                &nbsp;
                <span className="page-number">Show: </span>
                <select onChange={props.handleItemDisplayChanged} value={props.config.pageInfo.pageSize}>
                    <option key={1} value={8}>8</option>
                    <option key={2} value={12}>12</option>
                    <option key={3} value={16}>16</option>
                    <option key={4} value={20}>20</option>
                    <option key={5} value={40}>40</option>
                    <option key={6} value={60}>60</option>
                    <option key={7} value={100}>100</option>
                </select>
                <span className="other-text">Entries</span>
            </>
        );
    }
};

export function SortOption ({config}) {
    if(config === undefined){ return;}
    if(config.hideSortOption){
        return(
            <></>
        );
    }
    else{
        return(
            <>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="page-number">Sort: </span>
                <select onChange={config.handleSortingChanged} value={config.pageInfo.sorting}>
                    <option key={1} value={1}>Price: L to H</option>
                    <option key={2} value={2}>Price: H to L</option>
                    <option key={3} value={3}>Title: A-Z</option>
                    <option key={4} value={4}>Title: Z-A</option>
                </select>              
            </>
        );
    }
};

export function PaginationButton({pageinfo, page, pageNumberBlick}){
    var currentPage = parseInt(page);
    if(currentPage > 0){
        return(
            <button className={pageinfo.page === currentPage ? 'pagination-number-active' : 'pagination-number'} key={currentPage} onClick={pageNumberBlick} value={currentPage}>{currentPage}</button>
        );
    }
    else{
        return(
            <button className='pagination-number-empty' key={page} >...</button>
        );
    }
}