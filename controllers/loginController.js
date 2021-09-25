const login_get= (req,res)=>{
    res.render('home', {isHomejs:true});
}

module.exports={
    login_get,
}