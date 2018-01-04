var initialize = require('./initialize');
var firebase = initialize.firebase

//firebase database reference
var mDatabaseRef= firebase.database().ref();

//Node names
var parent_node 	= "nuggets/"

var getParentRef	= function(){
    return mDatabaseRef.child(parent_node);
}

//converts to string even if null and remves extra space
function checkNull(data) {
    if(data==null)
        return ""
    else
        return data.toString().trim()
}

//sets request object
function pushData(list){
var i,id,desc,baseStart,baseFinish;
    for(i in list) {
        id = checkNull(list[i].activityId)
        desc = checkNull(list[i].description)
        baseStart = checkNull(list[i].baselineStart)
        baseFinish = checkNull(list[i].baselineFinish)

        getParentRef().push({
            "activityId":id,
            "description":desc,
            "baselineStart":baseStart,
            "baselineFinish":baseFinish
        });
    }
}


module.exports ={
    pushData : pushData
};