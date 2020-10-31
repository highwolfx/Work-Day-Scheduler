var currentTime;
var currentDate;
var currentHour;

function time() {
    currentDate = dayjs().format('dddd, DD MMMM YYYY');
    currentTime = dayjs().format('hh:mm:ss A')
    $("#current-time").text(currentTime).css("font-weight", "bold");
    $("#current-date").text(currentDate).css("font-weight", "bold");
    timeCheck();
}
setInterval(time,1000);

function timeCheck() {
    currentHour = dayjs().hour();
    for (var i=8; i<18; i++){
        $(`[data-time=${i}]`).parent().css("background-color", "#77dd77");
    };
    for (var i=8; i<currentHour; i++){
        $(`[data-time=${i}]`).parent().css("background-color", "#CFCFCF");
    };
    $(`[data-time=${currentHour}]`).parent().css("background-color", "#ff6961");
}

function saveTask(){
    var saveTime = $(this).parent().siblings(0).attr("data-time");
    var savedTask = $(`#${saveTime}-task`).val().trim();
    if (savedTask === ""){
        alert("Please enter a task into the empty field!");
    } else{
        localStorage.setItem(`task${saveTime}`, savedTask);
    }
    var suffix = localStorage.getItem(`task${saveTime}`);
    console.log(suffix);
}

function loadTask(){
    for (var i=8; i<18; i++) {
    var loadTask = localStorage.getItem(`task${i}`);
    $(`#${i}-task`).val(loadTask);
    }
}

loadTask();
$(document).ready()
$(".save-button").click(saveTask);