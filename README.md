# Typing Game
> 주어진 단어를 제한 시간내에 입력해서 점수를 획득 하는 게임.  
시작 버튼을 눌러 게임을 실행하고 게임 도중 초기화 버튼을 눌러 처음으로 돌아갈 수 있음  
문제를 틀리거나 제한시간을 모두 소진할 경우 기본 점수에서 감점이 되는 방식  
모든 문제를 클리어 하거나 0점이 될 경우 결과 페이지에서 최종 점수와 평균 입력 시간을 보여줌

## Index
[1. 조건](#condition)  
[2. 개발환경](#development-environment)  
[3. 라우터](#router)  
[4. 파일 구조](#file-tree)  
[5. 디펜던시](#dependencies)  
[6. 문제해결전략](#problem-solving-strategies)  
[7. 리뷰](#review)

## Condition
- webpack 환경을 구성
- webpack-dev-server 환경 구성
- start script를 통해서 hot-loading 적용
- build script를 구성하여 /public 폴더에 빌드한 html, js, css를 export
- 모든 구현은 vanila javascript(es5, es6, typescript도 가능)로 구현한다.
- 게임 화면과 완료 화면은 routing을 통하여 이동한다. (라우터 직접 구현 - 구현 방법은 자율)
- 단위 테스트 적용
- 단어는 서버에 요청하여 받아 온다.

## Development Environment
* HTML5
* CSS3
* Javascript(ES6)
* webpack
* webpack-dev-server

## Router
- handlebars 템플릿 엔진을 이용해 home 화면과 result 화면을 템플릿화 하고, history API를 활용하여 라우팅 구현
- port : 9000

## File Tree
* pages
  * home.hbs
  * result.hbs
* public
  * index.html
  * main.js
  * router.js
* src
  * app.js
  * router.js
  * reset.css
  * style.css
* index.html
* info.ver

## Dependencies
|Plugins|Version|
|:---|:---|
|**webpack**| v5.37.1|
|**webpack-cli**| v4.7.0|
|**webpack-dev-server**| v3.11.2|
|**html-webpack-plugin**| v5.3.1|
|**css-loader**| v5.2.6|
|**style-loader**| v2.0.0|
|**handlebars**| v4.7.7|
|**handlebars-loader**| v1.7.1|
|**clean-webpack-plugin**| v4.0.0-alpha.0|

## Problem Solving Strategies
### Gameplay
- 시작 버튼을 누르면 문제와 남은 시간, 점수가 보이게 하고 자동으로 input에 포커스가 가도록 설정
- 시작버튼은 playing이라는 변수를 선언하여, 값에 따라 시작/초기화 두가지의 역할을 할 수 있도록 분기처리
- 문제 항목은 추후 변동 가능성을 것을 고려하여, length를 활용해 문제의 최대 갯수와 시작 점수를 설정
- 타이머는 setInterval로 1초마다 실행하였고, 0이 되면 다음 문제로 이동
  - 다음 항목이 없는 상황에서 발생할 수 있는 오류는 nextQuestion 함수로 정의한 함수에서 분기 처리함
  - 시간이 0이 될 경우 score를 감점하고, qIdx(현재 인덱스)를 증가한 뒤 nextQuestion 함수로 다음문제로 이동시킴
- nextQuestion 함수에서는 현재 인덱스를 기준으로 두가지로 분기를 나눔
  - 현재 인덱스가 최대 문제 수를 넘지 않는 경우 : 해당 인덱스의 second와 text의 value를 불러옴
  - 현재 인덱스가 최대 문제 수와 같거나 넘는 경우 : 결과 페이지로 이동
- 입력 인풋은 정답 여부와 상관없이 엔터 입력시 마다 내용을 비우도록 설정
  - 정답일 경우 : 해당문제에서 남아있는 시간을 빼서, _clearTime 배열에 추가. finalScore에 마지막 점수 입력
  - 오답일 경우 : 감점 처리. 남아있는 점수가 0점이 될 경우 결과 페이지로 이동

### Result page
- 라우터 기능을 이용해 최종 점수와 평균 입력시간을 보여주는 결과페이지(/result)로 이동
- _clearTime에 저장된 값들의 평균을 구하고 averageTime에 저장 후 출력, _clearTime에 값이 없는 경우 0으로 출력 되도록 처리

## Review
### 어려웠던 점
- Unit test 진행을 위해 mocha와 jest를 시도해봤지만 해당 부분에 대한 경험이 없어서 적용하지 못함
- Unit test를 진행하지 못하여, Validation에 적합한 형태로 코드인지 구분이 어려움

### 개선할 부분
- handlebars를 이용한 라우팅은 Vanilla JS 만으로 라우팅을 구현할 수 있는 장점은 있었으나, 존재하지 않는 url로 접근 할 경우 에러가 발생
  > 해당 부분은 서버단에서 막아주어야 하는데, FE만으로 구축한 SPA에서 처리하기 용이한 다른 라우팅 방법 탐색필요
- Validation이 용이한 코드 작성 방법