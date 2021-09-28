//render home page
const home_page=(req, res)=>{
    var session= req.session

    //when login
    if(session.userid){
      res.render('home',{username:session.userid,signup:'', login:"",logout:"logout"})
    }
    //without login
    else{
      res.render('home',{username:'',signup:'sign up', login:"login",logout:""})
    }
}

module.exports={
    home_page,
} 
