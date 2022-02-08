async function fetchProfData(firstName, lastName) {
    let url = `https://www.ratemyprofessors.com/filter/professor/?page=1&filter=teacherlastname_sort_s+asc&query=${firstName}%20${lastName}&queryoption=TEACHER&queryBy=schoolId&sid=1150`
    let res = await fetch(url);
    let data = await res.json();
    return data.professors[0];
}

function updateElement(element, data, sendResponse, firstName, lastName) {
    if (data === undefined) {
        element.innerHTML = element.innerHTML.replace(element.innerHTML, lastName.charAt(0).toUpperCase() + lastName.slice(1) + ", " + firstName.charAt(0).toUpperCase() + firstName.slice(1) + " (0 ratings)")
        return;
    }
    let emoji = ""
    let first_name = data["tFname"];
    let last_name = data["tLname"]
    let num_ratings = data["tNumRatings"]
    let prof_rating = data["overall_rating"]
    if (prof_rating > 4.0) {
        emoji = "✅"
    } else if (prof_rating < 3.0) {
        emoji = "❌"
    }
    if (prof_rating == "N/A") {
        prof_rating = ""
    } else {
        prof_rating = prof_rating + " / 5.0"
    }
    element.innerHTML = element.innerHTML.replace(element.innerHTML, emoji + " " + last_name + ", " + first_name + " " + prof_rating + " (" + num_ratings + " ratings)")
    sendResponse({
        method: "changePage",
    })
}

async function updateProfData(element, firstName, lastName, sendResponse) {
    let data = await fetchProfData(firstName, lastName);
    updateElement(element, data, sendResponse, firstName, lastName);
}

chrome.runtime.onMessage.addListener(
    
    function(request, sender, sendResponse) {
        while(1){
                console.log("Start")
            var pageNum = document.getElementsByClassName("page-number enabled")[0]

            if (request.method == "changePage") {

                const text = document.querySelectorAll('a.email')

                console.log(pageNum.value)

                var prevPgNum = pageNum.value
                

                for (let j = 0; j < text.length; j++) {
                    var text_element = text[j].innerHTML.toLowerCase()
                    if (text_element.split(' ').length > 3) {
                        return
                    }
                    let first_name = text_element.split(',')[1].split(" ")[1]
                    let last_name = text_element.split(", ")[0]
                    console.log("Updating " + first_name + " " + last_name)
                    text[j].style.textDecoration = "none"
                    updateProfData(text[j], first_name, last_name, sendResponse)

                }
                console.log("Current:" + pageNum.value)
                console.log("Prev:" + prevPgNum)
                if(pageNum.value == prevPgNum)
                    console.log("hello2")
                
                else return true;

                
        }
        }
        
        
    }
);