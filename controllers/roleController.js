// Middleware to check if the user is a student
const checkStudentRole = (req, res, next) => {
    if (req.session.user && req.session.user.role === "student") {
        return next();
    } else {
        return res.status(403).send("Permission denied");
    }
};

// Middleware to check if the user is an instructor
const checkInstructorRole = (req, res, next) => {
    if (req.session.user && req.session.user.role === "instructor") {
        return next();
    } else {
        return res.status(403).send("Permission denied");
    }
};

module.exports = { checkStudentRole, checkInstructorRole };
