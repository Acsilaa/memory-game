async function delay(t) {  
    return new Promise(res => setTimeout(res, t));
}
let startTimeStamp = new Date().getTime();
let pairs = [];
let moves = 0;
function Contains(arr, inp){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == inp) return true;
    }
    return false;
}
function GenPairs(pairCount){
    let pc = pairCount;
    let arr = [];
    let used = [];
    for(let i = 0; i < pc; i++){
        let num = Math.floor(Math.random() * 9);
        while(Contains(used,num)){
            num = Math.floor(Math.random() * 9);
        }
        arr[arr.length] = num;
        arr[arr.length] = num;
        used[used.length] = num;
    }
    return arr;
}
pairs = GenPairs(8);

let GenDiv = (inp, index) => {
    return `<div class="option" id="index${index}" data-index="${index}" data-val="${inp}" onclick="Clicked(this)"><p>${inp}</p></div>`
}
$(function(){
    let used = [];
    let arr = [];
    for(let i = 0; i < pairs.length; i++){
        index = Math.floor(Math.random() * pairs.length);
        while(Contains(used, index)){
            index = Math.floor(Math.random() * pairs.length);
        }
        arr[i] = pairs[index];
        used[used.length] = index;
    }
    for(let i = 0; i < arr.length; i++){
        $(".main").append(GenDiv(arr[i], i));
    }
});
let guessedCount = 0;
let clicks = [];
let canClick = true;
async function Clicked(element){
    if(!canClick || Contains(element.classList, "guessed") || Contains(element.classList, "active")) return;
    let num = (element.innerHTML).slice(3,4);
    element.classList.add("active");
    clicks.push(element);

    if(clicks.length != 2) return;
    moves++;
    $("#moves").text(moves);
    let st = document.getElementsByClassName("option")[clicks[0].dataset.index].innerHTML.slice(3,4) * 1;
    let nd = document.getElementsByClassName("option")[clicks[1].dataset.index].innerHTML.slice(3,4) * 1;
    
    if(st != nd){
        canClick = false;
        await delay(500);
        for(let i = 0; i < 2; i++){
            document.getElementsByClassName("option")[clicks[i].dataset.index].classList.remove("active");
        }
    }else{
        guessedCount += 2;
        for(let i = 0; i < 2; i++){
            document.getElementsByClassName("option")[clicks[i].dataset.index].classList.add("guessed");
        }
    }

    canClick = true;
    clicks = [];
    
}

async function DisplayTime(){
    let deltaTimeSeconds = Math.floor((new Date().getTime() - startTimeStamp) / 1000);
    let mins = Math.floor(deltaTimeSeconds / 60);
    let seconds = deltaTimeSeconds % 60;
    let time = ((mins + "").length == 1 ? "0" + mins : mins + "") + ":" + ((seconds + "").length == 1 ? "0" + seconds : seconds + "");
    $('#time').text(time);
    await delay(1000);
    if(guessedCount == pairs.length) return;
    DisplayTime();
}
DisplayTime();