let getFile = (): void => {
    const selectedFile = (document.getElementById("fileInput") as HTMLInputElement).files?.[0];

    if (selectedFile && selectedFile.type === "application/xer") {
        const reader = new FileReader();
        reader.onload = (event: Event): void => {
            console.log(event.target);
        };
        reader.readAsText(selectedFile);
    } else {
        console.error("Invalid file!");
    }
}

const inputElement = document.getElementById("fileInput") as HTMLInputElement;
inputElement.addEventListener("change", getFile, false);