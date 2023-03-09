const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./src/api/swagger/swagger.yaml");
const SwaggerExpress = require("swagger-express-mw");
const config = require("config");

let dirConfig = {
  appRoot: __dirname + "/src", // required config
  swaggerSecurityHandlers: {
    basicAuth: function (req, authOrSecDef, scopesOrApiKey, cb) {
      let auth = req.headers.authorization;
      if (auth) {
        cb(null);
      } else {
        cb(new Error("access denied!"));
      }
    },
  },
};
SwaggerExpress.create(dirConfig, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }
  const options = {
    security: [{ basicAuth: [] }],
  };

  dirConfig.swaggerSecurityHandlers = {
    basicAuth: function securityHandler1(
      req,
      authOrSecDef,
      scopesOrApiKey,
      cb
    ) {
      // your security code
      console.log("i came here");
      cb();
    },
  };
  swaggerExpress.register(app);
  let port = config.has("port") ? config.get("port") : 5678;
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
  app.use(cors);
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
