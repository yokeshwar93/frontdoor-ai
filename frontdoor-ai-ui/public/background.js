chrome.runtime.onMessage.addListener(({ type, summary }) => {
    if (type === "summarise") {
        console.log(summary)
    }
});