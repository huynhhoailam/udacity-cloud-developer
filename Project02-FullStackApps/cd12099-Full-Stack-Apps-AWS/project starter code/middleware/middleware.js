import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send("Unauthorized");
        }
        const token = req.headers.authorization.split(" ")[1];
        const secret = 'yizLXps1P8snn6To2Nbeky3OVo8bs4Yp';

        // verify token if valid call next()
        jwt.verify(token, secret);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send("Unauthorized");
    }
}
