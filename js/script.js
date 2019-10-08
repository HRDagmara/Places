'use strict';

var templateListPlaces = document.getElementById('template-list-places').innerHTML;
Mustache.parse(templateListPlaces);
var generatedList = '';

for (var i = 0; i < slides.length; i++) {
    generatedList += Mustache.render(templateListPlaces, slides[i]);
};

carousel.insertAdjacentHTML('beforeend', generatedList);

// Flickity plugin

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    hash: true
});


var restartButton = document.querySelector('.button--restart');
restartButton.addEventListener('click', function () {
    flkty.select(0);
});

var progressBar = document.querySelector('.progress-bar')

flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});


var par = true;

window.initMap = function () {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: slides[flkty.selectedIndex].coords
    });

    for (var i = 0; i < slides.length; i++) {
        var marker = new google.maps.Marker({
            position: slides[i].coords,
            map: map
        });
        (function (i) {
            marker.addListener('click', function () {
                par = false;
                flkty.select(i);
            });
        })(i);
    };

    flkty.on('change', function (index) {
        if (par) {
            map.panTo(slides[index].coords);
            map.setZoom(10);
        } else {
            par = true;
        };
    });
};

