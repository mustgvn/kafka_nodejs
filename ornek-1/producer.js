const {
    Kafka
} = require("kafkajs");
//const Kafka = require("kafkajs")();

const topic_name = process.argv[2] || "Logs2";

let partion = process.argv[3] || 0

createProducer();

async function createProducer() {
    try {
        const kafka = new Kafka({
            clientId: "kafka_ornek_1",
            brokers: ["192.168.1.77:9092"] //birden fazla varsa bu array içerisine tanımıyoruz.
        });

        const producer = kafka.producer();
        console.log("Producer'a bağlanılıyor ...");

        await producer.connect();
        console.log("Producer'a bağlantı başarılı ...");

        // sonsuz producer message oluşturmak için
        // while (true) {
        //     const message_result = await producer.send({
        //         topic: topic_name, //"Logs",
        //         messages: [{
        //             value: "Bu bir test mesajıdır.",
        //             partition: (Math.floor(Math.random() * 10) % 2 == 0) ? 0 : 1
        //         }]
        //     })
        //     console.log("Gönderim işlemi başarılıdır ..", JSON.stringify(message_result));
        // }
    
        const message_result = await producer.send({
            topic: topic_name, //"Logs",
            messages: [{
                value: "Bu bir test mesajıdır.",
                partition: partion
            }]
        })

        console.log("Gönderim işlemi başarılıdır ..", JSON.stringify(message_result));
        await producer.disconnect();

    } catch (error) {
        console.log("Bir hata oluştu ", error)
    } finally {
        process.exit(0);
    }

}