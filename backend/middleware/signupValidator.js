exports.signupValidator = (req,res,next)=>{

        const{ name, email , password , bio , username}=req.body;
        console.log(name,email,password,bio,username);
        if([ name , email , password ,bio , username].every(Boolean)){
            next();
        }else{
            res.status(404).json({
                success:false,
                message:"all Input feilds are required"
            });
        } 

}  
 