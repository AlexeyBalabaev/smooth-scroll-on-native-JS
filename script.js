(function() {
	'use strict';

	var requestAnimationFrame = window.requestAnimationFrame ||
															window.mozRequestAnimationFrame ||
															window.webkitRequestAnimationFrame ||
															window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;

	var menu = document.querySelector('.menu'),
		items = menu.querySelectorAll('span'),
		containers = document.querySelectorAll('.content > .elem');

	var pageHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);

	menu.onclick = function(e) {
		if (e.target.tagName != 'SPAN') return;
		var current = switchLinks(e.target);
		selectContainer(current);
	}

	function switchLinks(el) {
		var current;
		[].forEach.call(items, function(item, index) {
			item.classList.remove('active');
			if (item === el) {
				item.classList.add('active');
				current = index;
			}
		});
		return current;
	}

	function selectContainer(current) {
		[].forEach.call(containers, function(container, index) {
			if (index == current) {
				var startY = container.getBoundingClientRect().top - 96,
						direction = (startY < 0) ? -1 : (startY > 0) ? 1 : 0;

				if (direction == 0) return;

				scroll(container, direction)
			}
		});
	}

	function scroll(el, direction) {
		var duration = 2000,
			start    = new Date().getTime();

		var fn = function () {
			var top = el.getBoundingClientRect().top - 95,
					now = new Date().getTime() - start,
					result = Math.round(top * now / duration);

			result = (result > direction * top) ? top : (result == 0) ? direction : result;

			if (direction * top > 0 && (pageHeight - window.pageYOffset) > direction * document.documentElement.clientHeight) {
				window.scrollBy(0, result);
				requestAnimationFrame(fn);
			}
		}

		requestAnimationFrame(fn);
	}

})();

/*;(function() {
	'use strict';

	var requestAnimationFrame = window.requestAnimationFrame ||
								window.mozRequestAnimationFrame ||
								window.webkitRequestAnimationFrame ||
								window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;

	var menu = document.querySelector('.menu'),
		items = menu.querySelectorAll('span'),
		containers = document.querySelectorAll('.wrap > div');

		var pageHeight = Math.max(
				document.body.scrollHeight, document.documentElement.scrollHeight,
				document.body.offsetHeight, document.documentElement.offsetHeight,
				document.body.clientHeight, document.documentElement.clientHeight
			);

	menu.onclick = function(e) {
		if (e.target.tagName != 'SPAN') return;
		var current = switchLinks(e.target);
		selectContainer(current);
	}

	function switchLinks(el) {
		var current;
		[].forEach.call(items, function(item, index) {
			item.classList.remove('active');
			if (item === el) {
				item.classList.add('active');
				current = index;
			}
		});
		return current;
	}

	function selectContainer(current) {
		[].forEach.call(containers, function(container, index) {
			if (index == current) {
				var startY		= container.getBoundingClientRect().top - 96,
					direction	= (startY < 0) ? -1 : (startY > 0) ? 1 : 0;
				if (direction == 0) return;
				scroll(container, direction);
			}
		});
	}

	function scroll(el, direction) {
		var duration = 2000,
			start = new Date().getTime();

		var fn = function() {
			var top = el.getBoundingClientRect().top - 96,
				now = new Date().getTime() - start,
				result = Math.round(top * now / duration);

			result = (result > direction * top) ? top : (result == 0) ? direction : result;

			if (direction * top > 0 && (pageHeight - window.pageYOffset) > direction * document.documentElement.clientHeight) {
				window.scrollBy(0,result);
				requestAnimationFrame(fn);
			}
		}
		requestAnimationFrame(fn);
	}
})();*/