// routes.js

const express = require('express');
const { registerHandler, loginHandler, getAllArticlesHandler, getArticleByIdHandler } = require('./handler');

const router = express.Router();

// Rute register
router.post('/register', registerHandler);

// Rute login
router.post('/login', loginHandler);

// Rute untuk mendapatkan semua artikel
router.get('/articles', getAllArticlesHandler);

// Rute untuk mendapatkan satu artikel berdasarkan ID
router.get('/articles/:id', getArticleByIdHandler);

module.exports = router;
