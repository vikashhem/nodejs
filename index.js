const http = require("http");
//const url = require("url");
const fs = require("fs");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const replaceitems = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

const server = http.createServer((req, res) => {
  const baseURL = "http://" + req.headers.host + "/";
  console.log(req.url);
  const path = new URL(req.url, baseURL);
  //const pathName = req.url;
  const query = path.searchParams.get("id");

  switch (path.pathname) {
    case "/overview": {
      res.writeHead(200, {
        "content-type": "text/html",
      });
      const cardHTML = dataObj
        .map((item) => replaceitems(tempCard, item))
        .join("");
      //console.log(cardHTML);
      const output = tempOverview.replace("{%PRODUCTCARD%}", cardHTML);
      res.end(output);
      break;
    }
    case "/": {
      res.writeHead(200, {
        "content-type": "text/html",
      });
      const cardHTML = dataObj
        .map((item) => replaceitems(tempCard, item))
        .join("");
      //console.log(cardHTML);
      const output = tempOverview.replace("{%PRODUCTCARD%}", cardHTML);
      res.end(output);
      break;
    }
    case "/product": {
      //console.log(path.searchParams.get("id"));
      const product = dataObj[query];
      const output = replaceitems(tempProduct, product);
      res.end(output);
      break;
    }

    case "/api": {
      res.writeHead(200, {
        "content-type": "application/json",
      });
      //console.log(finalData);
      res.end(data);
      break;
    }
    default: {
      res.writeHead(400, {
        "content-type": "text/html",
      });
      res.end("<h1>no page found</h1>");
    }
  }
});

server.listen(8000, () => {
  console.log("in server");
});
