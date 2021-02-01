$(document).ready(function () {
    $(".faqq1").click(function () {
        $(".faqa1").toggle("slide");
    });
    $(".faqq2").click(function () {
        $(".faqa2").toggle("slide");
    });
    $(".faqq3").click(function () {
        $(".faqa3").toggle("slide");
    });
    $(".faqq4").click(function () {
        $(".faqa4").toggle("slide");
    });
    $(".faqq5").click(function () {
        $(".faqa5").toggle("slide");
    });
    $(".faqq6").click(function () {
        $(".faqa6").toggle("slide");
    });
    $(".faqq7").click(function () {
        $(".faqa7").toggle("slide");
    });
    $(".faqq8").click(function () {
        $(".faqa8").toggle("slide");
    });
    $(".faqq9").click(function () {
        $(".faqa9").toggle("slide");
    });
    $(".faqq10").click(function () {
        $(".faqa10").toggle("slide");
    });
    $(".faqq11").click(function () {
        $(".faqa11").toggle("slide");
    });
    $(".faqq12").click(function () {
        $(".faqa12").toggle("slide");
    });
    $(".faqq13").click(function () {
        $(".faqa13").toggle("slide");
    });
    $(".faqq14").click(function () {
        $(".faqa14").toggle("slide");
    });
});

function myFunction() {
    var x = $("#faq").text();
    if (x === "+") {
        $("#faq").text("-");
    } else {
        $("#faq").text("+");
    }
}

function myFunction2() {
    var x = $("#faq2").text();
    if (x === "+") {
        $("#faq2").text("-");
    } else {
        $("#faq2").text("+");
    }
}

function myFunction3() {
    var x = $("#faq3").text();
    if (x === "+") {
        $("#faq3").text("-");
    } else {
        $("#faq3").text("+");
    }
}

function myFunction4() {
    var x = $("#faq4").text();
    if (x === "+") {
        $("#faq4").text("-");
    } else {
        $("#faq4").text("+");
    }
}
function myFunction5() {
    var x = $("#faq5").text();
    if (x === "+") {
        $("#faq5").text("-");
    } else {
        $("#faq5").text("+");
    }
}
function myFunction6() {
    var x = $("#faq6").text();
    if (x === "+") {
        $("#faq6").text("-");
    } else {
        $("#faq6").text("+");
    }
}
function myFunction7() {
    var x = $("#faq7").text();
    if (x === "+") {
        $("#faq7").text("-");
    } else {
        $("#faq7").text("+");
    }
}
function myFunction8() {
    var x = $("#faq8").text();
    if (x === "+") {
        $("#faq8").text("-");
    } else {
        $("#faq8").text("+");
    }
}
function myFunction9() {
    var x = $("#faq9").text();
    if (x === "+") {
        $("#faq9").text("-");
    } else {
        $("#faq9").text("+");
    }
}
function myFunction10() {
    var x = $("#faq10").text();
    if (x === "+") {
        $("#faq10").text("-");
    } else {
        $("#faq10").text("+");
    }
}
function myFunction11() {
    var x = $("#faq11").text();
    if (x === "+") {
        $("#faq11").text("-");
    } else {
        $("#faq11").text("+");
    }
}
function myFunction12() {
    var x = $("#faq12").text();
    if (x === "+") {
        $("#faq12").text("-");
    } else {
        $("#faq12").text("+");
    }
}
function myFunction13() {
    var x = $("#faq13").text();
    if (x === "+") {
        $("#faq13").text("-");
    } else {
        $("#faq13").text("+");
    }
}
function myFunction14() {
    var x = $("#faq14").text();
    if (x === "+") {
        $("#faq14").text("-");
    } else {
        $("#faq14").text("+");
    }
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