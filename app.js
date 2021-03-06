const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const passport = require('passport');
const {
  Strategy,
  ExtractJwt,
} = require('passport-jwt');

const { buildUrl } = require('./src/helpers/RoutesHelper/RoutesHelper');
const UserRouter = require('./src/routers/UserRouter/UserRouter');

const app = express();
const port = 5000;

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.email);
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'SOME_SECRET',
};
passport.use(new Strategy(jwtOptions, (jwtPayload, done) => {
  const expirationDate = new Date(jwtPayload.exp * 1000);

  if (expirationDate < new Date()) {
    done(null, false);
    return;
  }

  const user = jwtPayload;
  done(null, user)
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use(buildUrl(1, 'user'), UserRouter);

const server = app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
