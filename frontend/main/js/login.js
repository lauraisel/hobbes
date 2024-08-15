function submitLogin(){


//this is what user needs to enter
var requestData = {
    username: document.getElementById("LogInUsername").value,
    password: document.getElementById("LogInPassword").value
}

// if log in is successful the user will be redirected to home page if not the error will occure
$.ajax({
    type: 'POST',
    url: 'https://www.fulek.com/data/api/user/login',
    contentType: 'application/json ; charset=utf-8',
    dataType: 'json',
    data:
    JSON.stringify(requestData),
    success: function(response){
        var token = response.data.token;
        localStorage.setItem('token', token);

        alert("Login successful!");
       
        window.location.href = "\Home.html";
    },
    error: function(error){
        console.log("Error at login: ", error);
    }
});
}

;