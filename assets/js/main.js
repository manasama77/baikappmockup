var _url = "https://my-json-server.typicode.com/manasama77/pwaapi/nama";

var dataResult = "";
var nama = "";

function renderPage(data) {

    $.each(data, function (key, items) {
        dataResult += `
      <option>${items.name}</option>
      `;
    });

    // console.log(dataResult)

    $('#test').html(dataResult);

}

var networkDataReceive = false;

// fresh data dari online
var networkUpdate = fetch(_url).then(function (response) {
    return response.json()
}).then(function (data) {
    networkDataReceive = true;
    renderPage(data);
});

// return data from cache
caches.match(_url).then(function (response) {
    if (!response) {
        throw Error('no data on cache');
    } else {
        return response.data.json()
    }
}).then(function (data) {
    if (!networkDataReceive) {
        renderPage(data);
        console.log('render data from cache');
    }
}).catch(function () {
    return networkUpdate;
})