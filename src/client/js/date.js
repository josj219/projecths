const dayContainer = document.querySelector(".day-count");
const dateNumber = document.querySelectorAll(".number");

function getDday() {
  const ourday = new Date("November 5, 2020 0:00:00");
  const date = new Date();
  const dday = date.getTime() - ourday.getTime();
  const result = Math.abs(Math.ceil(dday / (1000 * 60 * 60 * 24)));
  console.log(result);
  dayContainer.innerText = `${result}`;
}

function today() {
  var now = new Date();
  var date = now.getDate(); // 일

  dateNumber[date].classList.add("active");
  //여기에 일요일부터 1일이 시작하면 date-1 이 기본임
  //거기에 월요일부터 시작하면+1, 화요일부터 시작하면 +2 해서 그 결과값을 [] 안에 넣으면 된다.
}

function calendar() {
  var now = new Date();
  var month = now.getMonth();
  month = month + 1;

  //console.log(dateThirtyOne);

  console.log(month);
  if (month == "2") {
    dateNumber[28].classList.add("removeDay");
    dateNumber[29].classList.add("removeDay");
    dateNumber[30].classList.add("removeDay");
  }
  if (month == "4" || month == "6" || month == "9" || month == "11") {
    dateNumber[30].classList.add("removeDay");
  }
}

getDday();
today();
calendar();
