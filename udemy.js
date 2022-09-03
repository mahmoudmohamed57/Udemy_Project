let courses = [];
let curCourse = 'Python';
const courseinfo = document.querySelector('.carousel-inner');
const courseContent = document.querySelector('.course-content');
const searchBar = document.querySelector('#search');
const buttonSearch = document.querySelector('#button-search');
const buttonCategoryPython = document.querySelector('#Python');
const buttonCategoryExcel = document.querySelector('#Excel');
const buttonCategoryWeb = document.querySelector('#Web');
const buttonCategoryJavascript = document.querySelector('#Javascript');
const buttonCategoryData = document.querySelector('#Data');
const buttonCategoryAWS = document.querySelector('#AWS');
const buttonCategoryDrawing = document.querySelector('#Drawing');

let categoriesContent = {
  Python: {
    name: 'Python',
    title: 'Top courses in Python',
    header: 'Expand your career opportunities with Python',
    description:
      'Take one of Udemy’s range of Python courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You’ll learn how to build everything from games to sites to apps. Choose from a range of courses that will appeal to both beginners and advanced developers alike.',
  },
  Excel: {
    name: 'Excel',
    title: 'Top courses in Excel',
    header: 'Analyze and visualize data with Excel',
    description:
      'Take a Microsoft Excel course from Udemy, and learn how to use this industry-standard software. Real-world experts will show you the basics like how to organize data into sheets, rows and columns, and advanced techniques like creating complex dynamic formulas. Both small businesses and large companies use Excel to turn their raw data into actionable insights.',
  },
  Web: {
    name: 'Web Development',
    title: 'Top courses in Web Development',
    header: 'Build websites and applications with Web Development',
    description:
      'The world of web development is as wide as the internet itself. Much of our social and vocational lives play out on the internet, which prompts new industries aimed at creating, managing, and debugging the websites and applications that we increasingly rely on.',
  },
  Javascript: {
    name: 'JavaScript',
    title: 'Top courses in JavaScript',
    header: 'Grow your software development skills with JavaScript',
    description:
      'JavaScript is a text-based computer programming language used to make dynamic web pages. A must-learn for aspiring web developers or programmers, JavaScript can be used for features like image carousels, displaying countdowns and timers, and playing media on a webpage. With JavaScript online classes, you can learn to build',
  },
  Data: {
    name: 'Data Science',
    title: 'Top courses in Data Science',
    header: 'Lead data-driven decisions with Data Science',
    description:
      'Data science application is an in-demand skill in many industries worldwide — including finance, transportation, education, manufacturing, human resources, and banking. Explore data science courses with Python, statistics, machine learning, and more to grow your knowledge. Get data science training if you’re into research, statistics, and analytics.',
  },
  AWS: {
    name: 'AWS Certification',
    title: 'Top courses in AWS Certification',
    header: 'Become an expert in cloud computing with AWS Certification',
    description:
      'Prep for your AWS certification with an AWS course on Udemy. Learn the fundamentals of AWS such as working with a serverless platform, the various frameworks, security and more. With these courses, you’ll build the valuable skills you need to implement cloud initiatives — and open up new career opportunities. If you want to become an AWS developer, we’ve got the course for you.',
  },
  Drawing: {
    name: 'Drawing',
    title: 'Top courses in Drawing',
    header: 'Expand your creative skillset with Drawing',
    description:
      'Want to start drawing for fun or take your craft to the next level? Explore our online drawing classes and learn pencil drawing, figure drawing, cartoon drawing, character drawing for cartoons and anime, illustration, sketching, shading and more. Take an overview course on the fundamentals of drawing or zero in on an area you’d like to improve with a specialized course. We’ve got tons of options to get — and keep — you going.',
  },
};

const renderCourseContent = () => {
  let str = `
          <h1 id="title">${categoriesContent[curCourse].header}</h1>
          <p>${categoriesContent[curCourse].description}</p>
          <button id="button-primary">${categoriesContent[curCourse].name}</button>
          `;
  courseContent.innerHTML = str;
};

function RunCarousel(new_Courses) {
  let sz = Math.floor(courseinfo.clientWidth / 248);
  let t = '';
  let pages = Math.ceil(new_Courses.length / sz);
  for (let i = 0; i < pages; i++) {
    t += `<div class="carousel-item ${i == 0 ? 'active' : ''}">
          <div class='cards-wrapper'>`;
    for (let j = 0; j + i * sz < new_Courses.length && j < sz; j++) {
      t += renderCourses(new_Courses[i * sz + j]);
    }
    t += `</div></div>`;
  }
  courseinfo.innerHTML = t;
}

const renderCourses = (array) => {
  let str = ``;
  let rate = '';
  for (let i = 1; i <= 5; i++) {
    if (array.rate >= i) {
      rate += `<span class="fa fa-star checked"></span>`;
    } else if (array.rate + 0.9 >= i) {
      rate += `<span class="fa fa-star-half-stroke"></span>`;
    } else {
      rate += `<span class="fa-regular fa-star"></span>`;
    }
  }
  let instructors = '',
    index = 0;
  for (let element of array.instructors) {
    if (index) instructors += ',';
    instructors += element.name;
    index++;
  }
  str += `
  <div class = "card-course">
       <img class="card-img" src=${array.image} alt="slide 1">
        <h4 class="card-title">${array.title}</h4>
        <p class="card-text">${instructors}</p>
        <p><span>${array.rating.toFixed(1)}</span>${rate}</p>
        <p><b>E£${array.price}</b></p>  
  </div>`;
  return str;
};

const getData = async () => {
  let allCources = [];
  const x = Object.keys(categoriesContent);
  for (let i = 0; i < x.length; i++) {
    const response = await fetch(`http://localhost:3000/${x[i]}`);
    const data = await response.json();
    allCources.push(...data);
  }
  return allCources;
};

const getCourses = async () => {
  courses = await getData();
  disActive();
  buttonCategoryPython.classList.add('category-active');
  curCourse = 'Python';
  renderCourseContent();
  const newCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(curCourse.toLowerCase())
  );
  RunCarousel(newCourses);
};

getCourses();
addEventListener('resize', (fun) => {
  RunCarousel(courses);
});

buttonSearch.addEventListener('click', (e) => {
  e.preventDefault();
  const value = searchBar.value;
  const newCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(curCourse.toLowerCase())
  );
  const newCourses1 = newCourses.filter(
    (c) =>
      c.title.toLowerCase().includes(value.toLowerCase()) ||
      c.instructors[0].name.toLowerCase().includes(value.toLowerCase())
  );
  RunCarousel(newCourses1);
});

const disActive = () => {
  buttonCategoryPython.classList.remove('category-active');
  buttonCategoryExcel.classList.remove('category-active');
  buttonCategoryAWS.classList.remove('category-active');
  buttonCategoryData.classList.remove('category-active');
  buttonCategoryDrawing.classList.remove('category-active');
  buttonCategoryJavascript.classList.remove('category-active');
  buttonCategoryWeb.classList.remove('category-active');
};

buttonCategoryPython.addEventListener('click', (e) => {
  disActive();
  buttonCategoryPython.classList.add('category-active');
  curCourse = 'Python';
  renderCourseContent();
  const newCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(curCourse.toLowerCase())
  );
  RunCarousel(newCourses);
});

buttonCategoryExcel.addEventListener('click', (e) => {
  disActive();
  buttonCategoryExcel.classList.add('category-active');
  curCourse = 'Excel';
  renderCourseContent();
  const newCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(curCourse.toLowerCase())
  );
  RunCarousel(newCourses);
});

buttonCategoryWeb.addEventListener('click', (e) => {
  disActive();
  buttonCategoryWeb.classList.add('category-active');
  curCourse = 'Web';
  renderCourseContent();
  const newCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(curCourse.toLowerCase())
  );
  RunCarousel(newCourses);
});

buttonCategoryJavascript.addEventListener('click', (e) => {
  disActive();
  buttonCategoryJavascript.classList.add('category-active');
  curCourse = 'Javascript';
  renderCourseContent();
  const newCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(curCourse.toLowerCase())
  );
  RunCarousel(newCourses);
});

buttonCategoryData.addEventListener('click', (e) => {
  disActive();
  buttonCategoryData.classList.add('category-active');
  curCourse = 'Data';
  renderCourseContent();
  const newCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(curCourse.toLowerCase())
  );
  RunCarousel(newCourses);
});

buttonCategoryAWS.addEventListener('click', (e) => {
  disActive();
  buttonCategoryAWS.classList.add('category-active');
  curCourse = 'AWS';
  renderCourseContent();
  const newCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(curCourse.toLowerCase())
  );
  RunCarousel(newCourses);
});

buttonCategoryDrawing.addEventListener('click', (e) => {
  disActive();
  buttonCategoryDrawing.classList.add('category-active');
  curCourse = 'Drawing';
  renderCourseContent();
  const newCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(curCourse.toLowerCase())
  );
  RunCarousel(newCourses);
});
