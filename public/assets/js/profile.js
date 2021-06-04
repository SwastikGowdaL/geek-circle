// setTimeout(()=>{
//     document.getElementById("sidebar-btn").click();

// },2500);
setInterval(function () {
  var width = document.documentElement.clientWidth;
  console.log(width);
  if (width <= 480) {
    var x = document.getElementById("icon-1");
    x.remove();
    document.getElementById("icon-2").remove();
    document.getElementById("icon-3").remove();
    document.getElementById("icon-4").remove();

    // !do not remove the editing content
  }
}, 500);


document.getElementsByClassName("bk_click")[0].addEventListener("click",()=>{
  localStorage.setItem("profile_opt_icons","bookmark");
})


var user_id = localStorage.getItem("id");
console.log(user_id);
document
  .getElementById("user_avatar")
  .setAttribute("src", `http://127.0.0.1:3000/avatar/${user_id}`);
var cover_pic = `url('http://127.0.0.1:3000/cover_pic/${user_id}')`;
document.getElementById("profile-top-content").style.backgroundImage =
  cover_pic;
var cover_edit = document.getElementsByClassName("profile_cover_edit_icon")[0];
cover_edit.addEventListener("click", cover_pic_edit_func);
var avatar_edit = document.getElementById("ed_profile_pic");
avatar_edit.addEventListener("click", avatar_edit_func);
document.getElementById("ed_email").addEventListener("click", email_edit_func);
document
  .getElementById("ed_password")
  .addEventListener("click", password_edit_func);
document
  .getElementById("ed_hashtags")
  .addEventListener("click", hashtags_edit_func);
var user_details;

var quill = new Quill("#editor", {
  theme: "snow",
});

var profile_opt_icons = localStorage.getItem("profile_opt_icons");
if (!profile_opt_icons) {
  localStorage.setItem("profile_opt_icons", "published");
  profile_opt_icons = "published";
}

user_details_func(profile_opt_icons);

document.getElementById("icon-1").addEventListener("click", () => {
  localStorage.setItem("profile_opt_icons", "published");
  location.reload();
});
document.getElementById("icon-2").addEventListener("click", () => {
  localStorage.setItem("profile_opt_icons", "like");
  location.reload();
});
document.getElementById("icon-3").addEventListener("click", () => {
  localStorage.setItem("profile_opt_icons", "comment");
  location.reload();
});
document.getElementById("icon-4").addEventListener("click", () => {
  localStorage.setItem("profile_opt_icons", "bookmark");
  location.reload();
});

document.getElementById("ricon-1").addEventListener("click", () => {
  localStorage.setItem("profile_opt_icons", "published");
  location.reload();
});
document.getElementById("ricon-2").addEventListener("click", () => {
  localStorage.setItem("profile_opt_icons", "like");
  location.reload();
});
document.getElementById("ricon-3").addEventListener("click", () => {
  localStorage.setItem("profile_opt_icons", "comment");
  location.reload();
});
document.getElementById("ricon-4").addEventListener("click", () => {
  localStorage.setItem("profile_opt_icons", "bookmark");
  location.reload();
});

console.log(profile_opt_icons);

var bodyFormData = new FormData();
var bodyFormData1 = new FormData();

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

async function user_details_func(opt_arg) {
  try {
    const res = await req_that_details("http://127.0.0.1:3000/user/name");
    user_details = res;

    if (res.reports === 0) {
      document.getElementById("reports").style.color = "#8DE885";
    } else if (res.reports <= 10) {
      document.getElementById("reports").style.color = "#ECE289";
    } else {
      document.getElementById("reports").style.color = "#E76F6F";
    }

    var r = document.querySelector(':root');
    if(res.messages.length===0){
      r.style.setProperty('--notify', 'hidden');
    }


    switch (opt_arg) {
      case "published":
        document.getElementById("icon-1").style.borderBottom =
          "2px solid black";
        if (user_details.published_post.length === 0) {
          Swal.fire("Oops😿 !", "You haven't published any post yet!", "error");
        }else{
        creating_like_posts(user_details.published_post);
        }
        break;
      case "like":
        document.getElementById("icon-2").style.borderBottom =
          "2px solid black";
        if (user_details.liked_post.length === 0) {
          Swal.fire("Oops😿 !", "You haven't liked any post yet!", "error");
        }else{
        creating_like_posts(user_details.liked_post);
        }
        break;
      case "comment":
        document.getElementById("icon-3").style.borderBottom =
          "2px solid black";
        if (user_details.commented_post.length === 0) {
          Swal.fire("Oops😿 !", "You haven't commented any post yet!", "error");
        }else{
        creating_like_posts(user_details.commented_post);
        }
        break;
      case "bookmark":
        document.getElementById("icon-4").style.borderBottom =
          "2px solid black";
        if (user_details.bookmarked.length === 0) {
          Swal.fire(
            "Oops😿 !",
            "You haven't bookmarked any post yet!",
            "error"
          );
        }else{
        creating_like_posts(user_details.bookmarked);
        }
        break;
      default:
        break;
    }

    document.getElementById(
      "user_name"
    ).innerHTML = `${res.name}    <i class='bx bxs-pencil' id="user_name_edit"></i>`;
    document.getElementById(
      "user_tagline"
    ).innerHTML = `${res.tagline}    <i class='bx bxs-pencil' id="user_tagline_edit"></i>`;
    var name_edit = document.getElementById("user_name_edit");
    name_edit.addEventListener("click", user_name_edit_func);
    var tagline_edit = document.getElementById("user_tagline_edit");
    tagline_edit.addEventListener("click", user_tagline_edit_func);
    document.getElementById("user_msg_name").innerText = res.name;
    document.getElementById("pb_count").innerText=res.published_post.length;
    document.getElementById("like_count").innerText=res.liked_post.length;
    document.getElementById("comment_count").innerText=res.commented_post.length;
    document.getElementById("bk_count").innerText=res.bookmarked.length;
    console.log(res);
  } catch (e) {
    alert("error while fetching user data");
  }
}



function req_for_cover_change(path, data) {
  return new Promise(function (resolve, reject) {
    axios({
      method: "post",
      url: path,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

function req_for_avatar_change(path, data) {
  return new Promise(function (resolve, reject) {
    axios({
      method: "post",
      url: path,
      data: bodyFormData1,
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

function req_for_post_det(path, id) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: id,
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

function req_for_publisher_det(path, id) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: id,
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

function req_for_name_change(path, name) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: user_id,
        name: name,
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

function req_for_tagline_change(path, tagline) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: user_id,
        tagline: tagline,
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

function req_for_email_change(path, email) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: user_id,
        email,
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

function req_for_password_change(path, password) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: user_id,
        password,
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

function req_for_like_check(path, id) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: id,
        user_id,
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

function req_for_comment_check(path, id) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: id,
        user_id,
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

function req_for_bookmark_check(path, id) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: id,
        user_id,
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

function req_to_like(path, id) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: id,
        user_id,
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

function req_to_bk(path, id) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: id,
        user_id,
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


function msg_like_that_post(path,id,pub_id) {
  return new Promise(function (resolve, reject) {
    axios.post(path, {
      id: pub_id,
      user_id: user_id,
      post_id:id,
      activity:"liked",
      user_name:user_details.name
    })
      .then(response => {
        var result = response.data;
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}


function msg_bookmark_that_post(path,id,pub_id) {
  return new Promise(function (resolve, reject) {
    axios.post(path, {
      id: pub_id,
      user_id: user_id,
      post_id:id,
      activity:"bookmarked",
      user_name:user_details.name
    })
      .then(response => {
        var result = response.data;
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}


async function like_req(path, id, like_count, like_id, post_like_sp,pub_id) {
  try {
    const res_temp = await req_to_like(path, id);
    const res1=await msg_like_that_post("http://127.0.0.1:3000/post/message",id,pub_id);
    console.log(res_temp);
    like_count = Number(like_count);
    like_count++;
    document.getElementById(like_id).classList.remove("bx-like");
    document.getElementById(like_id).classList.add("bxs-like");
    document.getElementById(like_id).style.color = "#48C8F5";
    document.getElementsByClassName(post_like_sp)[0].innerText = like_count;
  } catch (e) {
    alert("like function not working");
    console.log(e);
  }
}

async function bk_req(path, id, bk_count, bk_id, post_bk_sp,pub_id) {
  try {
    const res_temp = await req_to_bk(path, id);
    const res1=await msg_bookmark_that_post("http://127.0.0.1:3000/post/message",id,pub_id);
    console.log(res_temp);
    bk_count = Number(bk_count);
    bk_count++;
    document.getElementById(bk_id).classList.remove("bx-bookmark");
    document.getElementById(bk_id).classList.add("bxs-bookmark");
    document.getElementById(bk_id).style.color = "#48C8F5";
    document.getElementsByClassName(post_bk_sp)[0].innerText = bk_count;
  } catch (e) {
    alert("bk function not working");
    console.log(e);
  }
}

function cover_pic_edit_func() {
  (async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (file) {
      console.log(file);
      bodyFormData.append("cover_pic", file);
      bodyFormData.append("id", user_id);
      const res = await req_for_cover_change(
        "http://127.0.0.1:3000/upload/user/cover_pic",
        file
      );
      console.log(res);
      const reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          title: "Your uploaded picture",
          imageUrl: e.target.result,
          imageAlt: "The uploaded picture",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  })();
}

function avatar_edit_func() {
  (async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (file) {
      console.log(file);
      bodyFormData1.append("avatar", file);
      bodyFormData1.append("id", user_id);
      const res = await req_for_avatar_change(
        "http://127.0.0.1:3000/upload",
        file
      );
      console.log(res);
      const reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          title: "Your uploaded picture",
          imageUrl: e.target.result,
          imageAlt: "The uploaded picture",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  })();
}

async function user_name_edit_func() {
  const { value: ipAddress } = await Swal.fire({
    title: "Enter your new Name",
    input: "text",
    inputLabel: "Your new Name",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
  });

  if (ipAddress) {
    const res = await req_for_name_change(
      "http://127.0.0.1:3000/user/name/edit",
      ipAddress
    );
    Swal.fire(`Your new Name is ${ipAddress}`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

async function user_tagline_edit_func() {
  const { value: ipAddress } = await Swal.fire({
    title: "Enter your new Tagline",
    input: "text",
    inputLabel: "Your new Tagline",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
  });

  if (ipAddress) {
    const res = await req_for_tagline_change(
      "http://127.0.0.1:3000/user/tagline/edit",
      ipAddress
    );
    Swal.fire(`Your new Tagline is ${ipAddress}`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

async function email_edit_func() {
  const { value: email } = await Swal.fire({
    title: "Input email address",
    input: "email",
    inputLabel: "Your email address",
    inputPlaceholder: "Enter your email address",
  });

  if (email) {
    const res = await req_for_email_change(
      "http://127.0.0.1:3000/user/email/edit",
      email
    );
    Swal.fire(`Entered email: ${email}`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

async function password_edit_func() {
  const { value: password } = await Swal.fire({
    title: "Enter your password",
    input: "password",
    inputLabel: "Password",
    inputPlaceholder: "Enter your password",
    inputAttributes: {
      maxlength: 25,
      autocapitalize: "off",
      autocorrect: "off",
    },
  });

  if (password) {
    const res = await req_for_password_change(
      "http://127.0.0.1:3000/user/password/edit",
      password
    );
    Swal.fire(`Entered password: ${password}`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

function hashtags_edit_func() {
  window.location.href = "/recommendation";
}

var div14;
var div16;

async function creating_like_posts(arg) {
  for (let i = 0; i < arg.length; i++) {
    const res = await req_for_post_det(
      "http://127.0.0.1:3000/posts/post_det",
      arg[i]
    );
    console.log(res);

    const res1 = await req_for_publisher_det(
      "http://127.0.0.1:3000/user/name",
      res.publisher
    );
    console.log(res1);

    var div1 = document.createElement("div");
    div1.setAttribute("class", "post-content");
    document.getElementsByClassName("main-content")[0].appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "post-content-top");
    div1.appendChild(div2);

    var div3 = document.createElement("div");
    div3.setAttribute("class", "post-d");
    div2.appendChild(div3);

    var div305 = document.createElement("div");
    div305.setAttribute("class", "post-d1");
    div3.appendChild(div305);

    var div4 = document.createElement("div");
    div4.setAttribute("class", "post-d1-img");
    div305.appendChild(div4);

    var img1 = document.createElement("img");
    img1.setAttribute("class", "rounded-circle");
    img1.setAttribute("src", `http://127.0.0.1:3000/avatar/${res1._id}`);
    img1.setAttribute("alt", "authd pic");
    img1.setAttribute("width", "75");
    img1.setAttribute("height", "75");
    img1.setAttribute("id", "authd-img");
    div4.appendChild(img1);

    var div5 = document.createElement("div");
    div5.setAttribute("class", "post-d1-authd");
    div305.appendChild(div5);

    var div6 = document.createElement("div");
    div6.setAttribute("class", "post-d1-name");
    div6.innerText = res1.name;
    div5.appendChild(div6);

    var div7 = document.createElement("div");
    div7.setAttribute("class", "post-d1-date");
    var temp = res.published_date.split("T");
    div7.innerText = temp[0];
    div5.appendChild(div7);

    var a1 = document.createElement("a");
    a1.setAttribute("href", `http://localhost:3000/posts?post_id=${arg[i]}`);
    div3.appendChild(a1);

    var div8 = document.createElement("div");
    div8.setAttribute("class", "post-d2");
    div8.innerText = res.title;
    a1.appendChild(div8);

    var div9 = document.createElement("div");
    div9.setAttribute("class", "post-d3");
    quill.setContents(res.body);
    var temp1 = quill.getText(0, 242);
    console.log(temp1);
    div9.innerText = `${temp1.trim()} ...`;
    a1.appendChild(div9);

    var div10 = document.createElement("div");
    div10.setAttribute("class", "post-img");
    div2.appendChild(div10);

    var div11 = document.createElement("div");
    div11.setAttribute("id", "post-img");
    div10.appendChild(div11);

    var img2 = document.createElement("img");
    img2.setAttribute("alt", "post-pic");
    img2.setAttribute("src", `http://localhost:3000/post/${res._id}`);
    img2.setAttribute("width", "300");
    img2.setAttribute("height", "200");
    div11.appendChild(img2);

    var div12 = document.createElement("div");
    div12.setAttribute("class", "post-content-bottom");
    div1.appendChild(div12);

    var div13 = document.createElement("div");
    div13.setAttribute("class", "post-ana");
    div12.appendChild(div13);

    div14 = document.createElement("div");
    div14.setAttribute("class", "like");

    var res2 = await req_for_like_check(
      "http://localhost:3000/post/liked_check",
      res._id
    );
    console.log(res2);
    if (res2.liked === 0) {
      // div14.innerHTML = `<i class="bx bx-like" id="post-${i}"></i> <span id="likes">${res.likes}</span>`;
      var post_like_sp = `post-like-sp-${i}`;
      var i1 = document.createElement("i");
      var like_id = `post-${i}`;
      i1.className = "bx bx-like";
      i1.setAttribute("id", like_id);
      i1.setAttribute(
        "onclick",
        `like_req('http://localhost:3000/post/liked','${res._id}','${res.likes}','${like_id}','${post_like_sp}','${res.publisher}')`
      );
      div14.appendChild(i1);

      var span1 = document.createElement("span");
      span1.setAttribute("id", "likes");
      span1.setAttribute("class", `${post_like_sp}`);
      span1.innerText = res.likes;
      div14.appendChild(span1);

      console.log(like_id);
    } else {
      div14.innerHTML = `<i class="bx bxs-like" style="color:#48C8F5;"></i> <span id="likes">${res.likes}</span>`;
    }
    div13.appendChild(div14);

    var res3 = await req_for_comment_check(
      "http://localhost:3000/post/commented_check",
      res._id
    );
    console.log(res3);

    var div15 = document.createElement("div");
    div15.setAttribute("class", "comment");
    if (res3.commented) {
      div15.innerHTML = `<i class="bx bxs-comment"  style="color:#48C8F5;"></i> <span id="comment">${res.comments.length}</span>`;
    } else {
      div15.innerHTML = `<i class="bx bx-comment"></i> <span id="comment">${res.comments.length}</span>`;
    }
    div13.appendChild(div15);

    var res4 = await req_for_bookmark_check(
      "http://localhost:3000/post/bookmarked_check",
      res._id
    );

    div16 = document.createElement("div");
    div16.setAttribute("class", "bk");
    if (res4.bookmarked) {
      div16.innerHTML = `<i class="bx bxs-bookmark" style="color:#48C8F5;"></i> <span id="bk">${res.bookmarks}</span>`;
    } else {
      var post_bk_sp = `post-bk-sp-${i}`;
      var i2 = document.createElement("i");
      var bk_id = `post-bk-${i}`;
      i2.className = "bx bx-bookmark";
      i2.setAttribute("id", bk_id);
      i2.setAttribute(
        "onclick",
        `bk_req('http://localhost:3000/post/bookmarked','${res._id}','${res.bookmarks}','${bk_id}','${post_bk_sp}','${res.publisher}')`
      );
      div16.appendChild(i2);
      var span2 = document.createElement("span");
      span2.setAttribute("id", "bk");
      span2.setAttribute("class", `${post_bk_sp}`);
      span2.innerText = res.bookmarks;
      div16.appendChild(span2);
      console.log(bk_id);
    }
    div13.appendChild(div16);

    var div17 = document.createElement("div");
    div17.setAttribute("class", "post-min");
    div12.appendChild(div17);

    var div18 = document.createElement("div");
    div18.setAttribute("style", "padding-top: 9px;");
    div18.innerHTML = `<span id="read-color">·</span> <span id="read-min">${res.read_min} min read</span>`;
    div17.appendChild(div18);
  }
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
      localStorage.setItem("theme","dark");
  }else{
      document.getElementsByTagName("body")[0].style.background = "#2A3F58";
      document.getElementById("header").style.background = "#2A3F58";
      document.getElementById("theme").innerHTML = "<i class='bx bxs-moon'></i>";
      localStorage.setItem("theme","light");
  }
})