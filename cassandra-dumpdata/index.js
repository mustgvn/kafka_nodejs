
const cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'example_keyspace' });


const dummy_data = require("./temp_data_202201111319.json");


createConsumer();

function createConsumer() {
    try {
        console.log(getCustomers())
    } catch (error) {
        console.log("Bir hata oluştu ", error)
    }

}
async function getCustomers() {
    const agent_tag_names = ['cpuload', 'cpuusage', 'memoryusage', 'diskusage'];
    try {
        let index = 0;
        for (const item of dummy_data) {
            const query = 'INSERT INTO example_keyspace.tags(created_datetime, agent_id, tag_name, value) VALUES (?,?,?,?)';
            const params = [Date(item.created_datetime), 1, item.tag_name, item.tag_value.toString() ];

            await client.execute(query, params, { prepare: true })
                .then(result => console.log('Row insert on the cluster', result));

            index++;
            console.log(index, ' insert edildi.', params.toString())
        }

        // dummy_data.map(item => {
        //     console.log(item)

        //     const query = 'INSERT INTO example_keyspace.tags(created_datetime, agent_id, tag_name, value) VALUES (?,?,?,?)';
        //     const params = [item.created_datetime, item.group_id, item.tag_name, item.tag_value];
        //     console.log(params)

        //     client.execute(query, params, { prepare: true })
        //         .then(result => console.log(item.id, ' -> Başarılı -> ', result));
        //     await new Promise(r => setTimeout(r, 50));
        // })

    } catch (error) {
        console.log("Bir hata Oluştu -->", error)
    }
}