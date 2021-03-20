"use strict";
const parseData = (data) => {
    console.log(data);
};
const getFile = () => {
    var _a;
    const selectedFile = (_a = document.getElementById("fileInput").files) === null || _a === void 0 ? void 0 : _a[0];
    if (selectedFile && selectedFile.type === "application/xer") {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target) {
                parseData(event.target.result);
            }
        };
        reader.readAsText(selectedFile);
    }
    else {
        console.error("Invalid file!");
    }
};
const inputElement = document.getElementById("fileInput");
inputElement.addEventListener("change", getFile, false);
