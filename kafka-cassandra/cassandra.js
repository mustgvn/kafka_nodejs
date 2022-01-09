const cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'example_keyspace' });




getCustomers();
function getCustomers(){
    try {
        const query = 'INSERT INTO example_keyspace.metrics(id, assetid, cpuload, cpuusage, diskusage, memusage) VALUES ('+create_UUID()+', '+getrandom()+','+getrandom()+','+getrandom()+','+getrandom()+','+getrandom()+');';
        client.execute(query, null, function (err, result) {
            console.log('User with email %s', result);
        });
    
    
    } catch (error) {
        console.log("Bir hata Oluştu -->", error)
    }
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
function getrandom(){
   return Math.floor(Math.random() * 100);
}

