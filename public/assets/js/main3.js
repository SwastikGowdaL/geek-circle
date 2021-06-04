var email = localStorage.getItem("email");
var password = document.getElementById("password").value;
if (email) {
  document.getElementById("email2").value = email;
}

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    signup();
  }
});

var login_btn = document.getElementById("login-btn");
login_btn.addEventListener("click", signup);

function add_user(path) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        email: email,
        password: password,
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

async function signup() {
  try {
    email = document.getElementById("email2").value;
    password = document.getElementById("password").value;
    console.log(email);
    console.log(password);
    var result = await add_user("http://127.0.0.1:3000/users/signup");
    Swal.fire("Good job!", "Signup Complete!", "success");
    localStorage.setItem("id", result._id);
    console.log(result._id);
    setTimeout(() => {
      window.location.href = "http://localhost:3000/recommendation";
    }, 3000);
  } catch (e) {
    console.log(e);
    alert("something went wrong");
  }
}

setTimeout(() => {
  document.getElementById("sidebar-btn").click();
}, 2500);
