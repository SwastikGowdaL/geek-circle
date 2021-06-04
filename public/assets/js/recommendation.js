const rem_1 = document.getElementById("rem_1");
const rem_2 = document.getElementById("rem_2");
const rem_3 = document.getElementById("rem_3");
const rem_4 = document.getElementById("rem_4");
const rem_5 = document.getElementById("rem_5");
const rem_6 = document.getElementById("rem_6");
const rem_7 = document.getElementById("rem_7");
const rem_8 = document.getElementById("rem_8");

const next_btn = document.querySelector(".btn-grad");

var root = document.querySelector(":root");
// document.documentElement.style.setProperty('--tick', ' ');

var id=localStorage.getItem("id");

var recommendation = [
  "coding",
  "technology",
  "geek",
  "computer",
  "crypto",
  "design",
  "internet",
  "software",
];

rem_1.style.filter = "brightness(20%)";
rem_2.style.filter = "brightness(20%)";
rem_3.style.filter = "brightness(20%)";
rem_4.style.filter = "brightness(20%)";
rem_5.style.filter = "brightness(20%)";
rem_6.style.filter = "brightness(20%)";
rem_7.style.filter = "brightness(20%)";
rem_8.style.filter = "brightness(20%)";

next_btn.addEventListener("click", next);

function set_recommendation(path) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: id,
       hashtags:recommendation
      })
      .then((response) => {
        var result = response.data;
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function next() {
  if (recommendation.length <= 3) {
    Swal.fire({
      icon: "error",
      title: "Select atleast 4 hashtags!",
    });
  } else {
    try {
      var result = await set_recommendation(
        "http://127.0.0.1:3000/users/recommendation"
      );
      Swal.fire(
        'Good job!',
        'You changed the hashtags!',
        'success'
      )
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "something went  wrong",
      });
    }
  }
}
// rem_1.addEventListener("click",toggle_rem);
// rem_2.addEventListener("click",toggle_rem);
// rem_3.addEventListener("click",toggle_rem);
// rem_4.addEventListener("click",toggle_rem("computer"));
// rem_5.addEventListener("click",toggle_rem("crypto"));
// rem_6.addEventListener("click",toggle_rem("design"));
// rem_7.addEventListener("click",toggle_rem("internet"));
// rem_8.addEventListener("click",toggle_rem("software"));

function toggle_rem(arg, rem) {
  if (recommendation.includes(arg)) {
    const index = recommendation.indexOf(arg);
    if (index > -1) {
      recommendation.splice(index, 1);
      console.log(recommendation);

      switch (rem) {
        case "rem_1":
          document.documentElement.style.setProperty("--tick1", "☑️");
          document.getElementById(rem).style.filter = "brightness(115%)";
          break;
        case "rem_2":
          document.documentElement.style.setProperty("--tick2", "☑️");
          document.getElementById(rem).style.filter = "brightness(115%)";
          break;
        case "rem_3":
          document.documentElement.style.setProperty("--tick3", "☑️");
          document.getElementById(rem).style.filter = "brightness(115%)";
          break;
        case "rem_4":
          document.documentElement.style.setProperty("--tick4", "☑️");
          document.getElementById(rem).style.filter = "brightness(115%)";
          break;
        case "rem_5":
          document.documentElement.style.setProperty("--tick5", "☑️");
          document.getElementById(rem).style.filter = "brightness(115%)";
          break;
        case "rem_6":
          document.documentElement.style.setProperty("--tick6", "☑️");
          document.getElementById(rem).style.filter = "brightness(115%)";
          break;
        case "rem_7":
          document.documentElement.style.setProperty("--tick7", "☑️");
          document.getElementById(rem).style.filter = "brightness(115%)";
          break;
        case "rem_8":
          document.documentElement.style.setProperty("--tick8", "☑️");
          document.getElementById(rem).style.filter = "brightness(115%)";
          break;
        default:
          break;
      }

      return;
    }
  }
  recommendation.push(arg);
  console.log(recommendation);
  switch (rem) {
    case "rem_1":
      document.documentElement.style.setProperty("--tick1", "");
      document.getElementById(rem).style.filter = "brightness(20%)";
      break;
    case "rem_2":
      document.documentElement.style.setProperty("--tick2", "");
      document.getElementById(rem).style.filter = "brightness(20%)";
      break;
    case "rem_3":
      document.documentElement.style.setProperty("--tick3", "");
      document.getElementById(rem).style.filter = "brightness(20%)";
      break;
    case "rem_4":
      document.documentElement.style.setProperty("--tick4", "");
      document.getElementById(rem).style.filter = "brightness(20%)";
      break;
    case "rem_5":
      document.documentElement.style.setProperty("--tick5", "");
      document.getElementById(rem).style.filter = "brightness(20%)";
      break;
    case "rem_6":
      document.documentElement.style.setProperty("--tick6", "");
      document.getElementById(rem).style.filter = "brightness(20%)";
      break;
    case "rem_7":
      document.documentElement.style.setProperty("--tick7", "");
      document.getElementById(rem).style.filter = "brightness(20%)";
      break;
    case "rem_8":
      document.documentElement.style.setProperty("--tick8", "");
      document.getElementById(rem).style.filter = "brightness(20%)";
      break;
    default:
      break;
  }
  return;
}
