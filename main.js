let nMultipleCurrentQuestion = 0;
let nMultipleCorrectAnswers = 0;
let arrMultipleQuestions = [];
// const
const AMOUNT_OF_QUESTION = 10; // how many questions we want out of the array
const CODE = 4;
let info = [
    {
        "name" : "יפה לולה",
        "title" : `משקית ת"ש`,
    },
    {
        "name" : "מאיר יוסף",
        "title" : `מדא"ג`,
    },
    {
        "name" : "אגם שלו",
        "title" : `מדריכת קליעה`,
    },
    {
        "name" : "שני עמית",
        "title" : `מ"כית`,
    },
    {
        "name" : "רפאל בן דרור",
        "title" : `מנהל רשת`,
    },
    {
        "name" : "שובל דוד",
        "title" : `מפתחת לומדה`,
    },
    {
        "name" : "לירן כהן",
        "title" : `מטמיע מעלה`,
    },
    {
        "name" : "אור חן",
        "title" : `צלם צבאי`,
    },
    {
        "name" : "זוהר שמש",
        "title" : `גרפיקאי`,
    },
    {
        "name" : "אלמוג נהרי",
        "title" : `מש"ק שלישות`,
    },
    
]

window.addEventListener("load", () => {
    document.querySelector(".loader").classList.add("fade");
    add();
    setTimeout(commercia,4000);
});

let add = () => {
    for (let i = 1; i <= info.length; i++) {
        let item = El("div",{cls : `banner`},
            El("img",{attributes: {class: `background-img-commander`, src : `assets/media/mefaked_${i}.jpg` , alt : `mefaked_${i}`},}),
            El("p",{cls: `background-name`},`${info[i - 1].name} - ${info[i - 1].title}`,),            
        );
        document.querySelector(`.start`).append(item);
    }
};

let commercia = () => {
    document.querySelector(`.background-black`).style.display = "block";
    document.querySelector(`.commercial`).style.display = "block";
    document.querySelector(`.body`).style.overflow = "hidden";
    document.querySelector(`.button-for-Question`).addEventListener("click", () => {
        document.querySelector(`.commercial`).style.display = "none";
        document.querySelector(`.multipleQuestionContainer`).style.display = "block";
        arrMultipleQuestions = shuffle(DATA.questions);
        addContentToQuestion();
    })
}

const addContentToQuestion = () => {
    document.querySelector(`.multipleQuestionContainer`).innerHTML = "";
    // add question
    let question = El("div", {cls: `multipleQuestion`}, arrMultipleQuestions[nMultipleCurrentQuestion].question);
    document.querySelector(`.multipleQuestionContainer`).append(question);
    // add answeres
    if(arrMultipleQuestions[nMultipleCurrentQuestion].type === "multiple") {        
        let ansContainer = El("div", {cls: `ansContainer`},);
        document.querySelector(`.multipleQuestionContainer`).append(ansContainer);
        for(let i = 1; i <= 4; i++){
            let answer = El("div", {classes: [`multipleAns`, `ans${i}`, `ans`] , id: `ans${i}`,listeners: {click : onClickAnswer}}, arrMultipleQuestions[nMultipleCurrentQuestion][`ans${i}`]);
            document.querySelector(`.ansContainer`).append(answer);
        }
        // debugger;
        let p = El("p",{cls: `num-question`},`שאלה ${nMultipleCurrentQuestion + 1} מתוך ${AMOUNT_OF_QUESTION}`,);
        document.querySelector(`.multipleQuestionContainer`).append(p);
    } else {
        let ansContainer = El("div", {cls: `ansContainer`},
            El("div", {classes: [`binaryAns`, `true`, `ans`] , listeners: {click : onClickAnswer}}, "נכון"),
            El("div", {classes: [`binaryAns`, `false`, `ans`] , listeners: {click : onClickAnswer}}, "לא נכון"),
        );
        document.querySelector(`.multipleQuestionContainer`).append(ansContainer);
    }
}

/* onClickAnswer
--------------------------------------------------------------
Description: */
const onClickAnswer = (event) => {
    // remove listeners
    let arrAns =  document.querySelectorAll(`.ans`);
    for(let i = 0; i < arrAns.length; i++){
        arrAns[i].removeEventListener("click" , onClickAnswer);
    }
    // check if answer is correct
    if(event.currentTarget.classList[1] === String(arrMultipleQuestions[nMultipleCurrentQuestion].correctAns)){
        document.querySelector(`#${event.currentTarget.id}`).style.cssText = `background-image: url("assets/media/right_button.svg");`;
        nMultipleCorrectAnswers++;
    } else {
        document.querySelector(`#${event.currentTarget.id}`).style.cssText = `background-image: url("assets/media/wrong_button.svg");`;

    }

    // send to next question.
    nMultipleCurrentQuestion++;
    setTimeout(() => {
        if(nMultipleCurrentQuestion < AMOUNT_OF_QUESTION) {
            addContentToQuestion();
        } else {
            questionsEnd();
        }
    }, 1200)
}

/* questionsEnd
--------------------------------------------------------------
Description: */
const questionsEnd = () => {
    if (nMultipleCorrectAnswers >= 7) {
        document.querySelector(`.div-win`).style.display = "block";
        document.querySelector(`.win-p`).innerHTML = `כל הכבוד! <br> עניתם על על ${nMultipleCorrectAnswers} תשובות נכונות! <br> <br> הקוד הוא ${CODE} `
        document.querySelector(`.multipleQuestionContainer`).style.display = "none";
    } else {
        document.querySelector(`.div-lost`).style.display = "block";
        document.querySelector(`.multipleQuestionContainer`).style.display = "none";
        document.querySelector(`#try-again`).addEventListener("click", restart);
    }
}

const restart = () => {
    nMultipleCurrentQuestion = 0;
    nMultipleCorrectAnswers = 0;
    arrMultipleQuestions = [];
    document.querySelector(`.div-lost`).style.display = "none";
    document.querySelector(`.multipleQuestionContainer`).style.display = "block";
    arrMultipleQuestions = shuffle(DATA.questions);
    addContentToQuestion();
}

/*
shuffle
------------------------------------------------
Description: take orgnaiz array and shffel it
Parameters: array.
------------------------------------------------
Programer: Gal
------------------------------------------------
*/
function shuffle(arr) {
    let tmp = arr.slice();
    for (let i = 0; i < arr.length; i++) {
        let index = Math.floor(Math.random() * tmp.length);
        arr[i] = tmp[index];
        tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
    }
    return arr;
}

function El(tagName, options = {}, ...children) {
    let el = Object.assign(document.createElement(tagName), options.fields || {});
    if (options.classes && options.classes.length) el.classList.add(...options.classes);
    else if (options.cls) el.classList.add(options.cls);
    if (options.id) el.id = options.id;
    el.append(...children.filter(el => el));
    for (let listenerName of Object.keys(options.listeners || {}))
        if (options.listeners[listenerName]) el.addEventListener(listenerName, options.listeners[listenerName], false);
    for (let attributeName of Object.keys(options.attributes || {})) {
        if (options.attributes[attributeName] !== undefined) el.setAttribute(attributeName, options.attributes[attributeName]);
    }
    return el;
}
