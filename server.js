const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();
let port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/${nomeApp}`));

/*app.use(express.static(`./${nomeApp}`));*/

app.listen(port);

console.log("caminho : " , `${__dirname}/${nomeApp}`);
console.log("caminho curto : " , `${nomeApp}`);
console.log("Porta : ", port);
console.log("novo caminho ",path.join(`${__dirname}/dist/index.html`));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: `dist/${nomeApp}`}),
);

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