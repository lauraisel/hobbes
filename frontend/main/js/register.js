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

  // Make AJAX request
$.ajax({
    type: "POST",
    url: "http://localhost:8088/api/v1/auth/register",
    contentType: "application/json",
    data: JSON.stringify(DBData),
    success: function (response) {
      // Handle success
      console.log("User registered successfully:", response);
      
      
    },
    error: function (error) {
      // Handle error
      console.error("Registration failed:", error);
      
      // Notify user of registration failure
      alert("Registration failed. Please try again.");
    },
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
    window.location.href = "login.html";
}
