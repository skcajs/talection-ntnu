var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send({
    token: "test123",
  });
});

router.post("/", function (req, res, next) {
  res.send({
    token: "test123",
  });
});

module.exports = router;
