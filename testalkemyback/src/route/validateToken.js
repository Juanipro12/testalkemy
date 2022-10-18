import jwt from "jsonwebtoken"


export const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Access denied' })
    try {
        const verified = jwt.verify(token, 'test-juan-vega')
        req.user = verified
        next() 
    } catch (error) {
        res.status(400).json({error: 'Token is invalid'})
    }
}
