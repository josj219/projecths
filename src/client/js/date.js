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

  dateNumber[date - 1].classList.add("active");
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
