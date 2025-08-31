const express = require('express');
const router = express.Router();
const {
    addBlog,
    getShowingBlog,
    getAllBlogs,
    getBlogById,
    getBlogByIds,
    updateBlog,
    deleteBlog,
    deleteManyBlog,
    updateStatus
} = require('../controller/blogController');

//add a department
router.post('/add', addBlog);

//get only showing department
router.get('/show', getShowingBlog);

//get all department
router.get('/', getAllBlogs);

//get a department
router.get('/:id', getBlogById);

//get a department
router.get('/new/:id', getBlogByIds);

//update a department
router.put('/:id', updateBlog);

//show/hide a department
router.put('/status/:id', updateStatus);

//delete a department
router.delete('/:id', deleteBlog);

// delete many department
router.patch('/delete/many', deleteManyBlog);

module.exports = router;
