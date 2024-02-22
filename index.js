const express = require('express')
const nunjucks = require('nunjucks')
// Import JSON dataset
const data = require("./data.json")
const app = express()
const port = 3000   

// Tell nunjucks where your template files are located (e.g., 'views' directory)
nunjucks.configure('views', {
    autoescape: true,
    noCache: true, // <-- Should only be true when developing
    express: app
});

// Endpoint for /characters shows all characters
app.get('/characters', function (req, res) {
    res.render('characters.njk', { 
        title: "Rick and Morty", 
        data: data.results
    });
});

// Endpoint for /characters/:id shows details for ONE characer
app.get('/character/:id', function(req, res) {
    const id = req.params.id;
    const character = data.results.find(char => char.id == id);
    res.render('character.njk', { character: character });
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})