
const dotenv = require("dotenv");
dotenv.config();

const {complexQueryService} = require("./services");

describe("simple test", () => {
  it("can do a complexQuery", async () => {
    const json = await complexQueryService();
    expect(json.results[0].id).toBe(654959);
  });

  it("can take results of complexQuery and transform those into something useful with a 2nd network call.", async () => {
    // const complexQueryJson = await complexQueryService();
  });
});
