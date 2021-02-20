function myFunction(x) {
  x.classList.toggle("change");
}
$(document).ready(function () {
	$(".testiSlide").slick({
	  slidesToShow: 2,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 1500,
	  responsive: [
		{
		  breakpoint: 850,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
		  },
		},
	  ],
	});
  });  

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var user = firebase.auth().currentUser;

    if (user != null) {
      var email_id = user.email;
      document.getElementById("signin").innerHTML = email_id;
    }
  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});

