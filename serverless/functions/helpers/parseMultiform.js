const Busboy = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");

module.exports = function parseMultipartForm(event) {
  return new Promise((resolve) => {
    // we'll store all form fields inside of this
    let fields = {
      files: [],
    };

    // let's instantiate our busboy instance!
    const busboy = Busboy({
      // it uses request headers
      // to extract the form boundary value (the ----WebKitFormBoundary thing)
      headers: event.headers,
    });

    // before parsing anything, we need to set up some handlers.
    // whenever busboy comes across a file ...
    busboy.on(
      "file",
      (fieldname, filestream, file_details, transferEncoding, mimeType) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filetype = file_details.mimeType.split("/")[1];
        const saveTo = path.join(
          // process.env.NODE_ENV === "production"
          // ?
          os.tmpdir(),
          // : __dirname + "/upload"
          path.basename(
            file_details.filename.split(".")[0] +
              "-" +
              uniqueSuffix +
              `.${filetype}`
          )
        );
        filestream.pipe(fs.createWriteStream(saveTo));

        fields.files.push({
          ...file_details,
          type: mimeType,
          filepath: saveTo,
          // content: data,
        });

        // resolve(fields);

        // ... we take a look at the file's data ...
        // filestream.on("data", (data) => {
        //   // ... and write the file's name, type and content into `fields`.
        //   console.log("dattas", data);
        //   fields.file = {
        //     filename,
        //     type: mimeType,
        //     content: data,
        //   };
        // });
      }
    );

    // whenever busboy comes across a normal field ...
    busboy.on("field", (fieldName, value) => {
      // console.log("64 fields", fields);
      // ... we write its value into `fields`.
      fields[fieldName] = value;

      resolve(fields);
    });

    // once busboy is finished, we resolve the promise with the resulted fields.
    // busboy.on("close", () => {
    //   console.log(fields);
    //   resolve(fields);
    // });

    // now that all handlers are set up, we can finally start processing our request!
    busboy.write(Buffer.from(event.body, "base64"));
  });
};
