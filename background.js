chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        tabURL = tabs[0].url
        if (tabURL == "https://registration.wayne.edu/StudentRegistrationSsb/ssb/classRegistration/classRegistration") {
            chrome.tabs.sendMessage(tabs[0].id, {
                method: "changePage"
            }, function(response) {});
        }
    });
});