import ratelimit from "../config/upstash.js";

const rateLimiter = async (req,res,next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key");
        if(!success){
            return res.status(429).json({
            message:"too manny requests, please try again later"})}
        }
        catch (error) {
            console.log("rate limite error",error);
            next(error);
        }
    
    next();
}

export default rateLimiter