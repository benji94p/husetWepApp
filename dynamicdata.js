function getData () {
    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/create_event?_embed")
    .then(function(response){
        return response.json()
    })
    .then(showEvents);
}

function showEvents (data) {
    let list = document.querySelector("#eventList");
    let template = document.querySelector("#eventsTemplate").content;

    data.forEach(function(theEvent) {
        console.log(theEvent);
        let clone = template.cloneNode(true);
        clone.querySelector("#title_events").innerHTML = theEvent.title.rendered;
        clone.querySelector("#date_event").innerHTML = theEvent.acf.dates;
        clone.querySelector("#price").innerHTML = theEvent.acf.price + "$";
        if ( theEvent.better_featured_image !== null) {
            clone.querySelector("#event_img").src = theEvent.better_featured_image.source_url;
        }
        list.appendChild(clone);
    })

}

getData();
