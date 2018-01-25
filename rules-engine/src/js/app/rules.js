var RuleEngine = require('node-rules');

//Pass the fact on to the rule engine for results
var run = function(fact,data) {
	//initialize engine
    var R1 = new RuleEngine();
    R1.fromJSON(data);

    R1.execute(fact, function (result) {

        if(!result.result)
            console.log("Fact is accepted");
        else
            console.log("Fact is rejected");

    });
}

module.exports = {
    run: run
}