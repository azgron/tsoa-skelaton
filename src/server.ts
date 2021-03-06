import './app/account/accounts.controller';
import './app/user/users.controller';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as methodOverride from 'method-override';
import {RegisterRoutes} from './routes';

const app = express();

app.use('/docs', express.static(__dirname + '/swagger-ui'));
app.use('/swagger.json', (req, res) => {
    res.sendfile('./dist/swagger.json');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

RegisterRoutes(app);

let port = 3000;
console.log('server listening on http://localhost:' + port);
app.listen(port);
