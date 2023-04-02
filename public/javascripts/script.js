//header sticky
const header = document.querySelector('#header')
window.addEventListener('scroll', fixNav)

function fixNav(){
    if(window.scrollY > header.offsetHeight + 100){
        header.classList.add('active')
    } else{
        header.classList.remove('active')
    }
}

$(".custom-carousel").owlCarousel({
    autoWidth: true,
    loop: true
  });
  $(document).ready(function () {
    $(".custom-carousel .item").click(function () {
      $(".custom-carousel .item").not($(this)).removeClass("active");
      $(this).toggleClass("active");
    });
  });


  //for login

  $('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });

 //for Update
 function handleEdit(elementId) {
  const el = document.getElementById(elementId);

  const inputTitle = document.getElementById('inputTitle');
  const inputDesc = document.getElementById('inputDescription');
  const inputImage = document.getElementById('inputImage');
  const inputPrice = document.getElementById('inputPrice');

  // Access child elements of el using the same syntax
  inputTitle.textContent = el.querySelector('#inputTitle').textContent;
  inputDesc.textContent = el.querySelector('#inputDescription').textContent;
  inputImage.style.backgroundImage = `url('${el.querySelector('#inputImage').style.backgroundImage.slice(5, -2)}')`;
  inputPrice.textContent = el.querySelector('#price').textContent;

  let menuId = elementId.split('@')[1]

}
