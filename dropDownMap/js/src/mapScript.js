//1. Map Module
var map;
var locationList=[];
var dateList = []

//initialize google map
function initMap() {
    var defaultLoc ={lat: 28.70, lng: 77.10}
    map = new google.maps.Map(document.getElementById('map'), {
        center: defaultLoc,
        zoom: 4
    });

    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });

}

//Fetch current date as string
function getCurrentDate() {
    var d= new Date();
    var month= d.getMonth()+1;
    var date = d.getDate()+'/'+month+'/'+d.getFullYear();
    return date;
}

function placeMarker(location) {
   var date = getCurrentDate();
    console.log(date)
    var latlng ={
        lat: location.lat(),
        lng: location.lng()
    }
    var marker = new google.maps.Marker({
        position: location,
        title: date,
        map: map
    });

   locationList.push(latlng)
    dateList.push(date)
}

//on selecting user, locations are setup
function setUpUserLocation(location,date){
    var marker = new google.maps.Marker({
        position: location,
        title: date,
        map: map
    });
}

//push user data to firebase
function submit(){
    console.log("submitted")
    var user = new User();
    user.name = document.getElementById("username").value
    user.locationList = locationList;
    user.dateList = dateList
    pushData(user);
}


var User = class{

    constructor(username,location,date){
        this.name= username
        this.locationList = location
        this.dateList = date
    }
}


//2. Database Module
var firebase;
var config = {
    apiKey: "<KEY>",
    authDomain: "<DOMAIN>",
    databaseURL: "<DatabaseUrl>"
};
firebase.initializeApp(config);

//firebase database reference
var mDatabaseRef= firebase.database().ref();

//Node names
var parent_node 	= "user_locations/"

var getParentRef	= function(){
    return mDatabaseRef.child(parent_node);
}

//converts to string even if null
function checkNull(data) {
    if(data==null)
        return "username"
    else
        return data.toString().trim()
}

//sets request object
function pushData(user){
    var name;

    name = checkNull(user.name)
    getParentRef().push({
        "username": name,
        "locations": user.locationList,
        "dates": user.dateList
    });

}


//3. DropDown
//Initializes drop down
initiate()

//fetch drop down data and set it
function initiate() {
    fetchDropDownData().then(
        function (list) {
            setDropDown(list)
        }
    )
}

//fetch drop down data
var userList=[]
var userLoc = []
var userDates =[]
function fetchDropDownData() {
    return new Promise(function(resolve, reject) {
        var data;

        getParentRef().on('value', function (snapshot) {

            snapshot.forEach(function (child) {
                var key = child.key;
                var eachUser = child.val();

                var name = eachUser.username;
                userList.push(name);

                var loc = eachUser.locations
                userLoc.push(loc);

                var date= eachUser.dates;
                userDates.push(date)
            })

        resolve(userList);
    })
})
}

//set drop down data
function setDropDown(list) {
    var select = document.getElementById("dropdown")

    var i;
    for (i = 0; i < list.length; i++) {
        var option = document.createElement("OPTION")
        var txt = document.createTextNode(list[i])
        option.appendChild(txt)
        select.insertBefore(option, select.lastChild)
    }

    console.log("Dropdown set");
}

//submit on selecting a user
function submitUser() {
    //refreshes map
    initMap()

    var e = document.getElementById("dropdown");
    var strUser = e.options[e.selectedIndex].value;

    if(e.selectedIndex!=0) {
        console.log(e.selectedIndex + " " + strUser)
        var index = e.selectedIndex - 1
        for (var j = 0; j < userLoc[index].length; j++) {
            setUpUserLocation(userLoc[index][j], userDates[index][j])
            console.log(userLoc[index][j]+" "+ userDates[index][j])
        }
    }
}
