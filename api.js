const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Cecille';

  const getBookmarks = function (callback) {
    $.getJSON(`${BASE_URL}/bookmarks`,callback);
};


const createBookmark = function(obj, onSuccess, onError) {
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

const removeBookmark = function(id, callback) {
  $.ajax({
    url: `${BASE_URL}/bookmarks/${id}`,
    method: 'DELETE',
    contentType: 'application/json',
    success: callback,
  });
}

  return {
    getBookmarks,
    createBookmark,
    removeBookmark,

  };
}());
