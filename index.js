const fs = require("fs");

const { parse } = require("csv-parse");

const results = [];

//create a readable stream allows to open a file as a stream

fs.createReadStream("kepler_data.csv")
  .pipe(parse({ comment: "#", columns: true }))
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
