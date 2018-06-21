'use strict'

const STORE = {
  items: [
    {title: 'Youtube', address: 'https://www.youtube.com/', description: 'My favorite video hosting website.', rating: 5},
    {title: 'Pandora', address: 'https://www.pandora.com/', description: 'My favorite online radio website.', rating: 5},
    {title: 'NPR', address: 'https://www.npr.org/', description: 'My favorite news website.', rating: 5},
  ],
  displayBookmarkForm: false,
}

function render() {
  return `
  <!--NavBar Dropdown-->

      <section class="navContent">
        <div class="navbar">
          <h2 class="logo">myBookmark</h2>
            <div class="dropdown">
              <button class="dropbtn">Minimum Rating</button>
                <div id="myDropdown" class="dropdown-content">
                  <a class="myDrowpdownText" href="#">1 Star</a>
                  <a class="myDrowpdownText" href="#">2 Star</a>
                  <a class="myDrowpdownText" href="#">3 Star</a>
                  <a class="myDrowpdownText" href="#">4 Star</a>
                  <a class="myDrowpdownText" href="#">5 Star</a>
                </div>
            </div>
        </div>
      </section>


      <!--                Contains Form for Adding a Bookmark                  -->
      <section class="createBookmark">
        <div class="addBookmarkButton">
          <button>Add Bookmark</button>
        </div>

        <form class="addBookmark" style="${STORE.displayBookmarkForm ? '' : 'display: none'}">

          <label for="addBookmark">Add Bookmark</label>
            <input type="text" class="userTextInput" placeholder="e.g., Youtube">
            <input type="text" class="userUrlInput" placeholder="e.g., https://www.youtube.com/">
            <input type="text" class="userDescriptionInput" placeholder="My favorite free video hosting service.">

        </form>
  <!--Review Radio Buttons-->
        <form class="submitReview">
            <div class="radioButtons">
              <input type="radio" class="starReviewChoices" name="stars" value="1star">
              <label for="starChoice1">1 star</label>

              <input type="radio" class="starReviewChoices" name="stars" value="2stars">
              <label for="starChoice2">2 stars</label>

              <input type="radio" class="starReviewChoices" name="stars" value="3stars">
              <label for="starChoice3">3 stars</label>

              <input type="radio" class="starReviewChoices" name="stars" value="4stars">
              <label for="starChoice4">4 stars</label>

              <input type="radio" class="starReviewChoices" name="stars" value="5stars">
              <label for="starChoice5">5 stars</label>
            </div>

            <button class="submitReviewButton" type="submit">Submit</button>
        </form>
        ${renderItems(STORE.items)}
      </section>`
}

function renderItems(items) {
  return `
    <ul class="bookmarksList">
      ${items.map(item => `
        <div class="indivBookmark">
          <li>${item.title}</li>
          <button class="deleteButton" type="submit">Delete Bookmark</button>
        </div>
      `).join("\n")}
    </ul>`;
}

function handleAddBookmarkButtonClicked() {
  $('.addBookmarkButton').on('click', event => {
    //Put Code Here That Pushes the CreateBookmark Section Class into html


  })
}

function handlersSetup() {
  // handlers go here!
  display();
}

function display() {
  $('.container').html(render());
}

$(handlersSetup)
// For testing only
window.STORE = STORE;
window.display = display;
