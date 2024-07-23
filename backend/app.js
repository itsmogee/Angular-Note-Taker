// Will hold the express App
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS",
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post added succesfully",
  });
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fassdf1234",
      title: "First server side post",
      content: "This is coming from the server",
    },
    {
      id: "fas234s144",
      title: "Second server side post",
      content: "This is coming from the server!",
    },
  ];
  res.status(200).status(200).json({
    message: "Posts fetched succesfully!",
    posts: posts,
  });
});

module.exports = app;
