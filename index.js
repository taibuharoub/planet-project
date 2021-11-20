const fs = require("fs");

const parse = require("csv-parse");

const results = [];

fs.createReadStream("kepler_data.csv")
  .on("data", (data) => {
    results.push(data);
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("close", () => {
    console.log(results);
    console.log("done");
  });
