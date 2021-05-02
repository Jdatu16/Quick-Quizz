const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
finalScore.innerText = mostRecentScore;
username.addEventListener("keyup", () => {
  if (username.value.length >= 2) {
    saveScoreBtn.disabled = false;
  } else {
    saveScoreBtn.disabled = true;
  }
});

saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    name: username.value,
    score: mostRecentScore,
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
};
