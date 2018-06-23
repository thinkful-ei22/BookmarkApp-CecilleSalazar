'use strict'

const STORE = {
  items: [
    {title: 'Youtube', url: 'https://www.youtube.com/', desc: 'My favorite video hosting website.', rating: 1, expandedView: false, hide: false},
    {title: 'Pandora', url: 'https://www.pandora.com/', desc: 'My favorite online radio website.', rating: 2, expandedView: false, hide: false},
    {title: 'NPR', url: 'https://www.npr.org/', desc: 'My favorite news website.', rating: 3, expandedView: false, hide: false},
  ],
  filterByRating: null,
  displayBookmarkForm: false,
  displayDropDown: false,
}

function hideByStarRating(ratingNum) {
   STORE.items.forEach(item => {
     item.rating !== ratingNum ? item.hide = true : null
   });
}
function showAllItems() {
  STORE.items.forEach(item => {
    item.hide = false
  });
}

function handleFilterByRating() {
  $('.container').on('click', '.myDropdownText', event => {
    const num = $(event.target).data('star-rating');
    if (STORE.filterByRating === num){
      showAllItems();
      STORE.filterByRating = null;
    } else {
      STORE.filterByRating = num;
      hideByStarRating(num);
    }
    display();
  })
}

function render() {
  return `
      <section class="navContent">
        <div class="navbar">
          <h2 class="logo">myBookmark</h2>
            <div class="dropdown">
              <button class="dropbtn">Minimum Rating</button>
                <div id="myDropdown" class="dropdown-content ${STORE.displayDropDown ? 'show' : ''}">
                  <a class="myDropdownText" data-star-rating="1" href="#">1 Star</a>
                  <a class="myDropdownText" data-star-rating="2" href="#">2 Star</a>
                  <a class="myDropdownText" data-star-rating="3" href="#">3 Star</a>
                  <a class="myDropdownText" data-star-rating="4" href="#">4 Star</a>
                  <a class="myDropdownText" data-star-rating="5" href="#">5 Star</a>
                </div>
            </div>
        </div>
      </section>

      <section class="createBookmark">
        <div class="addBookmarkButton">
          <button class="actualBookmarkButton">Add Bookmark</button>
        </div>

        ${renderAddBookmarkForm()}

        ${renderItems()}
      </section>`
}

function displayDropDownContent() {
  $('.container').on('click', '.dropbtn', event => {
    STORE.displayDropDown = !STORE.displayDropDown;
    display();
  });
}


function renderAddBookmarkForm() {
  return STORE.displayBookmarkForm ? `
    <form class="addBookmark">

      <label for="addBookmark">Add Bookmark</label>
        <input type="text" name="titleInput" class="userTextInput" placeholder="e.g., Youtube">
        <input type="text" name="urlInput" class="userUrlInput" placeholder="e.g., https://www.youtube.com/">
        <input type="text" name="descInput" class="userdescInput" placeholder="My favorite free video hosting service.">

        <div class="radioButtons">
          <input type="radio" class="starReviewChoices" name="stars" value="1">
          <label for="starChoice1">1 star</label>

          <input type="radio" class="starReviewChoices" name="stars" value="2">
          <label for="starChoice2">2 stars</label>

          <input type="radio" class="starReviewChoices" name="stars" value="3">
          <label for="starChoice3">3 stars</label>

          <input type="radio" class="starReviewChoices" name="stars" value="4">
          <label for="starChoice4">4 stars</label>

          <input type="radio" class="starReviewChoices" name="stars" value="5">
          <label for="starChoice5">5 stars</label>
        </div>

        <button name="submitBookmarkButton" class="submitNewBookmarkButton" type="submit">Submit</button>

    </form>`
    : '';
}

function renderItems() {
  return `
      <ul class="bookmarksList">
        ${STORE.items.map((item, index) => `
          <div class="indivBookmark ${item.hide ? 'hide' : ''}" data-item-id="${item.id}">
            <li>${item.title} rating: ${item.rating}</li>
            ${item.expandedView ? `
              <li><a href="${item.url}">Visit Site</a></li>
              <li>${item.desc}</li>
              <li>${item.rating}</li>`
            : ''}
            <button class="expandViewButton">Expand View</button>
            <button class="deleteButton" type="submit">Delete Bookmark</button>
          </div>
        `).join("\n")}
      </ul>`;
}

function handleExpandViewButtonClicked() {
  $('.container').on('click', '.expandViewButton', event => {
    const id = $(event.target).closest('div.indivBookmark').data('item-id');
    const filteredSTORE = STORE.items.map((item) => {
      if (item.id === id) {
        item.expandedView = !item.expandedView;
      }
      return item;
    })
    STORE.items = filteredSTORE;
    display();
  })
}

function handleAddBookmarkButtonClicked() {
  $('.container').on('click', '.addBookmarkButton', event => {
    STORE.displayBookmarkForm = !STORE.displayBookmarkForm;
    display();
  })
}

function addNewBookmark() {
  $('.container').on('submit', '.addBookmark', event => {
    event.preventDefault();
    const title = $(event.target).find('.userTextInput').val();
    const url = $(event.target).find('.userUrlInput').val();
    const desc = $(event.target).find('.userdescInput').val();
    const ratingString = $(event.target).find('input:radio[name=stars]:checked').val();
    const rating = parseInt(ratingString, 10);
    const expandedView = false;
    const hide = false;
    try {
      let newItem = createBookmark({title, url, desc, rating, expandedView, hide,});
      display();
    }
    catch(error) {
      alert(error.message)
    }

  })
}

function createBookmark({title, url, desc, rating, expandedView, hide}) {
  if (title.length < 1) {
    throw Error('Title must be at least 1 character!');
  }
  if (url.length < 5) {
    throw Error('Url must be more than 4 characters! ')
  }
  if (!url.includes("http")) {
    throw Error('Url must include protocol (http/https)!')
  }
  if (desc.length < 1) {
    throw Error('desc must be at least 1 character!')
  }
api.createBookmark({title, url, desc, rating}, response => {
  response.expandedView = expandedView;
  response.hide = hide;
  STORE.items.push(response);
  display();
})

}
function removeBookmark() {
  $('.container').on('click', '.deleteButton', event => {
  const id = $(event.target).closest('div.indivBookmark').data('item-id');

    api.removeBookmark(id, response => {
      //STORE.items.splice(id, 1)

      const filteredSTORE = STORE.items.filter((item) => {
        if (item.id !== id) {
        return item;
        }

      })
      STORE.items = filteredSTORE;



      display();
    })
  })
}

function initialize() {
  api.getBookmarks((items) => {
  STORE.items = items;
  display();
  });
}

function handlersSetup() {
  // handlers go here!
  handleAddBookmarkButtonClicked();
  handleExpandViewButtonClicked()
  addNewBookmark();
  removeBookmark();
  displayDropDownContent()
  handleFilterByRating()

}

function display() {
  $('.container').html(render());
}

$(document).ready(function() {
  handlersSetup();
  initialize();
})


// For testing only
window.STORE = STORE;
window.display = display;
