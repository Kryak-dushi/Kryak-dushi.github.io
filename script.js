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
		gr.innerHTML = `Приветствую вас, ${name}!`;
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
	document.getElementById('res_triangle').innerHTML = h * b / 2;
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
	arr[0] = parseInt(arr[0]);
	let max = arr[0];
	let min = arr[0];
	for (var i = 1; i < arr.length; i++) {
		arr[i] = parseInt(arr[i]);
		if (arr[i] > max) max = arr[i];
		if (arr[i] < min) min = arr[i];
	}
	document.getElementById('res_max').innerHTML = `Максимальный элемент: ${max}`;
	document.getElementById('res_min').innerHTML = `Минимальный элемент: ${min}`;
	document.getElementById('arr').innerHTML = `Массив: ${arr}`;
}

function minAndMaxSecond() {
	let arr = [];

	document.getElementById("array2_add").onclick = () => {
		arr[arr.length] = parseInt(document.array2.array2.value);
		document.array2.array2.value = '';
	}

	document.getElementById("array2_exe").onclick = () => {
		document.getElementById('res_max2').innerHTML = `Максимальный элемент: ${Math.max(...arr)}`;
		document.getElementById('res_min2').innerHTML = `Минимальный элемент: ${Math.min(...arr)}`;
		document.getElementById('arr2').innerHTML = `Массив: ${arr}`;
		arr.length = 0;
	}
}

function timer() {
	let start = document.getElementById("start");
	let stop = document.getElementById("stop");
	let passed = document.getElementById("passed");
	let passedShow = document.getElementById("time_passed");
	let timerShow = document.getElementById("timer");

	let timePassed = 0;
	let isRun = false;
	let timerId = null;

	start.onclick = () => {
		if (isRun) { return; }
		isRun = true;
		startTimer(parseInt(document.getElementById("time").value) * 60);
	}

	stop.onclick = () => {
		isRun = false;
		clearInterval(timerId);
		timePassed = 0;
	}

	passed.onclick = () => {
		if (timePassed < 1) {
			passedShow.innerHTML = "Таймер не запущен";
		} else passedShow.innerHTML = `Прошло с начала отсчета: ${convertSeconds(timePassed - 1)}`;
	}

	let startTimer = (duration) => {
		let d = duration;
		timerId = setInterval(function () {
			if (!isRun) { stop.onclick() }
			timerShow.textContent = convertSeconds(d);
			timePassed++;
			if (--d < 0) { isRun = false; }
		}, 1000);
	}

	let convertSeconds = (t) => {
		let minutes = parseInt(t / 60, 10);
		let seconds = parseInt(t % 60, 10);
		minutes = minutes < 10 ? `0${minutes}` : minutes;
		seconds = seconds < 10 ? `0${seconds}` : seconds;
		return `${minutes}:${seconds}`
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
			question: 'Сколько параметров можно передать функции ?',
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
			question: 'Какой из этих вариантов задают массив из элементов «a», «b»?',
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
	let date = new Date();
	let field = "";

	btn.onclick = () => {		
		let name = localStorage.getItem("name");
		if (name != null && name != "") {
			field = `Снова здравствуйте, ${name}!`
		} else field = `Снова здравствуйте, гость!`
		document.getElementById("splash_name").innerHTML = field;

		if (date.getHours() < 10) field = `Текущее время: 0${date.getHours()}:`
		else field = `Текущее время: ${date.getHours()}:`;
		if (date.getMinutes() < 10) field += `0${date.getMinutes()}`
		else field += `${date.getMinutes()}`;
		document.getElementById("splash_time").innerHTML = field;

		if (date.getDate() < 10) field = `Дата: 0${date.getDate()}.`
		else field = `Дата: ${date.getDate()}.`;
		if (date.getMonth() < 10) field += `0${date.getMonth()}.`
		else field += `${date.getMonth()}.`;

		field += `${date.getFullYear()}`;
		document.getElementById("splash_date").innerHTML = field;

		splash.style.display = "block";
	}

	splash.onclick = () => {
		splash.style.display = "none";
	}
}

//этот кусочек я честно украла 
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
	animationTime = 400,
	framesCount = 25;

anchors.forEach(function (item) {
	item.addEventListener('click', function (e) {
		e.preventDefault();
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