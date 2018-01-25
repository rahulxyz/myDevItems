//It writes the given rules to json file
var RuleEngine = require('node-rules');
var fs= require('fs')

//define the rules
var rules = [{
    "condition": function(R) {
        //if condition is true then consequence is executed and result is false
        R.when(this.size<500)
    },
    "consequence": function(R) {
        console.log("Consequence")
        this.result = false;
        R.stop();
    }
}];

//writes rule to file
var writeFile= function (path,data) {
    //console.log(data)
    fs.writeFile(path, data, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

//initate writing rules
var initiate = function () {
    //initialize the rule engine
    var R = new RuleEngine(rules);
    var store = R.toJSON();
    writeFile('../rules/rulesFile.json',
        JSON.stringify(store))
}

initiate()
