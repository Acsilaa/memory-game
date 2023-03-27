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

let GenDiv = (i) => {
    return `<div class="option" onclick="Clicked(this)"><p>${i}</p></div>`
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
        $(".main").append(GenDiv(arr[i]));
    }
});

let clicks = [];
function Clicked(element){
    
}

async function DisplayTime(){
    let deltaTimeSeconds = Math.floor((new Date().getTime() - startTimeStamp) / 1000);
    let mins = Math.floor(deltaTimeSeconds / 60);
    let seconds = deltaTimeSeconds % 60;
    let time = ((mins + "").length == 1 ? "0" + mins : mins + "") + ":" + ((seconds + "").length == 1 ? "0" + seconds : seconds + "");
    $('#time').text(time);
    console.log(time);
    await delay(1000);
    DisplayTime();
}
DisplayTime();