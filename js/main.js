const root = document.querySelector('#root');
const headers = {
    one: '1. Вивести числа від 20 до 30 через пропуск, використовуючи крок 0,5 (20 20,5 21 21,5….).',
    two: '2. Один долар коштує 27 гривень. Вивести дані з розрахунком вартості 10, 20, 30... 100 доларів.',
    three: '3. Дане ціле число. Вивести всі цілі числа від 1 до 100, квадрат яких не перевищує числа N.',
    four: "4. Дане ціле число. З'ясувати, чи є воно простим (простим називається число, більше 1, які не мають інших дільників крім 1 і себе).",
    five: '5. Дане деяке число. Визначити, чи можна одержати це число шляхом зведення числа 3 у деякий ступінь. (Наприклад, числа 9, 81 можна отримати, а 13 - не можна).'
};

for (let key in headers) {
    let articleBlock = document.createElement('article')
    let headerBlock = document.createElement('h5');
    let contentBlock = document.createElement('div');

    articleBlock.id = key;
    articleBlock.classList.add('border');
    headerBlock.className = 'border m-0 bg-dark-subtle';
    headerBlock.innerText = headers[key];
    contentBlock.className = 'content';

    articleBlock.append(headerBlock, contentBlock);
    root.append(articleBlock);
}

/**
 * @param {string} inputType Input type value
 * @param {string} btnName   Button innerText
 * @return {HTMLElement} div that contains input and button
 **/
function createInputButtonBlock(inputType, btnName) {
    let controlBlock, input, button;

    controlBlock = document.createElement('div')
    input = document.createElement('input');
    button = document.createElement('button');

    controlBlock.className = 'control';
    input.type = inputType;
    button.innerText = btnName;

    controlBlock.append(input, button);

    return controlBlock;
}

function putContentToPage(selector, callbackFn) {
    const block = document.querySelector(selector);

    callbackFn(block);
}

// 1. Вивести числа від 20 до 30 через пропуск, використовуючи крок 0,5 (20 20,5 21 21,5….).
putContentToPage('#one>.content', (block) => {
    let numbers = [];

    for (let i = 20; i <= 30; i += 0.5) numbers.push(i);

    block.innerText = numbers.join(' ').replace(/\./g, ',');
});

// 2. Один долар коштує 27 гривень. Вивести дані з розрахунком вартості 10, 20, 30... 100 доларів.
putContentToPage('#two>.content', (block) => {
    let dollarsCost = [];

    for (let i = 10; i <= 100; i += 10) dollarsCost.push(`${i}$ = ${i * 27}`);

    block.innerHTML = dollarsCost.join('<br/>');
});

// 3. Дане ціле число. Вивести всі цілі числа від 1 до 100, квадрат яких не перевищує числа N.
putContentToPage('#three>.content', (block) => {
    let numInputBtnBlock = createInputButtonBlock('number', 'Calculate');

    block.before(numInputBtnBlock);

    numInputBtnBlock.querySelector('button').addEventListener('click', () => {
        let input = numInputBtnBlock.querySelector('input');
        let numberFromUser = +input.value;
        let numbers = [];

        if (isNaN(numberFromUser) || numberFromUser <= 0 || numberFromUser % 1 !== 0) {
            alert('Please put an integer number that > 0 (1,2,3...)!');
            input.value = '';
            return;
        }

        for (let i = 1; i <= 100; i++) {
            if (i**2 <= numberFromUser) numbers.push(i);
        }

        block.innerText = numbers.join(', ');
    });
});

// 4. Дане ціле число. З'ясувати, чи є воно простим (простим називається число, більше 1, які не мають інших дільників крім 1 і себе).
putContentToPage('#four>.content', (block) => {
    let numInputBtnBlock = createInputButtonBlock('number', 'Calculate');

    block.before(numInputBtnBlock);

    numInputBtnBlock.querySelector('button').addEventListener('click', () => {
        let input = numInputBtnBlock.querySelector('input');
        let numberFromUser = +input.value;
        let divisors = [];
        let result;

        if (isNaN(numberFromUser) || numberFromUser % 1 !== 0) {
            alert('Please enter an integer number (...-2,-1,0,1,2,3...)!');
            input.value = '';
            return;
        }

        result = `${numberFromUser} isn't a prime number!`;

        if (numberFromUser > 1) {
            for (let i = numberFromUser; i >= 1; i--) {
                if (numberFromUser === i || i === 1)
                    divisors.push(i);
                else if (numberFromUser % i === 0)
                    break;
            }

            if (divisors.length === 2)
                result = `${numberFromUser} is a prime number!`;
        }

        block.innerText = result;
    });
});

// 5. Дане деяке число. Визначити, чи можна одержати це число шляхом зведення числа 3 у деякий ступінь.
// (Наприклад, числа 9, 81 можна отримати, а 13 - не можна).
putContentToPage('#five>.content', (block) => {
    let numInputBtnBlock = createInputButtonBlock('number', 'Calculate');

    block.before(numInputBtnBlock);

    numInputBtnBlock.querySelector('button').addEventListener('click', () => {
        let input = numInputBtnBlock.querySelector('input');
        let numberFromUser = +input.value;
        let result;

        if (isNaN(numberFromUser) || numberFromUser <= -1) {
            alert('Please put a number that >= 0 (1,2.2,3...)!');
            input.value = '';
            return;
        }

        result = `From 3**n you can't get ${numberFromUser}!`;

        for (let i = 0;;i++) {
            let power = 3 ** i;

            if (power > numberFromUser) {
                break;
            } else if (power === numberFromUser) {
                result = `From 3**${i} you can get ${numberFromUser}!`;
                break;
            }
        }

        block.innerText = result;
    });
});
