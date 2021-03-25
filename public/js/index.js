function formDate() {
	var hours = new Date().getHours();
	var minutes = new Date().getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; 
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var drop = hours + 6;
	const formatYmd = date => date.toISOString().slice(0, 10);
	console.log(formatYmd(new Date()));
	var dateControl = document.querySelector('input[type="time"]');
	dateControl.value = hours + ":" + minutes;
	dateControl.min = hours + ":" + minutes;
	var dateControl1 = document.querySelector('input[type="date"]');
	dateControl1.value = formatYmd(new Date());
	dateControl1.min = formatYmd(new Date());
	document.getElementById('drop-date').valueAsDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2);
	var dropdate = document.getElementById('drop-date');
	dropdate.min = formatYmd(new Date());
	var droptime = document.getElementById('drop-time');
	droptime.value  = drop + ":" + minutes;
	droptime.min = drop + ":" + minutes;
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