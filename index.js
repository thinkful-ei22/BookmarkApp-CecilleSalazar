'use strict'

const STORE = {
  items: [
    {title: 'Youtube', url: 'https://www.youtube.com/', description: 'My favorite video hosting website.', rating: 5, expandedView: false, hide: false},
    {title: 'Pandora', url: 'https://www.pandora.com/', description: 'My favorite online radio website.', rating: 5, expandedView: false, hide: false},
    {title: 'NPR', url: 'https://www.npr.org/', description: 'My favorite news website.', rating: 1, expandedView: false, hide: false},
  ],
  displayBookmarkForm: false,
  displayDropDown: false,
}

function hideByStarRating(ratingNum) {
   STORE.items.forEach(item => {
     item.rating !== ratingNum ? item.hide = true : null
   });
}

function handleFilterByRating1star() {
  $('.container').on('click', '.myDropdownText1', event => {
    hideByStarRating(1);
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
                  <a class="myDropdownText1" href="#">1 Star</a>
                  <a class="myDropdownText" href="#">2 Star</a>
                  <a class="myDropdownText" href="#">3 Star</a>
                  <a class="myDropdownText" href="#">4 Star</a>
                  <a class="myDropdownText" href="#">5 Star</a>
                </div>
            </div>
        </div>
      </section>

      <section class="createBookmark">
        <div class="addBookmarkButton">
          <button>Add Bookmark</button>
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
        <input type="text" class="userTextInput" placeholder="e.g., Youtube">
        <input type="text" class="userUrlInput" placeholder="e.g., https://www.youtube.com/">
        <input type="text" class="userDescriptionInput" placeholder="My favorite free video hosting service.">

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

        <button class="submitNewBookmarkButton" type="submit">Submit</button>

    </form>`
    : '';
}

function renderItems() {

  return `
      <ul class="bookmarksList">
        ${STORE.items.map((item, index) => `
          <div class="indivBookmark ${item.hide ? 'hide' : ''}" data-item-index="${index}">
            <li>${item.title}</li>
            ${item.expandedView ? `
              <li><a href="${item.url}">Visit Site</a></li>
              <li>${item.description}</li>
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
    const itemIndex = $(event.target).closest('div.indivBookmark').data('item-index');
    STORE.items[itemIndex].expandedView = !STORE.items[itemIndex].expandedView;
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
    const description = $(event.target).find('.userDescriptionInput').val();
    const rating = $(event.target).find('input:radio[name=stars]:checked').val();
    try {
      let newItem = createBookmark({title, url, description, rating})
      display();
    }
    catch(error) {
      alert(error.message)
    }

  })
}

function createBookmark({title, url, description, rating}) {
  if (title.length < 1) {
    throw Error('Title must be at least 1 character!');
  }
  if (url.length < 5) {
    throw Error('Url must be more than 4 characters! ')
  }
  if (!url.includes("http") || !url.includes("https")) {
    console.log(url)
    throw Error('Url must include protocol (http/https)!')
  }

  if (description.length < 1) {
    throw Error('Description must be at least 1 character!')
  }

  STORE.items.push({title, url, description, rating});
}

function removeBookmark() {
  $('.container').on('click', '.deleteButton', event => {
  const itemIndex = $(event.target).closest('div.indivBookmark').data('item-index');
  STORE.items.splice(itemIndex, 1);
  display();
  })
}

function handlersSetup() {
  // handlers go here!
  handleAddBookmarkButtonClicked();
  handleExpandViewButtonClicked()
  addNewBookmark();
  removeBookmark();
  displayDropDownContent()
  handleFilterByRating1star()
  display();
}

function display() {
  $('.container').html(render());
}

$(handlersSetup)
// For testing only
window.STORE = STORE;
window.display = display;
