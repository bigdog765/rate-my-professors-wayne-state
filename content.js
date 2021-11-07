chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.method == "changePage") {
          const text = document.querySelectorAll('a.email')
          for (let j = 0; j < text.length; j++) {
              first_name = text[j].innerHTML.split(',')[1].split(" ")[1]
              last_name = text[j].innerHTML.split(", ")[0]
              let filter_prof = json_data.filter(prof => prof.tFname == first_name && prof.tLname == last_name)
              prof_rating = filter_prof[0]["overall_rating"]
              prof_tid = filter_prof[0]["tid"]
              if (text[j].innerHTML.includes(last_name) && text[j].innerHTML.includes(first_name)) {
                  text[j].innerHTML = text[j].innerHTML.replace(text[j].innerHTML, last_name + ", " + first_name + " " + prof_rating + " / 5.0")
                  text[j].href = text[j].href.replace(text[j].href , "https://www.ratemyprofessors.com/ShowRatings.jsp?tid=" + prof_tid)
                  sendResponse({
                      method: "changePage"
                  })
              }
          }
      }
      return True
  }
);