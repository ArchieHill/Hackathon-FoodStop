const PORT = 8080;
const SECRET = "super-secret-string";

const express = require("express");
const passport = require("passport");
const session = require("express-session");

const app = express();

const LocalStrategy = require("passport-local").Strategy;

const cafes = new Map();

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
	cafes.forEach((cafe, email) => {
		data.push({
			name: cafe.name,
			quantity: cafe.quantity,
			address: cafe.address
		});
	})
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
		address: req.user.address
	});
})
app.post("/api/available/me", (req, res) => {
	let { name, quantity, address } = req.body;
	name = name.trim();
	const q = parseInt(quantity);
	address = address.trim();
	if(name == "" || isNaN(q) || q < 0 || address == "")
		return res.sendStatus(400);
	req.user.name = name;
	req.user.quantity = q;
	req.user.address = address;
	cafes.set(req.user.email, req.user);
	res.redirect("/cafe.html");
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
		address: "-"
	};
	cafes.set(email, authedUser);
	return done(null, authedUser);
}