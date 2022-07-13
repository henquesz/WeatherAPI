const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".wrapper"),
infoTxt = inputPart.querySelector(".info-txt"),
infoField = inputPart.querySelector(".info-txt");

infoField.addEventListener("keyup", e =>{
    if(e.key == "Enter"  && inputField.value != ""){
        console.log("hello")
    }
})