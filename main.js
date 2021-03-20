"use strict";
const parseData = (dataString) => {
    let data = {};
    let currentTable = "";
    const lines = dataString.split("\n");
    lines.forEach((line) => {
        const tokens = line.split("\t");
        switch (tokens[0]) {
            case "%T":
                data[currentTable] = "";
                break;
            case "%F":
            case "%R":
                data[currentTable] = `${data[currentTable]}${tokens.slice(1).join(",")}\n`;
                break;
            case "%E":
                console.log("parse complete");
                break;
            default:
                console.log(`>>>MISSED TOKEN ${tokens[0]}`);
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
