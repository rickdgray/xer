"use strict";
const parseData = (data) => {
    const lines = data.split("\n");
    let currentTable = "";
    lines.forEach((line) => {
        const tokens = line.split("\t");
        switch (tokens[0]) {
            case "%T":
                if (tokens[1]) {
                    currentTable = tokens[1];
                    console.log(currentTable);
                }
                else {
                    console.error("Invalid File");
                }
                break;
            case "%F":
                break;
            case "%R":
                break;
            case "%E":
                console.log("parse complete");
                break;
            default:
                break;
        }
    });
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
