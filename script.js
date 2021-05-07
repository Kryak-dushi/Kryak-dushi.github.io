window.onload = () => {
	greetingsSet();
	timer();
	test();
	splashScreen();
	minAndMaxSecond();
}

function greetingsSet() {
	let gr = document.getElementById("name_output");
	let div_in = document.getElementById("greet");
	let div_out = document.getElementById("ungreet");
	let inputBtn = document.getElementById("name_input_btn");
	let deleteBtn = document.getElementById("name_delete_btn");
	let name = localStorage.getItem("name");
	div_out.style.display = "none";

	if (name != null) {
		greetShow(name);
	}

	function greetShow(name) {
		gr.innerHTML = (name != '') ? `Приветствую вас, ${name}!` : `Приветствую вас, гость!`;
		div_in.style.display = "none";
		div_out.style.display = "block";
	}

	inputBtn.onclick = () => {
		let newName = document.getElementById("name_input").value;
		localStorage.setItem("name", newName);
		greetShow(newName);
	}

	deleteBtn.onclick = () => {
		localStorage.removeItem("name");
		document.getElementById("name_input").value = "";
		div_in.style.display = "block";
		div_out.style.display = "none";
	}
}

function triangleArea() {
	let h = parseInt(document.triangle.height.value);
	let b = parseInt(document.triangle.base.value);

	if (Number.isInteger(h) && Number.isInteger(b) && h > 0 && b > 0) { document.getElementById('res_triangle').innerHTML = h * b / 2; }
	else { document.getElementById('res_triangle').innerHTML = "Введенные данные некорректны"; }
}

function strCompare() {
	let l1 = document.strings.str1.value.length;
	let l2 = document.strings.str2.value.length;
	if (l1 == l2)
		document.getElementById('res_strings').innerHTML = "Строки равны по длине"
	else document.getElementById('res_strings').innerHTML = "Строки разные"
}

function minAndMax() {
	let arr = [];
	arr = document.array.array.value.split(",");

	let j = 0;
	while (j < arr.length) {
		arr[j] = parseInt(arr[j]);
		if (arr[j] !== arr[j]) {
			arr.splice(j, 1);
		} else j++;
	}

	if (arr.length > 5) arr.length = 5;

	let max = arr[0];
	let min = arr[0];
	for (var i = 1; i < arr.length; i++) {
		if (arr[i] > max) max = arr[i];
		if (arr[i] < min) min = arr[i];
	}

	document.getElementById('res_min').innerHTML = (min != undefined) ? `Минимальный элемент: ${min}` : "Минимального элемента нет";
	document.getElementById('res_max').innerHTML = (max != undefined) ? `Максимальный элемент: ${max}` : "Максимального элемента нет";
	document.getElementById('arr').innerHTML = (arr.length != 0) ? `Массив: ${arr}` : "Массив пуст";
}

function minAndMaxSecond() {
	let arr = [];

	document.getElementById("array2_add").onclick = () => {
		let item = parseInt(document.array2.array2.value);

		if (Number.isInteger(item)) {
			arr[arr.length] = item;
			document.array2.array2.value = '';
			document.getElementById('arr2').innerHTML = `Массив: ${arr}`;
		}

		if (arr.length == 5) {
			document.array2.array2.readOnly = true;
		}
	}

	document.getElementById("array2_exe").onclick = () => {
		document.getElementById('res_max2').innerHTML = `Максимальный элемент: ${Math.max(...arr)}`;
		document.getElementById('res_min2').innerHTML = `Минимальный элемент: ${Math.min(...arr)}`;
		arr.length = 0;
	}
}

function timer() {
	let start = document.getElementById("start");
	let stop = document.getElementById("stop");
	let cont = document.getElementById("continue");

	let hours = document.getElementById("hours");
	let minutes = document.getElementById("minutes");
	let seconds = document.getElementById("seconds");

	let timerShow = document.getElementById("timer");

	let isRun = false;
	let timerId = null;
	let mainTime = 0;

	start.onclick = () => {
		if (isRun) { return; }
		isRun = true;

		let h = parseInt(hours.value);
		let m = parseInt(minutes.value);
		let s = parseInt(seconds.value);

		if (!Number.isInteger(s)) s = 0;
		if (!Number.isInteger(m)) m = 0;
		if (!Number.isInteger(h)) h = 0;

		if (s >= 60) {
			m += Math.floor(s / 60);
			s %= 60;
		}
		if (m >= 60) {
			h += Math.floor(m / 60);
			m %= 60;
		}
		if (h > 24) h = 24;

		mainTime = h * 3600 + m * 60 + s;

		if (mainTime == 0) { stop.onclick() };

		document.getElementById("timer_input").style.display = "none";

		startTimer();
	}

	stop.onclick = () => {
		isRun = false;
		clearInterval(timerId);
		document.getElementById("timer_input").style.display = "block";
	}

	cont.onclick = () => {
		if (mainTime <= 0) { stop.onclick(); }
		else if (isRun == false) {
			isRun = true;
			startTimer();
		}

		document.getElementById("timer_input").style.display = "none";
	}

	let startTimer = () => {
		timerId = setInterval(function () {
			if (isRun == false) { stop.onclick() }
			timerShow.textContent = convertSeconds();
			if (mainTime == 0) { isRun = false; }
		}, 1000);
	}

	let convertSeconds = () => {
		let h = Math.floor(mainTime / 3600);
		let m = Math.floor((mainTime - 3600 * h) / 60);
		let s = mainTime % 60;
		mainTime--;

		h = (h < 10) ? `0${h}` : h;
		m = (m < 10) ? `0${m}` : m;
		s = (s < 10) ? `0${s}` : s;
		return `${h}:${m}:${s}`
	}
}

function test() {
	let questions = [
		{
			question: 'Что не является языком программирования?',
			answers: [
				'JavaScript',
				'CSS',
				'SQL'
			],
			right: 1
		},
		{
			question: 'Что такое ECMAScript?',
			answers: [
				'Новый язык программирования.',
				'Переработанная реализация Javascript.',
				'Спецификация языка Javascript.'
			],
			right: 2
		},
		{
			question: 'Что выведет этот код? alert( "1"[0] );',
			answers: [
				"0",
				"1",
				"В коде ошибка"
			],
			right: 1
		},
		{
			question: 'Есть ли разница между вызовами i++ и ++i?',
			answers: [
				'Разница в значении, которое возвращает такой вызов.',
				'Разница в значении i после вызова.',
				'Нет никакой разницы.'
			],
			right: 0
		},
		{
			question: 'Чему равно такое выражение? [] + false - null + true',
			answers: [
				'0',
				'NaN',
				'undefined'
			],
			right: 1
		},
		{
			question: 'Сколько параметров можно передать функции?',
			answers: [
				'Ровно столько, сколько указано в определении функции.',
				'Сколько указано в определении функции или меньше.',
				'Любое количество.'
			],
			right: 2
		},
		{
			question: 'Чему равно 0 || 1 && 2 || 3 ?',
			answers: [
				'0',
				'2',
				'true'
			],
			right: 1
		},
		{
			question: 'Какой из этих вариантов задает массив из элементов «a», «b»?',
			answers: [
				'let a = { "a", "b" }',
				'let a = ( "a", "b" )',
				'let a = "a,b".split(",")'
			],
			right: 2
		},
		{
			question: 'Выберите правильный вариант объявления массива, в результате которого мы получаем массив из двух чисел 1 и 2.',
			answers: [
				'new Array.prototype.constructor(1, 2)',
				'Array(1, 2)',
				'1..2'
			],
			right: 0
		},
		{
			question: 'Какой вызов parseInt не вернет число?',
			answers: [
				'parseInt("-1.2")',
				'parseInt("1px")',
				'parseInt("$1.2")'
			],
			right: 2
		}
	]
	let quText = document.getElementById("question");
	let button = document.getElementById("test_btn");
	let counter = document.getElementById("test_count");

	let answer0 = document.getElementById("answer0_text");
	let answer1 = document.getElementById("answer1_text");
	let answer2 = document.getElementById("answer2_text");

	let r0 = document.getElementById("answer0");
	let r1 = document.getElementById("answer1");
	let r2 = document.getElementById("answer2");

	let current = 0;
	let score = 0;

	let qestionShow = (current) => {
		quText.innerText = questions[current].question;
		answer0.textContent = questions[current].answers[0];
		answer1.textContent = questions[current].answers[1];
		answer2.textContent = questions[current].answers[2];
		counter.innerText = `${current + 1}/${questions.length}`;

		if (current == questions.length - 1) {
			button.style.display = "none";
			document.getElementById("test_end_btn").style.display = "block";
		}
	}

	button.onclick = () => {
		checkQuestion(current - 1);
		qestionShow(current++);
	}

	document.getElementById("test_start_btn").onclick = () => {
		document.getElementById("test_form").style.display = "block";
		document.getElementById("test_start_btn").style.display = "none";
		qestionShow(current++);
	}

	function checkQuestion(index) {
		let ans = -1;
		if (r0.checked) ans = 0;
		if (r1.checked) ans = 1;
		if (r2.checked) ans = 2;

		if (ans == questions[index].right) score++;
	}

	document.getElementById("test_end_btn").onclick = () => {
		checkQuestion(current - 1);
		document.getElementById("test_form").style.display = "none";
		document.getElementById("score").style.display = "block";

		let la = [2, 3, 4];
		let ov = [5, 6, 7, 8, 9, 10, 0]
		if (la.includes(score)) document.getElementById("score").innerHTML = `Вы получили ${score} балла!`
		else if (ov.includes(score)) document.getElementById("score").innerHTML = `Вы получили ${score} баллов!`
		else document.getElementById("score").innerHTML = `Вы получили ${score} балл!`;

	}
}

function splashScreen() {
	let splash = document.getElementById("splash");
	let btn = document.getElementById("splash_btn");
	let field = "";

	btn.onclick = () => {
		let date = new Date();
		let name = localStorage.getItem("name");
		if (name != null && name != "") {
			field = `Снова здравствуйте, ${name}!`
		} else field = `Снова здравствуйте, гость!`
		document.getElementById("splash_name").innerHTML = field;

		field = (date.getHours() < 10) ? `Текущее время: 0${date.getHours()}:` : `Текущее время: ${date.getHours()}:`;
		field += (date.getMinutes() < 10) ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
		document.getElementById("splash_time").innerHTML = field;

		field = (date.getDate() < 10) ? `Дата: 0${date.getDate()}.` : `Дата: ${date.getDate()}.`;
		field += (date.getMonth() < 10) ? `0${(date.getMonth() + 1)}.` : `${(date.getMonth() + 1)}.`;
		field += `${date.getFullYear()}`;
		document.getElementById("splash_date").innerHTML = field;

		splash.style.display = "block";
	}

	splash.onclick = () => {
		splash.style.display = "none";
	}
}

//этот кусочек честно украла, плавная прокрутка по якорям
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
	animationTime = 400,
	framesCount = 25;

anchors.forEach(function (item) {
	item.addEventListener('click', function (elem) {
		elem.preventDefault();
		let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
		let scroller = setInterval(function () {
			let scrollBy = coordY / framesCount;
			if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
				window.scrollBy(0, scrollBy);
			} else {
				window.scrollTo(0, coordY);
				clearInterval(scroller);
			}
		}, animationTime / framesCount);
	});
});