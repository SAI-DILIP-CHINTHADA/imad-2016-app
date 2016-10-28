var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'sai-dilip-chinthada',
    database: 'sai-dilip-chinthada',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {

     'article-one'   : {
    title: 'Article One | Dilip',
    heading: 'Article One',
    date: 'sep 9, 2016',
    content: `
            <p>
                    This is my content for my first article.This is my content for my first article.This is my content for my first article
                    This is my content for my first article.This is my content for my first article.This is my content for my first article
                </p>
                <p>
                    This is my content for my first article.This is my content for my first article.This is my content for my first article
                    This is my content for my first article.This is my content for my first article.This is my content for my first article
                </p>`
                
},
     'article-two'   : {
     title: 'Article Two | Dilip',
    heading: 'Article Two',
    date: 'sep 15, 2016',
    content: `
            <p>
                    This is my content for my Second article.This is my content for my Second article.This is my content for my Second article
            </p>`
                
},
     'article-three' : {
     title: 'Article Third | Dilip',
    heading: 'Article Third',
    date: 'sep 20, 2016',
    content: `
            <p>
                    This is my content for my Third article.This is my content for my Third article.This is my content for my Third article
            </p>`
}
};

function createTemplate(data){

var title = data.title;
var date = data.date;
var heading = data.heading;
var content = data.content;

var htmlTemplate = `<html>
    <head>
        <title> 
           ${title}
        </title>
        <meta name="viewport" content="width=device-width,intial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h3>
               ${heading} 
            </h3>
            <div>
               ${date}
            </div>
            <div>
                ${content}
            </div>
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test',function(req,res){
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM test',function(err,result){
	if(err){
		res.status(500).send(err.toString());
	} else {
		res.send(JSON.stringify(reuslt));

	}
   });
});

var counter = 0;
app.get("/counter",function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name',function(req,res){  //URL :/submit-name?name=xxxx
   //Get the name from the request
   var name = req.query.name; //TODO

    names.push(name);
    //JSON: Javascript Object Notation
    res.send(JSON.stringify(names));
   
});


app.get('/:articleName',function(req,res)
{
    //articleName == article-One
    //articles[articlesName] == {} content object for article //one
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
     
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
