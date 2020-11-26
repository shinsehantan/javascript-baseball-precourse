import { makeRandomNumber, checkInput } from "./ballManager.js";

const result = document.getElementById("result");
const button = document.getElementById("submit");
const input = document.getElementById("user-input");

let randomNumber = makeRandomNumber();
let game = new BaseballGame();

export default function BaseballGame() {
  this.play = function (computerInputNumbers, userInputNumbers) {
    console.log(computerInputNumbers, userInputNumbers);

    //컴퓨터, 사용자 숫자 비교
    let strike = 0;
    let ball = 0;

    for (let i = 0; i <= 2; i++) {
      if (computerInputNumbers[i] === userInputNumbers[i]) {
        strike += 1;
      } else if (computerInputNumbers.includes(userInputNumbers[i]) === true) {
        ball += 1;
      }
    }

    //결과창
    if (strike === 3) {
      return "3스트라이크";
    } else if (strike + ball === 0) {
      return "낫싱";
    } else if ((strike >= 1) & (ball >= 1)) {
      return `${ball}볼 ${strike}스트라이크`;
    } else if ((strike === 0) & (ball >= 1)) {
      return `${ball}볼`;
    } else if ((strike >= 1) & (ball === 0)) {
      return `${strike}스트라이크`;
    }
    console.log("ball", ball, "strike", strike);
  };
}

//버튼 이벤트 리스너 함수 호출
button.addEventListener("click", onClickHandler);

//온클릭핸들러 함수
const onClickHandler = function (event) {
  event.preventDefault();
  let inputValue = [...input.value].map(Number);

  if (checkInput(input.value)) {
    const hint = game.play(randomNumber, inputValue);

    result.innerText = hint;
    input.focus();

    if (hint === "3스트라이크") {
      result.innerText = "🎉 정답을 맞추셨습니다! 🎉";

      //다 맞출 경우 게임 재시작
      const restart = document.createElement("div");
      const restartBtn = document.createElement("button");

      result.append(restart);
      restart.innerText = "게임을 새로 시작하시겠습니까?";
      restartBtn.innerHTML = "게임 재시작";
      restart.append(restartBtn);

      console.log(result);
      restartBtn.addEventListener("click", onClickRestartHandler);
    }
  }
};

//재시작 함수
const onClickRestartHandler = function (event) {
  randomNumber = makeRandomNumber();
  input.value = "";
  input.focus();
  result.innerHTML = "";
};
