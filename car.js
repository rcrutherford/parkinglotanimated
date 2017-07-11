	
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
			console.log('carFrontPx: '+carFrontPx());
			//console.log('iB:'+getComputedStyle(iB).top);
			 
			let myDirection = myPath[0];
			let myHeadFor = myPath[1];
		 	let foostr = `getComputedStyle(${myHeadFor}).${objectStyleCheck}.replace('px','')`;
		 	// console.log('foostr: '+foostr);
			let myHeadForPx = eval(foostr);
			if (myHeadFor.substring(0,1)=='i') {
				myHeadForPx = parseInt(myHeadForPx)+(spaceSmallestDim/2);	
			}
			else {
				myHeadForPx = parseInt(myHeadForPx)+speed;	
			}
			
			// console.log('myHeadForPx: '+ myHeadForPx);
			// console.log('myHeadForPx+(spaceSmallestDim/2): '+ (myHeadForPx+(spaceSmallestDim/2)));


			if (   self.finishedStep == false 
				&& myPath.length > 0
				&& carFrontPx() > myHeadForPx
			) {
				switch (myDirection) {
					case 'up':
						objectStyleCheck = 'top';
						self.moveCarUp();
						break;
					case 'down':
						objectStyleCheck = 'bottom';
						self.moveCarDown();
						break;
					case 'left':
						objectStyleCheck = 'left';
						self.moveCarLeft();
						break;
					case 'right':
						objectStyleCheck = 'right';
						self.moveCarRight();
						break;
				}

			}
			else { 
				if (self.finishedStep == false ) {
					self.finishedStep == true;
					if (myPath.length > 0) {
						myPath.pop();
						myPath.pop();
					}
					if (myPath.length == 0) {
						self.reachedSpace=true;
					}
					else {
						self.finishedStep = false;
					}

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
		} //end observertime
			
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
			// carImage.style.bottom = (self.bottom() + speed) + 'px';
			carImage.style.top = (self.top() - speed) + 'px';
		}

		this.moveCarRight = function() {
			// console.log('right: ' + self.left());
			// carImage.style.left = (self.left() + speed) + 'px';
			carImage.style.right = (self.right() - speed) + 'px';
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

		this.rotateLeft();

		//carImage.style.bottom = parseInt(carImage.style.height)*-1+'px';
		carImage.style.bottom = this.bottom*-1+'px';
		let lane = getRandom(1,2);
		let myLane = 'lane'+lane;
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

	