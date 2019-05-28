/* 
 
 This is the main code for the Parallax

*/


$(window).load(function(){

	$.stellar({
	    horizontalScrolling: true,
	    verticalScrolling: false,
	    // hideElement: function($elem) { 
	    // 	$elem.hide(); 
	    // },
	    hideDistantElements: false,
	    responsive: true

	});

	//Hide some stuff onload
	// $('#basicMessage2').hide();
	// $('#basicMessage3').hide();
	$('#basicMessage5').hide();

})


/* 
 
 // This Brings the website back into the first section on page refresh

	window.onbeforeunload = function () {
	   window.scrollTo(0, 0);
	}

*/



// This code is for an Infinite loop website: Make sure the last section is identical to the first section

window.onscroll = function(ev) {
	var limit = document.getElementById("sectionLast").getBoundingClientRect().x
    if (limit <= 0) {
        console.log("you're at the corner of the page");
        $('#basicMessage1').fadeIn();
        window.scrollTo(0, 0);
    }

    // This code is for hiding/showing speech bubbles:


    // var basicMessage1 = document.getElementById("section1").getBoundingClientRect().right
    // if (basicMessage1 <= 600) {
    //     $('#basicMessage1').fadeOut();
    // }
    // else if (basicMessage1 >= 0) {
    // 	$('#basicMessage1').fadeIn();
    // }

    var basicMessage2 = document.getElementById("section2").getBoundingClientRect().right
    // console.log(speechBubble2)
    if (basicMessage2 <= 600) {
        $('#basicMessage2').fadeOut();
    }
    else if (basicMessage2 >= 0) {
    	$('#basicMessage2').fadeIn();
    }


    //Gotta hide this till the right moment...
    var basicMessage5 = document.getElementById("section3").getBoundingClientRect().right
    if ( (basicMessage5 >= -300 && basicMessage5 <= 600)) {
        $('#basicMessage5').fadeIn();
    } else{
        $('#basicMessage5').fadeOut();
    }
    



};



