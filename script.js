// Adding Js that will fetch images from the API and display the images on our website

const accessKey = "BPXBWllMxQYxPk6RAC3Wii3wGUyPLLMHeA08d6SHaSo";

// Create variable for elements
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

//get a API from where we can get the images, Unsplash.com
//API url
// https://api.unsplash.com/search/photos?page=1&query=office

let keyword = "";
let page = 1;

async function searchImages() {
  // store the value that we will enter in the input field

  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
  // get the response in our browser
  const response = await fetch(url);
  const data = await response.json();
  // print the data
  // console.log(data);
  const results = data.results;

  if (page === 1) {
    searchResult.innerHTML = "";
  }
  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    //add target_blank so that the link will open in new tab
    imageLink.target = "_blank";

    //place image inside this tag
    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
    showMoreBtn.style.display = "block";
  });
}

//add submit event on the form
searchForm.addEventListener("submit", (e) => {
  // prevent the default feature when we submit the form
  e.preventDefault();
  //page 1 when everytime we enter any new keyword page become 1
  page = 1;
  searchImages();
});

//add click event on show more button
showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
