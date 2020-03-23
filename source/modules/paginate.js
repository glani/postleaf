'use strict';

const self = {

  //
  // Generates pagination data.
  //
  //  totalItems* (int) - The total number of items in the collection.
  //  itemsPerPage* (int) - The number of items per page.
  //  currentPage (int) - The current page (default 1).
  //  urlCallback (function) - A callback function accepting a page argument that generates a URL.
  //
  get: (totalItems, itemsPerPage, currentPage, urlCallback) => {
    totalItems = parseInt(totalItems);
    itemsPerPage = parseInt(itemsPerPage) || 1;
    currentPage = parseInt(currentPage) || 1;

    let totalPages = Math.ceil(totalItems / itemsPerPage);
    let prevPage = currentPage > 1 ? currentPage - 1 : null;
    let nextPage = currentPage < totalPages ? currentPage + 1 : null;
    let prevPageUrl = urlCallback && prevPage ? urlCallback(prevPage) : null;
    let nextPageUrl = urlCallback && nextPage ? urlCallback(nextPage) : null;

    // let displayPagesValue = parseInt(displayPages) || 1;;
    let displayPagesValue = 2;
    const num = displayPagesValue / 2;

    let pages = [];
    if (currentPage - num - 1 >= 0) {
      let firstPage = currentPage - num - 1;
      pages.push({'num': firstPage, 'value': 'l', 'url': urlCallback && urlCallback(firstPage + 1)});
    }
    pages.push({'num': 0, 'value': 'l', 'url': urlCallback && urlCallback(10)});

    for (let i = 0; i < totalPages; i++) {
      if (i <= currentPage - num - 1 || i >= currentPage + num - 1) {
        continue;
      }
      pages.push({'num': i, 'value': i + 1, 'url': urlCallback && urlCallback(i + 1)});
    }

    let lastPage = currentPage - 1 + num;
    if (lastPage < totalPages - 1) {
      pages.push({'num': lastPage, 'value': 'r', 'url': urlCallback && urlCallback(lastPage + 1) });
    }
    pages.push({'num': 0, 'value': 'r', 'url': urlCallback && urlCallback(10) });

    return {
      totalItems,
      itemsPerPage,
      currentPage,
      totalPages,
      nextPage,
      nextPageUrl,
      prevPage,
      prevPageUrl,
      pages
    };
  }

};

module.exports = self;
