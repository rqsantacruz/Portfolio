/* 헤더 */
$('.menu').on('click', function () {
  $('.all_menu').toggle();
});
/* 첫번째 섹션 */
// 숙소 버튼
$(function () {
  $('#local').on('click', function () {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $('#global').removeClass('active');
    }
  });

  $('#global').on('click', function () {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $('#local').removeClass('active');
    }
  });
});
// 체크인, 체크아웃
const today = new Date();
today.setHours(0, 0, 0, 0);
const picker = new Litepicker({
  element: document.getElementById('dateRange'),
  singleMode: false,
  allowRepick: false,
  minDays: 2,
  format: 'YYYY-MM-DD',
  numberOfMonths: 1,
  numberOfColumns: 1,
  lang: 'ko',
  minDate: today,
  tooltipText: { one: '박', other: '박' }, // 기본 비워두기
  tooltipNumber: (totalDays) => {
    // totalDays가 없거나 (선택 전),
    // totalDays가 1인 경우 (체크인 날짜만 선택되었거나 당일 체크인/체크아웃)
    if (!totalDays || totalDays < 2) {
      return ''; // 툴팁 숨김
    }

    // totalDays가 2 이상일 때 (체크인/체크아웃 날짜가 모두 선택되어 1박 이상 확정된 상태)
    const nights = totalDays - 1;
    return `${nights}박`; // 예: 1박, 2박 등 표시
  },
  dropdowns: {
    minYear: 2025,
    maxYear: 2026,
    months: true,
    years: true,
  },
});
// 인원, 객실
document.addEventListener('DOMContentLoaded', () => {
  const guestRoomCountTrigger = document.getElementById(
    'guestRoomCountTrigger'
  ); // 변경된 ID
  const guestRoomCountPanel = document.getElementById('guestRoomCountPanel'); // 변경된 ID
  const guestRoomCountDisplay = document.getElementById(
    'guestRoomCountDisplay'
  ); // 변경된 ID
  const applyButton = guestRoomCountPanel.querySelector('.apply-button');

  let adultCount = 1;
  let childCount = 0;
  let roomCount = 1;

  // 초기값 설정 및 표시
  function updateDisplay() {
    const totalGuests = adultCount + childCount;
    guestRoomCountDisplay.value = `인원 ${totalGuests}명, 객실 ${roomCount}개`; // 표시 형식 변경
    document.getElementById('adultCount').textContent = adultCount;
    document.getElementById('childCount').textContent = childCount;
    document.getElementById('roomCount').textContent = roomCount;

    // 버튼 활성화/비활성화 (최소/최대 값 제한)
    guestRoomCountPanel.querySelectorAll('.minus').forEach((button) => {
      const type = button.dataset.type;
      if (type === 'adult' && adultCount <= 1) button.disabled = true;
      else if (type === 'child' && childCount <= 0) button.disabled = true;
      else if (type === 'room' && roomCount <= 1) button.disabled = true;
      else button.disabled = false;
    });

    guestRoomCountPanel.querySelectorAll('.plus').forEach((button) => {
      const type = button.dataset.type;
      // 최대 인원/객실 수 제한 (원하는 값으로 조절)
      if (type === 'adult' && adultCount >= 10) button.disabled = true;
      else if (type === 'child' && childCount >= 5) button.disabled = true;
      else if (type === 'room' && roomCount >= 5) button.disabled = true;
      else button.disabled = false;
    });
  }

  // 드롭다운 토글
  guestRoomCountTrigger.addEventListener('click', (event) => {
    // input 필드를 클릭했을 때만 패널을 열도록
    if (
      event.target.tagName === 'INPUT' ||
      event.target.tagName === 'LABEL' ||
      event.target.classList.contains('person-icon')
    ) {
      guestRoomCountPanel.classList.toggle('active');
    }
  });

  // 증감 버튼 클릭 이벤트
  guestRoomCountPanel.addEventListener('click', (event) => {
    const target = event.target;
    if (
      target.tagName === 'BUTTON' &&
      (target.classList.contains('minus') || target.classList.contains('plus'))
    ) {
      const type = target.dataset.type;
      if (target.classList.contains('minus')) {
        if (type === 'adult' && adultCount > 1) adultCount--;
        else if (type === 'child' && childCount > 0) childCount--;
        else if (type === 'room' && roomCount > 1) roomCount--;
      } else {
        // plus
        if (type === 'adult' && adultCount < 10) adultCount++;
        else if (type === 'child' && childCount < 5) childCount++;
        else if (type === 'room' && roomCount < 5) roomCount++;
      }
      updateDisplay();
    } else if (target.classList.contains('apply-button')) {
      guestRoomCountPanel.classList.remove('active'); // "적용" 버튼 클릭 시 패널 닫기
    }
  });

  // 드롭다운 외부 클릭 시 닫기
  document.addEventListener('click', (event) => {
    if (
      !guestRoomCountTrigger.contains(event.target) &&
      !guestRoomCountPanel.contains(event.target)
    ) {
      guestRoomCountPanel.classList.remove('active');
    }
  });

  updateDisplay(); // 페이지 로드 시 초기값 설정
});
// 검색창
let mainSearch = $('#main_search');
let searchBtn = $('#search_btn');
$(function () {
  mainSearch.on('keydown', function (event) {
    if (event.keyCode === 13) {
      let searchText = mainSearch.val();

      window.location.href = searchBtn.attr('href');
    }
  });
});
/* 두번째 섹션 */
var swiper = new Swiper('.sec2Swiper', {
  cssMode: true, //옵션
  slidesPerView: 2, //보여질 개수
  slidesPerGroup: 2, //한 번에 슬라이딩될 개수
  spaceBetween: 12,
  navigation: {
    nextEl: '.swiper2-next',
    prevEl: '.swiper2-prev',
  },
  breakpoints: {
    551: {
      slidesPerView: 3, //브라우저가 1024보다 클 때
      slidesPerGroup: 3,
      spaceBetween: 20,
    },
    851: {
      slidesPerView: 4, //브라우저가 1024보다 클 때
      slidesPerGroup: 4,
      spaceBetween: 20,
    },
  },
});
// 하트 아이콘 클릭
$('.heart').on('click', function () {
  let src = $(this).attr('src');

  if (src.includes('none_heart.png')) {
    $(this).attr('src', './img/main/color_heart.png');
  } else {
    $(this).attr('src', './img/main/none_heart.png');
  }
});
/* 세번째 섹션 */
var sec3Swiper = new Swiper('.sec3_swiper', {
  slidesPerView: 1,
  spaceBetween: 40,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.sec3_pagination',
    clickable: true,
  },
  breakpoints: {
    851: {
      slidesPerView: 2, //브라우저가 1024보다 클 때,
      spaceBetween: 40,
    },
  },
});
/* 네번째 섹션 */
var swiper = new Swiper('.sec4swiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 3,
  spaceBetween: 12,
  loop: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 0,
    modifier: 0,
    slideShadows: true,
  },
  breakpoints: {
    768: {
      spaceBetween: 20,
    },
    1024: {
      spaceBetween: 40,
    },
    1440: {
      spaceBetween: 60,
    },
  },
});
/* 여섯번째 섹션 */
var swiper = new Swiper('.sec6Swiper', {
  cssMode: true, //옵션
  slidesPerView: 2, //보여질 개수
  slidesPerGroup: 2, //한 번에 슬라이딩될 개수
  spaceBetween: 12,
  navigation: {
    nextEl: '.swiper6-next',
    prevEl: '.swiper6-prev',
  },
  breakpoints: {
    551: {
      slidesPerView: 3, //브라우저가 1024보다 클 때
      slidesPerGroup: 3,
      spaceBetween: 20,
    },
    851: {
      slidesPerView: 4, //브라우저가 1024보다 클 때
      slidesPerGroup: 4,
      spaceBetween: 20,
    },
  },
  mousewheel: true,
  keyboard: true,
});
/* 일곱번째 섹션 */
var sec7Swiper = new Swiper('.sec7_swiper', {
  slidesPerView: 1, //보여질 개수
  slidesPerGroup: 1, //한 번에 슬라이딩될 개수
  spaceBetween: 20,
  breakpoints: {
    851: {
      //브라우저가 1024보다 클 때,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },
});
