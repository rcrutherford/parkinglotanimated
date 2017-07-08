	
	let Car = function(carImage, space) {
		let self = this;
		this.rotated = false;
		this.observeTime = function(e){
			// console.dir(this);

			let windowRightPos = 1100;
			let carLeftPx = parseInt(getComputedStyle(carImage).left.replace('px',''));
			let carTopPx = parseInt(getComputedStyle(carImage).top.replace('px',''));
			//moves car
			if(carLeftPx < space.left) {
				self.moveCarRight();
			}

			//rotates car
			if(self.left() > space.left && !self.rotated) {
				carImage.style.transform = 'rotate(90deg)';
				self.rotated = true;
			}

			// parks rotated car
			if(self.rotated && self.top() < space.top) {
				self.moveCarDown();
			}
		}

		this.moveCarDown = function() {
			console.log('px: ' + self.top());
			carImage.style.top = (self.top() + 5) + 'px';
		}

		this.moveCarRight = function() {
			console.log('px: ' + self.left());
			carImage.style.left = (self.left() + 20) + 'px';
		}

		this.top = function() {
			return parseInt(getComputedStyle(carImage).top.replace('px',''));
		}

		this.left = function() {
			return parseInt(getComputedStyle(carImage).left.replace('px',''));
		}
	}

	