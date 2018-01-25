var rules= require('./rules.js')
const storage = require('./appStorage.js')

//class for creating fact
class Data{
    constructor(user,color,size) {
        this.user = user;
        this.color = color;
        this.size= size
    }
}

//Applies rule to fact
var shareIt = function () {
    console.log("Share is clicked")

    var user= "Rahul"
    var color= "green"
    var size = 200

    var fact = createFact(new Data(user,color,size))

    storage.downloadFile(fact)

}

//creates fact with given data
var createFact = function (data) {
    var fact={
        "color": data.color,
        "user":  data.user,
        "size": parseInt(data.size)
    }
    return fact
}

//replicates shareIt() call on click
var initiate= function () {
    shareIt()
}

initiate()