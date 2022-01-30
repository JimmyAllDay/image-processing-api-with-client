import { Response } from "express";
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// TODO: the below may not be good ways to handle errors and should be refactored on further learning

// User message strings
const URL = "http://localhost:5000/"; //Update after deployment
const errorInfo = `An example query string is <i>${URL}api?name=encenadaport&width=200&height=200</i><br><br>The available image names are: encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica.`;
//Validate query params
//Note to markers: please note that the below contains a parameter typed with 'any'. I have included this as a workaround because the solution to typing this correctly requires a typescript interface that is beyond the scope of this project. I have addressed use of the 'any' type within the ES Lint rules and this is the only occaision on which I have used this type.
function checkQueryParams(params: any, res: Response) {
  if (!params.name) {
    res.send(
      `No image name in query. Please re-send request and include an image name. <br> <br> ${errorInfo}`
    );
    throw new Error();
  }
  if (!params.width) {
    res.send(
      `No width parameter in query. Please re-send request and include a width parameter. <br> <br> ${errorInfo}`
    );
    throw new Error();
  }
  if (!params.height) {
    res.send(
      `No height parameter in query. Please re-send request and include a height parameter. <br> <br> ${errorInfo}`
    );
    throw new Error();
  }
}

//Check that image exists in dir
function checkImage(name: string, res: Response) {
  const imageFile = path.join(__dirname, "../images", `${name}.jpg`);
  const imageExists = fs.existsSync(imageFile);
  if (!imageExists) {
    res.send(
      `An image with that name does not exist on this server. Please check the name of the image. <br><br>${errorInfo}`
    );
    throw new Error();
  }
}

//Check dimensions for positive integers
function checkInts(width: number, height: number, res: Response) {
  if (width <= 0 && height <= 0) {
    res.send(
      `Width and height parameters must be positive integers. Please re-send request with valid widht and height parameters. <br><br> ${errorInfo}`
    );
    throw new Error();
  } else if (width <= 0) {
    res.send(
      `Width parameter must be a positive integer. Please re-send request with valid width parameter.<br><br> ${errorInfo}`
    );
    throw new Error();
  } else if (height <= 0) {
    res.send(
      `Height parameter must be a positive integer. Please re-send request with valid height parameter.<br><br> ${errorInfo}`
    );
    throw new Error();
  }
}

async function checkSaveDir(dirPath: string) {
  if (!dirPath) {
    await fsPromises.mkdir(dirPath);
    throw new Error();
  }
}

module.exports = {
  checkQueryParams: checkQueryParams,
  checkImage: checkImage,
  checkSaveDir: checkSaveDir,
  checkInts: checkInts,
};
