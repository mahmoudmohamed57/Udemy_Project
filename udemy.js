let courses = [];
let curCourse = 'Python';
const coursesContainer = document.querySelector('.carousel-inner');
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
  courseContent.innerHTML = `
          <h1 id="title">${categoriesContent[curCourse].header}</h1>
          <p>${categoriesContent[curCourse].description}</p>
          <button id="button-primary">${categoriesContent[curCourse].name}</button>
          `;
};

const renderCourses = (array) => {
  let str = ``;
  array.forEach((c, i) => {
    let rate = '';
    for (let i = 1; i <= 5; i++) {
      if (c.rating >= i) {
        rate += `<span class="fa fa-star checked"></span>`;
      } else if (c.rating + 0.9 >= i) {
        rate += `<span class="fa fa-star-half-stroke"></span>`;
      } else {
        rate += `<span class="fa-regular fa-star"></span>`;
      }
    }
    let instructors = '',
      index = 0;
    for (let element of c.instructors) {
      if (index) instructors += ',';
      instructors += element.name;
      index++;
    }
    if (i == 0) {
      str += `
          <div class='carousel-item col-md-3 active'>
                 <div class="panel panel-default">
                    <div class="panel-thumbnail">
                      <a href="#" title="image 1" class="thumb">
                        <img class="img-fluid mx-auto d-block" src=${
                          c.image
                        } alt="slide 1">
                      </a>
                      <h4 class="card-title">${c.title}</h4>
                      <p class="card-text">${instructors}</p>
                      <p>
                      <span>${c.rating.toFixed(1)}</span>
                      ${rate}
                      </p>
                      <p><b>E£${c.price}</b></p>
                    </div>
                  </div>
              </div>
            `;
    } else {
      str += `
          <div class='carousel-item col-md-3 '>
                 <div class="panel panel-default">
                    <div class="panel-thumbnail">
                      <a href="#" title="image 1" class="thumb">
                        <img class="img-fluid mx-auto d-block" src=${
                          c.image
                        } alt="slide 1">
                      </a>
                      <h4 class="card-title">${c.title}</h4>
                      <p class="card-text">${instructors}</p>
                      <p>
                      <span>${c.rating.toFixed(1)}</span>
                      ${rate}
                      </p>
                      <p><b>E£${c.price}</b></p>
                    </div>
                  </div>
              </div>
            `;
    }
  });
  coursesContainer.innerHTML = str;
};

const getCourses = async (link) => {
  const response = await fetch(link);
  const data = await response.json();
  courses = data;
  renderCourseContent();
  renderCourses(courses);
};

getCourses('http://localhost:3000/Python');

buttonSearch.addEventListener('click', (e) => {
  e.preventDefault();
  const value = searchBar.value;
  const newCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(value.toLowerCase())
  );
  renderCourses(newCourses);
});

buttonCategoryPython.addEventListener('click', (e) => {
  curCourse = 'Python';
  renderCourseContent();
  getCourses('http://localhost:3000/Python');
});

buttonCategoryExcel.addEventListener('click', (e) => {
  curCourse = 'Excel';
  renderCourseContent();
  getCourses('http://localhost:3000/Excel');
});

buttonCategoryWeb.addEventListener('click', (e) => {
  curCourse = 'Web';
  renderCourseContent();
  getCourses('http://localhost:3000/Web');
});

buttonCategoryJavascript.addEventListener('click', (e) => {
  curCourse = 'Javascript';
  renderCourseContent();
  getCourses('http://localhost:3000/Javascript');
});

buttonCategoryData.addEventListener('click', (e) => {
  curCourse = 'Data';
  renderCourseContent();
  getCourses('http://localhost:3000/Data');
});

buttonCategoryAWS.addEventListener('click', (e) => {
  curCourse = 'AWS';
  renderCourseContent();
  getCourses('http://localhost:3000/AWS');
});

buttonCategoryDrawing.addEventListener('click', (e) => {
  curCourse = 'Drawing';
  renderCourseContent();
  getCourses('http://localhost:3000/Drawing');
});
