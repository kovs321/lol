const launchButton = document.getElementById("launchButton");
const aiPage = document.querySelector(".ai-page");
const callScreen = document.getElementById("callScreen");
const alertPage = document.getElementById("alertPage"); // Updated to match HTML
const callImage = document.getElementById("callImage");
const answerCallButton = document.getElementById("answerCall");
const buzzSound = document.getElementById("buzzSound");
const callAudio = document.getElementById("callAudio");
const timerElement = document.getElementById("timer");
const alarmSound = document.getElementById("alarmSound");

// Launch Button Logic
launchButton.addEventListener("click", () => {
  aiPage.classList.add("hidden");
  callScreen.classList.remove("hidden");
  buzzSound.play();
  console.log("Incoming call screen displayed, buzz sound playing...");
});

answerCallButton.addEventListener("click", () => {
  // Stop buzzing sound
  buzzSound.pause();
  buzzSound.currentTime = 0;
  console.log("Answer button clicked, buzz sound stopped.");

  // Change to answered call image and hide the button
  callImage.src = "call-answered.jpg";
  answerCallButton.classList.add("hidden");
  console.log("Changed to answered call UI.");

  // Play talking audio
  callAudio.play();
  console.log("Talking audio started.");

  // Transition to the alarm page when talking audio ends
  callAudio.addEventListener("ended", () => {
    console.log("Talking audio ended, transitioning to alarm page...");
    transitionToAlarm();
  });

  // Fallback: Transition after a set timeout (e.g., the duration of the audio)
  setTimeout(() => {
    if (!alertPage.classList.contains("hidden")) return; // Prevent double transition
    console.log("Fallback timeout triggered, transitioning to alarm page...");
    transitionToAlarm();
  }, 5000); // Adjust timeout to the length of your talking.mp3
});

function transitionToAlarm() {
  // Ensure clean transitions between screens
  console.log("Transitioning to alarm screen...");
  callScreen.classList.add("hidden"); // Hide the call screen
  alertPage.classList.remove("hidden"); // Show the alarm page

  // Check if the screen actually changes
  console.log("Call screen classes:", callScreen.classList);
  console.log("Alert screen classes:", alertPage.classList);

  // Play alarm sound
  try {
    alarmSound.volume = 0.05;
    alarmSound.play();
    console.log("Alarm sound playing...");
  } catch (error) {
    console.error("Error playing alarm sound:", error);
  }

  // Start the timer
  startTimer(300); // 5 minutes
}

// Timer Countdown
function startTimer(duration) {
  let timer = duration, minutes, seconds;
  setInterval(() => {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timerElement.textContent = `🫵😂 You have ${minutes}:${seconds} until you officially become Iman Scamdzhi! 🫵😂`;
    if (--timer < 0) {
      timerElement.textContent = "You're a SCAMMER!";
    }
  }, 1000);
}

// Copy Address Functionality
function copyAddress() {
  const address = "At6fSYRoCEcDzJc9Yq2V5AxxAuTUH19TCk38GcS6fpUx";
  navigator.clipboard.writeText(address).then(() => {
    alert("Address copied!");
  });
}
