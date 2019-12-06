const express = require('express');
const bookmarks = require('./data');
const bookmarkRoutes = express.Router();
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({filename: 'info.log'})
  ]
});

bookmarkRoutes.route('/bookmarks')
  .get((req, res) => {
    res.json(bookmarks);
  })

bookmarkRoutes.route('/bookmarks/:bookmarkId')
  .get((req, res) => {
    console.log(req.params);
    const bookmark = bookmarks.find(bm => bm.id === req.params.bookmarkId);
    if (!bookmark) {
      logger.error(`Card with id ${req.params} not found`);
      return res
        .status(404)
        .send('Card Not Found');
    }

    res.json(bookmark);
  })

module.exports = bookmarkRoutes;