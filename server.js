const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Path to the file that stores the visitor count
const countFilePath = path.join(__dirname, 'visitorCount.txt');

// Initialize visitor count
let visitorCount = 0;

// Load the visitor count from the file if it exists
if (fs.existsSync(countFilePath)) {
    visitorCount = parseInt(fs.readFileSync(countFilePath, 'utf8'), 10);
}

// API endpoint to get and increment visitor count
app.get('/api/visitor-count', (req, res) => {
    visitorCount++;
    fs.writeFileSync(countFilePath, visitorCount.toString());
    res.json({ count: visitorCount });
});

// Serve static files (your HTML, CSS, JS)
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
