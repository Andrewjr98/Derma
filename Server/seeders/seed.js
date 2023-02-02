const db = require('../config/connection');
const { User, Post } = require('../models');
const userSeeds = require('./userSeeds.json');
const postsSeeds = require('./postSeeds.json');

db.once('open', async () => {
    try {
      await User.deleteMany({});
      await User.create(userSeeds);
      await Post.deleteMany({});
      await Post.create(postsSeeds);
  
      console.log('all done!');
      process.exit(0);
    } catch (err) {
      throw err;
    }
  });
  