const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

//have to change to 4002 - already using 4001
const PORT = process.env.PORT || 4002;


app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes)
    res.send({ quote: randomQuote });
})

app.get('/api/quotes', (req, res, next) => {
    const person = req.query.person;
    if (person) {
        const returnArray = quotes.filter((quote) => {
            return quote.person === person;
        })
        if (returnArray.length > 0) {
            res.send({ quotes: returnArray });
        } else {
            res.send([]);
        }
    } else {
        res.send({ quotes: quotes });
    }
})

app.post('/api/quotes', (req, res, next) => {
    const person = req.query.person;
    const quote = req.query.quote;

    if (quote && person) {
        const newQuote = { quote: { quote: quote, person: person } }
        quotes.push(newQuote.quote)

        res.send(newQuote)
    } else {
        res.status(400).send;
    }
})
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
