const slider = tns({
	container: '.carousel__inner',
	items: 1,
	slideBy: 'page',
	autoplay: false,
	controls: false,
	nav: true,
	navPosition: 'bottom',
	responsive: {
		768: {
			nav: false
		}
	}
});

document.querySelector('.prev').addEventListener('click', () => slider.goTo('prev'));

document.querySelector('.next').addEventListener('click', () => slider.goTo('next'));

let tabs = document.querySelectorAll('.catalog__tab');
for (let i = 0; i < tabs.length; i++) {
	const tab = tabs[i];
	tab.addEventListener('click', () => {
		let tabActive = document.querySelector('.catalog__tab_active');
		tabActive.classList.remove('catalog__tab_active');
		tab.classList.add('catalog__tab_active');
		let contents = document.querySelectorAll('.catalog__content');
		contents.forEach (content => content.classList.remove('catalog__content_active'));
		contents[i].classList.add('catalog__content_active');
	}, !tab.classList.contains('catalog__tab_active'));
}


Slide('catalog-item__link');
Slide('catalog-item__back');

function Slide(str) {
	let items = document.querySelectorAll(`.${str}`);
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		item.addEventListener('click', (e) => {
			e.preventDefault();
			document.querySelectorAll('.catalog-item__content')[i].classList.toggle('catalog-item__content_active');
			document.querySelectorAll('.catalog-item__list')[i].classList.toggle('catalog-item__list_active');
		});
	}
}

//modal

let consultationsBtn = document.querySelectorAll('[data-modal=consultation]');
consultationsBtn.forEach((item, num) =>{
	clickAndOpenForm(item, 'consultation');
});

let close = document.querySelectorAll('.modal__close');
close.forEach((item, num) =>{
	item.addEventListener('click', (e) => {
		fade(document.getElementById('consultation'));//.style.display = 'none';
		fade(document.getElementById('order'));//.style.display = 'none';
		fade(document.getElementById('thanks'));//.style.display = 'none';
		fade(document.getElementById('overlay'));//.style.display = 'none';
	});
});

let btnMini = document.querySelectorAll('.button_mini');
btnMini.forEach((item, num) =>{
	item.addEventListener('click', (e) => {
		let order = document.getElementById('order');
		unfade(order);//.style.display = 'block';
		let text = document.querySelectorAll('.catalog-item__subtitle')[num].textContent;
		order.querySelector('.modal__descr').textContent = text;
		unfade(document.getElementById('overlay'));//.style.display = 'block';
	});
});

function clickAndOpenForm(item, nameForm) {
	item.addEventListener('click', (e) => {
		unfade(document.getElementById(nameForm));//.style.display = 'block';
		unfade(document.getElementById('overlay'));//.style.display = 'block';
	});
}

function fade(element) {
	var op = 1;  // initial opacity
	var timer = setInterval(function () {
			if (op <= 0.1){
					clearInterval(timer);
					element.style.display = 'none';
			}
			element.style.opacity = op;
			element.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op -= op * 0.1;
	}, 50);
}

function unfade(element) {
	var op = 0.1;  // initial opacity
	element.style.display = 'block';
	var timer = setInterval(function () {
			if (op >= 1){
					clearInterval(timer);
			}
			element.style.opacity = op;
			element.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op += op * 0.1;
	}, 10);
}

$(document).ready(function(){

	validateForms('#consultation form')
	validateForms('#consultation-form')
	validateForms('#order form')
	function validateForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите своё имя",
					minlength: jQuery.validator.format("Введите {0} символа!")
				},
				phone: "Пожалуйста, введите свой телефон",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Не правильно введен адрес почты"
				}
			}
		});
	}

	$("input[name=phone]").mask("+7 (999) 999-9999");

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
				type: "POST",
				url: "mailer/smart.php",
				data: $(this).serialize()
		}).done(function() {
				$(this).find("input").val("");
				fade(document.getElementById('consultation'));
				fade(document.getElementById('order'));
				unfade(document.getElementById('thanks'));
				unfade(document.getElementById('overlay'));

				$('form').trigger('reset');
		});
		return false;
	});

	// Smooth scroll and pageup

	$(window).scroll(function() {
		if($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href^='#']").click(function(){
			const _href = $(this).attr("href");
			$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
			return false;
	});
});