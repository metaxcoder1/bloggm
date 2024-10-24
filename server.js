const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public'

// Endpoint to add a movie
app.post('/add-movie', (req, res) => {
    const newMovie = req.body;

    // Read existing movies from the JSON file
    fs.readFile('./content/movies.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read movies file.' });
        }

        let movies = [];
        try {
            movies = JSON.parse(data); // Parse the existing JSON
        } catch (e) {
            return res.status(500).json({ error: 'Failed to parse movies file.' });
        }

        movies.push(newMovie); // Add the new movie to the array

        // Write the updated array back to the JSON file
        fs.writeFile('./content/movies.json', JSON.stringify(movies, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write to movies file.' });
            }
            res.json(newMovie); // Respond with the new movie data
        });
    });
});

// Serve the main index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Fixed line
});