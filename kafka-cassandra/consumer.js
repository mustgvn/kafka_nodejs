const {
    Kafka
} = require("kafkajs");

const cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'example_keyspace' });


//const Kafka = require("kafkajs")();

// node consumer.js Logs || Logs2 
const topic_name = process.argv[2] || "Logs2";

let count = 0;
createConsumer();

async function createConsumer() {
    try {
        const kafka = new Kafka({
            clientId: "kafka_ornek_1",
            brokers: ["10.140.235.119:9092"] //birden fazla varsa bu array içerisine tanımıyoruz.
        });

        const consumer = kafka.consumer({
            groupId: "ornek_1_consumer_group_1 "
        });
        console.log("Consumer'a bağlanılıyor ...");

        await consumer.connect();
        console.log("Consumer'a bağlantı başarılı ...");

        //consumer Subscribe ..
        await consumer.subscribe({
            topic: topic_name, //"Logs",
            fromBeginning: true //başlangıçtan başla
        })


        await consumer.run({
            eachMessage: async result => {
                count++;
                console.log(
                    `Gelen Mesaj ${result.message.value}, Par => ${result.partition}, Count : ${count}`
                );
        
                getCustomers();

            }
        });

    } catch (error) {
        console.log("Bir hata oluştu ", error)
    }

}
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