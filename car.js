	
	function getRandom(min, max) {
			    var result = Math.random() * (max - min) + min;
			    return Math.round(result);
			}


	
	let Car = function(carImage, space, iA, iB, iC, iD, carId, lane1, lane2, lane3, lane4) {
		carImage.style.visibility = 'visible';
		let speed = getRandom(6,14);
		//let speed = 5;
		this.exitLane = function(){
			if (getComputedStyle(lane1).right.replace('px','') - getComputedStyle(space).right.replace('px','') > getComputedStyle(lane2).left.replace('px','') - getComputedStyle(space).left.replace('px','')) {
				// console.log(carId+' exitLane: lane2');
				return exitLane='lane2';
			}
			else {
				// console.log(carId+' exitLane: lane1');
				return exitLane='lane1';
			}
			
		}
		let objExitLane = document.getElementById(this.exitLane());
		let objSpaceLane = document.getElementById(space.lane);
		console.dir(objExitLane);
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
		let backupGoal = 0;

		let Lane1TopMin =getComputedStyle(lane1).top.replace('px','');
		let Lane1TopMax =eval(parseInt(getComputedStyle(lane1).top.replace('px',''))+parseInt(getComputedStyle(lane1).height.replace('px','')));
		let Lane1LeftMin =getComputedStyle(lane1).left.replace('px','');
		let Lane1LeftMax =eval(parseInt(getComputedStyle(lane1).left.replace('px',''))+parseInt(getComputedStyle(lane1).width.replace('px','')));
		
		let Lane2TopMin =getComputedStyle(lane2).top.replace('px','');
		let Lane2TopMax =eval(parseInt(getComputedStyle(lane2).top.replace('px',''))+parseInt(getComputedStyle(lane2).height.replace('px','')));
		let Lane2LeftMin =getComputedStyle(lane2).left.replace('px','');
		let Lane2LeftMax =eval(parseInt(getComputedStyle(lane2).left.replace('px',''))+parseInt(getComputedStyle(lane2).width.replace('px','')));

		let Lane3TopMin =getComputedStyle(lane3).top.replace('px','');
		let Lane3TopMax =eval(parseInt(getComputedStyle(lane3).top.replace('px',''))+parseInt(getComputedStyle(lane3).height.replace('px','')));
		let Lane3LeftMin =getComputedStyle(lane3).left.replace('px','');
		let Lane3LeftMax =eval(parseInt(getComputedStyle(lane3).left.replace('px',''))+parseInt(getComputedStyle(lane3).width.replace('px','')));

		let Lane4TopMin =getComputedStyle(lane4).top.replace('px','');
		let Lane4TopMax =eval(parseInt(getComputedStyle(lane4).top.replace('px',''))+parseInt(getComputedStyle(lane4).height.replace('px','')));
		let Lane4LeftMin =getComputedStyle(lane4).left.replace('px','');
		let Lane4LeftMax =eval(parseInt(getComputedStyle(lane4).left.replace('px',''))+parseInt(getComputedStyle(lane4).width.replace('px','')));


		this.observeTime = function(e) {
			
			let carLeftPx = function() {return parseInt(getComputedStyle(carImage).left.replace('px',''));}
			let carRightPx = function() {return parseInt(getComputedStyle(carImage).right.replace('px',''));}
			let carTopPx = function() {return parseInt(getComputedStyle(carImage).top.replace('px',''));}
			let carBottomPx = function() {return parseInt(getComputedStyle(carImage).bottom.replace('px',''));}
			let carFrontPx = function () {
				switch (self.heading) {
					case 'up':
						return carTopPx();
						break;
					case 'down':
						return carBottomPx();
						break;
					case 'right':
						return carRightPx();
						break;
					case 'left':
						return carLeftPx();	
						break;
				} 
			}
			let carCenterTop = carTopPx()+(getComputedStyle(carImage).height.replace('px','')/2);
			let carCenterLeft = carLeftPx()+(getComputedStyle(carImage).height.replace('px','')/2);

			// console.log('carCenterTop: '+carCenterTop+' carCenterLeft: '+carCenterLeft);		

			if (   carCenterLeft > Lane1LeftMin
				&& carCenterLeft < Lane1LeftMax
				&& carCenterTop > Lane1TopMin
				&& carCenterTop < Lane1TopMax
				) {
				// console.log('lane1: '+carId);
				self.currentLane='lane1';
				if (lane1.occupied=='') {
					lane1.occupied=carId;
					console.log('lane1: '+carId);
				}
			}
			else if (lane1.occupied==carId) {
				lane1.occupied='';
				console.log('lane1: clear');
			}

			if (   carCenterLeft > Lane2LeftMin
				&& carCenterLeft < Lane2LeftMax
				&& carCenterTop > Lane2TopMin
				&& carCenterTop < Lane2TopMax
				){
				self.currentLane='lane2';
				if (lane2.occupied=='') {
					lane2.occupied=carId;
					console.log('lane2: '+carId);
				}
			}
			else if (lane2.occupied==carId) {
				lane2.occupied='';
				console.log('lane2: clear');
			}

			if (   carCenterLeft > Lane3LeftMin
				&& carCenterLeft < Lane3LeftMax
				&& carCenterTop > Lane3TopMin
				&& carCenterTop < Lane3TopMax
				){
				self.currentLane='lane3';
				if (lane3.occupied=='') {
					lane3.occupied=carId;
					console.log('lane3: '+carId);
				}
			}
			else if (lane3.occupied==carId) {
				lane3.occupied='';
				console.log('lane3: clear');
			}

			if (   carCenterLeft > Lane4LeftMin
				&& carCenterLeft < Lane4LeftMax
				&& carCenterTop > Lane4TopMin
				&& carCenterTop < Lane4TopMax
				) {
				self.currentLane='lane4';
				if (lane4.occupied=='') {
					lane4.occupied=carId;
					console.log('lane4: '+carId);
				}
			}
			else if (lane4.occupied==carId) {
				lane4.occupied='';
				console.log('lane4: clear');
			}

			//console.log(carId+' carFrontPx(): ' + carFrontPx());
			//get path to space		
			if (myPath.length > 0 && getNextPath==true) {
				myDirection = myPath[0];
				if (myDirection == 'up|down' ) {
					if (carTopPx() > getComputedStyle(space).top.replace('px','')) {
						myDirection='up';
					}
					else {
						myDirection='down';
					}
				}
				
				// console.log(carId+' path direction: '+myDirection);
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

				// console.log(carId+' myHeadFor: '+myHeadFor+' '+objectStyleCheck+' myHeadForPx: '+myHeadForPx);
				getNextPath = false;
				moveAlongPath= true;
			}	
			// move along path
			if 	(  myPath.length > 0
				&& carFrontPx() > myHeadForPx
				&& moveAlongPath == true
				  // && (objEntLane.occupied == '' || objEntLane.occupied==carId)
				) {
				let foostr=`${self.currentLane}.occupied`;
				//console.log(carId + ' '+self.currentLane+' '+eval(foostr) );
				if (carId == eval(foostr) || eval(foostr)==''){
					self.moveCar(self.heading,speed);
				}
				else {
					console.log(carId+' waiting on '+self.currentLane);
				}

				// console.log(carId+' moved parking car '+self.heading+' to '+carFrontPx());
			}
			// get next leg of path
			else { 
				if (myPath.length > 0 
					&& getNextPath==false
					) {
					if (myPath.length > 0) {
						myPath.shift();
						myPath.shift();
						// console.log(carId+' '+myPath);
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
				self.rotateCar(space.enterDirection);
				rotated=true;
			}

			// park it
			if  (  rotated == true 
				&& reachedSpace == true
				&& self.parked == false
				&& carFrontPx()-leftIgnore > eval(`getComputedStyle(space).${objectStyleCheck}.replace('px','')`)
				) {
				// console.log(carId+' parking goal: '+objectStyleCheck+': '+eval(`getComputedStyle(space).${objectStyleCheck}.replace('px','')`));
				self.moveCar(self.heading,2);
			}
			if  (  rotated == true 
				&& reachedSpace == true
				&& self.parked == false
				&& carFrontPx()-leftIgnore <= eval(`getComputedStyle(space).${objectStyleCheck}.replace('px','')`)
				) {
				// console.log(carId+' parked - starting timer');
				self.parked = true;
				let stayParked = setTimeout(function(){startBackup=true;}, getRandom(1,10)*500);
				//set backup goal
				switch (space.enterDirection) {
					case 'left':
						backupGoal = parseInt(getComputedStyle(space).left.replace('px','')) + parseInt(getComputedStyle(space).width.replace('px',''));
						break;
					case 'right':
						backupGoal = parseInt(getComputedStyle(space).right.replace('px','')) + parseInt(getComputedStyle(space).width.replace('px',''));
						break;
					case 'up':
						backupGoal = parseInt(getComputedStyle(space).top.replace('px','')) + parseInt(getComputedStyle(space).height.replace('px',''));
						break;
					case 'down':
						backupGoal = parseInt(getComputedStyle(space).bottom.replace('px','')) + parseInt(getComputedStyle(space).height.replace('px',''));
						break;
				}
			}

			//backup
			if  (  startBackup == true 
				&& carFrontPx() <= backupGoal
				&& self.parked == true
				&& moveAlongExitPath == false
				// && (eval(space.lane+'.occupied') == '' || eval(space.lane+'.occupied') == carId)
				) {
				// console.log(carId+' carFrontPx(): '+(carFrontPx())+ ' backupGoal: '+backupGoal)
				if (myExitPath[0]=='up|down') {
					if (self.heading =='up') {
						myExitPath[0] = 'down';
					}
					else {
						myExitPath[0] = 'up';
					}
				}
				let foostr=`${self.currentLane}.occupied`;
				if (carId == eval(foostr) || eval(foostr)==''){
					self.moveCar(myExitPath[0],2);
				}
				
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
					// console.log(carId+' carFrontPx: '+carFrontPx()+ ' exiting to '+myExitPath[1]+' myHeadForExit: '+myHeadForExit)
					let foostr=`${self.currentLane}.occupied`;
					if (carId == eval(foostr) || eval(foostr)==''){
						self.moveCar(self.heading,speed);
					}	
					
				}
				if (carFrontPx() <= myHeadForExit && myExitPath.length > 0) {
					if (myExitPath.length > 0) {
						myExitPath.shift();
						myExitPath.shift();
						self.rotateCar(myExitPath[0]);
					}
					// console.log(carId+' carFrontPx: '+carFrontPx()+ ' exiting to '+myExitPath[1]+' myHeadForExit: '+myHeadForExit)
					let foostr=`${self.currentLane}.occupied`;
					if (carId == eval(foostr) || eval(foostr)==''){
						self.moveCar(self.heading,speed);
					}	
					
				}
				if (carCenterTop>getComputedStyle(exit1).top.replace('px','') 
					&& space.occupied==true) {
					space.occupied=false;
					carImage.style.visibility = 'hidden';
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
			// console.log(carId+' new heading: '+self.heading);
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
				if (paths[i].start == self.currentLane && paths[i].space == space.lane) {
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
				if (exitPaths[i].space == space.lane && exitPaths[i].exitLane == self.exitLane()) {
					return exitPaths[i].path.split(',');
					break;
				}
			}

		} //end this.exitPath

		carImage.style.height = spaceSmallestDim-10+'px';
		carImage.style.width = spaceLargestDim-10+'px';

		this.rotateCar('up');

		carImage.style.bottom = this.bottom*-1+'px';
		
		let lane = getRandom(1,2);
		let myLane = 'lane'+lane;
		this.currentLane = myLane;
		let objEntLane = document.getElementById(myLane);
		

		carImage.style.left = eval(myLane+'.style.left');

		let myPath = self.path();
		let myExitPath =self.exitPath();


		// console.log(carId+' carLane: '+myLane+' spaceLane: '+space.lane);		
		// console.log(carId+' '+myPath);
		// console.log(carId+' '+myExitPath);

		

	} // end of Car

	