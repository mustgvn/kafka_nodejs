const {
    Kafka
} = require("kafkajs");
//const Kafka = require("kafkajs")();


const log_data = require("./system_log.json");

createProducer();

async function createProducer() {
    try {
        const kafka = new Kafka({
            clientId: "kafka_log_store_client",
            brokers: ["192.168.1.77:9092"] //birden fazla varsa bu array içerisine tanımıyoruz.
        });

        const producer = kafka.producer();
        console.log("Producer'a bağlanılıyor ...");

        await producer.connect();
        console.log("Producer'a bağlantı başarılı ...");


        //messages datayı manupi ediliyoruz
        let messages = log_data.map(item => {
            return {
                value: JSON.stringify(item),
                partition: item.type == "system" ? 0 : 1
            }
        })


        const message_result = await producer.send({
            topic: "LogStoreTopic", //"Logs",
            messages: messages
        })

        console.log("Gönderim işlemi başarılıdır ..", JSON.stringify(message_result));
        await producer.disconnect();

    } catch (error) {
        console.log("Bir hata oluştu ", error)
    } finally {
        process.exit(0);
    }

}