import jwt from "jsonwebtoken";


function middewere (req,res,next) {
    try {
        let token = req.headers.authorization?.split(' ')[1];

        if(!token) {
            return res.status(400).json({ msg: "invalid Token"})
        }
        const decode = jwt.sign(token,process.env.JWT_SECRET);
        req.user = decode
        next()
    } catch (error) {
        console.log(error);
    }
}

export default middewere;
