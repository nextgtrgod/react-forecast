
let WIDTH = window.innerWidth;
let breakpoint = 720;

if (WIDTH > breakpoint) {

	let HEIGHT = window.innerHeight;		
	
	let mousePos = {
			x: 0,
			y: 0
		};

	let targetX, targetY;

	let	triangles = document.querySelectorAll('.triangles path');


	if(triangles) {
		document.addEventListener('mousemove', event => {
			// horizontal axis
			var tx = -1 + (event.clientX / WIDTH)*2;

			// vertical axis
			var ty = 1 - (event.clientY / HEIGHT)*2;

			mousePos.x = tx;
			mousePos.y = ty;

		}, false);

		function normalize(v, vmin, vmax, tmin, tmax) {
			var nv = Math.max(Math.min(v,vmax), vmin);
			var dv = vmax-vmin;
			var pc = (nv-vmin)/dv;
			var dt = tmax-tmin;
			var tv = tmin + (pc*dt);
			return tv;
		}

		function redraw() {
			targetX = normalize(mousePos.x, -1, 1, -1, 1);
			targetY = normalize(mousePos.y, -1, 1, -1, 1);

			for(let i=0; i<triangles.length; i++) {
				// clouds[i].style.transitionDelay = `${i/50}s`;
				triangles[i].style.transform = `translate(${-2*targetX}px, ${targetY/4}px)`;
			};

			window.requestAnimationFrame(redraw);
		};

		window.requestAnimationFrame(redraw);
	};
};