//render home page
const home_page=(req, res)=>{
    var session= req.session

    //when login
    if(session.userid){
      res.render('home',{message:req.flash('message'),username:session.username,signup:'', login:"",logout:"logout"})
    }
    //without login
    else{
      res.render('home',{message:req.flash('message'),username:'',signup:'sign up', login:"login",logout:""})
    }
}

module.exports={
    home_page,
} 
