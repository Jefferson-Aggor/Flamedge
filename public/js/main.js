function addMarkersToMap(map) {
    var dhealth = new H.map.Marker({ lat: 5.5418, lng: -0.2396 });
    map.addObject(dhealth);
}

var platform = new H.service.Platform({
    apikey: "s3iK6TNEMvpuRm1cWbnFs1QakMA8OSVowNaQJcuAbRU"
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(
    document.getElementById("map"),
    defaultLayers.vector.normal.map, {
        center: { lat: 5.5418, lng: -0.2396 },
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1
    }
);

window.addEventListener("resize", () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

window.onload = function() {
    this.addMarkersToMap(map);
};