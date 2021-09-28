const inputs=(req,res)=>{
    var session= req.session
    if(session.userid)
    {
      console.log(session.userid)
      res.render('page1',{username:session.userid ,signup:'', login:"",logout:"logout"})
    }
    else{
      res.send('error: need to register')
    }
}

  
module.exports={
    inputs, 
    
}