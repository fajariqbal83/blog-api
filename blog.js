

async function loadPosts() {
  let loadUrl =
    "https://wordpress-1471720-5962383.cloudwaysapps.com/wp-json/custom/v1/blog/";

  const urlResponse = await fetch(loadUrl); //calling the website

  const data = await urlResponse.json(); //converting it to real JavaScript data

  return data; //only way to send the result out of function
}

const postPerPage = 6;
let currentPage = 1;

async function showPosts(page, currentPage) {
  const data = await loadPosts();

  console.log(data);

  const start = (page - 1) * postPerPage;
  const end = start + postPerPage;
  const paginatedPosts = data.posts.slice(start, end);

  let displayData = "";

  paginatedPosts.forEach((element) => {
    displayData += `
    
    <div style="display: flex; flex-direction: column;  border-radius: 8px; solid #000; padding: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
    <img style="width:300px" src="${element.featured_image}" alt="">
    <div style="font-weight: bold; font-size: large;">${element.title}</div>
      <div>${element.date}</div>
      </div>
      
    `;
  });

  document.querySelector(".js-blog-display").innerHTML = displayData;
}

async function setupPagination(postPerPage, currentPage) {
  const data = await loadPosts();

  console.log(data);

  const totalPages = Math.ceil(data.posts.length / postPerPage);

  console.log(totalPages);

  let buttonHtml = "";

  for (let i = 1; i <= totalPages; i++) {
    buttonHtml += `<button style="margin-right: 5px;font-size: 18px;" class="js-page-button" data-page="${i}">${i}</button>`;
  }

  const displayButton = (document.querySelector(".js-pagination").innerHTML =
    buttonHtml);

  document.querySelectorAll(".js-page-button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const page = Number(e.target.dataset.page);
      currentPage = page;
      showPosts(currentPage);
    });
  });
}

showPosts(currentPage);

setupPagination(postPerPage, currentPage);

async function loadCategory() {
  let categoryUrl =
    "https://wordpress-1471720-5962383.cloudwaysapps.com/wp-json/custom/v1/categories";

  const categoryResponse = await fetch(categoryUrl);

  const categoryData = await categoryResponse.json();

  return categoryData;
}

loadCategory();



async function loadPostsByName(categoryName) {

  const categoryUrlResponse = await fetch(`https://wordpress-1471720-5962383.cloudwaysapps.com/wp-json/custom/v1/blog/?category=${categoryName}`);

  const NameData = await categoryUrlResponse.json();

  showFilteredPosts(NameData.posts);

  setupPagination(NameData.posts);
}

async function showFilteredPosts(posts) {
  

  let displayData = "";

  posts.forEach((element) => {
    displayData += `
    
    <div style="display: flex; flex-direction: column;  border-radius: 8px; padding: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
    <img style="width:300px" src="${element.featured_image}" alt="">
    <div style="font-weight: bold; font-size: large;">${element.title}</div>
      <div>${element.date}</div>
      </div>
      
    `;
  });

  document.querySelector(".js-blog-display").innerHTML = displayData;

}

setupPagination();

async function displayCategories() {
  const categoryDisplay = await loadCategory();

  console.log(categoryDisplay);

  let displayCategory = "";

  categoryDisplay.forEach((category) => {
    displayCategory += `
    <div style="cursor: pointer;" class="js-blog-name">${category.name}</div>
    `;
  });

  document.querySelector(".js-dropdown-menu").innerHTML = displayCategory;

  const blogName =  document.querySelectorAll('.js-blog-name');

  blogName.forEach((name) => {
    name.addEventListener('click', () => {

      const categoryName = name.textContent

      console.log(categoryName);

     loadPostsByName(categoryName);
      

  });

  })
}

displayCategories();
