var login_btn=document.getElementById("login-btn");
login_btn.addEventListener("click", check_user);
var join=0;
var login_input=document.getElementById("login-input");
var login_center=document.getElementById("login-center");
var login_txt1=document.getElementById("login-txt1");
var login_txt2=document.getElementById("login-txt2");
var email;
var u_input=[];
var len;

document.addEventListener("keydown", function(event) {

if(event.keyCode===13){
    check_user();
}

})


function makeGetRequest(path) {
    return new Promise(function (resolve, reject) {
        axios.post(path, {
            email
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


function makeGetRequest2(path) {
    return new Promise(function (resolve, reject) {
        axios.post(path, {
            email:u_input[0],
            password:u_input[len-1]
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


async function check_user(){
    if(join===0){
    // login_btn.classList.add("animate__animated animate__backOutLeft");
    login_txt1.classList.add("animate__animated");
    login_txt1.classList.add("animate__backOutRight");
    login_txt2.classList.add("animate__animated");
    login_txt2.classList.add("animate__backOutRight");
    login_input.classList.add("animate__animated");
    login_input.classList.add("animate__backOutRight");
  email=document.getElementById("email1").value;
  u_input.push(email);

  try{
  var result = await makeGetRequest('http://127.0.0.1:3000/users/login1');
  localStorage.setItem("id", result._id);
  console.log(result._id); 
  
  setTimeout(()=>{  

    document.getElementById("email1").value="";
    document.getElementById("email1").setAttribute("placeholder", "Password");

    login_txt1.classList.remove("animate__backOutRight");
    login_txt2.classList.remove("animate__backOutRight");
    login_input.classList.remove("animate__backOutRight");

  login_txt1.classList.add("animate__backInLeft");
  login_txt2.classList.add("animate__backInLeft");
  login_input.classList.add("animate__backInLeft");

 join++; 
 console.log(u_input); 

  },2000);

  }catch(e){
    login_txt1.remove();
    login_input.remove();
    login_txt2.style.marginTop = "50px";
    login_txt2.style.marginBottom = "34px";
    // login_txt2.style.color="#E76F6F";
    login_txt2.innerHTML="<span style='color:#E76F6F;'>Sorry!</span> We don’t know you yet, wanna join the shrine of geeks?🤝"
    login_txt2.classList.remove("animate__backOutRight");
    login_txt2.classList.add("animate__backInLeft");
    login_btn.innerText="Join ➕";
    join+=2;
  }
}

else if(join===1){

try{
   var pass = document.getElementById("email1").value;
    u_input.push(pass);
    console.log(u_input);
    len=u_input.length;
    console.log(len); 
   var result = await makeGetRequest2('http://127.0.0.1:3000/users/login');
   localStorage.setItem("id", result._id);
   console.log(result._id); 
    alert("working");
}catch(e){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email or Password Invalid!',
        footer: '<a href="signup.html">Have you not Signed up yet?</a>'
      })
}

}
    else if(join===2){
        if(email){
        localStorage.setItem("email", email);
        window.location.href = 'http://localhost:3000/signup';
        }
    }

}

setTimeout(()=>{
    document.getElementById("sidebar-btn").click();
},2500);