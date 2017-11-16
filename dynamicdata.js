

/* ALL EVENTS.HTML */
function getAllEvents() {
    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/create_event?_embed&per_page=11")
        .then(function (response) {
            return response.json()
        })
        .then(showEvents);
}

function getAllEventsByCategories(id) {
    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/create_event?_embed&categories=" + id)
        .then(function (response) {
            return response.json()
        })
        .then(showEvents);
}

function getSingleEventById(myId) {
    console.log(myId);
    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/create_event/" + myId + "?_embed")
        .then(function (response) {
            return response.json()
        })
        .then(openModal);
}


function showEvents(data) {
    let list = document.querySelector("#eventList");
    let template = document.querySelector("#eventsTemplate").content;

    data.forEach(function (theEvent) {
        let clone = template.cloneNode(true);
        clone.querySelector("#title_events").innerHTML = theEvent.title.rendered;
        clone.querySelector("#date_event").innerHTML = theEvent.acf.dates;
        clone.querySelector("#price").innerHTML = theEvent.acf.price + "$";
        if (theEvent.better_featured_image !== null) {
            clone.querySelector("#event_img").src = theEvent.better_featured_image.source_url;
        };
        let detailButton = clone.querySelector("#detail_event");
        detailButton.href = "?id=" + theEvent.id;
        detailButton.addEventListener("click", openModal);
        list.appendChild(clone);
    })

}

function getMenu() {
    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/categories")
        .then(function (response) {
            return response.json()
        })
        .then(showMenu);
}

function showMenu(categories) {
    let lt = document.querySelector('#linkTemplate').content;
    categories.forEach(function (categorie) {
        if (categorie.name !== "Uncategorized") {
            let clone = lt.cloneNode(true);
            let parent = document.querySelector("#categories_menu");
            clone.querySelector("a").textContent = categorie.name;
            clone.querySelector("a").href = "events.html?categorieid=" + categorie.id;
            parent.appendChild(clone);
        }

    })

}


function openModal(json) {
    console.log(json);
    document.getElementById('myModal').style.display = "block";
    document.querySelector(".modal-content #big_img").src = json.better_featured_image.source_url;
    document.querySelector(".modal-content #h_modal").innerHTML = json.title.rendered;
    document.querySelector(".modal-content #full_d").innerHTML =  json.excerpt.rendered;
    document.querySelector(".modal-content #date_modal").innerHTML = json.acf.dates;
    document.querySelector(".modal-content #time_modal").innerHTML = json.acf.time;
    document.querySelector(".modal-content #price_modal").innerHTML = json.acf.price;
    document.querySelector(".modal-content #fb_event").innerHTML = json.acf.facebook_event_page;
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
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
} else {
    getAllEvents();
}


/* Slider Pages HOMEPAGE */

var elements = [
    {
        page_name:"Events", img_url:"img/slider/moodboard2@1x.png",
        link:"events.html",
    },
    {
        page_name:"Gallery", img_url:"img/slider/gallery_thumbnail@1x.png",
        link:"gallery.html",
    },
    {
        page_name:"Pratical infos", img_url:"img/slider/infos_thumbnail@1x.png",
        link:"infos.html",
    },
    {
        page_name:"Contact", img_url:"img/slider/contact_thumbnail@1x.png",
        link:"contact.html",
    }
]

var i = 0;
let arrowRight = document.querySelector('#arrow_right');
let arrowLeft = document.querySelector('#arrow_left');
let divContainer = document.querySelector('.slider_container');
let headerSwitcher = document.querySelector('.switch_pages_header');
let linkSlider = document.querySelector("#link_slider");

function changeSlider (i) {
    let pathImage = elements[i].img_url;
    divContainer.style.backgroundImage = "url"+ "("+ pathImage + ")";
    headerSwitcher.innerHTML = elements[i].page_name;
    linkSlider.href = elements[i].link;
    if (i>0) {
        divContainer.classList.add("flipInX");
        divContainer.addEventListener("animationend", function() {
            divContainer.classList.remove("flipInX");
        })
    }
}

changeSlider(i);

arrowRight.addEventListener("click",function() {
    i++;
    changeSlider(i);
    console.log(i);
    if (i ==3) {
        i=0;
    }
})

arrowLeft.addEventListener("click",function() {
    i--;
    changeSlider(i);

})

/* GALLERY */


function getMedia() {
    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/media")
        .then(function (response) {
            return response.json()
        })
        .then(deployImage);
}

function deployImage (json) {
    json.forEach(showImage);
}

function showImage (singleImage) {
     if (singleImage.title.rendered == "gallery") {
        console.log(singleImage);
    }
};

getMedia() ;

