	
	function getRandom(min, max) {
	    var result = Math.random() * (max - min) + min;
	    return Math.round(result);
	}

	let Car = function(carImage, space) {
		let speed = getRandom(5,20);
		let self = this;
		self.heading='';
		
		this.observeTime = function(e){
			// console.dir(this);

			let carLeftPx = parseInt(getComputedStyle(carImage).left.replace('px',''));
			let carTopPx = parseInt(getComputedStyle(carImage).top.replace('px',''));
			//moves car
			if(carTopPx < space.style.top) {
				console.log('top: '+carTopPx);
				self.moveCarUp();
			}
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
			switch (heading) {
				case 'up':
					if (RorL == 'R') {
						newD  = 'right';
					}
					else {
						newD = 'left';
					}
					break;
				case 'right':
					if (RorL == 'R') {
						newD  = 'down';
					}
					else {
						newD = 'up';
					}
					break;
				case 'left':
					if (RorL == 'R') {
						newD  = 'up';
					}
					else {
						newD = 'down';
					}
					break;
				case 'down':
					if (RorL == 'R') {
						newD  = 'left';
					}
					else {
						newD = 'right';
					}
					break;
			}
			return newD;
		}

		this.rotateRight = function () {
			self.heading = self.newDirection(self.heading,'R')
			carImage.style.transform = 'rotate(90deg)';
		}

		this.rotateLeft = function () {
			self.heading = self.newDirection(self.heading,'L')
			carImage.style.transform = 'rotate(-90deg)';
		}

		this.moveCarDown = function() {
			console.log('px: ' + self.bottom());
			carImage.style.bottom = (self.bottom() -speed ) + 'px';
		}

		this.moveCarUp = function() {
			console.log('px: ' + self.bottom());
			carImage.style.bottom = (self.bottom() + speed) + 'px';
		}

		this.moveCarRight = function() {
			console.log('px: ' + self.left());
			carImage.style.left = (self.left() + speed) + 'px';
		}

		this.backCarLeft = function() {
			console.log('px: ' + self.left());
			carImage.style.left = (self.left() - speed) + 'px';
		}

		this.backCarDown = function() {
			console.log('px: ' + self.bottom());
			carImage.style.bottom = (self.bottom() + speed ) + 'px';
		}

		this.backCarUp = function() {
			console.log('px: ' + self.bottom());
			carImage.style.bottom = (self.bottom() - speed) + 'px';
		}

		this.backCarRight = function() {
			console.log('px: ' + self.left());
			carImage.style.left = (self.left() - speed) + 'px';
		}

		this.backCarLeft = function() {
			console.log('px: ' + self.left());
			carImage.style.left = (self.left() + speed) + 'px';
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

		this.heading = 'right';
		this.rotateLeft();
		carImage.style.bottom = parseInt(carImage.style.height)*-1+'px';
		carImage.style.left = lane1.style.left;
		console.log(self.heading);

	}

	