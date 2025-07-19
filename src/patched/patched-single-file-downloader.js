chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'singlefile.downloader') {
        downloadBlob(message.downloadInfo.url, message.downloadInfo.filename);
        sendResponse({});
    }
});

function downloadBlob(url, filename) {
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}