function submitLogin(){
//this is what user needs to enter
var requestData = {
    email: document.getElementById("LogInEmail").value,
    password: document.getElementById("LogInPassword").value
}

// if log in is successful the user will be redirected to home page if not the error will occure
fetch("http://localhost:8088/api/v1/auth/authentication", {
    method: "POST",
    //mode: "no-cors",
    headers: {
      "Content-Type": 'application/json',
      
    },
    body: JSON.stringify({
      email: requestData.email,
      password: requestData.password
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Login failed");
    }
    return response.json();
  })
  .then(data => {
    console.log("User logged in successfully:", data);

    
    //alert("Login successful!");

    
    window.location.href = "Home.html";
  })
  .catch(error => {
    console.error("Error:", error);
    
  });

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