const fs = require("fs");
const readline = require("readline");

const inputFile = process.env.INPUT_FILE || "data/input.txt";
const outputFile = process.env.OUTPUT_FILE || "data/output.txt";

function readAndPrintData() {
  const fileStream = fs.createReadStream(inputFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const output = fs.createWriteStream(outputFile, { flags: "w" });

  rl.on("line", (line) => {
    const objects = line.split(",");
    for (let obj of objects) {
      obj = obj.trim();
      let type;
      if (/^-?\d+$/.test(obj)) {
        type = "Integer";
      } else if (/^-?\d+\.\d+$/.test(obj)) {
        type = "Real Number";
      } else if (/^[a-zA-Z]+$/.test(obj)) {
        type = "Alphabetical String";
      } else {
        type = "Alphanumeric";
      }
      output.write(`Object: '${obj}', Type: ${type}\n`);
    }
  });

  rl.on("error", (err) => {
    console.error(`Error reading file: ${err.message}`);
  });

  fileStream.on("error", (err) => {
    console.error(`Error opening file: ${err.message}`);
  });

  rl.on("close", () => {
    output.end();
    console.log("Processing complete. Output saved to:", outputFile);
  });
}

readAndPrintData();