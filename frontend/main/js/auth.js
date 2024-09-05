function submitAuth() {
  var token = document.getElementById("AuthCode").value;
  
  
    fetch(`http://localhost:8088/api/v1/auth/activate-account?token=${token}`, {
      method: "GET",
      //mode: "no-cors",
      headers: {
        
        
      },
      
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      alert("Authentication successful! Please log in.");
  
      
      window.location.href = "login.html";
      return response.json();
    })
    .then(data => {
      console.log("User authenticated successfully:", data);
  
      
      
    })
    .catch(error => {
      console.error("Error:", error);
      
    });
  }