function submitLogin(){


//this is what user needs to enter
var requestData = {
    username: document.getElementById("LogInUsername").value,
    password: document.getElementById("LogInPassword").value
}

// if log in is successful the user will be redirected to home page if not the error will occure
/*$.ajax({
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
}*/
let usersData = JSON.parse(localStorage.getItem("usersData")) || {};

    // Check if the username exists and if the password matches
    if (usersData[requestData.username] && usersData[requestData.username].password === requestData.password) {
        // Save the current user as logged in
        localStorage.setItem("loggedInUser", JSON.stringify({ username: requestData.username }));

        // Notify user of successful login
        alert("Login successful!");

        // Redirect to the home page
        window.location.href = "Home.html";
    } else {
        // Handle failed login
        alert("Login failed. Incorrect username or password.");
    }
}