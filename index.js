const express = require("express");
const request = require("request");
var cors = require("cors");
const router = express.Router();
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
var ds = "abcd";
app.use(bodyParser.json()); // to support JSON-encoded bodies
// app.use(
//   bodyParser.urlencoded({
//     // to support URL-encoded bodies
//     extended: true,
//   })
// );

//function to encode
const encoder = (para) => {
  var result = "";
  const ds = para;

  var temp = "";
  for (var i = 0; i < ds.length; i++) {
    var d = ds.charAt(i);

    if (d == " ") {
      result =
        result.substring(0, result.length - 1) +
        result.charAt(result.length - 1).toLowerCase();
    } else {
      if (i > 0 && i <= 9 && temp.includes(d) && ds.charAt(i + 1) != " ") {
        result += temp.indexOf(d);

        // console.log(result.indexOf(d))
      } else {
        result += String.fromCodePoint(ds.charCodeAt(i) + 2).toUpperCase();
      }
    }
    temp += d;
  }
  return result;
};

//function to decode
const decoder = (para) => {
  var result = "";
  const ds = para;
  for (var i = 0; i < ds.length; i++) {
    var d = ds.charAt(i);
    console.log(d);

    if (d >= "0" && d <= ds.length - 1) {
      result += result.charAt(d);
    } else result += String.fromCodePoint(ds.charCodeAt(i) - 2).toLowerCase();

    if (d >= "a" && d <= "z") {
      result += " ";
    }
  }
  return result;
};

app.post("/encode", (req, res) => {
  var data = encoder(req.body.name);
  console.log(data);
  res.send(data);
});

app.post("/decode", (req, res) => {
  var data = decoder(req.body.name);

  console.log(req.body.name);

  res.send(data);
});

app.listen(PORT, () => console.log(`express started at ${PORT}`));
