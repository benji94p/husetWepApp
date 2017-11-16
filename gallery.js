/* GALLERY */


function getMedia() {
    console.log("fzfz");
    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/media")
        .then(function (response) {
            return response.json()
        })
        .then(deployImage);
}

function getSingleEventById(myId) {
    console.log(myId);
    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/media/" + myId + "?_embed")
        .then(function (response) {
            return response.json()
        })
        .then(openGalleryModal);
}


function deployImage (json) {
    json.forEach(showImage);
}

function showImage (singleImage) {
     let section_gallery = document.querySelector(".section_gallery");
    let template = document.querySelector("#gallery_template").content;
     if (singleImage.title.rendered == "gallery") {
         let clone = template.cloneNode(true);
         clone.querySelector("#img_gallery").src = singleImage.source_url;
         clone.querySelector("#link_modal").href = "?id=" + singleImage.id;
         section_gallery.appendChild(clone);
    }
};

getMedia() ;

function openGalleryModal (json) {
    console.log(json);
    document.getElementById('myModal').style.display = "block";
    document.querySelector(".modal-content #big_img").src = json.media_details.sizes.full.source_url;
}

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");

if (id) {
    getSingleEventById(id);
}
