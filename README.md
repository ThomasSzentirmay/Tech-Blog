# Tech-Blog

## Description

This full-stack application is a Tech Blog that allows users to register an account, and post comments regarding technology. Users can also comment on posts made by others, and these posts can be seen from the home page. It uses a MySQL database, and the Sequelize npm package to manage it. The app is built using HTML, CSS, JS, NodeJS, ExpressJS and other packages like express-session for cookies and bcrypt for password hashing.

A large problem I ran into was the commenting system not functioning as intended. I ended up resolving this issue by resetting the Model associations, as that was the root cause of the issue.

![Screenshot 2023-07-16 134658](https://github.com/ThomasSzentirmay/ORM-ecommerce-backend/assets/132217664/c45989ac-90e5-44f1-8bd8-33a65d990a22)

Heroku Deployed Link: https://tech-blog-thomas-4502fa5d5b96.herokuapp.com/

## Installation

Clone this repo to your local machine and run 'npm i' to install all the necessary dependancies. If you wish to manipulate the database you want to make sure you have MySQL installed on your system, and of course Node for the server side code.

## Usage

You can visit the deployed heroku link above to access the website. Make an account and begin posting! The website is simple enough to follow prompts, as it follows, for the most part, the industry standard in terms of redirection and routing users to where they need to be.

## License

MIT License

Refer to 'License' in the project repo for further information on the limitations and usability of this application under the MIT License applied to this project.

## Tests

N/A

## Features

-User authentication
-Community driven posts
-Session cookies for all logged in users

## Badges

N/A