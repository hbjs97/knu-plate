const express = require("express");
const path = require("path");
const multer = require("multer");
const morgan = require("morgan");
const fs = require("fs");

const app = express();

app.use(morgan("common"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "bucket")));

const thumbnail = multer({
  storage: multer.diskStorage({
    destination: function (req, files, cb) {
      if (!fs.existsSync("./bucket/" + req.params.file_folder_id)) {
        fs.mkdirSync("./bucket/" + req.params.file_folder_id);
      }
      cb(null, "bucket/" + req.params.file_folder_id);
    },
  }),
});

const fileList = [
  { name: "doc_company_profile" },
  { name: "doc_company_profile" },
  { name: "doc_proposal" },
  { name: "doc_diagnosis" },
  { name: "doc_performance" },
  { name: "doc_contract" },
  { name: "doc_board" },
  { name: "doc_reply" },
  { name: "doc_outputs" },
  { name: "doc_outsourcing_contract" },
];

app.get("/bucket/:file_folder_id", (req, res) => {
  const file_folder_id = req.params.file_folder_id;
  console.log(file_folder_id);
  res.json({ file_folder_id });
});

app.get("/bucket/:file_folder_id/:file_id", (req, res) => {
  const file_folder_id = req.params.file_folder_id;
  const file_id = req.params.file_id;
  const fileStream = fs.createReadStream(
    "./bucket/" + file_folder_id + "/" + file_id
  );
  fileStream.pipe(res);
});

app.post("/upload/:file_folder_id", thumbnail.fields(fileList), (req, res) => {
  const files = req.files;
  console.log(files);
  res.json(files);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
