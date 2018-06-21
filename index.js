'use strict'

const STORE = {
  items: [
    {title: 'Youtube', address: 'https://www.youtube.com/', description: 'My favorite video hosting website.', rating: 5},
    {title: 'Pandora', address: 'https://www.pandora.com/', description: 'My favorite online radio website.', rating: 5},
    {title: 'NPR', address: 'https://www.npr.org/', description: 'My favorite news website.', rating: 5},
  ]
}

function displayStore(store) {
  const titles = store.items.map(item =>
      item.title
  );
  console.log(titles);

  const storeHTML = titles.map(item => {
    return `
      <ul class="bookmarksList">
        <li>${item}</li>
        <button class="deleteButton" type="submit">Delete Bookmark</button>
      </ul>`
  });

$('.container').html(storeHTML);

}

const renderStore = function() {
  displayStore(STORE);
}



//DROPDOWN FUNCTION

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

const handleAll = function() {
  renderStore();
}


$(handleAll)
