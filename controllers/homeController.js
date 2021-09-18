const home_get= (req,res)=>{
    res.render('home', {isHomejs:true});
}

module.exports={
    home_get,
}