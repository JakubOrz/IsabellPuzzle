let portalData = undefined;

function downloadData(){
    fetch(`data/alldata.json`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            portalData = json;
            getPossibleCities();
            reloadPhotos2();
        }).catch((e) => {
        console.error("Problem z załadowaniem zdjęć" + e.toString())
    });
    console.log("Pobrano dane z bin")
}

function generateIntelLink(lat, lng){
    let latParsed = (lat * 100) / 100000000;
    let lngParsed = (lng * 100) / 100000000;
    return `https://intel.ingress.com/intel?ll=${latParsed},${lngParsed}&z=17&pll=${latParsed},${lngParsed}`;
}


function reloadPhotos2(cityname = undefined){
    let city;
    if (typeof cityname === 'undefined') {
        const urlSearchParams = new URLSearchParams(window.location.search);
        city = Object.fromEntries(urlSearchParams.entries()).city;
        if (typeof city === 'undefined'){
            city = document.getElementById('city-Select').getElementsByTagName('option')[0].value;
        }
    }
    else{
        city = cityname;
    }
    // console.log(`info: ładowanie danych z miasta ${city}`);
    let photosDiv = document.getElementById("photos");
    photosDiv.replaceChildren();
    let loader = document.getElementById('loader');
    if (loader != null) {
        loader.parentNode.removeChild(loader);
    }
    portalData[city].forEach(portal => {
        let photoElement = document.createElement('img');
        photoElement.src = portal.image;
        photoElement.alt = portal.title;
        photoElement.innerText = generateIntelLink(portal.lat, portal.lng);
        photoElement.addEventListener('click', copyLink2)
        photosDiv.appendChild(photoElement);
    })

}
