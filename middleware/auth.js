const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json(`you don't have persmission to save a job, please signin`)
    
    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).json(`Sorry you need to register and login to save a job. If you've already registered, then sign in to save a job`)
    }
}

module.exports = auth;