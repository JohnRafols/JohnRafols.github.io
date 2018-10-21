/*!

   This file contains the main code for all of the Motion comic

   Code reference:
   https://www.youtube.com/playlist?list=PLkEZWD8wbltnyDKWAgQfRDP_l0BC-zlU-


	The main functions:

	- The ability to move horizontal and vertical
		Check this https://codepen.io/nailaahmad/pen/BpJPJg
	- Transition Images through scrolling

 */

$(document).ready(function(){

	 document.getElementsByTagName("html")[0].style.visibility = "visible";

	// init controller
	var controller = new ScrollMagic.Controller();

	//
	//pin the into
	// var pinIntroScene = new ScrollMagic.Scene({
	// 	triggerElement: '#intro',
	// 	triggerHook:0
	// 	,duration: '50%'
	// })
	// //pushfollowers allows elements to overlap a pinned element
	// //consider the opposite scenario when things need to stick...
	// .setPin('#intro', {pushFollowers:false})
	// .addTo(controller);


	 /*!

	 	 This section contains code for a Universal Slide Wrapper that can handle all possible slide combinations

	 */

	 $('.motionComicWrapper').each(function(wrapperIndex){

	 	//We should probably use only ONE timeline per wrapper
	 	var uniqueWrapper = $(this);
	 	var motionComicTimeline = new TimelineMax();

	 	//Go through each individual wrapper, build up its timeline
	 	uniqueWrapper.children().each(function(index){

	 		$(this).css('z-index', 999-index); 

		 	if($(this).hasClass("horizontalMovement")){
	 			var childrenCount = $(this).children("div").length
				var xSize = "-" + (100 - 100/childrenCount) + '%'	
				// This is code that changes the css width of wrappers, depending on the no of images used
				$(this).children("div").css('width', ('calc(100% /' + childrenCount + ')')) 
				$(this).css('width', (100 * childrenCount + '%') ) 
				// move the panels, stop at the last panel
				motionComicTimeline
				.to(this, 0.1, {opacity: 1}, index)
				.to(this, 0.8,{x: xSize, delay: '0.2'}, index)

		 	}

		 	else if($(this).hasClass("backwardHorizontalMovement")){
		 		var childrenCount = $(this).children("div").length
				var xSize =  (100 - 100/childrenCount) + '%'	
				$(this).children("div").css('width', ('calc(100% /' + childrenCount + ')')) 
				$(this).css('width', (100 * childrenCount + '%') ) 
				motionComicTimeline
				.to(this, 0.1, {opacity: 1}, index)
				.to(this, 0.8,{x: xSize, delay: '0.2'}, index)
		 	}


		 	else if($(this).hasClass("upwardMovement")){
				//We need a dynamic version of this, right now, code breaks when screen moves.
				//var testsize = $(this).children("div :last-child").height()
				//var test = ("" + ($(this).height() - testsize/2)  + "px");
				motionComicTimeline
				 	.to(this, 0.1, {opacity: 1}, index)
				 	.fromTo(this, 0.8, {y: "-100%"}, {y: '0%', ease: Linear.easeNone}, index)
				 	//.fromTo(this, 0.4, {y: "-100%"}, {y: test, ease: Linear.easeNone}, index)
				 	//.to("", 0.3, index)
				 	//.set({},{},"+=5");
		 	}


		 	else if($(this).hasClass("overlappingMovement")){
		 		 motionComicTimeline.fromTo(this, 0.01, {}, {ease: Linear.easeNone, opacity:1}, index)
				 //.to("", 0.3, index+1)
		 	}


		 	//Hide previous slides.
	 		if(index>0){
	 			motionComicTimeline.fromTo(uniqueWrapper.children().eq(index-1), 
	 				0.1, {}, {opacity:0}, index)
	 		}

		 	//Once at the end of the loop, add the scene.
		 	if(uniqueWrapper.children().length-1 == index){
		 		new ScrollMagic.Scene({
				    triggerElement: uniqueWrapper,
				   	triggerHook: "onLeave",
				    duration: "400%"
				 })
				 .setPin(uniqueWrapper)
				 .setTween(motionComicTimeline)
				 //.addIndicators() // add indicators (requires plugin)
				 .addTo(controller);
		 	}
	 	})
	 })


	// No Horizontal movement.
	var $body = $(document);
    $body.bind('scroll', function() {
        // "Disable" the horizontal scroll.
        if ($body.scrollLeft() !== 0) {
            $body.scrollLeft(0);
        }
    });


});





	