//change dependent on if the user is logged in or not
$(document).ready(function(){
    if(localStorage.getItem("token")==null || localStorage.getItem("token")==undefined){
        $("#navbar").load("../main/elements/navbar.html")
    }else{
        $("#navbar").load("../main/elements/loggedin.html")
    }
    

});



