exports.signInValidator=(req,res,next)=>{
    const{username , password}=req.body;

    if([username,password].every(Boolean)){
        next();
    }else{
        res.status(400).json({
            success:false,
            message:"all feilds are necessary"
        })
    }
}