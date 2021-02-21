
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var user = firebase.auth().currentUser;
  
      if (user != null) {
        var email_id = user.email;
        document.getElementById("user").innerHTML = "Welcome "+ email_id;
       
      //   document.getElementById("logout").href = firebase.auth().signOut();
  
      //   document.getElementById("logout").click() = function(){ firebase.auth().signOut();};
  
        
  
  
  
      }
    } else {
      // No user is signed in.
  
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
    }
  });
  