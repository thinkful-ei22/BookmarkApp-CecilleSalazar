const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Cecille';

  const getBookmarks = function (callback) {
    $.getJSON(`${BASE_URL}/bookmarks`,callback);
  };


const createBookmark = function(obj, onSuccess, onError) {
  console.log(obj);
    const newBookmark = JSON.stringify(obj);
    $.ajax({
      url: BASE_URL + '/bookmarks',
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: onSuccess,
      error: onError,
    });
  };



  return {
    getBookmarks,
    createBookmark,

  };
}());
