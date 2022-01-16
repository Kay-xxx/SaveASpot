const { response } = require('express');
const express = require('express')
const session = require('express-session');
const app = express()
const port = 5800

const oneDay = 1000 * 60 * 60 * 24;
app.use(express.json());
app.use(session({
 secret: 'thisisasecret',
 resave: false,
 saveUninitialized: true,
 cookie: { 
           mzxAge:oneDay
 }
          
}));

app.use(express.static('public'))
app.get('/', (req, res) => {        
  res.sendFile("login.html",{
      root:"./view"      
  });

})
app.get('/register', (req, res) => {
          res.sendFile("register.html",{
              root:"./view"      
          });
           
        })
app.post('/login',(request,response) =>{
          //console.log(request.body);
          if(request.body.email ==="abc" && request.body.password ==="123"){
                    request.session.userId = request.body.email;
                     response.status(200).json({ result:"success"});
          }else{
                    response.status(403).json({ result:"wrong email or password"});
          }
          
         
});
app.post('/register',(request,response) =>{
          
       response.status(200).json({ result:"successful register"});
          
});
app.get('/login_test',(request,response) =>{
          if(request.session.userId === undefined){ 
          response.status(403).json({result:"You need to log in!"});
          }else{
                    response.status(200).json({ result:"successful login test"});
          }
          
             
   });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  console.log("Hello");

})  