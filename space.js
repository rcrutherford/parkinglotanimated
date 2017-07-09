let Space = function(top, left) {
		this.top = top;
		this.left = left;
	}

let createSpaces = function() {
	for (let i=1;i<=9;i++) {
		var space = document.createElement("div");
		var t = document.createTextNode(i);
		space.appendChild(t);
		lot.appendChild(space);
		space.className = 'space';
		space.id = 'space'+i;
		space.occupied = false;
		space.opening = 'right';
		space.lane = 'L1';
		space.style.height = spaceSmallestDim+'px';
		space.style.width = spaceLargestDim+'px';
		space.style.left = lotLeft+leftIgnore+'px';
		space.style.bottom = bottomIgnore+(spaceSmallestDim*(i-1))+'px';
		space.style.right = lotLeft+leftIgnore+spaceLargestDim+'px';
		// console.dir(space);
	}
	
	for (let i=10;i<=18;i++) {
		var space = document.createElement("div");
		var t = document.createTextNode(i);
		space.appendChild(t);
		lot.appendChild(space);
		space.className = 'space';
		space.id = 'space'+i;
		space.occupied = false;
		space.opening = 'left';
		space.lane = 'L2';
		space.style.height = spaceSmallestDim-5+'px';
		space.style.width = spaceLargestDim+'px';
		space.style.left = lotLeft+lotWidth-spaceLargestDim-bottomIgnore-3+'px';
		// console.log(lotLeft+lotWidth-spaceLargestDim-bottomIgnore-3+'px');
		space.style.bottom = bottomIgnore+(spaceSmallestDim*(i-10))+'px';
		// console.dir(space);
	}
	for (let i=19;i<=23;i++) {
		var space = document.createElement("div");
		var t = document.createTextNode(i);
		space.appendChild(t);
		lot.appendChild(space);
		space.className = 'space';
		space.id = 'space'+i;
		space.occupied = false;
		space.opening = 'top';
		space.lane = 'L3';
		space.style.height = spaceLargestDim+'px';
		space.style.width = spaceSmallestDim+'px';
		space.style.left = lotLeft+(spaceLargestDim*2)+(spaceSmallestDim*(i-19))+bottomIgnore+'px';
		// console.log(lotLeft+(spaceLargestDim*(i-19+2))+bottomIgnore);
		space.style.bottom = bottomIgnore+'px';
		// console.dir(space);
	}
	for (let i=24;i<=28;i++) {
		var space = document.createElement("div");
		var t = document.createTextNode(i);
		space.appendChild(t);
		lot.appendChild(space);
		space.className = 'space';
		space.id = 'space'+i;
		space.occupied = false;
		space.opening = 'top';
		space.lane = 'L4';
		space.style.height = spaceLargestDim+'px';
		space.style.width = spaceSmallestDim+'px';
		space.style.left = lotLeft+(spaceLargestDim*2)+(spaceSmallestDim*(i-24))+bottomIgnore+'px';
		 // console.log(lotLeft+(spaceLargestDim*(i-24+2))+bottomIgnore);
		space.style.bottom = bottomIgnore+(spaceLargestDim*2)+'px';
		// console.dir(space);
	}
	for (let i=29;i<=33;i++) {
		var space = document.createElement("div");
		var t = document.createTextNode(i);
		space.appendChild(t);
		lot.appendChild(space);
		space.className = 'space';
		space.id = 'space'+i;
		space.occupied = false;
		space.opening = 'bottom';
		space.style.height = spaceLargestDim+'px';
		space.style.width = spaceSmallestDim+'px';
		space.style.left = lotLeft+(spaceLargestDim*2)+(spaceSmallestDim*(i-29))+bottomIgnore+'px';
		 // console.log(lotLeft+(spaceLargestDim*(i-24+2))+bottomIgnore);
		space.style.bottom = bottomIgnore+(spaceLargestDim*4)+bottomIgnore+'px';
		// console.dir(space);
	}

	space10.occupied=true;
	space29.occupied=true;
}
