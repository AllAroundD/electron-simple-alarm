var alarms = []
const notifier = require("node-notifier")
const {v4} = require("uuid")

setInterval(() => {
    const currentTime = document.getElementById("currentTime")
    let time = new Date()
    currentTime.innerHTML = time.toLocaleTimeString()
    alarms.forEach((alarm) => {
        if(alarm.hour == time.getHours() && alarm.min == time.getMinutes()){
            // notification
            notifier.notify(alarm.message)
            // remove the alarm
            alarms = alarms.filter((a) => alarm.id !== a.id)
            showAlarms()
        }
    })
}, 1000)

const showAlarms = () => {
    let alarmContainer = document.getElementById("alarmContainer")
    alarmContainer.innerHTML = ""
    alarms.forEach((alarm) => {
    alarmContainer.innerHTML += `<div class="alarm">${alarm.message} - ${alarm.hour}:${alarm.min} <button class="deleteBtn" onclick="alarms = alarms.filter((a) => a.id !== '${alarm.id}'); showAlarms();">X</button></div>`;    })
}

const addAlarmBtn = document.getElementById("addAlarm")
addAlarmBtn.addEventListener("click", () => {
    const timeBox = document.getElementById("time")
    const messageBox = document.getElementById("message")

    if(timeBox.value == "" || messageBox.value == ""){
        return alert("You must fill time and message")
    }

    const timeSplit = timeBox.value.split(":")
    alarms.push({
        id: v4(),
        hour: timeSplit[0],
        min: timeSplit[1],
        message: messageBox.value
    })
    showAlarms()
})