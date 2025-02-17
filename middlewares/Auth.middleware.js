const ROLE = require("../utils/UserRole");

const jwt = require("jsonwebtoken")

class Authorization {

    static verifyToken(req, res, next){
        const token = req.headers.authorization;
        if (!token){
            return res.status(401).send("Not authanticated");
        }
        else{
            jwt.verify(token, process.env.JWT_KEY, (err, user)=>{
                if (err) {return res.status(403).send("Token is not valid")}
                else{
                    req.user = user;
                    next();
                }
            })
        }
    }

    static userAuthorization(req, res, next){
        this.verifyToken(req, res, ()=>{

            if (req.user.id == req.params.id || req.user.role == ROLE.ADMIN){
                next();
            }
            else {
                res.status(403).send("Un authorized");
            }

        })
    }

    static instructorAuthorization(req, res, next){
        this.verifyToken(req, res, ()=>{
            if (req.user.role <= ROLE.INSTRUCTOR || req.user.role == ROLE.ADMIN){
                next();
            }
            else{
                res.status(403).send("Un authorized");
            }
        })
    }

    static moderatorAuthorization(req, res, next){
        this.verifyToken(req, res, ()=>{
            if (req.user.role <= ROLE.MODERATOR || req.user.role == ROLE.ADMIN){
                next();
            }
            else{
                res.status(403).send("Un authorized");
            }
        })
    }

    static adminAuthorization(req, res, next){
        this.verifyToken(req, res, ()=>{
            if (req.user.role <= ROLE.ADMIN || req.user.role == ROLE.ADMIN){
                next();
            }
            else{
                res.status(403).send("Un authorized");
            }
        })
    }

}

module.exports = Authorization;