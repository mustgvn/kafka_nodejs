const { Kafka } = require("kafkajs");
//const Kafka = require("kafkajs")();

createTopic();

async function createTopic() {
    try {
        //Admin Stuff..
        const kafka = new Kafka({
            clientId: " ",
            brokers: ["192.168.1.77:9092"] //birden fazla varsa bu array içerisine tanımıyoruz.
        });

        const admin = kafka.admin();
        console.log("Kafka Broker'a bağlanılıyor ...");

        await admin.connect();
        console.log("Kafka Broker'a bağlantı başarılı , Topic üretilecek ...");

        await admin.createTopics({
            topics: [{
                    topic: "raw_video_topic",
                    numPartitions: 1
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