const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send(`you don't have persmission to save a job, please register or signin`)
    
    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.')
    }
}

module.exports = auth;