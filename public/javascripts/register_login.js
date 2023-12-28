var password = document.querySelector("#password");
        var eye = document.querySelector("#eye");
        var eye_off = document.querySelector("#eye-off");
        eye.addEventListener("click", function(){
            password.type="text";
            eye_off.style.display = "block";
            eye.style.display = "none";
        })
        eye_off.addEventListener("click", function(){
            password.type="password";
            eye_off.style.display = "none";
            eye.style.display = "block";
        })

var error = document.querySelector("#error");

var pswEye = document.querySelector(".eye");
if(error.innerHTML != ""){
   pswEye.style.top = "42.8%"
}

