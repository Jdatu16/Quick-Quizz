const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map((participant) => {
    return `<li class="high-Score">${participant.name} - ${participant.score}</li>`;
  })
  .join("");
