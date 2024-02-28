const tryCatchMiddleware = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch(e) {
        res.status(e.statusCode || 500).json({message: e.message})
    }
} 

module.exports = tryCatchMiddleware


// const fn = (a) => {
//     return (b) => {
//         return a + b
//     }
// }

// fn(10)(20)