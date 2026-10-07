const parseCsv = (text) => {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines.shift().split(",");
  return lines.map((line) => {
    const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    return headers.reduce((project, header, index) => {
      project[header] = (values[index] || "").replace(/^"|"$/g, "").trim();
      return project;
    }, {});
  });
};

const fallbackProjects = [
  {
    title: "Text-to-Voice Speech",
    type: "Python application",
    description: "A lightweight text-to-speech converter that turns written text into spoken audio, with real-time playback and MP3 export.",
    stack: "Python • TTS • Audio",
    link: "https://github.com/surajch015/Text-to-voice-speech"
  },
  {
    title: "Snake Game",
    type: "Python game",
    description: "A classic Snake Game with smooth controls, score tracking, food spawning, and game-over detection, built to practice Python and game development.",
    stack: "Python • Game development",
    link: "https://github.com/surajch015/Snake-game----pyhton"
  },
  {
    title: "Stone Paper Scissor",
    type: "Python mini-project",
    description: "A terminal-based tournament game where players compete against the computer across multiple rounds while scores are tracked until a target score is reached.",
    stack: "Python • Game logic",
    link: "https://github.com/surajch015/Stone-Paper-Scissor-Python-Program"
  }
];

const renderProjects = (projects) => {
  const list = document.querySelector("#project-list");
  list.innerHTML = projects.map((project, index) => `
    <a class="project-card" href="${project.link}" target="_blank" rel="noreferrer">
      <span class="project-number">0${index + 1} / ${project.type}</span>
      <div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
      <div class="project-meta"><span>${project.stack}</span><span class="project-arrow">↗</span></div>
    </a>
  `).join("");
};

const loadProjects = async () => {
  try {
    const response = await fetch("projects.csv");
    if (!response.ok) throw new Error(`Could not load projects.csv (${response.status})`);
    renderProjects(parseCsv(await response.text()));
  } catch (error) {
    renderProjects(fallbackProjects);
    console.error(error);
  }
};

document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const nav = document.querySelector(".site-nav");
  const isOpen = nav.classList.toggle("is-open");
  event.currentTarget.setAttribute("aria-expanded", isOpen);
});
document.querySelectorAll(".site-nav a").forEach((link) => link.addEventListener("click", () => document.querySelector(".site-nav").classList.remove("is-open")));
document.querySelector("#year").textContent = new Date().getFullYear();
loadProjects();
