const jwt = require('jsonwebtoken')


function authenticateRequest(req, res, next) {
    try{
        const authHeader = req.headers['authorization']
        const token  = authHeader && authHeader.split(' ')[1]
    
        if(token == null) return res.status(401).send("error authenticating")
        
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user)=>{
            if(err) {
                return res.status(403).send({
                    "error" : err
                })
            } 
            req.user = user
            next()
        })
    }catch(err){
        res.status(403).send({
            "error" : err
        })
    }
}   

module.exports = authenticateRequest