const { Post } = require('../models');

const postdata = [
  {
    title: 'Why MVC is so important',
    content: 'MVC allows developers maintain a true separation of concerns, devising their code between the Model layer for data, the view layer for design, and the Control layer for application logic.',
  },
  
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
