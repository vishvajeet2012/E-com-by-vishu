require('dotenv').config();
const jwt = require('jsonwebtoken');

// JWT authentication middleware
const jwtAuthMiddleware = (req, res, next) => {
    try {
        // Extract the JWT token from the request header
                const authHeader = req.headers.authorization;

                 if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Unauthorized: Token missing or invalid format" });
        }

        const token = authHeader.split(' ')[1];

        // Verify the JWT token
             const decoded = jwt.verify(token, process.env.JWTCODE);
              req.userPayload = decoded; // Attach decoded payload to the request object

        next(); 
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Function to generate a JWT token
          const generateToken = (userData) => {
          return jwt.sign(userData, process.env.JWTCODE, { expiresIn: '12h' }); // Add expiration for security
};

module.exports = { jwtAuthMiddleware, generateToken };
