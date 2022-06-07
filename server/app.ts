const { MongoClient, ServerApiVersion } = require('mongodb');
// Lax7oIsCUhpa060e

const uri =
  'mongodb+srv://jdmor:Lax7oIsCUhpa060e@service-desk.0ee9f.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err: any) => {
  const collection = client.db('test').collection('devices');
  client.close();
});
