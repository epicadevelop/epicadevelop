const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();

/*app.use(express.static(`${__dirname}/${nomeApp}`));*/
app.use(express.static(`app/src/${nomeApp}`));

console.log("caminho : " , `${__dirname}/${nomeApp}`);
console.log("caminho curto : " , `${nomeApp}`);
console.log("Porta : ", process.env.PORT);
console.log("novo caminho ",path.join(`app/dist/index.html`));

app.get('/*', (req, res) => {
/*res.sendFile(path.join(`${__dirname}/${nomeApp}/index.html`));*/
res.sendFile(path.join(`app/dist/index.html`));

});

app.listen(process.env.PORT);

/*

app.listen(process.env.PORT || 8080);
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/app-heroku'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/app-heroku/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
*/