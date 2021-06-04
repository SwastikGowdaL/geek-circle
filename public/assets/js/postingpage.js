var switch_state = 1;
var quill = new Quill("#editor-container", {
  modules: {
    toolbar: [
      [
        {
          header: [1, 2, false],
        },
      ],
      ["bold", "italic", "underline"],
      ["image", "code-block"],
      [
        {
          list: "ordered",
        },
        {
          list: "bullet",
        },
      ],
      ["strike"],
      [
        {
          color: [],
        },
        {
          background: [],
        },
      ],
      [
        {
          align: [],
        },
      ],
    ],
  },
  placeholder: "Compose an epic...",
  theme: "snow", // or 'bubble'
});

var user_id = localStorage.getItem("id");

checking_reports();
async function checking_reports() {
  const res = await req_that_report_details("http://127.0.0.1:3000/user/name");

  if (res.reports === 1) {
    window.location.href = "http://localhost:3000/reported_page";
  }
}

function req_that_report_details(path) {
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

//reporting ends here !

document.getElementById("switch").click();
const switch_button = document.getElementById("switch");
switch_button.addEventListener("click", switch_preview);

function switch_preview() {
  if (switch_state === 1) {
    var delta = quill.getContents();
    console.log(delta);
    testing_quill.setContents(delta);
    document.getElementsByClassName("testing_quill")[0].style.visibility =
      "visible";
    switch_state = 0;
    return;
  } else if (switch_state === 0) {
    document.getElementsByClassName("testing_quill")[0].style.visibility =
      "hidden";
    switch_state = 1;
    return;
  }
}

var title = document.getElementById("title").value;

function title_input() {
  console.log("working");
  document.querySelector(".line1").style.background = "#48C8F5";
  document.querySelector(".dot2").style.background = "#48C8F5";
}

var editor_content = document.querySelector(".ql-editor");
editor_content.addEventListener("click", main_input);

function main_input() {
  document.querySelector(".line2").style.background = "#48C8F5";
  document.querySelector(".dot3").style.background = "#48C8F5";
}

var hashtags = document.getElementById("hashtags");
hashtags.addEventListener("click", hashtag_content);

function hashtag_content() {
  document.querySelector(".line3").style.background = "#48C8F5";
  document.querySelector(".dot4").style.background = "#48C8F5";
}

var myFile = document.getElementById("myFile");
myFile.addEventListener("change", (event) => {
  document.querySelector(".line4").style.background = "#48C8F5";
  document.querySelector(".dot5").style.background = "#48C8F5";
  const fileList = event.target.files;
  console.log(fileList[0]);
});

// function myFile_content(){

// }

var testing_quill = new Quill("#testing_quill", {});

var publish = document.getElementById("publish");
publish.addEventListener("click", publish_content);

function saving_post(path) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        title: title,
        hashtags: total_hashtags,
        body: delta,
        publisher: test_id,
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

function saving_post_pic(path) {
  return new Promise(function (resolve, reject) {
    axios({
      method: "post",
      url: path,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        var result = response.data;
        resolve(result);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  });
}

function saving_read_min(path) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: post_id,
        read_min: quill.getText(),
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

function saving_publisher_det(path) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        id: post_id,
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

function saving_hashtag_det(path) {
  return new Promise(function (resolve, reject) {
    axios
      .post(path, {
        post_id: post_id,
        hashtags: total_hashtags,
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

var post_id;
var bodyFormData = new FormData();

async function publish_content() {
  // console.log(myFile.files[0]);
  title = document.getElementById("title").value;
  var text = quill.getText();
  delta = quill.getContents();

  if (title === "") {
    Swal.fire("Error", "Please Provide title!", "error");
  } else if (text.length < 2) {
    Swal.fire("Error", "Please Provide body!", "error");
  } else if (total_hashtags.length !== 3) {
    Swal.fire("Error", "Please Select 3 Hashtags!", "error");
  } else if (!myFile.files[0]) {
    Swal.fire("Error", "Please Provide an Image", "error");
  } else {
    try {
      var result = await saving_post("http://127.0.0.1:3000/posts/publish");
      console.log(result);
      post_id = result._id;

      bodyFormData.append("id", post_id);
      bodyFormData.append("pic", myFile.files[0]);
      var result1 = await saving_post_pic("http://127.0.0.1:3000/upload/post");
      console.log(result1);

      var result2 = await saving_read_min(
        "http://127.0.0.1:3000/post/read_min"
      );
      console.log(result2);

      var result3 = await saving_publisher_det(
        "http://127.0.0.1:3000/post/publisher_det"
      );
      console.log(result3);

      var result4 = await saving_hashtag_det(
        "http://127.0.0.1:3000/posts/hashtags"
      );
      console.log(result4);

      Swal.fire("Good job!", "Your post has been published!", "success");

      setTimeout(() => {
        location.reload();
      }, 3000);
    } catch (e) {
      alert("something went wrong");
      console.log(e);
    }
  }
}

var hashtag1 = document.getElementById("hashtag1");
var hashtag2 = document.getElementById("hashtag2");
var hashtag3 = document.getElementById("hashtag3");
var total_hashtags = [];

function hashtag_select(arg) {
  if (total_hashtags.includes(arg)) {
    return;
  }
  switch (total_hashtags.length) {
    case 0:
      hashtag1.innerText = arg;
      hashtag1.style.removeProperty("background-color");
      break;
    case 1:
      hashtag2.innerText = arg;
      hashtag2.style.removeProperty("background-color");
      break;
    case 2:
      hashtag3.innerText = arg;
      hashtag3.style.removeProperty("background-color");
      break;
    default:
      break;
  }
  total_hashtags.push(arg);
}
var delta;

function update_testing_quill() {
  delta = quill.getContents();
  testing_quill.setContents(delta);
}

testing_quill.enable(false);
var test_id = localStorage.getItem("id");
console.log(test_id);

if (localStorage.getItem("theme") === "light") {
  document.getElementsByTagName("body")[0].style.background = "#2A3F58";
  document.getElementById("header").style.background = "#2A3F58";
} else {
  document.getElementsByTagName("body")[0].style.background = "black";
  document.getElementById("header").style.background = "black";
}
