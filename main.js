"use strict";
let getFile = () => {
    var _a;
    const selectedFile = (_a = document.getElementById("fileInput").files) === null || _a === void 0 ? void 0 : _a[0];
    if (selectedFile === null) {
        return;
    }
    console.log(selectedFile.name);
};
const inputElement = document.getElementById("fileInput");
inputElement.addEventListener("change", getFile, false);
