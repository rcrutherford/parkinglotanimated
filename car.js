	
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
		// this.right = 0;
		// this.left = 0;
		// this.top = 0;
		// this.bottom = 0;
		let self = this;
		let objectStyleCheck = 'top';
		let myDirection='';
		let myHeadForPx = 0;
		let checkPath=true;		

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

			console.log('carFrontPx(): ' + carFrontPx());
			//follow path to space		
			if (myPath.length > 0 && checkPath==true) {
				console.log('myPath.length: '+myPath.length);
				myDirection = myPath[0];
				if (myDirection == 'up|down' ) {
					//console.log('up|down cartop:'+carTopPx() +' space.top:'+ getComputedStyle(space).top.replace('px',''));
					if (carTopPx() > getComputedStyle(space).top.replace('px','')) {
						myDirection='up';
					}
					else {
						myDirection='down';
					}
				}
				
				console.log('path direction: '+myDirection);
				if (self.heading !== myDirection) { 
					self.rotateCar(myDirection);
				}
				let myHeadFor = myPath[1];
			 	
			 	let foostr = `getComputedStyle(${myHeadFor}).${objectStyleCheck}.replace('px','')`;
				
				myHeadForPx = eval(foostr);
				
				if (myHeadFor.substring(0,1)=='i' 
					&& (objectStyleCheck =='top' || objectStyleCheck =='bottom')) {
					myHeadForPx = parseInt(myHeadForPx)+(spaceSmallestDim/2);	
				}
				else {
					myHeadForPx = parseInt(myHeadForPx)+speed;	
				}

				console.log('myHeadFor: '+myHeadFor+' '+objectStyleCheck+' myHeadForPx: '+myHeadForPx);
				checkPath = false;
			}	

			if 	(  myPath.length > 0
				&& carFrontPx() > myHeadForPx
				&& checkPath==false
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
				//console.log('moved car '+self.heading+' to '+carFrontPx());

			}
			else { 
				if (myPath.length > 0
					&& checkPath==false) {
					//console.log('car '+carFrontPx()+' reached '+myHeadFor+' @'+myHeadForPx);
					if (myPath.length > 0) {
						myPath.shift();
						myPath.shift();
						console.log(myPath);
						checkPath = true;
					}
					if (myPath.length == 0) {
						self.reachedSpace=true;
					}
				}
			}
			
			if (self.rotated == false && self.reachedSpace == true) {
				//console.log('rotate into space: '+space.enterDirection);
				self.rotateCar(space.enterDirection)
				self.rotated=true;
			}

			// park it
			//let enterDirection = space.enterDirection;
			
			if  (  self.rotated == true 
				&& self.reachedSpace == true
				&& carFrontPx() > eval(`getComputedStyle(space).${objectStyleCheck}.replace('px','')`)
				) {
				//console.log('parking: '+carFrontPx());
				console.log('parking goal: '+objectStyleCheck+': '+eval(`getComputedStyle(space).${objectStyleCheck}.replace('px','')`));
				switch (self.heading) {
					case 'up':
						self.moveCarUp(2);
						break;
					case 'down':
						self.moveCarDown(2);
						break;
					case 'right':
						self.moveCarRight(2);
						break;
					case 'left':
						self.moveCarLeft(2);
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

		//move car up down left right
		this.moveCarDown = function(mySpeed) {
			carImage.style.top = (self.top() + mySpeed ) + 'px';
		}

		this.moveCarUp = function(mySpeed) {
			carImage.style.top = (self.top() - mySpeed) + 'px';
		}

		this.moveCarRight = function(mySpeed) {
			//console.log('carImage.style.right: '+carImage.style.right);
			carImage.style.left = (self.left() + mySpeed) + 'px';
		}

		this.moveCarLeft = function(mySpeed) {
			carImage.style.left = (self.left() - mySpeed) + 'px';
		}

		//return the current computed top bottom left right of car as integer
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

		//paths to get from my lane to space
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
		let myLane = 'lane'+lane;
		this.currentLane = myLane;
		console.log('carLane: '+myLane+' spaceLane: '+space.lane);

		carImage.style.left = eval(myLane+'.style.left');

		console.log('space bottom: '+parseInt(getComputedStyle(space).bottom.replace('px','')));
		console.log('space left: '+space.style.left.replace('px',''));
		console.log('car bottom: '+this.bottom());
		console.log('car left: '+this.left());
		console.log('car right: '+this.right());
		console.log('car top: '+this.top());



		let myPath = self.path();
		console.log(myPath);

		

	} // end of Car

	