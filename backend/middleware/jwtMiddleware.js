const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Unauthorised.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using secret
    req.staff = decoded; // Attach user data to the request object
    next(); // Continue to the next middleware
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;