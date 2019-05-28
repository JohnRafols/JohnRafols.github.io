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


    var speechBubbleLimit = document.getElementById("section1").getBoundingClientRect().right
    if (speechBubbleLimit <= 600) {
        $('#basicMessage1').fadeOut();
    }
    else if (speechBubbleLimit >= 0) {
    	$('#basicMessage1').fadeIn();
    }

};



