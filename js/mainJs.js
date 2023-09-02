function debounce(cb, delay = 250) {
    let timeout

    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}

const input = debounce(() => {
    let inputText = document.getElementById('portalSearch').value;
    let photos = document.getElementsByTagName('img');
    for (let photo of photos) {
        if(!photo.alt.toLowerCase().includes(inputText.toLowerCase())){
            photo.style.display = 'none';
        }
        else{
            photo.style.display = 'initial'
        }
    }
},400);

const makeInfoNotification = () => {
    let notification = new Notify('Sukces', 'Link do portalu skopiowany do schowka', 'success',{
        vAlign: 'bottom',
        hAlign: 'right',
        autoClose: true,
        autoCloseDuration: 3000,
        closeOnCrossClick: true,
        closeOnNotifyClick: false,
    });
}

const cityChange = () => {
    let selector = document.getElementById('city-Select');
    let option = selector.value;
    reloadPhotos2(option);
}

const getPossibleCities = () => {
    let selector = document.getElementById('city-Select');
    Object.keys(portalData).forEach(city => {
        let option = document.createElement('option')
        option.value = city;
        option.innerText = city.charAt(0).toUpperCase() + city.slice(1);
        selector.appendChild(option);
    })
    setSelector();
}

const setSelector = () =>{
    const urlSearchParams = new URLSearchParams(window.location.search);
    let city = Object.fromEntries(urlSearchParams.entries()).city;
    console.log(city);
    if (typeof city !== 'undefined'){
        let selector = document.getElementById('city-Select');
        selector.value = city;
    }
}

const copyLink2 = (htmlElement) => {
    let inputText = document.createElement('input');
    // console.log("Click event");
    // console.log(htmlElement.target.innerText);
    // console.log(htmlElement.target.textContent);
    // console.log(htmlElement.target);
    let linkField = document.getElementById("portal-link");
    let link = htmlElement.target.textContent.replaceAll("amp;","")
    console.log(link);
    linkField.setAttribute('value', link);
    inputText.setAttribute('value', link);
    document.body.appendChild(inputText);
    inputText.select();
    document.execCommand("copy");
    makeInfoNotification();
    inputText.parentNode.removeChild(inputText);
}

function onDocumentLoaded(){
    downloadData();
}

