var post_body = new Quill("#post_body", {});
post_body.enable(false);

if (localStorage.getItem("theme") === "light") {
  document.getElementsByTagName("body")[0].style.background = "#2A3F58";
  document.getElementById("header").style.background = "#2A3F58";
} else {
  document.getElementsByTagName("body")[0].style.background = "black";
  document.getElementById("header").style.background = "black";
}

var audio = 0;

window.onbeforeunload = function () {
  window.speechSynthesis.cancel();
};
var r = document.querySelector(":root");
document.getElementById("audio_player").addEventListener("click", () => {
  if (audio === 0) {
    let speech = new SpeechSynthesisUtterance(`${post_body.getText()}`);
    speech.lang = "en";
    window.speechSynthesis.speak(speech);
    r.style.setProperty("--bl", "#03a9f4");
    r.style.setProperty("--lor", "#85C9E1");
    r.style.setProperty("--dor", "#40B2DB");
    r.style.setProperty("--re", "#3DD1DB");
    r.style.setProperty("--pi", "#4FDBD4");
    r.style.setProperty("--pu", "#58F5ED");
    audio = 1;
  } else if (audio === 1) {
    window.speechSynthesis.pause();
    r.style.setProperty("--bl", "black");
    r.style.setProperty("--lor", "black");
    r.style.setProperty("--dor", "black");
    r.style.setProperty("--re", "black");
    r.style.setProperty("--pi", "black");
    r.style.setProperty("--pu", "black");
    audio = 2;
  } else if (audio === 2) {
    window.speechSynthesis.resume();
    r.style.setProperty("--bl", "#03a9f4");
    r.style.setProperty("--lor", "#85C9E1");
    r.style.setProperty("--dor", "#40B2DB");
    r.style.setProperty("--re", "#3DD1DB");
    r.style.setProperty("--pi", "#4FDBD4");
    r.style.setProperty("--pu", "#58F5ED");
    audio = 1;
  }
});

//  document.getElementById("pause").addEventListener("click",()=>{
//     window.speechSynthesis.pause();
//  })

//  document.getElementById("resume").addEventListener("click",()=>{
//     window.speechSynthesis.resume();
//  })
