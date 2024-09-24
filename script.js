const projects = [
  {
    name: "PomoStudy",
    description: "A Pomodoro timer application designed to enhance productivity and focus during study sessions.",
    technologies: "HTML, CSS, JavaScript",
    link: "https://github.com/shamar251/PomoStudy",
    image: "pomostudy_screenshot.png" // Assuming you'll add a screenshot of the app
  }
];

const insights = [
  {
    title: "The Future of Web Development",
    content: "Exploring emerging technologies and methodologies shaping the future of web development."
  }
];

function populateProjects() {
  const projectList = document.getElementById('project-list');
  projects.forEach((project, index) => {
    const li = document.createElement('li');
    li.textContent = project.name;
    li.addEventListener('click', () => showProjectDetails(index));
    projectList.appendChild(li);
  });
}

function showProjectDetails(index) {
  const project = projects[index];
  const detailsElement = document.getElementById('content-details');

  let content = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <p>Technologies: ${project.technologies}</p>
        <a href="${project.link}" class="case-study-btn" target="_blank">View Project</a>
    `;

  if (project.image) {
    content = `<img src="${project.image}" alt="${project.name} screenshot" class="project-image">` + content;
  }

  detailsElement.innerHTML = content;

  fadeIn(detailsElement);
}

function populateInsights() {
  const insightsList = document.getElementById('insights-list');
  insights.forEach((insight, index) => {
    const li = document.createElement('li');
    li.textContent = insight.title;
    li.addEventListener('click', () => showInsightDetails(index));
    insightsList.appendChild(li);
  });
}

function showInsightDetails(index) {
  const insight = insights[index];
  const detailsElement = document.getElementById('content-details');

  detailsElement.innerHTML = `
        <h3>${insight.title}</h3>
        <p>${insight.content}</p>
    `;

  fadeIn(detailsElement);
}

function fadeIn(element) {
  element.style.opacity = 0;
  let opacity = 0;
  const timer = setInterval(() => {
    if (opacity >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = opacity;
    opacity += 0.1;
  }, 50);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Intersection Observer for section highlighting
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.7
};

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(item => {
        if (item.getAttribute('href') === `#${id}`) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

document.addEventListener('DOMContentLoaded', () => {
  populateProjects();
  populateInsights();
  showProjectDetails(0); // Show details for the PomoStudy project by default
});