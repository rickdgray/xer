const parseData = (dataString: string) => {
    let data: Record<string, string> = {};
    let currentTable: string = "";
    const lines = dataString.split("\n");
    lines.forEach((line: string) => {
        const tokens = line.split("\t");
        
        switch(tokens[0]) {
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
}

const getFile = (): void => {
    const selectedFile = (document.getElementById("fileInput") as HTMLInputElement).files?.[0];

    if (selectedFile && selectedFile.type === "application/xer") {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>): void => {
            if (event.target) {
                parseData(event.target.result as string);
            }
        };
        reader.readAsText(selectedFile);
    } else {
        console.error("Invalid file!");
    }
}

const inputElement = document.getElementById("fileInput") as HTMLInputElement;
inputElement.addEventListener("change", getFile, false);