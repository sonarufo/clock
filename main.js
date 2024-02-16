document.addEventListener("DOMContentLoaded", function() {
  var periods = [
     { start: "07:49:00", end: "07:59:00", name: "intermisson" },
    { start: "08:00:00", end: "08:51:00", name: "Period 1" },
    { start: "08:53:00", end: "09:48:00", name: "Period 2" },
    { start: "09:50:00", end: "10:45:00", name: "Period 3" },
    { start: "10:47:00", end: "11:42:00", name: "Period 4" },
    { start: "11:44:00", end: "12:32:00", name: "Period 5" },
    
   
    { start: "12:59:00", end: "13:54:00", name: "Period 6" },
    { start: "13:56:00", end: "14:40:00", name: "Period 7" }
  ];

  function getCurrentPeriod() {
    var currentTime = new Date();
    var currentHour = currentTime.getHours();
    var currentMinute = currentTime.getMinutes();
    var currentSecond = currentTime.getSeconds();
    var currentPeriod = "School is not in session at the moment";
    var secondsRemaining = 0;

    periods.forEach(function(period) {
      var start = period.start.split(":");
      var end = period.end.split(":");
      var startHour = parseInt(start[0]);
      var startMinute = parseInt(start[1]);
      var startSecond = parseInt(start[2]);
      var endHour = parseInt(end[0]);
      var endMinute = parseInt(end[1]);
      var endSecond = parseInt(end[2]);

      if (
        currentHour > startHour &&
        currentHour < endHour ||
        (currentHour === startHour &&
          currentMinute >= startMinute) ||
        (currentHour === endHour && currentMinute <= endMinute)
      ) {
        currentPeriod = period.name;
        secondsRemaining = (endHour - currentHour) * 3600 + (endMinute - currentMinute) * 60 + (endSecond - currentSecond);
      }
    });

    return { period: currentPeriod, secondsRemaining: secondsRemaining };
  }

  function updateCurrentPeriod() {
    var currentData = getCurrentPeriod();
    var h1 = document.getElementById("current-period");
    var timer = document.getElementById("remaining-time");

    if (h1) {
      h1.textContent = currentData.period;
    }
    if (timer) {
      timer.textContent = currentData.secondsRemaining > 0 ? "Time remaining: " + formatTime(currentData.secondsRemaining) : "";
    }
  }

  function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var secs = seconds % 60;
    return hours + " hours " + minutes + " minutes " + secs + " seconds";
  }

  updateCurrentPeriod();
  setInterval(updateCurrentPeriod, 1000);
});
