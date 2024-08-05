const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const url = `${req.protocol}://${req.get("host")}`;
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: `${url}/images/${req.file.filename}`,
    creator: req.userData.userID,
  });
  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        message: "Post added succesfully",
        post: {
          id: createdPost._id,
          title: createdPost.title,
          content: createdPost.content,
          imgPath: createdPost.imagePath,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Creating post failed",
      });
    });
};

exports.editPost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = `${req.protocol}://${req.get("host")}`;
    imagePath = `${url}/images/${req.file.filename}`;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userID,
  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userID }, post)
    .then((result) => {
      if (result.matchedCount > 0) {
        res.status(200).json({ message: "update successful", post: post });
      } else {
        res.status(401).json({ message: "Not Authorized", post: post });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "Couldnt update post",
      });
    });
};

exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currPage) {
    postQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
  }
  postQuery
    .then((documents) => {
      fetchedPosts = documents;
      return Post.countDocuments();
    })
    .then((count) => {
      res.status(200).status(200).json({
        message: "Posts fetched succesfully!",
        posts: fetchedPosts,
        maxPosts: count,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching Posts failed",
      });
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching post failed",
      });
    });
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userID })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Deletion successful" });
      } else {
        res.status(401).json({ message: "Not Authorized" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Not authorized",
      });
    });
};
