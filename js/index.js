import Swiper from 'swiper';
import 'swiper/css';

const swiper = new Swiper('.mySwiper', {
  cssMode: true, //옵션
  slidesPerView: 4, //보여질 개수
  slidesPerGroup: 4, //한 번에 슬라이딩될 개수
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  mousewheel: true,
  keyboard: true,
});
