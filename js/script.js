// $(document).ready(function(){
// 	$('.carousel__inner').slick({
// 		speed: 1200,
// 		autoplay: true,
// 		autoplaySpeed: 2000,
// 		prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
// 		nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
// 		responsive: [
// 			{
// 				breakpoint: 992,
// 				settings: {
// 					dots: true,
// 					arrows: false
// 				}
// 			}
// 		]
// 	});
// });

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