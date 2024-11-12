const env = require('dotenv');
const siginIn = require('./routes/signIn');
const regiser = require('./routes/resgister');
const deleteUser = require('./routes/delete');
const savejob = require('./routes/saveJob')
const cors = require('cors')

const express = require('express');
const app = express();
env.config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.get('/', (req, res) => {
    res.send('Welcome to the career Hunt backend')
})

app.use('/signin', siginIn);
app.use('/register', regiser);
app.use('/delete', deleteUser);
app.use('/savejob', savejob)



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})