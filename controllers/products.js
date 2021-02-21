const { Product  , Shop} = require("../db/models");

exports.fetchProduct  = async (productId, next) => {
  try {
    const productFound = await Product.findByPk(productId);
    if (productFound) return productFound;
    else next({ message: "Product does not exist" });
  } catch (error) {
    next(error);
  }
};

exports.productList = async (req, res, next) => {
  
  try {
    const products = await Product.findAll({ attributes: req.body ,
      include:{
        model:Shop,
        as: "shop",
        attributes:{exclude:["id"]}
    }});
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};



exports.productDetail = async (req, res, next) => {
  res.status(200).json(req.product);
};

exports.productUpdate = async (req, res, next) => {
  if(req.file){
    req.body.image=`http://${req.get("host")}/media/${req.file.filename}`;
  }
  await req.product.update(req.body);
  res.json(req.product);
};

exports.productDelete = async (req, res, next) => {
  await req.product.destroy();
  res.status(204).end();
};
