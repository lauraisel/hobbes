function submitRegister() {
  // Gather user registration data
  var userData = {
    username: document.getElementById("RegisterUsername").value,
    password: document.getElementById("RegisterPassword").value,
  };

  // Make AJAX request
  $.ajax({
    type: "POST",
    url: "https://www.fulek.com/data/api/user/register",
    contentType: "application/json",
    data: JSON.stringify(userData),
    success: function (response) {
      // Handle success
      console.log("User registered successfully:", response);

      //  successful registration
      alert("Registration successful!");
      // redirect to another page
      window.location.href = "Home.html";
    },
    error: function (error) {
      // Handle error
      console.error("Registration failed:", error);
      // display an error message to the user
      alert("Registration failed. Please try again.");
    },
  });
}
