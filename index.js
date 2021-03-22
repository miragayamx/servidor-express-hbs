const path = require('path');
const express = require('express');
var handlebars = require('express-handlebars');
const productRouter = require('./productRouter');
const vistaRouter = require('./vistaRouter');

const app = express();
const PORT = 8080;

app.engine(
	'hbs',
	handlebars({
		extname: 'hbs',
		defaultLayout: 'index',
		layoutsDir: path.join(__dirname, '/views/layouts'),
		partialsDir: path.join(__dirname, "/views/partials")
	})
);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/productos', vistaRouter);
app.use('/api', productRouter);


const server = app.listen(PORT, () => console.log(`El servidor esta corriendo en el puerto: ${server.address().port}`));

server.on('error', (err) => console.log(`Error de servidor: ${err}`));
