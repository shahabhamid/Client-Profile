
function getNormalDate(inputDate) {
    return inputDate.substr(8, 2) + "-" + inputDate.substr(5, 2) + "-" + inputDate.substr(0, 4);
}

function getInputDate(inputDate) {
    return inputDate.substr(6, 4) + "-" + inputDate.substr(3, 2) + "-" + inputDate.substr(0, 2);
}

function getTodayTime() {
    return returnTime(getFormattedDate())
}//return newDate().getTime() //not giving exact value
function returnDate(date) {
    if (typeof date !== "undefined") {
        return (new Date(date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")))
    }
    return false
}
function returnTime(date) {
    if (typeof date !== "undefined") {
        return (new Date(date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))).getTime()
    }
    return false
}
function getFormattedDate() {
    let today = new Date();
    const date = today.getDate();
    const month = String(parseInt(today.getMonth()) + 1);
    const year = today.getFullYear();
    return (date < 10 && "0") + date + "-" + (month < 10 && "0") + month + "-" + year;
}


export { getNormalDate, getInputDate, getTodayTime, returnDate, returnTime, getFormattedDate }