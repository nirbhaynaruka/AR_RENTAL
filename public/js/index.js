function formDate() {
	// var dropDate = new Date();
	// dropDate.setDate(dropDate.getDate() + 1); //number  of days to add, e.x. 15 days
    //  var dateFormated = dropDate.toISOString().substr(0,10);
	document.getElementById('pickup-date').valueAsDate = new Date();
	document.getElementById('pickup-time').valueAsNumber = new Date(new Date().getHours(),new Date().getMinutes());
	document.getElementById('drop-date').valueAsDate = new Date( new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+2);
	document.getElementById('drop-time').valueAsNumber = new Date(new Date().getHours(),new Date().getMinutes());
	
}

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
		// <li class="nav-item"> <a class="nav-link text-center text-uppercase font-14 trans" href="#">Contact Us</a></li>
		document.getElementById("account").innerHTML = "Account";
		document.getElementById("account").href = "html/account.html";
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
  