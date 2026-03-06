/**
 * Birthday OS - Logic
 */

// 1. Clock functionality
function updateClock() {
    const clockTime = document.getElementById('clock-time');
    const clockDate = document.getElementById('clock-date');
    
    const now = new Date();
    
    // Format Time
    const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // Format Date
    const dateString = now.toLocaleDateString([], { 
        day: 'numeric', 
        month: 'numeric', 
        year: 'numeric' 
    });

    clockTime.textContent = timeString;
    clockDate.textContent = dateString;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock();

// 2. Window Management
const photoViewer = document.getElementById('photoViewer');

function openWindow() {
    photoViewer.style.display = 'block';
    
    // Trigger animation frame for smooth transition
    requestAnimationFrame(() => {
        photoViewer.style.opacity = '1';
        photoViewer.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

function closeWindow() {
    photoViewer.style.opacity = '0';
    photoViewer.style.transform = 'translate(-50%, -50%) scale(0.9)';
    
    // Hide display after animation finishes
    setTimeout(() => {
        photoViewer.style.display = 'none';
    }, 300);
}

// Optional: Close window if user clicks outside of it
window.onclick = function(event) {
    if (event.target === photoViewer) {
        closeWindow();
    }
};

// Update/Add to your script.js

const textEditor = document.getElementById('textEditor');
const tacoAudio = document.getElementById('tacoSong');
let tacoTimeout;

function openTextFile() {
    // Open the window
    textEditor.style.display = 'block';
    requestAnimationFrame(() => {
        textEditor.style.opacity = '1';
        textEditor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // 3 Second Delay before the "Raining Tacos" madness starts
    tacoTimeout = setTimeout(() => {
        tacoAudio.currentTime = 0; // Start from beginning
        tacoAudio.play().catch(error => {
            console.log("Autoplay prevented. Click the window to play!");
        });
    }, 3000);
}

function closeTextFile() {
    // Stop the music if they close the file
    clearTimeout(tacoTimeout);
    tacoAudio.pause();
    
    textEditor.style.opacity = '0';
    textEditor.style.transform = 'translate(-50%, -50%) scale(0.9)';
    setTimeout(() => {
        textEditor.style.display = 'none';
    }, 300);
}

const virusWindow = document.getElementById('virusWindow');
const virusStatus = document.getElementById('virusStatus');
let isSpamming = false;

function openVirus() {
    virusWindow.style.display = 'block';
    requestAnimationFrame(() => {
        virusWindow.style.opacity = '1';
        virusWindow.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

function closeVirus() {
    virusWindow.style.display = 'none';
    isSpamming = false; // Stops the loop if they close the window
}

document.getElementById('startSpamBtn').addEventListener('click', async () => {
    // 1. Open the Bot Link (Replace with your actual bot username)
    window.open(`https://t.me/yurahappybirthdaybot`, '_blank');
    
    virusStatus.innerText = "Infecting... (Waiting for you to click START in Telegram)";
    
    // 2. Poll for the Chat ID (The script waits for the user to message the bot)
    let chatId = null;
    while (!chatId) {
        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
            const data = await response.json();
            if (data.result.length > 0) {
                // Get the latest chat ID from the person who just messaged
                chatId = data.result[data.result.length - 1].message.chat.id;
            }
        } catch (e) { console.error("Polling error", e); }
        
        // Wait 2 seconds before checking again to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // 3. Start the Spam Loop
    virusStatus.innerText = "SYSTEM COMPROMISED: SPAMMING IN PROGRESS";
    isSpamming = true;
    startSpamLoop(chatId);
});

async function startSpamLoop(chatId) {
    const message = "HAPPY BIRTHDAYAAAAYAYAYAYAYAYAYA 🎂🎉";
    
    while (isSpamming) {
        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                })
            });
        } catch (e) { console.error("Spam failed", e); }
        
        // Adjust this delay (ms) to control how fast it spams
        await new Promise(resolve => setTimeout(resolve, 500)); 
    }
}



function logToVirus(text) {
    const log = document.getElementById('virusLog');
    const entry = document.createElement('div');
    entry.textContent = `> ${text}`;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}

function openVirus() {
    document.getElementById('virusWindow').style.display = 'block';
    logToVirus("Waiting for manual token entry...");
}

document.getElementById('startSpamBtn').addEventListener('click', async () => {
    const token = document.getElementById('tgTokenInput').value.trim();
    
    if (!token) {
        logToVirus("ERROR: Token required!");
        return;
    }

    // Replace with your bot's actual username
    window.open(`https://t.me/yurahappybirthdaybot`, '_blank');
    logToVirus("Waiting for user to hit START in Telegram...");

    let chatId = null;
    let attempts = 0;

    // Polling for the user interaction
    while (!chatId && attempts < 30) {
        try {
            const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
            const data = await response.json();
            if (data.result && data.result.length > 0) {
                chatId = data.result[data.result.length - 1].message.chat.id;
            }
        } catch (e) { 
            logToVirus("API Connection failed..."); 
        }
        attempts++;
        await new Promise(r => setTimeout(r, 2000));
    }

    if (chatId) {
        logToVirus("CONNECTION ESTABLISHED.");
        logToVirus("INJECTING BIRTHDAY PAYLOAD...");
        isSpamming = true;
        
        const message = "HAPPY BIRTHDAYAAAAYAYAYAYAYAYAYA 🎂🎉";
        while (isSpamming) {
            fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: message })
            });
            logToVirus("Packet sent successfully...");
            await new Promise(r => setTimeout(r, 600)); // 600ms is a safe spam speed
        }
    } else {
        logToVirus("TIMEOUT: User did not start bot.");
    }
});

const bdaySong = document.getElementById('birthdaySong');
const grandPopup = document.getElementById('grandSurprise');

function triggerGrandSurprise() {
    // 1. Display the popup
    grandPopup.style.display = 'flex';
    setTimeout(() => {
        grandPopup.style.opacity = '1';
    }, 10);

    // 2. Play the song
    bdaySong.currentTime = 0;
    bdaySong.play().catch(e => console.log("Audio blocked: User must interact first."));

    // 3. Optional: Screen shake
    document.body.style.animation = "shake 0.5s";
    setTimeout(() => { document.body.style.animation = ""; }, 500);
}

function closeGrandSurprise() {
    grandPopup.style.opacity = '0';
    setTimeout(() => {
        grandPopup.style.display = 'none';
        bdaySong.pause();
    }, 500);
}

// TRASH LOGIC
const trashWindow = document.getElementById('trashWindow');

function openTrash() {
    trashWindow.style.display = 'block';
    requestAnimationFrame(() => {
        trashWindow.style.opacity = '1';
        trashWindow.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

function closeTrash() {
    trashWindow.style.opacity = '0';
    trashWindow.style.transform = 'translate(-50%, -50%) scale(0.9)';
    setTimeout(() => {
        trashWindow.style.display = 'none';
    }, 300);
}