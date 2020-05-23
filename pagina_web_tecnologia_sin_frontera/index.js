const express = require('express');
const path = require('path');
const app = express();
const favicon = require('serve-favicon');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3002);
app.listen(app.get('port'), () => {
    console.log('servidor en puerto', app.get('port'));
});