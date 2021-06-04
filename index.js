const express = require('express')
const path=require("path")
const bodyParser=require("body-parser")
require('./db/mongoose')
const userRouter = require('./routers/user')
const postRouter1 = require('./routers/post1')
const Post = require("./models/post");
var cors = require('cors')


const app = express()
const publicDirectoryPath = path.join(__dirname,'/public')
app.set("view engine","hbs")
app.use(express.static(publicDirectoryPath))

app.use(cors());
const port = process.env.PORT || 3000

console.log(__dirname);
console.log(__filename);  

app.use(express.json())
app.use(userRouter)
app.use(postRouter1)
// var postRouter = require('./routers/post')
// var postRouters = postRouter({ dest: './routers/post.js' });

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get("/index",async (req,res)=>{
  res.render("index",{})
});

app.get("/signup",async (req,res)=>{
  res.render("signup",{})
});

app.get("/recommendation",async (req,res)=>{
  res.render("recommendation",{})
});

app.get("/homepage",async (req,res)=>{
  res.render("homepage",{})
});

app.get("/postingpage",async (req,res)=>{
  res.render("postingpage",{})
});

app.get("/index",async (req,res)=>{
  res.render("index",{})
});

app.get("/profile",async (req,res)=>{
  res.render("profile",{})
});

app.get("/notification",async (req,res)=>{
  res.render("notification",{})
});

app.get("/reported_page",async (req,res)=>{
  res.render("reported_page",{})
});

app.get("/posts",async (req,res)=>{
  var post;
try{
 post=await Post.findById(req.query.post_id)
const view_inc = await Post.findByIdAndUpdate(req.query.post_id, {
  $inc: {
    views: 1
  }
}, {
  upsert: true,
  new: true
})


}catch(e){
  console.log(e); 
}
var body = JSON.stringify(post.body);
  res.render("post",{
    id:post.id,
    body,
    hashtags:post.hashtags,
    likes:post.likes,
    shares:post.shares,
    bookmarks:post.bookmarks,
    views:post.views,
    reports:post.reports,
    title:post.title,
    publisher:post.publisher,
    comments:post.comments,
    published_date:post.published_date,
    pic:post.pic
  })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})