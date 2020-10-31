// Declare variables
var currentTime;
var currentDate;
var currentHour;


// Keeps clock updated with dayjs
function time() {
    currentDate = dayjs().format('dddd, DD MMMM YYYY');
    currentTime = dayjs().format('hh:mm:ss A')
    $("#current-time").text(currentTime).css("font-weight", "bold");
    $("#current-date").text(currentDate).css("font-weight", "bold");
    timeCheck();
}
setInterval(time,1000);


// Checks for what time it is and which box needs to be what color
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


// Saves task to localstorage when save button has been hit
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


// Loads saved tasks on page startup
function loadTask(){
    for (var i=8; i<18; i++) {
    var loadTask = localStorage.getItem(`task${i}`);
    $(`#${i}-task`).val(loadTask);
    }
}
loadTask();


// Event listener for save button
$(".save-button").click(saveTask);