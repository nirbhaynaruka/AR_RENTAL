var firebaseConfig = {
	apiKey: "AIzaSyCSrz_WzvNeSyb5KinqgPbOdFOKIdjoSXg",
	authDomain: "ar-carrental.firebaseapp.com",
	projectId: "ar-carrental",
	storageBucket: "ar-carrental.appspot.com",
	messagingSenderId: "655577676197",
	appId: "1:655577676197:web:861ff437996c0e3a19d04c",
	measurementId: "G-VEEQWJ4ETM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
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
			document.getElementById("logout").innerHTML = "Log Out";
		}
	} else {
		// No user is signed in.

		document.getElementById("user_div").style.display = "none";
		document.getElementById("login_div").style.display = "block";
	}
});
function formDate() {
	var hours = new Date().getHours();
	var minutes = new Date().getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	// hours = hours % 12;
	// hours = hours ? hours : 12; 
	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	const formatYmd = date => date.toISOString().slice(0, 10);
	var dateControl = document.querySelector('input[type="time"]');
	dateControl.value = hours + ":" + minutes;
	// dateControl.min = hours + ":" + minutes;
	var dateControl1 = document.querySelector('input[type="date"]');
	dateControl1.value = formatYmd(new Date());
	dateControl1.min = formatYmd(new Date());
	document.getElementById('drop-date').valueAsDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2);
	var dropdate = document.getElementById('drop-date');
	dropdate.min = formatYmd(new Date());
	var droptime = document.getElementById('drop-time');
	droptime.value  = hours + ":" + minutes;
	
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
