var config = require('./config');
var couchbase = require('couchbase');
var db = new couchbase.Connection({host: config.couchbase.host + ":" + config.couchbase.port, bucket: config.couchbase.bucket, queryhosts: config.couchbase.queryHosts});

// Set up timer
var start = process.hrtime();

var elapsed_time = function(note){
    var precision = 3; // 3 decimal places
    var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note); // print message + time
    start = process.hrtime(); // reset the timer
}

function purgeRecords() {
    if(config.purgeBucket) {
        var query = db.query("SELECT * FROM " + config.couchbase.bucket, function(err, results) {
            if(err)
                throw err;
                
            if(config.purgeBucket) {
                console.log("Deleting " + results.length + " results");
                
                for(key in results) {
                    db.remove(key, function(err, results) {
                        if(err)
                            throw err;
                    });
                }
            }
            
            queryView();
        });
    }
    else
        queryView();
}

function queryView() {
    console.log("Querying using a view: " + config.couchbase.docName + " | " + config.couchbase.viewName);
    start = process.hrtime();
    
    var query = db.view(config.couchbase.docName, config.couchbase.viewName);
    query.query(function(err, results) {
        console.log("Done querying... " + results.length + " results");
        elapsed_time("Querying with view");
        
        if(err)
            throw err;
        
        queryN1QL();
    });
}

function queryN1QL() {
    console.log("======================================");
    console.log("Querying with N1QL: " + config.n1qlquery);
    start = process.hrtime();
    
    var query = db.query(config.n1qlquery, function(err, results) {
        console.log("Done querying... " + results.length + " results");
        elapsed_time("Querying with N1QL");
        
        if(err)
            throw err;
        
        completeQuery();
    });
}

function completeQuery() {
    console.log("Completed benchmarking.\n");
    process.exit(code=0);
}

function startProc() {
    purgeRecords();
}

////////////////////////////////////
// MAKE ALL EDITS BELOW THIS LINE //
////////////////////////////////////

startProc();
