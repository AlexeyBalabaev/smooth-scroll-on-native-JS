;(function() {
	'use strict';

	var requestAnimationFrame = window.requestAnimationFrame ||
															window.mozRequestAnimationFrame ||
															window.webkitRequestAnimationFrame ||
															window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;

	var menu = document.querySelector('.menu'),
		items = menu.querySelectorAll('span'),
		containers = document.querySelectorAll('.content > div');

	var pageHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeaight,
			document.body.offsetHeight, document.documentElement.offsetHeaight,
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
			var top = el.getBoundingClientRect().top - 96,
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

}) ();

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
				// запоминаем индекс этого элемента
				// по этому индексу будет найден DIV из коллекции
				// containers, к которому применим анимацию
				current = index;
			}
		});
		return current;
	}

	// по полученному ранее индексу, находим DIV, который будет прокручиваться
	// к верхней части экрана
	function selectContainer(current) {
		// перебираем коллекцию элементов DIV
		[].forEach.call(containers, function(container, index) {
			// индекс элемента в текущей итерации совпадает
			// с полученным ранее индексом элемента меню, по
			// которому был сделан клик
			if (index == current) {
					// Y-координата верхней границы выбранного элемента относительно
					// верхнего края окна браузера с учётом высоты шапки
				var startY		= container.getBoundingClientRect().top - 96,
					// направление скролла зависит от положения верхней границы контейнера
					// относительно верхней границы окна браузера
					// нужный нам контейнер может находится выше или ниже окна браузера,
					// соответственно, страницу нужно скроллить вверх или вниз
					direction	= (startY < 0) ? -1 : (startY > 0) ? 1 : 0;
				// верхняя граница контейнера, к которому собираемся перейти, находится
				// сразу под шапкой - нет необходимости прокручивать страницу
				if (direction == 0) return;
				// запускаем функцию прокручивания страницы до выбранного контейнера
				scroll(container, direction);
			}
		});
	}

	function scroll(el, direction) {
			// длительность прокручивания страницы
		var duration = 2000,
			// старт анимации прокручивания страницы
			start = new Date().getTime();

		var fn = function() {
				// текущее положение верхней границы контейнера с учётом высоты шапки с меню
				// при прокрутке контейнер не должен заходить под шапку
			var top = el.getBoundingClientRect().top - 96,
				// время прошедшее от начала прокрутки страницы
				now = new Date().getTime() - start,
				// на сколько должна быть прокручена страница
				result = Math.round(top * now / duration);

			// корректируем значение 'result', чтобы контейнер остановился
			// точно по нижней границе шапки
			result = (result > direction * top) ? top : (result == 0) ? direction : result;

			// определяем есть необходимость прокручивать страницу дальше или нет
			// применение этого условия необходимо, когда высота последнего контейнера
			// меньше высоты экрана и верхняя граница контейнера физически не может
			// достигнуть верхней границы экрана, в нашей вёрстке - это container 6
			// window.pageYOffset - текущая прокрутка страницы
			// document.documentElement.clientHeigh - размер видимой части окна
			if (direction * top > 0 && (pageHeight - window.pageYOffset) > direction * document.documentElement.clientHeight) {
				window.scrollBy(0,result);
				// рекурсивно запускаем функцию анимации прокрутки страницы
				requestAnimationFrame(fn);
			}
		}
		// старт прокрутки страницы
		requestAnimationFrame(fn);
	}
})();*/