chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method == "changePage") {
          const text = document.querySelectorAll('a.email')
            for (let j = 0; j < text.length; j++) {
                var text_element = text[j].innerHTML.toLowerCase()
                let first_name = text_element.split(',')[1].split(" ")[1]
                let last_name = text_element.split(", ")[0]
                var filter_prof = json_data.filter(prof => prof.tFname.toLowerCase().replace(' ', '') == first_name && prof.tLname.toLowerCase().replace(' ', '') == last_name)
                if (filter_prof.length > 0) {
                    let prof_rating = filter_prof[0]["overall_rating"]
                    let prof_tid = filter_prof[0]["tid"]
                    let first_name = filter_prof[0]["tFname"]
                    let last_name = filter_prof[0]["tLname"]
                    text[j].innerHTML = text[j].innerHTML.replace(text[j].innerHTML, last_name + ", " + first_name + " " + prof_rating + " / 5.0")
                    text[j].href = text[j].href.replace(text[j].href , "https://www.ratemyprofessors.com/ShowRatings.jsp?tid=" + prof_tid)
                    sendResponse({
                    method: "changePage"
                    })
                }
            }
        return True
      }
  }
);