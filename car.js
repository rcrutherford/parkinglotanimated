	
	function getRandom(min, max) {
	    var result = Math.random() * (max - min) + min;
	    return Math.round(result);
	}

	let Car = function(carImage, space, iA, iB, iC, iD) {
		let speed = getRandom(5,10);
		//let speed = 5;
		this.rotated = false;
		this.reachedSpace = false;
		this.finishedStep = false;
		this.heading='right';
		this.currentLane = '';
		let self = this;
		let objectStyleCheck = 'top';
				

		this.observeTime = function(e) {
			// console.log('observeTime');
			// console.dir(this);
			let carLeftPx = function() {return parseInt(getComputedStyle(carImage).left.replace('px',''));}
			let carRightPx = function() {return parseInt(getComputedStyle(carImage).right.replace('px',''));}
			let carTopPx = function() {return parseInt(getComputedStyle(carImage).top.replace('px',''));}
			let carBottomPx = function() {return parseInt(getComputedStyle(carImage).bottom.replace('px',''));}
			let carFrontPx = function () {
				switch (self.heading) {
					case 'up':
						return self.top();
						break;
					case 'down':
						return self.bottom();
						break;
					case 'right':
						return self.right();
						break;
					case 'left':
						return self.left();	
						break;
				} 
			}

			//follow path to space		
			let myHeadForPx = 0;
			let myDirection = '';
			if (myPath.length > 0 ) {
				console.log('myPath.length: '+myPath.length);
				myDirection = myPath[0];
				if (myDirection == 'up|down') {
					if (carTopPx > space.style.top) {
						myDirection='up';
					}
					else {
						myDirection='down';
					}
				}
				console.log('path direction: '+myDirection);
				if (self.heading != myDirection) { 
					self.rotateCar(myDirection);
				}
				let myHeadFor = myPath[1];
			 	let foostr = `getComputedStyle(${myHeadFor}).${objectStyleCheck}.replace('px','')`;
			 	console.log('foostr: '+foostr);
				myHeadForPx = eval(foostr);
				console.log('myHeadFor, myHeadForPx: '+myHeadFor+','+myHeadForPx);
				if (myHeadFor.substring(0,1)=='i') {
					myHeadForPx = parseInt(myHeadForPx)+(spaceSmallestDim/2);	
				}
				else {
					myHeadForPx = parseInt(myHeadForPx)+speed;	
				}
			}	

			if 	(  self.finishedStep == false 
				&& myPath.length > 0
				&& carFrontPx() > myHeadForPx
				) {
				switch (self.heading) {
					case 'up':
						self.moveCarUp(speed);
						break;
					case 'down':
						self.moveCarDown(speed);
						break;
					case 'left':
						self.moveCarLeft(speed);
						break;
					case 'right':
						self.moveCarRight(speed);
						break;
				}

			}
			else { 
				if (self.finishedStep == false ) {
					if (myPath.length > 0) {
						myPath.shift();
						myPath.shift();
						console.log(myPath);
					}
					if (myPath.length == 0) {
						self.reachedSpace=true;
						self.finishedStep = true;
					}

				}
			}
			
			if (self.rotated == false && self.reachedSpace == true) {
				console.log('rotate into space: '+space.enterDirection);
				self.rotateCar(space.enterDirection)
				self.rotated=true;
			}

			// park it
			let enterDirection = space.enterDirection;
			if (self.rotated == true 
				&& self.reachedSpace == true
				&& carFrontPx() > eval(`space.style.${enterDirection}.replace('px','')`)
			) {
				console.log('parking: '+carFrontPx());
				switch (self.heading) {
					case 'up':
						self.moveCarUp(1);
						break;
					case 'down':
						self.moveCarDown(1);
						break;
					case 'right':
						self.moveCarRight(1);
						break;
					case 'left':
						self.moveCarLeft(1);
						break;
				}
			}
		} //end observertime
			
		this.rotateCar = function (direction) {
			switch (direction) {
				case 'up':
					carImage.style.transform = 'rotate(-90deg)';
					objectStyleCheck = 'top';
					break;
				case 'right':
					carImage.style.transform = 'rotate(0deg)';
					objectStyleCheck = 'right';
					break;
				case 'down':
					carImage.style.transform = 'rotate(-270deg)';
					objectStyleCheck = 'bottom';
					break;
				case 'left':
					carImage.style.transform = 'rotate(-180deg)';
					objectStyleCheck = 'left';
					break;
			}
			self.heading = direction;
			console.log('new heading: '+self.heading);
		}

		this.moveCarDown = function(mySpeed) {
			// console.log('down: ' + self.bottom());
			carImage.style.bottom = (self.bottom() -mySpeed ) + 'px';
		}

		this.moveCarUp = function(mySpeed) {
			// console.log('up: ' + self.bottom());
			// carImage.style.bottom = (self.bottom() + speed) + 'px';
			carImage.style.top = (self.top() - speed) + 'px';
		}

		this.moveCarRight = function(mySpeed) {
			// console.log('right: ' + self.left());
			// carImage.style.left = (self.left() + speed) + 'px';
			carImage.style.right = (self.right() - speed) + 'px';
		}

		this.moveCarLeft = function(mySpeed) {
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

		this.path = function () {
			let paths = [
				{'start':'lane1',
				 'space':'lane1',
				 'path':'up,space'
				},
				{'start':'lane1',
				 'space':'lane2',
				 'path':'up,iA,right,iB,up|down,space'
				},
				{'start':'lane1',
				 'space':'lane3',
				 'path':'up,iA,right,space'
				},
				{'start':'lane1',
				 'space':'lane4',
				 'path':'up,iC,right,space'
				},
				{'start':'lane2',
				 'space':'lane2',
				 'path':'up,space'
				},
				{'start':'lane2',
				 'space':'lane1',
				 'path':'up,iB,left,iA,up|down,space'
				},
				{'start':'lane2',
				 'space':'lane3',
				 'path':'up,iB,left,space'
				},
				{'start':'lane2',
				 'space':'lane4',
				 'path':'up,iD,left,space'
				}
			];
			
			for (i in paths) {
				// console.log ('i: '+paths[i].start);
				if (paths[i].start == self.currentLane && paths[i].space == space.lane) {
					//console.log ('path: '+paths[i].path);
					return paths[i].path.split(',');
					break;
				}
			}
		} //end path

		carImage.style.height = spaceSmallestDim-10+'px';
		carImage.style.width = spaceLargestDim-10+'px';

		this.rotateCar('up');

		//carImage.style.bottom = parseInt(carImage.style.height)*-1+'px';
		carImage.style.bottom = this.bottom*-1+'px';
		let lane = getRandom(1,2);
		//let myLane = 'lane'+lane;
			let myLane = 'lane2'
		this.currentLane = myLane;
		console.log('carLane: '+myLane+' spaceLane: '+space.lane);
		carImage.style.left = eval(myLane+'.style.left');

		console.log('space bottom: '+parseInt(getComputedStyle(space).bottom.replace('px','')));
		console.log('space left: '+space.style.left.replace('px',''));
		console.log('car bottom: '+this.bottom());
		console.log('car left: '+this.left());

		let myPath = self.path();
		console.log(myPath);

		

	} // end of Car

	