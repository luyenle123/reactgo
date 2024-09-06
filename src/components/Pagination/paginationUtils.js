const BuildSortParam = (type) => {
  switch(type){
      case(1):
          return 'sortBy=price&order=asc';
      case(2):
          return 'sortBy=price&order=desc';
      case(3):
          return 'sortBy=title&order=asc';
      case(4):
          return 'sortBy=title&order=desc';
      default:
          return 'sortBy=price&order=asc';
  }
}

const  GetPageInfo = (total, resultLength, page, pageSize, sorting) => {
    //var total = res.total;
    var totalPageinD = total / pageSize;
    var totalPageInt = parseInt(totalPageinD, 10);
    if(totalPageInt < totalPageinD)
        totalPageInt +=1;
    var totalPage = totalPageInt;

    var pageNumber = parseInt(page, 10);
    var currentEntries = ((pageNumber - 1) * pageSize) + resultLength; //res.products.length;

    const paginationNumbers = [];
    var currentPage = parseInt(page);    
    var pageRender = 5;

    if(currentPage < pageRender ){
      
      if(totalPage < pageRender){
        for (let i = 1; i <= totalPage; i++) {
          paginationNumbers.push(i);
        }
      }
      else{
        for (let i = 1; i <= pageRender; i++) {
          paginationNumbers.push(i);
        }
        paginationNumbers.push(0);
        paginationNumbers.push(totalPage);
      }
    }
    else if (currentPage >= (totalPage - 5)){
      paginationNumbers.push(1);
      paginationNumbers.push(-1);

      for (let i = (totalPage - 4); i <= totalPage; i++) {
        paginationNumbers.push(i);
      }
    }
    else{
      
      paginationNumbers.push(1);
      paginationNumbers.push(-1);

      paginationNumbers.push(currentPage - 1);
      paginationNumbers.push(currentPage);
      paginationNumbers.push(currentPage + 1);

      paginationNumbers.push(-2);
      paginationNumbers.push(totalPage);
    }

    const allPaginationNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      allPaginationNumbers.push(i);
    }
    
    var showFrom = (page - 1) * pageSize;
    var showTo = showFrom + resultLength;
    showFrom ++;

    return {
        total: total, 
        currentEntry: currentEntries,
        totalPage: totalPage, 
        page: pageNumber,
        pageSize: pageSize,
        sorting: sorting,
        paginationNumbers: paginationNumbers,
        allPaginationNumbers: allPaginationNumbers,
        showFrom: showFrom,
        showTo: showTo
    };
}

export {GetPageInfo, BuildSortParam};