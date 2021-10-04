// logout and destroy the session
const logout=(req,res)=>{
    req.session.destroy();
    res.clearCookie("project1");
    res.redirect('/');
}

module.exports={
    logout
    
}