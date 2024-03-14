const burgerLinks = document.querySelector('.burger-links');
const burger = document.querySelector('.burger');
const body = document.querySelector('body');

burgerButton = function()
{
  burgerLinks.classList.toggle('active');
  burger.classList.toggle('active');
  body.classList.toggle('active');
}