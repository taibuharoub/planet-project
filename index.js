const fs = require("fs");

const { parse } = require("csv-parse");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  // return planet["koi_disposition"] === "CONFIRMED" && planet["koi_prad"] > 0.5;
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

//create a readable stream allows to open a file as a stream
fs.createReadStream("kepler_data.csv")
  .pipe(parse({ comment: "#", columns: true }))
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("close", () => {
    console.log(`${habitablePlanets.length} habitable planets found!`);
    console.log("done");
  });
