	
	function getRandom(min, max) {
	    var result = Math.random() * (max - min) + min;
	    return Math.round(result);
	}

	let Car = function(carImage, space) {
		// let speed = getRandom(5,20);
		let speed = 5;
		this.rotated = false;
		this.reachedSpace = false;
		this.heading='right';
		let self = this;


		this.observeTime = function(e){
			// console.log('observeTime');
			// console.dir(this);

			let carLeftPx = parseInt(getComputedStyle(carImage).left.replace('px',''));
			console.log('carLeftPx:'+carLeftPx);
			let carBottomPx = parseInt(getComputedStyle(carImage).bottom.replace('px',''));
			console.log('carBottomPx:'+carBottomPx);
			
			//moves car
			

			if(self.reachedSpace==false && carBottomPx < space.style.bottom.replace('px','')) {
				// console.log('bottom: '+carBottomPx);
				self.moveCarUp();
			}
			else {
				self.reachedSpace=true;
				console.log('reachedSpace='+self.reachedSpace);
			}
			
			if (self.rotated == false && self.reachedSpace ==true) {
				switch (true) {
					case (space.opening=='right' && self.heading=='up'):
						self.rotateLeft();
						break;
					case (space.opening=='left' && self.heading=='up'):
						self.rotateRight();
						break;
				}
				self.rotated=true;
			}
			if (self.rotated == true && carLeftPx > space.style.left.replace('px','')) {
				switch (self.heading) {
					case 'up':
						self.moveCarUp();
						break;
					case 'down':
						self.moveCarDown();
						break;
					case 'right':
						self.moveCarRight();
						break;
					case 'left':
						self.moveCarLeft();
						break;
				}
			}

			// self.rotateLeft();
			
		}

			// //rotates car
			// if(self.left() > space.left && !self.rotated) {
			// 	carImage.style.transform = 'rotate(90deg)';
			// 	self.rotated = true;
			// }

			// // parks rotated car
			// if(self.rotated && self.top() < space.top) {
			// 	self.moveCarDown();
			// }
		

		this.newDirection = function (heading,RorL)  {
			let newD = '';
			if (RorL == 'R') {
				switch (heading) {
					case 'up':
						newD  = 'right';
						break;
					case 'down':
						newD  = 'left';
						break;
					case 'right':
						newD  = 'down';
						break;
					case 'left':
						newD  = 'up';
						break;
				}
			}
			if (RorL == 'L') {
				switch (heading) {
					case 'up':
						newD  = 'left';
						break;
					case 'down':
						newD  = 'right';
						break;
					case 'right':
						newD  = 'up';
						break;
					case 'left':
						newD  = 'down';
						break;
				}
			}
			return newD;
		}

		this.rotateRight = function () {
			console.log('rotateRight from '+self.heading);
			
			switch (self.heading) {
				case 'up':
					carImage.style.transform = 'rotate(90deg)';
					break;
				case 'right':
					carImage.style.transform = 'rotate(180deg)';
					break;
				case 'down':
					carImage.style.transform = 'rotate(270deg)';
					break;
				case 'left':
					carImage.style.transform = 'rotate(0deg)';
					break;
			}
			self.heading = self.newDirection(self.heading,'R')
			console.log('new heading: '+self.heading);
		}

		this.rotateLeft = function () {
			console.log('rotateLeft from '+self.heading);
			
			switch (self.heading) {
				case 'up':
					carImage.style.transform = 'rotate(-180deg)';
					break;
				case 'right':
					carImage.style.transform = 'rotate(-90deg)';
					break;
				case 'down':
					carImage.style.transform = 'rotate(0deg)';
					break;
				case 'left':
					carImage.style.transform = 'rotate(-270deg)';
					break;
			}
			self.heading = self.newDirection(self.heading,'L')
			console.log('new heading: '+self.heading);
		}

		this.moveCarDown = function() {
			console.log('down: ' + self.bottom());
			carImage.style.bottom = (self.bottom() -speed ) + 'px';
		}

		this.moveCarUp = function() {
			console.log('up: ' + self.bottom());
			carImage.style.bottom = (self.bottom() + speed) + 'px';
		}

		this.moveCarRight = function() {
			console.log('right: ' + self.left());
			carImage.style.left = (self.left() + speed) + 'px';
		}

		this.moveCarLeft = function() {
			console.log('left: ' + self.left());
			carImage.style.left = (self.left() - speed) + 'px';
		}

		// this.backCarDown = function() {
		// 	console.log('px: ' + self.bottom());
		// 	carImage.style.bottom = (self.bottom() + speed ) + 'px';
		// }

		// this.backCarUp = function() {
		// 	console.log('px: ' + self.bottom());
		// 	carImage.style.bottom = (self.bottom() - speed) + 'px';
		// }

		// this.backCarRight = function() {
		// 	console.log('px: ' + self.left());
		// 	carImage.style.left = (self.left() - speed) + 'px';
		// }

		// this.backCarLeft = function() {
		// 	console.log('px: ' + self.left());
		// 	carImage.style.left = (self.left() + speed) + 'px';
		// }

		this.top = function() {
			return parseInt(getComputedStyle(carImage).top.replace('px',''));
		}

		this.bottom = function() {
			return parseInt(getComputedStyle(carImage).bottom.replace('px',''));
		}

		this.left = function() {
			return parseInt(getComputedStyle(carImage).left.replace('px',''));
		}

		this.right = function() {
			return parseInt(getComputedStyle(carImage).right.replace('px',''));
		}

		carImage.style.height = spaceSmallestDim-10+'px';
		carImage.style.width = spaceLargestDim-10+'px';


		this.rotateLeft();
		carImage.style.bottom = parseInt(carImage.style.height)*-1+'px';
		carImage.style.left = lane1.style.left;
		console.log('heading: '+self.heading);

	}

	