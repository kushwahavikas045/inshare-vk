const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
connectDB();
const PORT = process.env.PORT || 5000;
app.use(express.json()); 
app.use(express.static('public'));
const cors = require('cors');
app.use(cors())
//define routes
app.use('/api/files',  require('./routes/file'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));
app.use('/api/files', require('./routes/file'));

//templates engines

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})
