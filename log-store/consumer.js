const {
    Kafka
} = require("kafkajs");
//const Kafka = require("kafkajs")();

createConsumer();

async function createConsumer() {
    try {
        const kafka = new Kafka({
            clientId: "kafka_log_store_client",
            brokers: ["192.168.1.77:9092"] //birden fazla varsa bu array içerisine tanımıyoruz.
        });

        const consumer = kafka.consumer({
            groupId: "log_store_consumer_group_1 "
        });
        console.log("Consumer'a bağlanılıyor ...");

        await consumer.connect();
        console.log("Consumer'a bağlantı başarılı ...");

        //consumer Subscribe ..
        await consumer.subscribe({
            topic: "LogStoreTopic", //"Logs",
            fromBeginning: true //başlangıçtan başla
        })

        await consumer.run({
            eachMessage: async result => {
              console.log(
                `Gelen Mesaj ${result.message.value}, Par => ${result.partition}`
              );
            }
          });

    } catch (error) {
        console.log("Bir hata oluştu ", error)
    }

}