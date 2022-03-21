mapboxgl.accessToken = 'pk.eyJ1IjoiYW15LW1vb2R5IiwiYSI6ImNrenkyZWY1MDA3aGEycHA3NGl1OHl0M3IifQ.VIahngF3tjl55qd8aQEL7g';

const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/amy-moody/cl0mprp8b000415pcuibt5s3e' // replace this with your style URL
});

map.on('load', () => {const layers = [
  'Population Density lowest to highest',
  '0.3-53.4',
  '53.4-106.6',
  '106.6-159.9',
  '159.9-212.9',
  '212.9+'
];
const colors = [
  '#ffffff',
  '#FEF0D9',
  '#FDCC8A',
  '#FC8D59',
  '#E34A33',
  '#B30000'
];
// create legend
const legend = document.getElementById('legend');

layers.forEach((layer, i) => {
  const color = colors[i];
  const item = document.createElement('div');
  const key = document.createElement('span');
  key.className = 'legend-key';
  key.style.backgroundColor = color;

  const value = document.createElement('span');
  value.innerHTML = `${layer}`;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
});                      
  // the rest of the code will go in here
 map.addSource("hover", {
   type: "geojson",
   data: { type: "FeatureCollection",      features: [] }
  });

  map.addLayer({
   id: "dz-hover",
   type: "line",
   source: "hover",
   layout: {},
   paint: {
    "line-color": "black",
    "line-width": 4
   }
   });                   
  map.on('mousemove', (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ['popden']
  }); 
 document.getElementById('pd').innerHTML = dzone.length
    ? `<h3>${dzone[0].properties.area_name}</h3><p>Population Density: <strong>${dzone[0].properties.density}</strong> number of persons per hectare </p>`
     : `<p>Hover over a data zone! Click the money to find out employment rate!</p>`;
});
  map.addControl(new mapboxgl.NavigationControl(),"top-left");
  map.addControl(
 new mapboxgl.GeolocateControl({
 positionOptions: {
 enableHighAccuracy: true
 },
 trackUserLocation: true,
 showUserHeading: true
 }),
 "top-left"
);
  const geocoder = new MapboxGeocoder({
    // Initialize the geocoder
 accessToken: mapboxgl.accessToken, // Set the access token
 mapboxgl: mapboxgl, // Set the mapbox-gl instance
 marker: false, // Do not use the default marker style
 placeholder:"Search for places in Glasgow", // Placeholder text for the search bar
 proximity: {
 longitude: 55.8642,
 latitude: 4.2518
 } // Coordinates of Glasgow center
});                     
/* 
Add an event listener that runs
  when a user clicks on the map element.
*/

                      
});

map.on('click', (event) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ['economic-data'] // replace with your layer name
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  // Code from the next step will go here.
/* 
    Create a popup, specify its options 
    and properties, and add it to the map.
  */
const popup = new mapboxgl.Popup({ offset: [0, -15] })
  .setLngLat(feature.geometry.coordinates)
  .setHTML(
    `<h3>${feature.properties.area_name}</h3><p>Total Percentage Employed: ${feature.properties.employed_total_perc}</p>`
  )
  .addTo(map);  
 

});