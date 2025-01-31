const fs = require("fs");
const path = "data/input.txt";
const FILE_SIZE = 10 * 1024 * 1024;
const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ALPHANUM = CHARS + "0123456789";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAlphabeticalString() {
  let length = getRandomInt(3, 10);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHARS[getRandomInt(0, CHARS.length - 1)];
  }
  return result;
}

function getRealNumber() {
  return (Math.random() * getRandomInt(1, 1000)).toFixed(2);
}

function getInteger() {
  return getRandomInt(-10000, 10000).toString();
}

function getAlphanumeric() {
  let length = getRandomInt(3, 10);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += ALPHANUM[getRandomInt(0, ALPHANUM.length - 1)];
  }
  let spacesBefore = " ".repeat(getRandomInt(0, 5));
  let spacesAfter = " ".repeat(getRandomInt(0, 5));
  return spacesBefore + result + spacesAfter;
}

function generateData() {
  let fileStream = fs.createWriteStream(path, { flags: "w" });
  let size = 0;
  
  while (size < FILE_SIZE) {
    let obj;
    switch (getRandomInt(1, 4)) {
      case 1:
        obj = getAlphabeticalString();
        break;
      case 2:
        obj = getRealNumber();
        break;
      case 3:
        obj = getInteger();
        break;
      case 4:
        obj = getAlphanumeric();
        break;
    }
    
    let data = obj + ",";
    fileStream.write(data);
    size += Buffer.byteLength(data, "utf8");
  }
  
  fileStream.end(() => console.log("File generated:", path));
}

generateData();