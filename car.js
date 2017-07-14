	
	function getRandom(min, max) {
			    var result = Math.random() * (max - min) + min;
			    return Math.round(result);
			}

	let Car = function(carImage, space, iA, iB, iC, iD) {
		space.occupied = true;
		let speed = getRandom(6,14);
		//let speed = 5;
		this.exitLane = function(){
			if (getComputedStyle(lane1).right.replace('px','') - getComputedStyle(space).right.replace('px','') > getComputedStyle(lane2).left.replace('px','') - getComputedStyle(space).left.replace('px','')) {
				console.log('exitLane: lane2');
				return exitLane='lane2';
			}
			else {
				console.log('exitLane: lane1');
				return exitLane='lane1';
			}
			
		}
		this.finishedStep = false;
		this.heading='right';
		this.currentLane = '';
		this.parked = false;
		
		let self = this;
		let rotated = false;
		let reachedSpace = false;
		let objectStyleCheck = 'top';
		let myDirection='';
		let myHeadForPx = 0;
		let getNextPath=true;		
		let moveAlongPath = false;
		let backup = false;
		let startBackup = false;
		let moveAlongExitPath = false;

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
			//get path to space		
			if (myPath.length > 0 && getNextPath==true) {
				//console.log('myPath.length: '+myPath.length);
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
				if (myHeadFor=='space' ) {
					myHeadForPx = parseInt(myHeadForPx)-(spaceSmallestDim/4);	
				}
				else {
					myHeadForPx = parseInt(myHeadForPx)+speed;	
				}

				console.log('myHeadFor: '+myHeadFor+' '+objectStyleCheck+' myHeadForPx: '+myHeadForPx);
				getNextPath = false;
				moveAlongPath= true;
			}	
			// move along path
			if 	(  myPath.length > 0
				&& carFrontPx() > myHeadForPx
				&& moveAlongPath == true
				) {
				self.moveCar(self.heading,speed);
				console.log('moved parking car '+self.heading+' to '+carFrontPx());
			}
			// get next leg of path
			else { 
				if (myPath.length > 0
					&& getNextPath==false) {
					//console.log('car '+carFrontPx()+' reached '+myHeadFor+' @'+myHeadForPx);
					if (myPath.length > 0) {
						myPath.shift();
						myPath.shift();
						console.log(myPath);
						getNextPath = true;
					}
					if (myPath.length == 0) {
						reachedSpace=true;
						moveAlongPath = false;
					}
				}
			}
			
			//rotate towards space opening
			if (rotated == false && reachedSpace == true) {
				//console.log('rotate into space: '+space.enterDirection);
				self.rotateCar(space.enterDirection);
				rotated=true;
			}

			// park it
			if  (  rotated == true 
				&& reachedSpace == true
				&& self.parked == false
				&& carFrontPx()-leftIgnore > eval(`getComputedStyle(space).${objectStyleCheck}.replace('px','')`)
				) {
				//console.log('parking: '+carFrontPx());
				console.log('parking goal: '+objectStyleCheck+': '+eval(`getComputedStyle(space).${objectStyleCheck}.replace('px','')`));
				self.moveCar(self.heading,2);
			}
			if  (  rotated == true 
				&& reachedSpace == true
				&& self.parked == false
				&& carFrontPx()-leftIgnore <= eval(`getComputedStyle(space).${objectStyleCheck}.replace('px','')`)
				) {
				console.log('parked - starting timer');
				self.parked = true;
				let stayParked = setTimeout(function(){startBackup=true;}, getRandom(1,6)*500);
				//set backup goal
				switch (space.enterDirection) {
					case 'left':
						backupGoal = parseInt(getComputedStyle(space).left.replace('px','')) + parseInt(space.style.width.replace('px',''));
						break;
					case 'right':
						backupGoal = parseInt(getComputedStyle(space).right.replace('px','')) + parseInt(space.style.width.replace('px',''));
						break;
					case 'up':
						backupGoal = parseInt(getComputedStyle(space).top.replace('px','')) + parseInt(space.style.height.replace('px',''));
						break;
					case 'down':
						backupGoal = parseInt(getComputedStyle(space).bottom.replace('px','')) + parseInt(space.style.height.replace('px',''));
						break;
				}
			}

			//backup
			if  (  startBackup == true 
				&& carFrontPx() <= backupGoal
				&& self.parked == true
				&& moveAlongExitPath == false
				) {
				console.log('carFrontPx(): '+(carFrontPx())+ ' backupGoal: '+backupGoal)
				if (myExitPath[0]=='up|down') {
					if (self.heading =='up') {
						myExitPath[0] = 'down';
					}
					else {
						myExitPath[0] = 'up';
					}
				}
				self.moveCar(myExitPath[0],2);
			} 

			if  (  startBackup == true 
				&& carFrontPx() > backupGoal
				&& self.parked == true
				&& moveAlongExitPath == false
				) {
				moveAlongExitPath = true;
				if (myExitPath.length > 0) {
					myExitPath.shift();
					myExitPath.shift();
				}
				self.rotateCar(myExitPath[0]);
			}
			
			//head toward nearest lane exit intersection or lane exit if in lane
			if (moveAlongExitPath == true && myExitPath.length > 0) {
				let foostr = `getComputedStyle(${myExitPath[1]}).${objectStyleCheck}.replace('px','')`;
				let myHeadForExit = eval(foostr);
				if (carFrontPx() > myHeadForExit) {
					console.log('carFrontPx: '+carFrontPx()+ ' exiting to '+myExitPath[1]+' myHeadForExit: '+myHeadForExit)
					self.moveCar(self.heading,speed);
				}
				if (carFrontPx() <= myHeadForExit && myExitPath.length > 0) {
					if (myExitPath.length > 0) {
						myExitPath.shift();
						myExitPath.shift();
						self.rotateCar(myExitPath[0]);
					}
					console.log('carFrontPx: '+carFrontPx()+ ' exiting to '+myExitPath[1]+' myHeadForExit: '+myHeadForExit)
					self.moveCar(self.heading,speed);
				}
				if (!carFrontPx() && space.occupied==true) {
					space.occupied=false;
					carImage.style.display = 'none';
				}
			}
			// }

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
		this.moveCar = function(direction, mySpeed) {
			switch (direction) {
				case 'down':
					carImage.style.top = (self.top() + mySpeed ) + 'px';
					break;
				case 'up':
					carImage.style.top = (self.top() - mySpeed ) + 'px';
					break;
				case 'right':
					carImage.style.left = (self.left() + mySpeed ) + 'px';
					break;
				case 'left':
					carImage.style.left = (self.left() - mySpeed ) + 'px';
					break;
			}
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
		} // end this.path

		this.exitPath = function () {
			let exitPaths = [
				{'space':'lane1',
				 'exitLane':'lane1',
				 'path':'right,lane1,down,exit1'
				},
				{'space':'lane2',
				 'exitLane':'lane2',
				 'path':'left,lane2,down,exit2'
				},
				{'space':'lane3',
				 'exitLane':'lane1',
				 'path':'up,lane3,left,iA,down,exit1'
				},
				{'space':'lane3',
				 'exitLane':'lane2',
				 'path':'up,lane3,right,iB,down,exit2'
				},
				{'space':'lane4',
				 'exitLane':'lane1',
				 'path':'up|down,lane4,left,iC,down,exit1'
				},
				{'space':'lane4',
				 'exitLane':'lane2',
				 'path':'up|down,lane4,right,iD,down,exit2'
				}
			];

			for (i in exitPaths) {
				// console.log ('i: '+paths[i].start);
				if (exitPaths[i].space == space.lane && exitPaths[i].exitLane == self.exitLane()) {
					//console.log ('path: '+paths[i].path);
					return exitPaths[i].path.split(',');
					break;
				}
			}

		} //end this.exitPath

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
		let myExitPath = self.exitPath();
		
		console.log(myPath);
		console.log(myExitPath);

		

	} // end of Car

	