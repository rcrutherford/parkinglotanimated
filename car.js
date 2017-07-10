	
	function getRandom(min, max) {
	    var result = Math.random() * (max - min) + min;
	    return Math.round(result);
	}

	let Car = function(carImage, space) {
		let speed = getRandom(5,10);
		//let speed = 5;
		this.rotated = false;
		this.reachedSpace = false;
		this.heading='right';
		this.currentLane = '';
		this.path = [];
		let self = this;


		this.observeTime = function(e) {
			// console.log('observeTime');
			// console.dir(this);
			let carLeftPx = parseInt(getComputedStyle(carImage).left.replace('px',''));
			let carRightPx = parseInt(getComputedStyle(carImage).right.replace('px',''));
			let carTopPx = parseInt(getComputedStyle(carImage).top.replace('px',''));
			let carBottomPx = parseInt(getComputedStyle(carImage).bottom.replace('px',''));
			let carFrontPx = 0;

			//console.log('space top: '+parseInt(getComputedStyle(space).top.replace('px','')));
			// console.log('space bottom: '+space.style.bottom.replace('px',''));
			
			// where is space in relation to the car?

			//moves car			
			//is the space in my lane?
			if (self.path.length == 1) {
				// all is good just go up to space
			}
			
			if(self.reachedSpace == false && carTopPx > parseInt(getComputedStyle(space).top.replace('px',''))+speed) {
				// console.log('bottom: '+carBottomPx);
				self.moveCarUp();
			}
			else { 
				if (self.reachedSpace == false) {
					self.reachedSpace=true;
					console.log('reachedSpace:'+self.reachedSpace);
				}
			}
			
			if (self.rotated == false && self.reachedSpace == true) {
				switch (true) {
					case (space.enterDirection == 'left' && self.heading =='up'):
						self.rotateLeft();
						break;
					case (space.enterDirection == 'right' && self.heading == 'up'):
						self.rotateRight();
						break;
					case (space.enterDirection == 'up' && self.heading =='right'):
						self.rotateLeft();
						break;
					case (space.enterDirection == 'up' && self.heading == 'left'):
						self.rotateRight();
						break;
					case (space.enterDirection == 'down' && self.heading =='left'):
						self.rotateLeft();
						break;
					case (space.enterDirection == 'down' && self.heading == 'right'):
						self.rotateRight();
						break;
				}
				self.rotated=true;
				carFrontPx = function () {
					switch (self.heading) {
						case 'up':
							carTopPx;
							break;
						case 'down':
							carBottomPx;
							break;
						case 'right':
							carRightPx;
							break;
						case 'left':
							carleftpx;	
							break;
					} 
				}
			}
			// park it
			let enterDirection = space.enterDirection;
			if (self.rotated == true && carLeftPx > parseInt(getComputedStyle(space).left.replace('px',''))+speed) {
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
		}
			
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
			// console.log('down: ' + self.bottom());
			carImage.style.bottom = (self.bottom() -speed ) + 'px';
		}

		this.moveCarUp = function() {
			// console.log('up: ' + self.bottom());
			carImage.style.bottom = (self.bottom() + speed) + 'px';
		}

		this.moveCarRight = function() {
			// console.log('right: ' + self.left());
			carImage.style.left = (self.left() + speed) + 'px';
		}

		this.moveCarLeft = function() {
			// console.log('left: ' + self.left());
			carImage.style.left = (self.left() - speed) + 'px';
		}

		
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
		let lane = getRandom(1,2);
		let myLane = 'lane'+lane;
		this.currentLane = myLane;
		console.log('carLane: '+myLane+' spaceLane: '+space.lane);
		carImage.style.left = eval(myLane+'.style.left');

		let path = '';
		let paths = [
			{'start':'lane1',
			 'space':'lane1',
			 'path':'up'
			},
			{'start':'lane1',
			 'space':'lane2',
			 'path':'up,right@lane3,up|down@lane2'
			},
			{'start':'lane1',
			 'space':'lane3',
			 'path':'up,right@lane3'
			},
			{'start':'lane1',
			 'space':'lane4',
			 'path':'up,right@lane4'
			},
			{'start':'lane2',
			 'space':'lane2',
			 'path':'up'
			},
			{'start':'lane2',
			 'space':'lane1',
			 'path':'up,left@lane3,up|down@lane1'
			},
			{'start':'lane2',
			 'space':'lane3',
			 'path':'up,left@lane3'
			},
			{'start':'lane2',
			 'space':'lane4',
			 'path':'up,left@lane4'
			}
		];
		
		for (i in paths) {
			// console.log ('i: '+paths[i].start);
			if (paths[i].start == self.currentLane && paths[i].space == space.lane) {
				console.log ('path: '+paths[i].path);
				self.path = paths[i].path.split(',');
				break;
			}
		}

	} // end of Car

	