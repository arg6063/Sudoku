const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (conn) => {
    // Listen for messages from the client
    conn.on('message', (message) => {
        console.log('Received:', message);
    });

    // Send the game start message
    const startGame = () => {
        const seed = generateRandomSeed();
        const difficulty = 'easy';
        const puzzle = generateBoardFromSeed(seed, difficulty);
        const solution = generateCompleteSudoku();
        
        const gameStartData = {
            type: 'start-match',
            puzzle: puzzle,
            solution: solution,
            startTime: Date.now() // Host's start time for timer sync
        };
        conn.send(JSON.stringify(gameStartData));
    };

    // When a player connects, start the game
    startGame();
});
