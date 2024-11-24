const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Define the add endpoint
app.get('/add', (req, res) => {
    const { num1, num2 } = req.body

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Please enter numbers' })
    }

    const result = num1 + num2
    res.json({ result })
});

app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Please enter numbers' })
    }

    let result
    switch (operation) {
        case 'add':
            result = num1 + num2
            break
        case 'subtract':
            result = num1 - num2
            break
        case 'multiply':
            result = num1 * num2
            break
        case 'divide':
            if (num2 === 0) {
                return res.status(400).json({ error: 'Divide zero is invalid' });
            }
            result = num1 / num2;
            break
        default:
            return res.status(400).json({ error: 'Please chose an operation' });
    }

    res.json({ result });
})
// Start the server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})
