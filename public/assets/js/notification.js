var user_id = localStorage.getItem("id");
console.log(user_id);

document.getElementsByClassName("bk_click")[0].addEventListener("click", () => {
  localStorage.setItem("profile_opt_icons", "bookmark");
});

var user_notification_len;

document.getElementsByClassName("clear")[0].addEventListener("click", () => {
  if (user_notification_len > 0) {
    req_to_delete_notification();
  } else {
    Swal.fire(
      "Good job!",
      "You don't have any pending notifications 🎉",
      "success"
    );
  }
});

async function req_to_delete_notification() {
  try {
    const res = await delete_all_notification(
      "http://127.0.0.1:3000/post/message/delete"
    );
    console.log("deleted");
    location.reload();
  } catch (e) {
    alert("something went wrong");
  }
}

function delete_all_notification(path) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: user_id,
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

messages_details();

async function messages_details() {
  var user_details = await req_that_details("http://127.0.0.1:3000/user/name");

  if (user_details.messages.length === 0) {
    Swal.fire(
      "Good job!",
      "You don't have any pending notifications 🎉",
      "success"
    );
  }

  user_notification_len = user_details.messages.length;
  user_details.messages.reverse();

  for (let i = 0; i < user_details.messages.length; i++) {
    var a1 = document.createElement("a");
    a1.setAttribute(
      "href",
      `http://localhost:3000/posts?post_id=${user_details.messages[i].post_id}`
    );

    document.getElementsByClassName("main-content")[0].appendChild(a1);

    var div1 = document.createElement("div");
    div1.setAttribute("class", "notification-content");
    a1.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "notification-user-pic");
    div1.appendChild(div2);

    var img1 = document.createElement("img");
    img1.setAttribute(
      "src",
      `http://127.0.0.1:3000/avatar/${user_details.messages[i].user_id}`
    );
    img1.setAttribute("width", "70");
    img1.setAttribute("height", "70");
    img1.setAttribute("class", "rounded-circle");
    img1.setAttribute("id", "notification-user-pic");
    div2.appendChild(img1);

    var div3 = document.createElement("div");
    div3.setAttribute("class", "notification-msg");

    if (user_details.messages[i].activity === "liked") {
      div3.innerHTML = `<span style="color:#48C8F5;"> ${user_details.messages[i].user_name}</span>&nbsp; liked 👍 your post!`;
    } else if (user_details.messages[i].activity === "commented") {
      div3.innerHTML = `<span style="color:#48C8F5;"> ${user_details.messages[i].user_name}</span>&nbsp; commented 💭 on your post!`;
    } else if (user_details.messages[i].activity === "bookmarked") {
      div3.innerHTML = `<span style="color:#48C8F5;"> ${user_details.messages[i].user_name}</span>&nbsp; bookmarked 📕 your post!`;
    } else if (user_details.messages[i].activity === "reported") {
      div3.innerHTML = `<span style="color:#48C8F5;"> ${user_details.messages[i].user_name}</span>&nbsp; repoted 🏁 your post!`;
    }

    div1.appendChild(div3);

    var div4 = document.createElement("div");
    div4.setAttribute("class", "notification-pic");
    div1.appendChild(div4);

    var img2 = document.createElement("img");
    img2.setAttribute(
      "src",
      `http://127.0.0.1:3000/post/${user_details.messages[i].post_id}`
    );
    img2.setAttribute("width", "70");
    img2.setAttribute("height", "70");
    img2.setAttribute("id", "notification-pic");
    div4.appendChild(img2);
  }
}

function req_that_details(path) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: user_id,
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

if (localStorage.getItem("theme") === "light") {
  document.getElementsByTagName("body")[0].style.background = "#2A3F58";
  document.getElementById("header").style.background = "#2A3F58";
  document.getElementById("theme").innerHTML = "<i class='bx bxs-moon'></i>";
} else {
  document.getElementsByTagName("body")[0].style.background = "black";
  document.getElementById("header").style.background = "black";
  document.getElementById("theme").innerHTML = "<i class='bx bxs-sun'></i>";
}


document.getElementById("theme").addEventListener("click", () => {
  if (localStorage.getItem("theme") === "light") {
    document.getElementsByTagName("body")[0].style.background = "black";
    document.getElementById("header").style.background = "black";
    document.getElementById("theme").innerHTML = "<i class='bx bxs-sun'></i>";
    localStorage.setItem("theme", "dark");
  } else {
    document.getElementsByTagName("body")[0].style.background = "#2A3F58";
    document.getElementById("header").style.background = "#2A3F58";
    document.getElementById("theme").innerHTML = "<i class='bx bxs-moon'></i>";
    localStorage.setItem("theme", "light");
  }
});
