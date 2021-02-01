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