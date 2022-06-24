var express = require('express');
var router = express.Router();
var swagger = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description:
        "Simple backend API to allow users to register and authorize",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/"
      }
    }
  },
  apis: [
    './models/user.js',
    './routes/index.js',
    './routes/users.js',
  ]
};
const specs = swagger(swaggerOptions);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/docs", swaggerUi.serve);
router.get(
  "/docs",
  swaggerUi.setup(specs, {
    explorer: true
  })
);

/**
 * @swagger
 * components:
 *    securitySchemes:
 *      ApiKeyAuth:
 *        type: apiKey
 *        in: header
 *        name: authorization
 *
 */

module.exports = router;
