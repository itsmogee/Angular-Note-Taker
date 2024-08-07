# MEAN Notes Application

[My Angular Note Web Application](http://mean-ang-node.s3-website-us-east-1.amazonaws.com/)

## What is this ?

This is an Angular Full-stack application for taking notes with images.
It acts as a message or note board for users.

I completed this project purely to have some insight into working on
full-stack projects and also learning the Angular 18 Framework, MongoDB,
ExpressJS and NodeJS.

It is not meant to be used as a final ready to deploy product but only
as a proof of concept.

The Frontend was developed using Angular 18 and was deployed to a Amazon AWS S3 bucket.

The Backend was developed using NodeJS and ExpressJS, it was deployed seperately
to an Amazon AWS Elasticbeanstalk instance. This instance runs the backend server
and stores the images uploaded instead of MongoDB.

MongoDB was used as the database solution of choice, using MongoDB Atlas to store
user data and also encryption of the users passwords was applied using a hashing
NodeJS package.

## How to Use

- You can browser note items anonymously without having to login as a user.
- You can login with an already created user accout:
  - user1@user1, password: asdf : You can create a new post and edit or delete the user-1's posts.
- You can create a new user account using the sign-up button and create/edit/delete user-related posts.
