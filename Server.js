var express = require("express");
	exphbs  = require('express-handlebars'),
	multer  = require('multer');
// var routes	= require("/routes");
var routes 	= require("./routes/upload");


var app = express();

var upload = multer({ dest: './uploads/'});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));


app.use(multer({ dest: './uploads/',
	rename: function (fieldname, filename) {
		return filename+Date.now();
	},
	onFileUploadStart: function (file) {
		console.log(file.originalname + ' is starting ...');
	},
	onFileUploadComplete: function (file) {
		console.log(file.fieldname + ' uploaded to  ' + file.path)
	}
}));

app.get("/", function (req,res) {
    res.render("home")
})

app.get('/', function (req, res) {
    res.sendfile(path.resolve('./uploads/image.png'));
}); 

app.get('/', function (req, res) {
    res.sendfile(path.resolve('./uploads/image.png'));
}); 

// app.post('/upload', routes.startToUpload )

app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});
