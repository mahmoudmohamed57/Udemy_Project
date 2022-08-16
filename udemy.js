let courses = [];
const coursesContainer = document.querySelector('.courses-list');
const searchBar = document.querySelector('#search');
const searchBtn = document.querySelector('#searchButton');

const renderCourses = (array) => {
  let str = ``;
  array.forEach((c) => {
    str += `
      <div class="course">
        <img
          src=${c.image}
          alt="beatiful alarm"
        />
        <div class="name">${c.title}</div>
        <p class="title">${c.name}</p>
        <div class="review">
        <p>${c.rating}</p>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        </div>
        <div class="price">
        ${c.price}&dollar;
        <span><del>2000&dollar;</del></span>
        </div>
      </div>
        `;
  });
  coursesContainer.innerHTML = str;
};

const getCourses = async (link) => {
  const response = await fetch(link);
  const data = await response.json();
  courses = data;
  renderCourses(courses);
};

getCourses('http://localhost:3000/courses');

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const value = searchBar.value;
  const newCourses = courses.filter(
    (c) => c.title.includes(value) || c.author.includes(value)
  );
  renderCourses(newCourses);
});
