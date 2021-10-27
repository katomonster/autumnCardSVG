/*  Autumn Greeting Card -- js */

(function($){
	'use strict';

	// declare actors here
	const backFallingLeaves = document.querySelectorAll('#back_falling_leaves g');
	const treeTrunk = document.getElementById('tree_trunk');
	const treeLeaves = document.querySelectorAll('#tree_leaves g');
	const floorLeaves = document.querySelectorAll('#floor_leaves path');
	const bird = document.getElementById('Bird');
	const birdHat = document.getElementById('BirdHat');
	const rightEye = document.getElementById('rightEye');
	const leftEye = document.getElementById('leftEye');
	const nest = document.getElementById('nest');
	const textLine1 = document.querySelectorAll('.text-line-1');
	const textLine2 = document.querySelectorAll('.text-line-2');
	const textLGreeting = document.querySelectorAll('.text-greeting');
	const cardContainer = document.querySelector('.card.container')


	// clear stage 
	function clearStage() {
		const clearTl = new TimelineMax();

		clearTl
			.set(backFallingLeaves, {autoAlpha: 0})
			.set(treeTrunk, {autoAlpha: 0})
			.set(treeLeaves, {autoAlpha: 0})
			.set(bird, {autoAlpha: 0})
			.set(nest, { autoAlpha: 0})
			.set(textLine1, {autoAlpha: 0})
			.set(textLine2, {autoAlpha: 0})
			.set(textLGreeting, {autoAlpha: 0})
			.set(floorLeaves, {y: '+=275', onComplete: showStage})
			;



		return clearTl;

	}

	// show stage
	function showStage() {
		cardContainer.style.display = 'block'
	}

	// enter floor vegetation
	function floorVegetation() {
		const fvTl = new TimelineMax();


		fvTl
			.set(floorLeaves, {opacity: 1})
			.staggerTo(floorLeaves, 1, {
					y: 0,
					ease: Back.easeInOut
				}, 0.02)

		return fvTl;
	}

	// enter tree trunk
	function animateTreeTrunk() {
		const treeTrunkTl = new TimelineMax();

		treeTrunkTl
			.fromTo(treeTrunk, 1.1, {
					scaleY: 0.2,
					autoAlpha: 0,
					transformOrigin: 'center bottom'
				},
				{
					scaleY: 1,
					autoAlpha: 1,
					transformOrigin: 'center bottom',
					ease: Back.easeInOut,
				})
			.fromTo(treeTrunk, 0.9, {
					scaleX: 0.2,
					autoAlpha: 0,
					transformOrigin: 'center bottom'
				},
				{
					scaleX: 1,
					autoAlpha: 1,
					transformOrigin: 'center bottom',
					ease: Back.easeInOut,
				}, '-=0.9')
		return treeTrunkTl;
	}

	// enter tree stuff
	function animateTreeStuff() {
		const treeStuffTl = new TimelineMax();
		const eyes = [rightEye, leftEye];

		treeStuffTl
			.staggerFromTo(treeLeaves, 0.5, {
				autoAlpha: 0,
				scale: 0.2,
				transformOrigin: 'center center',
			}, {
				autoAlpha: 1,
				scale: 1,
				transformOrigin: 'center center',
				ease: Back.easeInOut,
			}, 0.02)
			.fromTo(nest, 1, {
					y: 0,
					scale: 0.2,
					autoAlpha: 0,
					transformOrigin: 'center center'
				}, {
					y: '-=15',
					scale: 1,
					autoAlpha: 1,
					transformOrigin: 'center center',
					ease: Elastic.easeOut,
				}, '+=0.1')
			.to(nest, 0.3, {
				y:'+=15',
				ease:Bounce.easeOut
			}, '-=0.2')
			.add('nest-popping')
			.set(birdHat, {rotation: 12, x: '+=6'})
			.fromTo(bird, 1.75,{
				y: '+=67', autoAlpha: 0
			}, {
				y: '-=39', autoAlpha: 1, ease: Power4.easeInOut
			}, 'nest-popping-=.5')
			.add('bird-peeking')
			.set(eyes, {autoAlpha: 0})
			.set(eyes, {autoAlpha: 1}, '+=0.2')
			.set(eyes, {autoAlpha: 0}, '+=0.3')
			.set(eyes, {autoAlpha: 1}, '+=0.2')
			.add('bird-blinking')
			.to(bird, 0.8, {y: '-=34', ease: Power4.easeInOut})
			.to(bird, 0.08, {y: '+=10', ease: Back.easeInOut})
			.to(birdHat, 0.4, {y: '-=12'}, '-=0.6')
			.to(birdHat, 0.3, { y: 0, rotation: 0, x: 0, onComplete: startBlinking}, '-=0.2')
			;

		function startBlinking() {
			const blinkTl = new TimelineMax({repeat: 10, repeatDelay: 5});

			eyes.forEach((eye, index) => {
				blinkTl
				.set(eye, {autoAlpha: 0}, `+=${index * 0.1}`)
				.set(eye, {autoAlpha: 1}, '+=0.2')
				.set(eye, {autoAlpha: 0}, '+=1.3')
				.set(eye, {autoAlpha: 1}, '+=0.2')

			})

			return blinkTl;
		}

		return treeStuffTl;
	}

	// enter the greeting text
	function enterGreeting() {
		const greetingTl = new TimelineMax();

		greetingTl
			.fromTo(textLine1, 1, {y: '-=50', autoAlpha: 0}, {y: 0, autoAlpha: 1})
			.fromTo(textLine2, 1, {y: '-=25', autoAlpha: 0}, {y: 0, autoAlpha: 1})
			.staggerFromTo(textLGreeting, 0.5, {
				autoAlpha: 0,
				scale: 2,
				transformOrigin: 'bottom center'
			}, {
				autoAlpha: 1,
				scale: 1,
				transformOrigin: 'bottom center'
			}, 0.2);


		return greetingTl;
	}

	function loopFallingLeaves() {
		const windowHeight = document.documentElement.clientHeight;
		const windowWidth = document.documentElement.clientWidth;

		const leavesTl = new TimelineMax()
		
		backFallingLeaves.forEach((leaf, index) => {
			const xPos = Math.abs(Math.round(Math.random() * windowWidth - windowWidth/2 + index * Math.random() * 30));
			const dur = 6 + Math.random() * 3;
			const rot = Math.random() * 360;
		
			const tween = TweenMax.fromTo(leaf, dur, {
					autoAlpha: 0.2, 
					x: xPos, 
					y: -100, 
					rotation: 0 
				}, {
					autoAlpha: 1,
					y: windowHeight + 300,
					rotation: rot,
					ease: Linear.easeNone,
					onComplete: () => { console.log('leaf: ', index, xPos) }
				}	);
			;

			leavesTl
				.add(tween)
		}); 


		return leavesTl;
	}

	function repeatLeavesLoop() {
		const repeatTl = new TimelineMax();

		Array(2).fill().forEach(array => {
			repeatTl.add(loopFallingLeaves());
		})

		return repeatTl;
	}
	
	function fadeBG() {
		const bgColors = ['#f3ebcc', '#edcc93', '#f8b373', '#f3ebcc', ];
		const body = document.querySelector('body');
		const bgTl = new TimelineMax({repeat: 4});

		bgColors.forEach((color, i) => {
			const tween = TweenMax.to(body, 5, {backgroundColor: color, onComplete: ()=>{console.log(i)}}, '+=2')
			bgTl.add(tween);
		});

		return bgTl;
	}
	
	// the GO function ...to kick things all off
	function startMainTimeline() {
		const mainTl = new TimelineMax();
		mainTl
			.add(clearStage())
			.add('scene-clear-stage')
			.add(floorVegetation())
			.add('scene-floor-veg')
			.add(animateTreeTrunk(), 'scene-floor-veg-=1')
			.add('scene-tree-trunk')
			.add(animateTreeStuff())
			.add('scene-tree-stuff')
			.add(enterGreeting())
			.add('scene-greeting')
			.add(repeatLeavesLoop(), 'scene-floor-veg')
			.add(repeatLeavesLoop())
			.add(fadeBG(), 'scene-greeting-=5')
			;
	}

	startMainTimeline();

})(jQuery);


