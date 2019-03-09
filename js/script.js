var album = document.querySelector('.album');
var galleryItem = document.querySelector('.galleryItem').content;
var mainImage = document.querySelector('.img');

window.onerror = function (msg, url, lineNo, columnNo, error) {
    // ... обработка ошибки ...
    alert(msg);
    return false;
}

function renderItems() {

    let fileNulmber = 1;
    while (fileNulmber < 15) {
        let newItem = galleryItem.cloneNode(true);
        imageUrl = "url('img/background" + fileNulmber + ".jpg'";
        newItem.querySelector('.imgThumb').style.backgroundImage = imageUrl;
        let tumb = newItem.querySelector('.imgThumb');
        newItem.querySelector('.imgThumb').onloadeddata = function (event) {
            alert('error!');
        }
        fileNulmber++;
        album.appendChild(newItem);
        console.log(tumb);
        let xyz = 0;
    }
}

renderItems();

function UrlExists(url) {
    var img = document.createElement('img');
    img.src = url;
    img.onload = function () {
        return true;
    };
    img.onerror = function () {
        return false;
    };
}
