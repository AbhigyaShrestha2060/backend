const path = require('path');
const productModel = require('../models/productModel');
const createProduct = async (req, res) => {
  //  check incommin g data

  console.log(req.body);
  // for sending the files data
  console.log(req.files);

  // destructure the incomming body data(json)

  const { productName, productPrice, productCategory, productDescription } =
    req.body;

  // validation
  if (
    !productName ||
    !productPrice ||
    !productCategory ||
    !productDescription
  ) {
    return res.status(400).json({
      success: false,
      message: 'Please enter all the fields',
    });
  }
  //  vallidation the imge
  if (!req.files || !req.files.productImage) {
    return res.status(400).json({
      success: false,
      message: 'Please upload the image',
    });
  }
  const { productImage } = req.files;

  //  save the data to the database

  // generatethe new image name (abc.png => 123456-abc.png)

  const imageName = `${Date.now()}-${productImage.name}`;

  //  make a upload path(/path/upload -dirextory)
  const imageUploadPath = path.join(
    __dirname,
    `../public/products/${imageName}`
  );
  // move to that directory(await , try catch)
  try {
    await productImage.mv(imageUploadPath);

    //  save the data to the database

    const newProduct = new productModel({
      productName: productName,
      productPrice: productPrice,
      productCategory: productCategory,
      productDescription: productDescription,
      productImage: imageName,
    });
    const product = await newProduct.save();
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error,
    });
  }
};

const getAllProduct = async (req, res) => {
  //try catch
  try {
    const products = await productModel.find({});
    res.status(201).json({
      success: true,
      message: 'All products fetched successfully',
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error,
    });
  }
};

// Fetch Single Product
const getSingleProduct = async (req, res) => {
  // Get product id form url (parms)
  const productId = req.params.id;

  try {
    const product = await productModel.findById(productId);
    if (!product) {
      res.status(201).json({
        success: false,
        message: 'No Product Found',
      });
    }
    res.status(201).json({
      success: true,
      message: 'Product Fetched',
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error,
    });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getSingleProduct,
};
