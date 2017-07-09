let createLanes = function () {
				let space1 = document.getElementById("space1");
				var lane1 = document.createElement("div");
				var t = document.createTextNode('L1');
				lane1.appendChild(t);
				lot.appendChild(lane1);
				lane1.className = 'lane';
				lane1.id = 'lane1';
				lane1.occupied = false;
				lane1.style.height = lotHeight+'px';
				lane1.style.width = space1.style.width;
				lane1.style.left = space1.style.right;
				lane1.style.bottom = 0;

				// carImg=document.createElement("img");
				// lane1.appendChild(carImg);
				// carImg.src = "images/car-blue.png";
				// carImg.className = "car";
				// carImg.id = "car1"
				


				let space10 = document.getElementById("space10");
				var lane2 = document.createElement("div");
				var t = document.createTextNode('L2');
				lane2.appendChild(t);
				lot.appendChild(lane2);
				lane2.className = 'lane';
				lane2.id = 'lane2';
				lane2.occupied = false;
				lane2.style.height = lotHeight+'px';
				lane2.style.width = parseInt(space1.style.width)-leftIgnore+'px';
				lane2.style.left = parseInt(space10.style.left)-spaceLargestDim+leftIgnore+'px';
				lane2.style.bottom = 0;

				let space19 = document.getElementById("space19");
				var lane3 = document.createElement("div");
				var t = document.createTextNode('L3');
				lane3.appendChild(t);
				lot.appendChild(lane3);
				lane3.className = 'lane';
				lane3.id = 'lane3';
				lane3.occupied = false;
				lane3.style.height = spaceLargestDim+'px';
				lane3.style.width =(spaceSmallestDim*5)+'px';
				lane3.style.left = parseInt(space19.style.left)+'px';
				lane3.style.bottom = parseInt(space19.style.bottom)+spaceLargestDim+'px';

				let space24 = document.getElementById("space24");
				var lane4 = document.createElement("div");
				var t = document.createTextNode('L4');
				lane4.appendChild(t);
				lot.appendChild(lane4);
				lane4.className = 'lane';
				lane4.id = 'lane4';
				lane4.occupied = false;
				lane4.style.height = spaceLargestDim+'px';
				lane4.style.width =(spaceSmallestDim*5)+'px';
				lane4.style.left = parseInt(space24.style.left)+'px';
				lane4.style.bottom = parseInt(space24.style.bottom)+spaceLargestDim+leftIgnore+'px';
			};