<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exam Countdown Reminder</title>
    <style>
        body {
            text-align: center;
            font-family: Arial, sans-serif;
            margin-top: 50px;
        }
        #countdown {
            font-size: 24px;
            margin-top: 20px;
            font-weight: bold;
        }
        #motivation {
            margin-top: 20px;
            font-size: 20px;
            font-style: italic;
            color: #007BFF;
        }
        button {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }
    </style>
</head>
<body>

    <h1>📅 Exam Countdown Reminder</h1>

    <label for="examDateInput">Select Exam Date:</label>
    <input type="date" id="examDateInput">
    
    <label for="examTimeInput">Select Exam Time:</label>
    <input type="time" id="examTimeInput">
    
    <button onclick="startCountdown()">Start Countdown</button>

    <div id="countdown">⏳ Countdown will appear here...</div>
    <div id="motivation"></div>

    <audio id="motivationAudio">
        <source src="motivation.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>

    <script>
        const countdownElement = document.getElementById('countdown');
        const motivationElement = document.getElementById('motivation');
        const motivationAudio = document.getElementById('motivationAudio');

        let examDate;
        let interval;

        const motivationalQuotes = [
            "📖 Stay focused, stay determined! You got this! 💪",
            "⏳ Every second counts. Keep pushing forward! 🚀",
            "📝 Success is the sum of small efforts, repeated daily! 🔥",
            "💡 Your hard work will pay off. Believe in yourself! ⭐",
            "🏆 One step closer to your goal. Stay strong! 💯",
            "📚 Knowledge is power. Keep studying, you're doing great! 🎯",
            "🌟 Mistakes are proof that you are trying. Keep going! 🎓",
            "🔥 You are capable of amazing things. Give it your best! 💡",
            "💪 Difficult roads lead to beautiful destinations. Keep moving! 🏁"
        ];

        function startCountdown() {
            const dateInput = document.getElementById('examDateInput').value;
            const timeInput = document.getElementById('examTimeInput').value;

            if (!dateInput || !timeInput) {
                countdownElement.innerHTML = "⚠️ Please enter a valid date and time!";
                return;
            }

            examDate = new Date(`${dateInput}T${timeInput}:00`);

            clearInterval(interval);
            updateCountdown();
            interval = setInterval(updateCountdown, 1000);
        }

        function updateCountdown() {
            const now = new Date();
            const timeRemaining = examDate - now;

            if (timeRemaining > 0) {
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
                const seconds = Math.floor((timeRemaining / 1000) % 60);

                countdownElement.innerHTML = 
                    `${days} Days <br>` +
                    `${hours} Hours <br>` +
                    `${minutes} Minutes <br>` +
                    `${seconds} Seconds`;

                if (seconds === 10) {
                    motivationElement.innerHTML = getRandomQuote();
                    playMotivationAudio();
                }
            } else {
                countdownElement.innerHTML = "🎉 Exam Time! Best of Luck!";
                motivationElement.innerHTML = "🔥 You’re ready! Believe in yourself!";
                clearInterval(interval);
                playMotivationAudio();
                setTimeout(() => motivationElement.innerHTML = "", 12000);
            }
        }

        function getRandomQuote() {
            return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        }

        function playMotivationAudio() {
            motivationAudio.currentTime = 0;
            motivationAudio.play().catch(error => console.log("Audio playback failed:", error));
        }
    </script>

</body>
</html>
