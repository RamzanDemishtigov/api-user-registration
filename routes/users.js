var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');
var swagger = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

const userService = require('../services/user-service');

const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Blog API",
        version: "1.0.0",
        description:
          "Simple backend API to allow users to make a posts",
        license: {
          name: "MIT",
          url: "https://choosealicense.com/licenses/mit/"
        }
      }
    },
    apis: [
      './models/user.js',
      './models/post.js',
      './routes/index.js',
      './routes/users.js',
      './routes/posts.js',
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



/**
 * @swagger
 * /profiles:
 *    get:
 *      summary: Get all users with pagination
 *      produces:
 *        - application/json
 *      tags:
 *        - Users
 *      parameters:
 *        - name: page
 *          description: page
 *          in: query
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: returns a list of all users
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/User'
 */
router.get('/profiles',userService.list);
/**
 * @swagger
 * /profile/{id}:
 *    get:
 *      summary: Get an individual user
 *      produces:
 *        - application/json
 *      tags:
 *        - Users
 *      parameters:
 *        - name: id
 *          description: user id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: returns a user
 *          schema:
 *            $ref: '#/components/schemas/User'
 *        "404":
 *          description: User not found
 */
router.get('/profile/:id',userService.getById);

/**
 * @swagger
 * /user/register:
 *    post:
 *      summary: Creates a new user
 *      produces:
 *        - application/json
 *      tags:
 *        - Users
 *      requestBody:
 *        description: Data for new user
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: Ramzan
 *                email:
 *                  type: string
 *                  example: 123@gmail.com
 *                password:
 *                  type: string
 *                  example: 123
 *      responses:
 *        "201":
 *          description: returns created user
 *          schema:
 *            $ref: '#/components/schemas/User'
 */
router.post('/user/register',userService.create);

/**
 * @swagger
 * /user/login:
 *    post:
 *      summary: Login to get user's access token
 *      produces:
 *        - application/json
 *      tags:
 *        - Users
 *      requestBody:
 *        description: User data for new user
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: Ramzan
 *                password:
 *                  type: string
 *                  example: 123
 *      responses:
 *        "200":
 *          description: logs in user and returns access token
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              name:
 *                type: string
 *              token:
 *                type: string
 *                description: auth token required for performing authenticated actions
 *        "401":
 *          description: incorrect username or password
 */
router.post('/user/login',userService.login);
/**
 * @swagger
 * /profile/{id}:
 *    put:
 *      summary: Updates a user's information
 *      produces:
 *        - application/json
 *      tags:
 *        - Users
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - name: id
 *          description: user id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Updated user data
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: Ramzan
 *                surname:
 *                  type: string
 *                  example: Demishtigov
 *                sex:
 *                  type: string
 *                  example: Male
 *                photo:
 *                  type: string
 *                  example: 123.jpg
 *      responses:
 *        "201":
 *          description: returns updated user
 *          schema:
 *            $ref: '#/components/schemas/User'
 *        "401":
 *          description: not authenticated
 *        "403":
 *          description: not authorized
 *        "404":
 *          description: user not found
 */
router.put('/profile/:id',auth,userService.update);
module.exports = router;
