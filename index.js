Array.from(document.getElementsByClassName("field")).forEach(element => element.addEventListener("click", Pick));

function Pick(e){
    console.log(e.target);
}