const {
    Kafka
} = require("kafkajs");
//const Kafka = require("kafkajs")();

// node consumer.js Logs || Logs2 
const topic_name = process.argv[2] || "Logs2";

let count = 0;
createConsumer();

async function createConsumer() {
    try {
        const kafka = new Kafka({
            clientId: "kafka_ornek_1",
            brokers: ["192.168.1.77:9092"] //birden fazla varsa bu array içerisine tanımıyoruz.
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
            }
        });

    } catch (error) {
        console.log("Bir hata oluştu ", error)
    }

}