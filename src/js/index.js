//JS
const firstItem = document.querySelector('.js-1');
const secondItem = document.querySelector('.js-2');
const thirdItem = document.querySelector('.js-3');
const x = window.matchMedia('(min-width: 768px)');

function myFunction(x) {
  if (x.matches) {
    // If media query matches
    firstItem.innerText =
      'для безопасности данных вся информация обрабатывается на стороне биллинговой систем';
    secondItem.innerText =
      'информация о платежах обрабатывается на стороне банков';
    thirdItem.innerText =
      'редизайн приложения с вашим логотипом и цветовой палитрой';
  } else {
    firstItem.innerText = 'безопасность передачи данных';
    secondItem.innerText = 'безопасность платежной системы';
    thirdItem.innerText = 'дизайн с вашим логотипом';
  }
}

myFunction(x);
x.addListener(myFunction);

$(document).on('click', function(e) {
  if (
    $(e.target).hasClass('btn-contacts') ||
    $(e.target).hasClass('btn-contacts-img')
  ) {
    if ($('.contacts-container').hasClass('active')) {
      closeAll();
      return;
    }
    closeAll();
    $('.contacts-container').addClass('active');
    $('.contacts-item').addClass('active');
    return;
  }

  closeAll();
});

function closeAll() {
  $('.contacts-container').removeClass('active');
  $('.contacts-item').removeClass('active');
}
