var userController = require("../controllers/userController.js");
var express = require("express");
var router = express.Router();

router.get("/", userController.index);
router.put("/xarajat", userController.addXarajat);
router.delete("/xarajat/:id", userController.deleteXarajat);
router.patch("/xarajat/:id", userController.patchXarajat);
router.get("/xarajat", userController.getXarajat);
router.post("/xarajat", userController.getFilteredXarajat);
router.post("/xarajats", userController.patchFilteredXarajat);
router.post("/xarajatAgg", userController.aggregateXarajat);

router.put("/global", userController.addGlobal);
router.get("/global", userController.getGlobal);
router.get("/global/:name", userController.getGlobalByName);

router.get("/history", userController.getHistory);
router.get("/historyall", userController.getHistoryAll);
router.post("/historyall", userController.getFilteredHistoryAll);
router.get("/history5", userController.getHistory5);
router.post("/history", userController.getFilteredHistory);
router.post("/historyr", userController.getFilteredHistoryr);

router.put("/products", userController.addProducts);
router.put("/sellProducts", userController.addSellProducts);
router.post("/productsAgg", userController.aggregateProducts);

router.post("/dollar", userController.getDollar);
router.post("/rubl", userController.getRubl);

module.exports = router;