## using the rate limiter

the app uses a node package "express-rate-limit" for limiting requests.

to use the limiter import the node module into your app
eg.: const rateLimit = require("express-rate-limit");

to create a limiter you pass in an object to 'rateLimit()' containing your window millisecond "windowMs" key with a time value (eg.: 15 _ 60 _ 1000 //15minutes), and a "max" connections per windowMs number

eg.: const limiter = rateLimit({
windowMs: 15 _ 60 _ 1000, // 15 minutes
max: 100 // limit each IP to 100 requests per windowMs
});

you can use the limiter for specific endpoints by passing in the endpoint string as the first argument when using the middleware eg: app.use("/this-needs-a-limit/", limiter) different limiters can be set for different endpoints.
additional documentation for the express rate limiter can be found here https://www.npmjs.com/package/express-rate-limit

## using the ip-filter

the app uses a node package for filtering ips called "express-ipfilter"

this gives you a way to control access to your app.
whitelists and blacklists can be created for filtering users.

you can create an array of blacklist or whitelist ips
eg.: const ips = ["127.0.0.1"]; //blacklist

and pass it in as an argument when using the middleware in you app
eg.: app.use(ipfilter(ips));

its possible to whitelist ips while denying every other ip adress by passing an object as an second argument when initializing the middleware
eg.: app.use(ipfilter(ips),{mode: "allow"});

more documentation on the module can be found here https://www.npmjs.com/package/express-ipfilter
