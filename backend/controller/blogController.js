const Blog = require("../models/Blog");

const addBlog = async (req, res) => {
  try {
    const newBrand = new Blog(req.body);
    await newBrand.save();
    // console.log("Database Award ", newBrand);
    res.status(200).send({
      message: "Blog Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


// get status show category
const getShowingBlog = async (req, res) => {
  try {
    const brands = await Blog.find({ status: "show" }).sort({
      _id: -1,
    });
    res.send(brands);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


const getAllBlogs = async (req, res) => {
  try {
    const brands = await Blog.find({}).sort({ _id: -1 });
    res.send(brands);
  } catch (err) {    
    res.status(500).send({
      message: err.message,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const brand = await Blog.findOne({ slug: req.params.id });
    res.send({brand});
    // console.log("Brand New Api 1 ", brand);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getBlogByIds = async (req, res) => {
  try {
    const brand = await Blog.findById(req.params.id);
    res.send(brand);
    // console.log("Brand New Api ", brand);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// category update
const updateBlog = async (req, res) => {
  try {
    const brand = await Blog.findById(req.params.id);
    if (brand) {
      brand.name = { ...brand.name, ...req.body.name };
      brand.icon = req.body.icon;
      brand.description = req.body.description;
      brand.metatitle = req.body.metatitle;
      brand.metadescription = req.body.metadescription;
      brand.website = req.body.website;
      brand.slug = req.body.slug;
      brand.status = req.body.status;
      await brand.save();
      res.send({ message: "Blog Updated Successfully!" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};



// category update status
const updateStatus = async (req, res) => {
  // console.log('update status')
  try {
    const newStatus = req.body.status;

    await Blog.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: newStatus,
        },
      }
    );
    res.status(200).send({
      message: `Blog ${
        newStatus === "show" ? "Published" : "Un-Published"
      } Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
//single category delete
const deleteBlog = async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(200).send({
      message: "Blog Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// all multiple category delete
const deleteManyBlog = async (req, res) => {
  try {
    await Blog.deleteMany({ _id: req.body.ids });

    res.status(200).send({
      message: "Blogs Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addBlog,
  getShowingBlog,
  getBlogById,
  getBlogByIds,
  updateBlog,
  updateStatus,
  deleteBlog,
  deleteManyBlog,
  getAllBlogs
};
