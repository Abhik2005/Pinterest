var div = document.querySelectorAll(".div");
div.forEach(function(elm){
    elm.addEventListener("mouseenter",function(){
        elm.style.color = "white";
        elm.style.backgroundColor = "black";
    })
    elm.addEventListener("mouseleave",function(){
        elm.style.color = "black";
        elm.style.backgroundColor = "white";
    })
})

var account = document.querySelector(".account");

account.addEventListener("click",function(){
    account.style.border = "2px solid black"
})
