const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const Department = require('../models/Department');
const Brand = require('../models/Brand');
const Category = require('../models/Category');
const Product = require('../models/Product');
const mongoose = require("mongoose");
const upload = multer({ dest: 'uploads/' });

const uploadAndImportCSV = (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).send('Error uploading file: ' + err.message);
    }

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const { template, language } = req.body; // Get template and language from form data
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data); // Collect rows from CSV
      })
      .on('end', async () => {
        try {
          if (template === "department") {
            await insertDepartment(results, language);
          } else if (template === "brand") {
            await insertBrand(results, language);
          } else if (template === "category") {
            await insertCategory(results, language);
          } else if (template === "product") {
            await insertProduct(results, language);
          }

          res.json({ message: 'CSV data successfully processed.' });
        } catch (error) {
            // console.log(error);
            
          res.status(500).json({ error: 'Error processing the data.' });
        } finally {
          // Remove the file after processing
          fs.unlinkSync(req.file.path);
        }
      })
      .on('error', (error) => {
        res.status(500).json({ error: 'Error processing the CSV file.' });
      });
  });
};

// Department insertion logic
const insertDepartment = async (results, language) => {
    for (const row of results) {
        const { name, description } = row;

        if (!name) {
            continue; // Skip rows without a name
        }

        const departmentData = {
            name: { [language]: name },
            description: description ? { [language]: description } : {},
            slug: name.toLowerCase().replace(/\s+/g, '-'),
        };

        const existingDepartment = await Department.findOne({ [`name.${language}`]: name });
        if (existingDepartment) {
            await Department.updateOne({ _id: existingDepartment._id }, { $set: departmentData });
        } else {
            const newDepartment = new Department(departmentData);
            await newDepartment.save();
        }
    }
};

// Brand insertion logic
const insertBrand = async (results, language) => {
    for (const row of results) {
        const { name, description, website } = row;

        if (!name) {
            continue; // Skip rows without a name
        }

        const brandData = {
            name: { [language]: name },
            description: description ? { [language]: description } : {},
            website: website || null,
            slug: name.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"),
        };

        const existingBrand = await Brand.findOne({ [`name.${language}`]: name });
        if (existingBrand) {
            await Brand.updateOne({ _id: existingBrand._id }, { $set: brandData });
        } else {
            const newBrand = new Brand(brandData);
            await newBrand.save();
        }
    }
};

// Category insertion logic
const insertCategory = async (results, language) => {
    for (const row of results) {
        const { name, description, department, parentCategory, metaKeyword } = row;

        // Skip rows without mandatory fields
        if (!name || !department) {
            continue; 
        }

        // Find the corresponding department record
        const departmentRecord = await Department.findOne({ [`name.${language}`]: department });
        if (!departmentRecord) continue; // Skip if the department is not found

        // Initialize category data
        const categoryData = {
            name: { [language]: name },
            description: description ? { [language]: description } : {},
            departmentId: departmentRecord._id, // Use departmentId instead of department
            slug: name.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"),
            metaKeyword: metaKeyword ? metaKeyword.split(',').map(tag => tag.trim()) : [], // Convert to array if present
        };

        // Handle parent category if provided
        if (parentCategory) {
            const parentRecord = await Category.findOne({ [`name.${language}`]: parentCategory });
            if (parentRecord) {
                categoryData.parentId = parentRecord._id; // Set parentId
                categoryData.parentName = parentRecord.name[language]; // Set parentName
            }
        }

        // Check for existing category
        const existingCategory = await Category.findOne({ [`name.${language}`]: name });
        if (existingCategory) {
            await Category.updateOne({ _id: existingCategory._id }, { $set: categoryData });
        } else {
            const newCategory = new Category(categoryData);
            await newCategory.save();
        }
    }
};




// Product insertion logic
const insertProduct = async (results, language) => {    
    for (const row of results) {
        const {
            title,
            description,
            metatitle,
            metadescription,
            sku,
            productRefrenceNo,
            moq,
            packing,
            hsn,
            gst,
            barcode,
            brand,
            categories,
            stock,
            tag,
            originalPrice,
            salePrice,
            isCodAvaialble,
            deliveryCharge,
        } = row;

        // Skip rows without mandatory fields
        if (!title || !originalPrice || !salePrice || !brand || !categories) {
            continue; 
        }

        // let brandRecord = await Brand.findOne({ [`name.${language}`]: brand });
        const brandTrim = brand.trim();
        let brandRecord = await Brand.findOne({
            [`name.${language}`]: { $regex: `^\\s*${brandTrim}\\s*$`, $options: "i" }
          });  
        if (!brandRecord) {            
            brandRecord = new Brand({
                name: { [language]: brand },
                description: { [language]: brand },
                website: ""
            });
            await brandRecord.save();
        }        

        const categoryIds = [];
        let home = await Category.findOne({ [`name.${language}`]: "Home" });

        if (!home) {
            home = new Category({
                name: { [language]: "Home" },
                description: { [language]: "Home" },
                parentName: "Home",
                icon: ""
            });
            await home.save();
        }
        
        for (const categoryName of categories.replace(/,\s*$/, '').split(',')) {
            const trimmedCategoryName = categoryName.trim();
        
            if (trimmedCategoryName && trimmedCategoryName !== "undefined") {
                // let categoryRecord = await Category.findOne({ [`name.${language}`]: trimmedCategoryName });
                let categoryRecord = await Category.findOne({
                    [`name.${language}`]: { $regex: `^\\s*${trimmedCategoryName}\\s*$`, $options: "i" }
                  });                  
        
                if (!categoryRecord) {
                    // Create the new category with "Home" as its parent
                    // console.log(`Category ${trimmedCategoryName} not found, creating it.`);
                    categoryRecord = new Category({
                        name: { [language]: trimmedCategoryName },
                        description: { [language]: trimmedCategoryName },
                        parentName: "Home",
                        parentId: home._id,
                        icon: "" // Set a default icon or leave it empty
                    });
                    await categoryRecord.save();
                } else {
                    // Update the existing category
                    categoryRecord.name[language] = trimmedCategoryName;
                    categoryRecord.description[language] = trimmedCategoryName;
                    // categoryRecord.parentId = home._id;
                    await categoryRecord.save(); // Save the updated category
                }
                categoryIds.push(categoryRecord._id);
            } 
        }
        

        if (categoryIds.length <= 0) {
            continue;
        }

        // Create slug from title
        const slug = title.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");

        // Check for existing product by title
        const existingProduct = await Product.findOne({ [`title.${language}`]: title });

        // console.log("Exist ", existingProduct);
        
        const productData = {
            productId: mongoose.Types.ObjectId(),
            sku: sku || null,
            hsn: hsn || null,
            gst: gst || null,
            moq: moq || null,
            productRefrenceNo: productRefrenceNo || null,
            packing: packing || null,
            barcode: barcode || null,
            title: { [language]: title },
            description: description ? { [language]: description } : {},
            metatitle: { [language]: metatitle },
            metadescription: metadescription ? { [language]: metadescription } : {},
            slug,
            brand: brandRecord._id,
            categories: categoryIds,
            category: categoryIds[0],
            stock: stock ? Number(stock) : 0,
            sales: 0,
            tag: tag ? tag.split(',').map(tag => tag.trim()) : [slug],
            prices: {
                originalPrice: Number(originalPrice),
                price: Number(salePrice),
                discount: Number(originalPrice) - Number(salePrice), // Set discount if needed
            },
            isCombination: false,
            isCodAvaialble: isCodAvaialble === "No" ? false : true,
            deliveryCharge: deliveryCharge,
            status: 'show',
        };

        if (existingProduct) {            
            // Update existing product
            await Product.updateOne({ _id: existingProduct._id }, { $set: productData });
        } else {
            // Create a new product
            const newProduct = new Product(productData);
            await newProduct.save();
        }
    }
};


module.exports = { uploadAndImportCSV };
