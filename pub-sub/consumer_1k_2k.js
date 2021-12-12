 const {
    Kafka
} = require("kafkajs");
//const Kafka = require("kafkajs")();

createConsumer();

async function createConsumer() {
    try {
        const kafka = new Kafka({
            clientId: "kafka_pub_sub_client",
            brokers: ["192.168.1.77:9092"] //birden fazla varsa bu array içerisine tanımıyoruz.
        });

        const consumer = kafka.consumer({
            groupId: "hd_1k_2k_encoder_consumer_group "
        });
        console.log("Consumer'a bağlanılıyor ...");

        await consumer.connect();
        console.log("Consumer'a bağlantı başarılı ...");

        //consumer Subscribe ..
        await consumer.subscribe({
            topic: "raw_video_topic", //"Logs",
            fromBeginning: true //başlangıçtan başla
        })

        await consumer.run({
            eachMessage: async result => {
              console.log(
                `İşelen Video ${result.message.value}, 1k_2k encoder`
              );
            }
          });

    } catch (error) {
        console.log("Bir hata oluştu ", error)
    }

}