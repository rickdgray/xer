const parseData = (dataString: string) => {
    let data: Record<string, string> = {};

    const lines = dataString.split("\n");
    lines.forEach((line: string) => {
        const tokens = line.split("\t");
        
        switch(tokens[0]) {
            case "%T":
                if (tokens[1]) {
                    //data[tokens[1]] = 
                } else {
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