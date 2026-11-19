export const notFound = (req , res , next )=> {

    const error = new Error(`Route ${req.originalUrl} notfound`);
    
    error.statusCode = 404 ; 
    next(error)

}