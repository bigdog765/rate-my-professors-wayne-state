chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method == "changePage") {
          const text = document.querySelectorAll('a.email')
            for (let j = 0; j < text.length; j++) {
              var text_element = text[j].innerHTML.toLowerCase()
              let first_name = text_element.split(',')[1].split(" ")[1]
              let last_name = text_element.split(", ")[0]
              var filter_prof = json_data.filter(prof => prof.tFname.toLowerCase().replace(' ', '').includes(first_name) && prof.tLname.toLowerCase().replace(' ', '') == last_name)
              text[j].style.textDecoration = "none"
              if (filter_prof.length > 0) {
                  let prof_rating = filter_prof[0]["overall_rating"]
                  let first_name = filter_prof[0]["tFname"]
                  let last_name = filter_prof[0]["tLname"]
                  let num_ratings = filter_prof[0]["tNumRatings"]
                  let emoji = ""
                  if (prof_rating > 4.0){
                    emoji = "✅"
                  }
                  else if (prof_rating < 3.0){
                    emoji = "❌"
                  }
                  text[j].innerHTML = text[j].innerHTML.replace(text[j].innerHTML, emoji + " " + last_name + ", " + first_name + " " + prof_rating + " / 5.0 (" +  num_ratings + " ratings)")
                  sendResponse({
                  method: "changePage", 
                   })
              } else{
                text[j].innerHTML = text[j].innerHTML.replace(text[j].innerHTML, last_name.charAt(0).toUpperCase() + last_name.slice(1) + ", " + first_name.charAt(0).toUpperCase() + first_name.slice(1) + " " + "N/A / 5.0 (0 ratings)")
                }
             }
            return True
        }
    }
);