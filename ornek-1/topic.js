const { Kafka } = require("kafkajs");
//const Kafka = require("kafkajs")();

createTopic();

async function createTopic() {
    try {
        //Admin Stuff..
        const kafka = new Kafka({
            clientId: "kafka_ornek_1",
            brokers: ["192.168.1.77:9092"] //birden fazla varsa bu array içerisine tanımıyoruz.
        });

        const admin = kafka.admin();
        console.log("Kafka Broker'a bağlanılıyor ...");

        await admin.connect();
        console.log("Kafka Broker'a bağlantı başarılı , Topic üretilecek ...");

        await admin.createTopics({
            topics: [{
                    topic: "Logs",
                    numPartitions: 1 //tek consumer ile çalışır
                },
                {
                    topic: "Logs2",
                    numPartitions: 2 //çift consumer ile çalışır
                }
            ]
        });
        console.log("Topic başarılı bir şekilde oluşturulmuştur...");
        await admin.disconnect();

    } catch (error) {
        console.log("Bir hata oluştu ", error)
    } finally {
        process.exit(0);
    }

}