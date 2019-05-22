/* 
 
 This is the main code for the Parallax

*/


$(window).load(function(){

	$.stellar({
	    horizontalScrolling: true,
	    verticalScrolling: false,
	    hideElement: function($elem) { 
	    	$elem.hide(); 
	    },
	    hideDistantElements: true,
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
        //console.log("you're at the corner of the page");
        window.scrollTo(0, 0);
    }
};

