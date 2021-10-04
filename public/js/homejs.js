function Show1(){
    document.getElementById('dpart24A').style.display="block";
    document.getElementById('dpart24B').style.display="none";
    document.getElementById('dpart24C').style.display="none";
}

function Show2(){
    document.getElementById('dpart24A').style.display="none";
    document.getElementById('dpart24B').style.display="block";
    document.getElementById('dpart24C').style.display="none";
}

function Show3(){
    document.getElementById('dpart24A').style.display="none";
    document.getElementById('dpart24B').style.display="none";
    document.getElementById('dpart24C').style.display="block";
}
$(document).ready(function(){
    console.log("hello")
})