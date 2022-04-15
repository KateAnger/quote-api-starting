const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

//have to change to 4002 - already using 4001
const PORT = process.env.PORT || 4002;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


app.get('/api/quotes/random', (req, res, next) => {
    res.send(getRandomElement(quotes));
})

// app.get('/api/quotes/:person', (req, res, next) => {
//     const person = req.params.person;
//     const returnArray = quotes.filter((quote) => {
//         return quote.person === person;
//     })

//     res.send(returnArray);

// })

app.get('/api/quotes', (req, res, next) => {
    const person = req.query.person;
    if (person) {
        const returnArray = quotes.filter((quote) => {
            return quote.person === person;
        })
        res.send(returnArray);
    } else {
        res.send(quotes);
    }
})
