export const saveJSON = (data: any, filename: string) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${filename}`;

    link.click();
}

export const saveFile = (data: any, filename: string) => {
    console.log(data);
    const href = window.URL.createObjectURL(data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', filename); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(href);
}

export const downloadTemplate = (name: string) => {
    // using Java Script method to get PDF file
    fetch('/templates/' + name).then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = name;
            alink.click();
        })
    })
}