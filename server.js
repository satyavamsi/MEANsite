var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

var PostSchema = mongoose.Schema({
	title: {type: String, required:true},
	body: String,
	tag: {type: String, enum: ['POLITICS','ECONOMY','EDUCATION']},
	posted: {type: Date, default: Date.now}
},{collection: 'post'});

var PostModel = mongoose.model("PostModel", PostSchema);


app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:true}));

app.post("/api/blogpost", createPost);
app.get("/api/blogpost", getAllPosts);
app.delete("/api/blogpost/:id",deletePost);

function deletePost(req,res){
	var id = req.params.id;
	PostModel
		.remove({_id: id})
		.then(
		function(status){
			res.sendStatus(200);
		},
		function(){
			res.sendStatus(400);
		}
			);
}

function getAllPosts(req, res){
	PostModel
	.find()
	.then(
		function(posts){
			res.json(posts);
		},
		function(error){
			res.sendStatus(400);
		}
	);
}

function createPost(req, res){
	var post = req.body;
	console.log(post);
	PostModel
	.create(post)
	.then(
		function(postObj){
			res.json(200);
		},
		function(error){
			res.sendStatus(400);
		}
	);
	
}

app.listen(3000);

