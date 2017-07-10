	
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
		let self = this;


		this.observeTime = function(e){
			// console.log('observeTime');
			// console.dir(this);
			let carLeftPx = parseInt(getComputedStyle(carImage).left.replace('px',''));
			let carRightPx = parseInt(getComputedStyle(carImage).right.replace('px',''));
			let carTopPx = parseInt(getComputedStyle(carImage).top.replace('px',''));
			let carBottomPx = parseInt(getComputedStyle(carImage).bottom.replace('px',''));

			console.log('space top: '+parseInt(getComputedStyle(space).top.replace('px','')));
			// console.log('space bottom: '+space.style.bottom.replace('px',''));
			
			//moves car			
			//is space in my lane?
			if (self.currentLane == space.lane) {
				console.log('lane: '+self.currentLane);
			}
			if(self.reachedSpace == false && carTopPx > parseInt(getComputedStyle(space).top.replace('px',''))+speed) {
				// console.log('bottom: '+carBottomPx);
				self.moveCarUp();
			}
			else {
				self.reachedSpace=true;
				console.log('reachedSpace:'+self.reachedSpace);
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
			}
			// park it
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
		console.log(myLane);
		carImage.style.left = eval(myLane+'.style.left');
		console.log('carImage.style.left: '+carImage.style.left);

	}

	