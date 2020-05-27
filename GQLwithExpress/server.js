const express = require("express");
const expressGraphQL = require("express-graphql"); 
const cors = require("cors");
const schema = require("./schema");

const app = express();

//Allow cross-origins
app.use(cors());

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
