/*!

   This file contains Tutorial Code for using ScrollMagic

 */

$(document).ready(function(){

	// init controller
	var controller = new ScrollMagic.Controller();

	//pin the into
	var pinIntroScene = new ScrollMagic.Scene({
		triggerElement: '#intro',
		triggerHook:0
		,duration: '100%'
	})
	//pushfollowers allows elements to overlap a pinned element
	//consider the opposite scenario when things need to stick...
	.setPin('#intro', {pushFollowers:false})
	.addTo(controller);

	// When making Multiple pins...	
	var pinsecondScene = new ScrollMagic.Scene({
		triggerElement: '#project01',
		triggerHook:0,
		duration: '100%'
	})
	.setPin('#project01', {pushFollowers:false})
	.addTo(controller);


	// parallax scene 
	//Timelines allow grouping multiple tweens
	var parallaxTL = new TimelineMax();
	parallaxTL
		// The format is as follows: TweenMax.method(element, duration, {vars})
		// Method can be set, from, to, etc.
		// ease dictates the rate of change in the tween, see https://greensock.com/ease-visualizer to pick ease
		.from('.content-wrapper', 1, {autoAlpha: 0, ease: Power0.easeNone})
		.from('.bcg', 2, {y: '-50%', ease:Power0.easeNone}, 0);

	var slideParallaxScene = new ScrollMagic.Scene({
		triggerElement: '.bcg-parallax',
		triggerHook: 1,
		duration: '200%'
	})
	//.setTween(TweenMax.from('.bcg', 1, {y: '-50%', ease:Power0.easeNone}))
	.setTween(parallaxTL)
	.addTo(controller);


	var ourScene = new ScrollMagic.Scene({
		//note: img makes it more specific
		triggerElement: '#project01 img',
		// Adds an end point for the call toggle, if no duration class stays
		// Note: 100% means, it'll end after 100% of the element's height
		// duration: '80%',
		// dictaters the trigger position
		triggerHook: 0.9 
		// allows the animation to only happen once:
		,reverse:false
	})
	.setClassToggle("#project01", "fade-in")
	//addIndicators helps debug where indicators go
	.addIndicators({
		name: 'fade scene',
		colorTrigger: 'black',
		//indent: 200,
		colorStart: "#75C695",
		colorEnd: "pink"
	}) 
	.addTo(controller);



	// For repetitive tasks:
	$('.project').each(function(){
		var ourScene = new ScrollMagic.Scene({
			//Specifically the images
			triggerElement: this.children[0],
			triggerHook: 0.9
			//,reverse:false
		})
		// toggle the parent div containing the img
		.setClassToggle(this, "fade-in")
		.addIndicators({
			name: 'fade scene',
			colorTrigger: 'black',
			colorStart: "#75C695",
			colorEnd: "pink"
		}) 
		.addTo(controller);
	})


	/*!

	   This section contains code for Left-to-right Horizontal screen movement
		- It checks the number of slides to be traversed

	 */

	 var childrenCount = $('#js-slideContainer div').length
	 var xSize = "-" + (100 - 100/childrenCount) + '%'
	 //This is code that changes the css width of wrappers, depending on the no of images used
	 $('#js-slideContainer div').css('width', ('calc(100% /' + childrenCount + ')')) 
	 $('.sections').css('width', (100 * childrenCount + '%') ) 

	 //The scroll animation
	 var horizontalSlide = new TimelineMax()
		 // move the panels, stop at the midpoint of the last panel
		.to("#js-slideContainer", 1,   {x: xSize})
		// When dealing with extra panels
		// Note the Position Parameter for parallel tweens
		.to("#js-slideContainer", 0.2, {opacity:0}, 1)
		// .fromTo("#extraPanel", 0.4, {y: "-100%"}, {y: "0%", ease: Linear.easeNone, opacity:1}, 1)
		.fromTo("#extraPanel", 0.4, {x: "-0%"}, {x: "0%", ease: Linear.easeNone, opacity:1}, 1)
		//This pauses the animation
		.to("", 0.3, 2)


	 // create scene to pin and link animation
	 new ScrollMagic.Scene({
	    triggerElement: "#js-wrapper",
	   	triggerHook: "onLeave",
	    duration: "400%"
	  })
	    .setPin("#js-wrapper")
	    .setTween(horizontalSlide)
	    .addIndicators() // add indicators (requires plugin)
	    .addTo(controller);


	 /*!

	 	 This section contains code for transitional slides that overlap one another

	 */

	 // Transition movement
	 var transitionSlide = new TimelineMax();
	 $('#gifTest').children().each(function(index){
	 	transitionSlide.fromTo(this, 0.4, {}, {x: "0%", ease: Linear.easeNone, opacity:1}, index)
	 	//Remove previous slides.
	 	if(index>0)
	 	transitionSlide.fromTo( $('#gifTest').children().eq(index-1), 0.4, {}, {x: "0%", ease: Linear.easeNone, opacity:0}, index)
	 })
	 //This pauses the animation
	 transitionSlide.to("", 0.3, 2)
	 new ScrollMagic.Scene({
	    triggerElement: "#gifTest",
	   	triggerHook: "onLeave",
	    duration: "200%"
	 })
	    .setPin("#gifTest")
	    .setTween(transitionSlide)
	    .addIndicators() // add indicators (requires plugin)
	    .addTo(controller);


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
		 		 motionComicTimeline.fromTo(this, 0.1, {}, {ease: Linear.easeNone, opacity:1}, index)
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
				 .addIndicators() // add indicators (requires plugin)
				 .addTo(controller);
		 	}

		


	 	})
	 })


	 //No Horizontal movement.
	var $body = $(document);
    $body.bind('scroll', function() {
        // "Disable" the horizontal scroll.
        if ($body.scrollLeft() !== 0) {
            $body.scrollLeft(0);
        }
    });



});





	