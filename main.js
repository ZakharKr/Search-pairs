// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

function createNumbersArray(count) {
    let arr=[];
    for (let i = 0; i < count*2; i+=2) {
        arr[i]=arr[i+1]=Math.floor(Math.random()*100);
    }
    return arr;
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {
    for (let i = 0 , j=0, temp=0; i < arr.length; i++) {
        j=Math.floor(Math.random()*arr.length);
        [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function startGame(count) {
    // clickCounter - счетчик кликов(0,1), numberOne и numberTwo  -   сюда будем складывать значения  открытых карточек
    let clickCounter = 0;
    let numberOne = -1;
    let numberTwo = -1;
    let arrNumbers = shuffle(createNumbersArray(count));
    let container = document.createElement('div');
    container.id = 'container';


    arrNumbers.forEach(element => {
        let card = document.createElement('div');               //создаем карточку
        let frontSide = document.createElement('div');          //создаем див для рубашки
        let frontSideImg = document.createElement('img');       //содаем картинку рубашки
        let backSide = document.createElement('div');           // создаем див для значения на карточке

        card.classList.add('card');
        frontSide.classList.add('frontSide');
        backSide.classList.add('backSide');

    // заполняем созданые елементы

        frontSideImg.src = './img/animefoni1.jpg';                      
        frontSideImg.alt = 'Здесь должна быть картинка рубашки';
        backSide.innerText = element;

    //добавляем в DOM дерево наши элементы
        frontSide.append(frontSideImg);
        card.append(frontSide);
        card.append(backSide);
        container.append(card);


        card.addEventListener('click',function(e){

        // По клику нашу карточку надо перевернуть - ниэе стили что бы она перевернулась
            frontSide.style.transform = 'rotateY(180deg)';
            backSide.style.transform = 'rotateY(360deg)';

        // Проверка не кликали ли мы уже на эту карту,  если нет тогда будет код выполнятся дальше - иначе стоп
            console.log(e.target)
            if(e.target.classList.contains('opend')||e.target.classList.contains('success')||e.target.classList.contains('card')){
                return
            }else{

            // Создаем элемент в котором лежит именно цыфра ( по клику мы попдаем на IMG рубашки, поэтому переходим в элемент где лежит цифра что бы ее можно было достать)
                let clickElement = e.target.parentNode.nextSibling;

            // Добавляем класс открытой карточки что бы дальше ее можно было найти когда кликнем на вторуб карточку
                clickElement.classList.add('opend');
            // Проверка какая это открыта карточка по счету 1 или вторая для этого есть clickCounter (возможно можно просто завести 1 переменную и складывать в нее значение и 
            // если она пустая то clickCounter=0 если там что то есть то clickCounter=1 и сравнивать тразу это значение с кликнутым. Надо подумать..)
                if(clickCounter==0){
                    numberOne = clickElement.innerText;  // Получаем значение лежащие в первой карточке
                    clickCounter++;
                }else if(clickCounter==1){
                    numberTwo = clickElement.innerText;   // Получаем значение лежащие во второй карточке
                    let elem = document.querySelectorAll('.opend');   // Получаем коллекцию из двух карточек в которые мы кликнули
                //Ниже код для определения и отображения совпали наши карточки или нет
                    if(numberOne==numberTwo){
                        elem[0].classList.add('success');
                        elem[1].classList.add('success');
                        elem[0].classList.remove('opend');
                        elem[1].classList.remove('opend');
                        //Затираем наши значения для того что бы играть далее
                        clickCounter=0;
                        numberTwo=numberOne=-1;
                    }else{
                         //отображаем что выбор не верный
                        elem[0].classList.add('wrong');
                        elem[1].classList.add('wrong');
                        setTimeout(()=>{
                        // Прерворачиваем наши карточки обратно в закрытое состояние
                            elem[0].style.transform = 'rotateY(180deg)';
                            elem[0].previousSibling.style.transform = 'rotateY(0deg)';
                            elem[1].style.transform = 'rotateY(180deg)';
                            elem[1].previousSibling.style.transform = 'rotateY(0deg)';
                        // Читстим наши карточки от всех классов что бы они могли играть снова  
                            elem[0].classList.remove('opend');
                            elem[1].classList.remove('opend');
                            elem[0].classList.remove('wrong');
                            elem[1].classList.remove('wrong');
                        },1000)
                         //Затираем наши значения для того что бы играть далее
                        numberTwo=numberOne=-1;
                        clickCounter=0;
                    }
                }
            }
        })
    });

    document.body.append(container);
}

function showCardBeforStart(){
    let cardsCollections = document.querySelectorAll('.card');
    cardsCollections.forEach(element => {
        element.children[0].style.transform = 'rotateY(180deg)';
        element.children[1].style.transform = 'rotateY(360deg)';
    });
}


function hideCardBeforStart(){
    let cardsCollections = document.querySelectorAll('.card');
    cardsCollections.forEach(element => {
        element.children[0].style.transform = 'rotateY(0deg)';
        element.children[1].style.transform = 'rotateY(180deg)';
    });
}

// Зждесь надо написать внешниф функционал
// создаю форму что бы пользователь сам мог добвать колличество пар в игре
function startFunctional(){
    let form = document.createElement('form');
    let input = document.createElement('input');
    let button = document.createElement('button');
    form.id = 'formForStart';

    input.placeholder = 'Введите колличество пар от 4 до 10';
    button.innerText = 'Start';
    
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        // Не работает удаление созданной ранее игры пишет ошибку
        // if(document.getElementById('container')){
        //     document.body.remove(document.getElementById('container'));
        // }
        // numPair это число возможных пар для игры от 4 до 10, при вводе других значений будет 4
        let numPair = 4;
        if(input.value>10){
            numPair = 10;
        }else if( 4<input.value && input.value<=10 ){
            numPair=parseInt(input.value)+ parseInt(input.value)%2;
        }
        input.value = '';   
        startGame(numPair);
        setTimeout(() => {
            showCardBeforStart();
        }, 1500);
        setTimeout(() => {
            hideCardBeforStart();
        }, 3500);
    })

    form.append(input);
    form.append(button);
    document.body.append(form);


}


// Это функция cоздает заголовок с перещелкиванием (тестил CSS свойства просто)
function headerCreation(){
    let headerName = document.querySelector('.headerName');
    let headerContainer = document.querySelector('.headerContainer');
    let flag=true;

    headerName.addEventListener('click',()=>{
        if(flag){
            headerName.style.backgroundImage = 'url(https://img.freepik.com/free-photo/factory-producing-co2-pollution_23-2150858189.jpg?t=st=1730649575~exp=1730653175~hmac=4290df4d5cfbd3a763ad8778e48c129a4777fb92b5f39326d843e5cbeccf57e8&w=740)';
            headerContainer.style.backgroundImage = 'url(https://i.pinimg.com/564x/ba/d7/00/bad7004e3e1e4af71d6bcfb135c0eef7.jpg)';
        }else{
            headerContainer.style.backgroundImage = 'url(https://img.freepik.com/free-photo/factory-producing-co2-pollution_23-2150858189.jpg?t=st=1730649575~exp=1730653175~hmac=4290df4d5cfbd3a763ad8778e48c129a4777fb92b5f39326d843e5cbeccf57e8&w=740)';
            headerName.style.backgroundImage = 'url(https://i.pinimg.com/564x/ba/d7/00/bad7004e3e1e4af71d6bcfb135c0eef7.jpg)';
        }
        flag=!flag;
    })
}

document.addEventListener('DOMContentLoaded',()=>{
    startFunctional();
    headerCreation();

})
