/* 헤더 */
$('.menu').on('click', function () {
  $('.all_menu').toggle();
});
// 체크인 - 체크아웃
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
/* 추천순 */
$('.list_btn').on('click', function () {
  $('.btn_list').toggle();
});
