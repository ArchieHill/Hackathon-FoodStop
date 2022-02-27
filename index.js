const PORT = 8080;
const SECRET = "super-secret-string";

const express = require("express");
const passport = require("passport");
const session = require("express-session");

const app = express();

const LocalStrategy = require("passport-local").Strategy;

app.use(session({
	secret: SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
	usernameField: "email",
	passwordField: "password",
	passReqToCallback: true
}, authUser));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", passport.authenticate("local", {
	successRedirect: "/cafe.html",
	failureRedirect: "/cafeLogin.html"
}));

app.get("/api/available", (req, res) => {
	const data = [];
	for(let i = 1; i <= 3; i++)
		data.push({
			name: `Cafe ${i}`,
			quantity: Math.round(Math.random() * 20),
			location: { lat: Math.random() * 100, long: Math.random() * 100 }
			
		});
		for(let i = 1; i <= 3; i++)
		data.push({
			name: `Restaurant ${i}`,
			quantity: Math.round(Math.random() * 20),
			location: { lat: Math.random() * 100, long: Math.random() * 100 }
		});
	res.json(data);
});

app.use("/cafe.html", (req, res, next) => {
	if(!req.isAuthenticated())
		return res.redirect("/cafeLogin.html");
	next();
});

app.use("/api/available/me", (req, res, next) => {
	if(!req.isAuthenticated())
		return res.sendStatus(401);
	next();
})
app.get("/api/available/me", (req, res) => {
	res.json({
		name: req.user.name,
		quantity: req.user.quantity,
		location: req.user.location
	});
})
app.post("/api/available/me", (req, res) => {
	let { name, quantity, lat, long } = req.body;
	name = name.trim();
	const q = parseInt(quantity);
	const latNum = parseFloat(lat);
	const longNum = parseFloat(long);
	if(name == "" || isNaN(q) || q < 0 || isNaN(lat) || isNaN(long))
		return res.sendStatus(400);
	req.user.name = name;
	req.user.quantity = q;
	req.user.location.lat = latNum;
	req.user.location.long = longNum;
	res.json({
		name,
		quantity: q,
		location: {
			lat: latNum,
			long: longNum
		}
	});
});

app.use(express.static("./static"));

app.listen(PORT);

console.log(`Running on port ${PORT}`);

function authUser(req, email, password, done) {
	if(password != "Password")
		return done(null, false);

	const authedUser = {
		email,
		name: `${email}'s Cafe`,
		quantity: Math.round(Math.random() * 20),
		location: { lat: Math.random() * 100, long: Math.random() * 100 }
	};
	return done(null, authedUser);
}