//Задание 2: Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 

const btn = document.querySelector('.btn');
const screenSize = document.querySelector('.screen_size');



btn.addEventListener('click', () => {
    screenSize.innerHTML = `Ширина экрана ${window.screen.width}px, высота экрана ${window.screen.height}px. <br>  Ширина браузера ${document.documentElement.clientWidth}px, высота барузера ${document.documentElement.clientHeight}px. `;

    alert (`Ширина ${window.screen.width}, высота ${window.screen.height}.`);


});