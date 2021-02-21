$(document).ready(function () {
	$('.testiSlide').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 1500,
		responsive: [{
		breakpoint: 850,
		settings: {
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		}
		}]
	});
});

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
	  var user = firebase.auth().currentUser;
  
	  if (user != null) {
		var email_id = user.email;
	
		document.getElementById("account").innerHTML = "Account";
		document.getElementById("account").href = "html/account.html";
	  //   document.getElementById("logout").href = firebase.auth().signOut();
  
	  //   document.getElementById("logout").click() = function(){ firebase.auth().signOut();};
  
		
  
  
  
	  }
	} else {
	  // No user is signed in.
  
	  document.getElementById("user_div").style.display = "none";
	  document.getElementById("login_div").style.display = "block";
	}
  });
  