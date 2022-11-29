var mylatlng={ lat:20.5937, lng:78.9629}
var mapOptions ={
    center: mylatlng,
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

// create a map

var map= new google.maps.Map(document.getElementById("googleMap"), mapOptions)

// create adirections service object to use the route method and get the a result for our request

var directionsService = new google.maps.DirectionsService();

// create a direction display which we will use to display the route

var directionsDisplay = new google.maps.DirectionsRenderer();

// bind the direction display to the map

directionsDisplay.setMap(map);

// function

function calcRoute(){
    // create request
    var request = {
        
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL

    }

    // Pass the request to the route method

    directionsService.route(request, (result, status) => {
        if(status==google.maps.DirectionsStatus.OK){
            // get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'> From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance : " + result.routes[0].legs[0].distance.text + ".<br />Duration : " + result.routes[0].legs[0].duration.text + ".</div>";

            // display route
            directionsDisplay.setDirections(result);
        }
        else{
            // delete route from map
            directionsDisplay.setDirections({routes: []});

            // centre map in india
            map.setCenter(mylatlng);

            // show error message
            output.innerHTML="<div class='alert-danger'> Could not retrieve driving distance. </div>";
        }
    }); 
}

// create autocomplete

var options={
    types: ['(cities)']
}

var input1=document.getElementById("from");
var autocomplete1=new google.maps.places.Autocomplete(input1, options)

var input2=document.getElementById("to");
var autocomplete2=new google.maps.places.Autocomplete(input2, options)