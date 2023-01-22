const express = require("express");
const app = express();
const port = 7000;

var Threads = [];
var TOTAL = 0;
var TOTALF = 0;
function CRT() {
  for (t = 1; t < 1001; t++) {
    Threads.push([t, 0, 0, 0]);
  }
}

CRT();

app.get("/STATS/:id/:plus", (req, res) => {
  let ind = parseInt(req.params.id) - 1;
  Threads[ind][2] = 1;
  Threads[ind][3] += parseInt(req.params.plus);
  TOTAL += parseInt(req.params.plus);
  res.send("OK");
});
app.get("/TF/:id", (req, res) => {
  let ind = parseInt(req.params.id) - 1;
  Threads[ind][1] += 1;
  Threads[ind][2] = 1;
  TOTALF += 1;
  res.send("OK");
});
app.get("/GD/:id", (req, res) => {
  let ind = parseInt(req.params.id) - 1;
  res.send(`${Threads[ind][1]}&${Threads[ind][2]}&${Threads[ind][3]}`);
});
app.get("/GT", (req, res) => {
  res.send(`${TOTAL}&${TOTALF}`);
});
function resetAS() {
  for (T = 0; T < Threads.length; T++) {
    Threads[T][2] = 0;
  }
}
function resetALL() {
  Threads = [];
  TOTAL = 0;
  TOTALF = 0;
  CRT();
}
setInterval(resetAS, 300000);

setInterval(resetALL, 86400000);
app.listen(port);
