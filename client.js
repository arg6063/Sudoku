const conn = new WebSocket('ws://localhost:8080'); // Connect to the host server

conn.on('open', () => {
    console.log('Connected to host');
});

conn.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'start-match') {
        const { puzzle, solution, startTime } = data;

        // Render the puzzle (use your render function here)
        renderBoard(puzzle, solution);

        // Synchronize the timer with the host's start time
        const hostStartTime = startTime;
        const currentTime = Date.now(); // Player's current time
        const timeDifference = currentTime - hostStartTime; // Calculate difference

        // Start the timer for the player
        secondsElapsed = Math.floor(timeDifference / 1000); // Time in seconds
        startTimer(); // Call your function to start the timer
    }

    if (data.type === 'start-timer') {
        // Sync the timer with the host's time if needed
        secondsElapsed = data.time; // Update with the host's time
        startTimer(); // Start the player's timer
    }
});

// Function to render the puzzle
function renderBoard(puzzle, solution) {
    // Implement the logic to display the puzzle to the player
}

// Function to start the timer
function startTimer() {
    // Implement the timer logic here
}
