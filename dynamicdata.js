/* ALL EVENTS.HTML */
function getAllEvents () {
    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/create_event?_embed")
    .then(function(response){
        return response.json()
    })
    .then(showEvents);
}

function getAllEventsByCategories (id) {
    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/create_event?_embed&categories="+id)
    .then(function(response){
        return response.json()
    })
    .then(showEvents);
}

function getSingleEventById (myId) {
    console.log(myId);
    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/create_event/"+myId+"?_embed")
    .then(function(response){
        return response.json()
    })
    .then(showDetailedEvent);
}


function showEvents (data) {
    let list = document.querySelector("#eventList");
    let template = document.querySelector("#eventsTemplate").content;

    data.forEach(function(theEvent) {
        let clone = template.cloneNode(true);
        clone.querySelector("#title_events").innerHTML = theEvent.title.rendered;
        clone.querySelector("#date_event").innerHTML = theEvent.acf.dates;
        clone.querySelector("#price").innerHTML = theEvent.acf.price + "$";
        if ( theEvent.better_featured_image !== null) {
            clone.querySelector("#event_img").src = theEvent.better_featured_image.source_url;
        }
        clone.querySelector("#detail_event").href = "event.html?id="+theEvent.id;
        list.appendChild(clone);
    })

}

function getMenu () {
    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/categories")
    .then(function(response){
        return response.json()
    })
    .then(showMenu);
}

function showMenu (categories) {
    console.log(categories);
    let lt = document.querySelector('#linkTemplate').content;
    categories.forEach(function(categorie) {
        let clone = lt.cloneNode(true);
        let parent = document.querySelector("#categories_menu");
        clone.querySelector("a").textContent = categorie.name;
        clone.querySelector("a").href = "events.html?categorieid="+ categorie.id;
        parent.appendChild(clone);
    })

}

//http://digitartpzm.dk/wordpress/wp-json/wp/v2/create_event?categories=1
function showDetailedEvent (json) {
    console.log(json);
    if ( json.better_featured_image !== null) {
            document.querySelector("#singleEvent #event_img").src = json.better_featured_image.source_url;
        }
    document.querySelector("#singleEvent h1").textContent = json.title.rendered;

}


let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let categorieid = searchParams.get("categorieid");

getMenu();

if (id) {
    getSingleEventById(id);
}
if (categorieid) {
    getAllEventsByCategories(categorieid);
}
else {
    getAllEvents();
}

