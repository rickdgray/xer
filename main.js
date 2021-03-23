"use strict";
const parseData = (dataString) => {
    let data = {};
    let currentTable = '';
    const lines = dataString.split('\n');
    lines.forEach((line) => {
        const tokens = line.split('\t');
        switch (tokens[0]) {
            case '%T':
                currentTable = tokens[1];
                data[currentTable] = '';
                break;
            case '%F':
            case '%R':
                data[currentTable] = `${data[currentTable]}${tokens.slice(1).join(',')}\n`;
                break;
            default:
                break;
        }
    });
    return data;
};
const createDownloadLink = (filename, data) => {
    document.body.appendChild(document.createElement('br'));
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/csv,${encodeURIComponent(data)}`);
    element.setAttribute('download', `${filename}.csv`);
    element.innerHTML = filename;
    document.body.appendChild(element);
};
const updateTable = (tableData) => {
    const displayTable = document.getElementById('display-table');
    //update
};
const getFile = () => {
    var _a;
    const selectedFile = (_a = document.getElementById('fileInput').files) === null || _a === void 0 ? void 0 : _a[0];
    if (selectedFile && selectedFile.type === 'application/xer') {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target) {
                const data = parseData(event.target.result);
                for (let key in data) {
                    let table = data[key];
                    createDownloadLink(key, table);
                }
            }
        };
        reader.readAsText(selectedFile);
    }
    else {
        console.error('Invalid file!');
    }
};
const inputElement = document.getElementById('file-input');
inputElement.addEventListener('change', getFile, false);
