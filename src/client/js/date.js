const dayContainer = document.querySelector(".day-count");

function getDday(){
    const ourday = new Date("November 5, 2020 0:00:00");
    const date = new Date();
    const dday = date.getTime() - ourday.getTime();
    const result = Math.abs(Math.ceil(dday/(1000*60*60*24)));
    console.log(result);
    dayContainer.innerText = `${result}`;
}

getDday();