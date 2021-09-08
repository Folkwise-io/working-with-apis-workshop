const { get } = require("./utils");
const fs = require("fs");
const path = require("path");

const complexQueryService = async () => {
  const query = `pasta`;

  // TODO, everything below this goes into a complexQueryService.js

  // determine the filename of the query
  const filename = `complexQuery.${query}.json`;
  const filepath = path.join(__dirname, "..", "cache", filename);

  // see if the file exists, and if the json inside it is well-formed
  const doesFileExist = fs.existsSync(filepath);
  
  let json;
  if (doesFileExist) {
    try {
      const fileContents = fs.readFileSync(filepath);
      // if it does, return the json
      json = JSON.parse(fileContents);
    } catch (e) {
      json = null;
    }
  }
  
  // if it doesn't, make the query, save the json.
  if (!json) {
    console.log(`Recording for query [${query}] does not exist. Performing API call...`);
    const resp = await get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&maxFat=25&number=2&apiKey=${process.env.SPOON_KEY}`);
    json = resp.data;

    console.log(`
      The headers I received are:
      X-API-Quota-Request: ${resp.headers["x-api-quota-request"]}
      X-API-Quota-Used: ${resp.headers["x-api-quota-used"]}
    `)

    try {
      fs.writeFileSync(filepath, JSON.stringify(resp.data));
    } catch (e) {
      console.error("WARNING! Query failed. This could eat up your API rate limit.");
      throw e;
    }
  }

  return json;
}

module.exports = {
  complexQueryService
}