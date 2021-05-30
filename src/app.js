import css from './style.css';

// router
const {
    initialRoutes,
    historyRouterPush
} = require('./router')
const historyAppDiv = document.querySelector('#history-app');
initialRoutes('history', historyAppDiv);

//변수
let qIdx = 0;
let timeInterval;
let playing = false;
let time = 0;
let score = 0;
let finalScore = 0;
let averageTime = 0;
let totalQuestion = 0;
const _strBtn = document.querySelector('#start-btn');
const _infoTop = document.querySelector('#info-top');
const _remainTime = document.querySelector('#remain-time');
const _nowScore = document.querySelector('#now-score');
const _typeInput = document.querySelector('#type-input');
const _textBox = document.querySelector('#text-box');
const _clearTime = [];
var _wordList = new Object;


//결과 이동
const toResult = () =>{
    historyRouterPush('/result', historyAppDiv);
    clearInterval(timeInterval);

    //점수 및 평균 시간 출력
    const timeSum = _clearTime.reduce(function add(sum, curr) {
        return sum + curr;
      }, 0);
    _clearTime.length ? averageTime = timeSum / _clearTime.length : 0;
    document.querySelector('#aver-sec').innerText = averageTime.toFixed(2);
    document.querySelector('#final-score').innerText =  finalScore;

}

//json 데이터 불러오기
const requestUrl = 'https://my-json-server.typicode.com/kakaopay-fe/resources/words';
const request = new XMLHttpRequest();
request.open('GET', requestUrl);
request.responseType = 'json';
request.send();
request.onload = function () {
    _wordList = request.response;
    totalQuestion = _wordList.length;
    typingEvent();
    return false;
}

//game reset
function reset() {
    _infoTop.style.display = 'none';
    _strBtn.innerText = '시작';
    qIdx = 0;
    score = totalQuestion;
    clearInterval(timeInterval);
    _textBox.innerHTML = '<span class="quote">\'시작\'버튼을 눌러 <br>게임을 시작하세요!</span>';
    playing = false;
    return false;
}

//game start
function start() {
    if (!playing) {
        nextQuestion();
        _typeInput.focus();
        _strBtn.innerText = '초기화';
        score = totalQuestion;
        _nowScore.innerText = score;
        _infoTop.style.display = 'flex';
        playing = true;
        return false;
    } else{
        reset();
        return false;
    }
}
_strBtn.addEventListener('click', event => {
    event.preventDefault();
    start();
});

//타이머
function timer() {
    if (time > 0) {
        time--;
        _remainTime.innerHTML = time;
        return false;
    }else if (time == 0) {
        qIdx++;
        score--;
        _nowScore.innerText = score;
        nextQuestion();
    }else{
        console.log('timer error');
        return false;
    };
}

//다음문제
function nextQuestion() {
    _typeInput.value = '';
    if(qIdx < totalQuestion){
        time = _wordList[qIdx]["second"];
        _remainTime.innerHTML = time;
        _textBox.innerHTML = _wordList[qIdx]["text"];
        if (timeInterval) {
            clearInterval(timeInterval);
        }
        timeInterval = setInterval(timer, 1000);
        return false;
    }else{
        toResult();
        return false;
    }
}

//인풋 입력
function typingEvent() {
    _typeInput.addEventListener('keydown', (e) => {
        const _keycode = e.keyCode;
        const _answer = _typeInput.value.toLowerCase();
        const _question = _textBox.innerText.toLowerCase();
        let typingTime = 0;

        if (_keycode == 13) { // enter 칠 때
            _typeInput.value = '';
            if(playing == true && _answer.length != 0){
                //점수계산
                if (_answer != _question ) {
                    //오답
                    score--;
                    _nowScore.innerText = score;
                    if (score <= 0) {
                        // 0점
                        finalScore = _nowScore.innerText;
                        toResult();
                    }else{
                        console.log('score error');
                        return false;
                    }
                } else {
                    //정답
                    typingTime = parseInt(_wordList[qIdx]["second"]) - parseInt(_remainTime.innerText);
                    _clearTime.push(typingTime);
                    qIdx++;
                    finalScore = _nowScore.innerText;
                    nextQuestion();
                }
            }
            return false;
        }else{
            return false;
        }
    })
}
