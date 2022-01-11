const cassandra = require('cassandra-driver');
var pool = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'example_keyspace' });



const getTags = (request, response) => {
  console.log("here", request.query)

  //select * from tags where tag_name='cpuload' and agent_id = 1 order by created_datetime ;
  pool.execute("select * from tags where tag_name='" + request.query.name + "' and agent_id = 1 order by created_datetime ;", (error, results) => {
    if (error) {
      return response.status(400).send("Hata", error)
    }
    //console.log("SELECT * FROM tp_castrol_yagsecici WHERE LOWER(arac_markasi) like LOWER('%"+request.query.name+"%') ")
    response.status(200).json(results.rows)
  })
  pool.execute("select count(*) from tags;", (error, results) => {
    console.log(results.rows)
  })
}

const getCustomers = (request, response) => {
  pool.execute("select * from customers", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getCustomers,
  getTags
}