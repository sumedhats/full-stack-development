console.log("Full Stack Profile application loaded");

const buttons = document.querySelectorAll(".buttons button");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        alert(button.innerText + " clicked!");

    });

});
