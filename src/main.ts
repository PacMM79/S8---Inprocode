import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

declare var require: any
var mysql = require('mysql');

var connexion = mysql.createConnection({
  host: 'localhost',
  database: 'users_db',
  user: 'root',
  password: ''
});
