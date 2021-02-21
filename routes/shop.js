const express = require("express");
const controller = require("../controllers/shop");
const upload = require("../middleware/multer");
const router = express.Router();

router.param("shopId", async (req, res, next, shopId) => {
  const shopFound = await controller.fetchShop(shopId, next);
  if (shopFound) {
    req.shop = shopFound;
    next();
  } else {
    const error = new Error("Shop Not Found");
    error.status = 404;
    next(error);
  }
});
router.post("/:shopId/products", upload.single("image") ,controller.productCreate);
router.get("/", controller.shopList);
router.post("/", upload.single("image") ,controller.shopCreate);
router.get("/:shopId", controller.shopDetail);
router.put("/:shopId", upload.single("image") ,controller.shopUpdate);
router.delete("/:shopId", controller.shopDelete);


module.exports = router;
