let timer;
let isRunning = false;
let minutes = 25;
let seconds = 0;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const tasksDiv = document.getElementById("tasks");
const notificationDiv = document.getElementById("notification");
const timerDurationSelect = document.getElementById("timerDuration");
const setDurationButton = document.getElementById("setDuration");

function startTimer() {
  if (!isRunning) {
    timer = setInterval(updateTimer, 1000);
    isRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    taskInput.disabled = true;
    timerDurationSelect.disabled = true;
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
  taskInput.disabled = false;
  timerDurationSelect.disabled = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = false;
  taskInput.disabled = false;
  timerDurationSelect.disabled = false;
  minutes = parseInt(document.getElementById("timerDuration").value); // Updated this line
  seconds = 0;
  updateTimerDisplay();
}

function updateTimer() {
  if (minutes === 0 && seconds === 0) {
    clearInterval(timer);
    isRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    taskInput.disabled = false;
    timerDurationSelect.disabled = false;
  } else if (seconds === 0) {
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }
  updateTimerDisplay();
}

function updateTimerDisplay() {
  minutesDisplay.textContent = minutes < 10 ? "0" + minutes : minutes;
  secondsDisplay.textContent = seconds < 10 ? "0" + seconds : seconds;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const label = document.createElement("label");
    label.textContent = taskText;

    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        label.classList.add("completed-task");
      } else {
        label.classList.remove("completed-task");
      }
    });

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(label);
    tasksDiv.appendChild(taskDiv);
    taskInput.value = "";
    notify("Task added: " + taskText);
  }
}

// Event listeners for buttons
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
addTaskButton.addEventListener("click", addTask);

const customDurationInput = document.getElementById("customTimerDuration");
const setCustomDurationButton = document.getElementById("setCustomDuration");

function setCustomDuration() {
  const customDuration = parseInt(customDurationInput.value);
  if (!isNaN(customDuration) && customDuration >= 1) {
    minutes = customDuration;
    seconds = 0;
    updateTimerDisplay();
    notify("Timer duration set to " + minutes + " minutes.");
  } else {
    alert(
      "Please enter a valid positive number for the custom timer duration."
    );
  }
}

setCustomDurationButton.addEventListener("click", setCustomDuration);

const toggleSettingsButton = document.getElementById("toggleSettings");
const timerSettingsSection = document.querySelector(".timer-settings");

function toggleTimerSettings() {
  if (
    timerSettingsSection.style.display === "none" ||
    timerSettingsSection.style.display === ""
  ) {
    timerSettingsSection.style.display = "block";
  } else {
    timerSettingsSection.style.display = "none";
  }
}

toggleSettingsButton.addEventListener("click", toggleTimerSettings);
