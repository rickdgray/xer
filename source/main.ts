let getFile = (): void => {
    const selectedFile = (document.getElementById("fileInput") as HTMLInputElement).files?.[0];

    if (selectedFile === null) {
        return;
    }

    console.log(selectedFile!.name);
}

const inputElement = document.getElementById("fileInput") as HTMLInputElement;
inputElement.addEventListener("change", getFile, false);