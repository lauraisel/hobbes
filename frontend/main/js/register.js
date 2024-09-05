function submitRegister() {
  // Gather user registration data
  var DBData = {
    username: document.getElementById("RegisterUsername").value,
    email: document.getElementById("RegisterEmail").value,
    password: document.getElementById("RegisterPassword").value,
   
  };
  var userData = {
    username: document.getElementById("RegisterUsername").value,
    email: document.getElementById("RegisterEmail").value,
    password: document.getElementById("RegisterPassword").value,
    collectedPokemon: [] // Initialize with an empty array for collected Pokémon
  };


  fetch("http://localhost:8088/api/v1/auth/register", {
    method: "POST",
    //mode: "no-cors",
    headers: {
      "Content-Type": 'application/json',
      "Access-Control-Allow-Origin" : ""
    },
    body: JSON.stringify({
      username: userData.username,
      email: userData.email,
      password: userData.password
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Registration failed");
    }
    return response.json();
  })
  .then(data => {
    console.log("User registered successfully:", data);

    
    alert("Registration successful! Please log in.");

    
    window.location.href = "login.html";
  })
  .catch(error => {
    console.error("Error:", error);
    
  });

  let usersData = JSON.parse(localStorage.getItem("usersData")) || {};

    // Check if the username already exists
    if (usersData[userData.username]) {
        alert("Username already exists. Please choose a different username.");
        return;
    }

    // Save the new user data in the usersData object
    usersData[userData.username] = userData;

    // Update local storage with the new usersData object
    localStorage.setItem("usersData", JSON.stringify(usersData));

    // Notify user of successful registration
    alert("Registration successful! Please log in.");

    // Redirect to the login page
    //window.location.href = "login.html";
}
