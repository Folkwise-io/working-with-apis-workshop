
const dotenv = require("dotenv");
dotenv.config();

const {complexQueryService} = require("./services");

describe("simple test", () => {
  it("can do a complexQuery", async () => {
    const json = await complexQueryService();
    expect(json.results[0].id).toBe(654959);
  })
});
