const register_get= (req,res)=>{
    res.render('register', {isHomejs:true});
}

module.exports={
    register_get,
}