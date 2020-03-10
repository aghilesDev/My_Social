const  express = require('express');
const mongoose = require('mongoose');
const api = require('./api');


mongoose.connect('mongodb+srv://app:prg2014@cluster-k1ttd.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
api(app);






module.exports= app;