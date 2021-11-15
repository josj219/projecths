import "regenerator-runtime/runtime";

const reviewMixin = document.querySelector(".review-mixin");
const BangStars = document.getElementById("bang_star");
const JoStars = document.getElementById("jo_star");

const ratingStar = () => {
    const bangscoreText = document.getElementById("bang_score").innerHTML;
    const joscoreText = document.getElementById("jo_score").innerHTML;

    var bangscore = parseFloat(bangscoreText);  
    var joscore = parseFloat(joscoreText);  

    console.log(bangscore);

    const bang_star = BangStars.querySelectorAll("i");
    const jo_star = JoStars.querySelectorAll("i");


    for (var i = 0; i <= bangscore-1; i++) { 
        bang_star[i].classList.replace("far","fas");
        if(i+1 >= bangscore-1){
            if(0.5<=bangscore-1-i&&bangscore-1-i<1){
                bang_star[i+1].classList.replace("far","fas");
                bang_star[i+1].classList.replace("fa-star","fa-star-half-alt");
            }
        }
      }

      for (var i = 0; i <= joscore-1; i++) { 
        jo_star[i].classList.replace("far","fas");
        if(i+1 >= joscore-1){
            if(0.5<=joscore-1-i&&joscore-1-i<1){
                jo_star[i+1].classList.replace("far","fas");
                jo_star[i+1].classList.replace("fa-star","fa-star-half-alt");
            }
        }
      }

    // fas.fa-star

    // fas.fa-star-half-alt



}



ratingStar();








