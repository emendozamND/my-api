function errorLogs(err, req, res, next) {
    console.log('error.logs')
    console.erro(err)
    next(err)
}
function errorHandler(err, req, res, next) {
    console.log('handlererror')
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}
module.exports = {
    errorLogs,
    errorHandler,
}