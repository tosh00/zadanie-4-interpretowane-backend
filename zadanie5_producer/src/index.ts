import Kafka from "node-rdkafka";
import Product from "./model/Product";
import { v4 as uuidv4 } from "uuid";
import Order from "./model/Order";
import parseToMessage from "./library/parser";
import Category from "./model/Category";
import mongoose from "mongoose";
import User from "./model/User";

const categoryStream = Kafka.Producer.createWriteStream(
  {
    "metadata.broker.list": "localhost:9092",
  },
  {},
  { topic: "categories" }
);
const productStream = Kafka.Producer.createWriteStream(
  {
    "metadata.broker.list": "localhost:9092",
  },
  {},
  { topic: "products" }
);
const userStream = Kafka.Producer.createWriteStream(
  {
    "metadata.broker.list": "localhost:9092",
  },
  {},
  { topic: "users" }
);
const orderStream = Kafka.Producer.createWriteStream(
  {
    "metadata.broker.list": "localhost:9092",
  },
  {},
  { topic: "orders" }
);

let i = 3;

const queuemessage = (payload: string, stream: Kafka.ProducerStream) => {
  const result = stream.write(Buffer.from(payload));
  console.log(
    result ? `message wrote successfully` : "something went wrong"
  );
};

const c = new Category(new mongoose.Types.ObjectId().toString(), 'test category');


const p1 = new Product(
  new mongoose.Types.ObjectId().toString(),
  "Pryncypałki",
  "noooo kurde pryncypałki",
  12,
  2,
  c._id
);
const p2 = new Product(
  new mongoose.Types.ObjectId().toString(),
  "Test2",
  "noasdasd pryncypałki",
  12,
  2,
  c._id
);
const p3 = new Product(
  new mongoose.Types.ObjectId().toString(),
  "Test5",
  "noooo kasdasdncypałki",
  12,
  2,
  c._id
);

const u = new User(
  new mongoose.Types.ObjectId().toString(),
  'Marcel',
  'mar@c.el',
  '123456789',
  'regular'
)

const o = new Order(
  new mongoose.Types.ObjectId().toString(),
  [
    {
      product: p1,
      ammount: 12,
    },
    {
      product: p2,
      ammount: 12,
    },
    {
      product: p3,
      ammount: 12,
    },
  ],
  "ZATWIERDZONE",
  new Date(),
  u._id
);

// queuemessage(parseToMessage('create', c), categoryStream);
// queuemessage(parseToMessage('create', p1), productStream);
// queuemessage(parseToMessage('create', p2), productStream);
// queuemessage(parseToMessage('create', p3), productStream);
// queuemessage(parseToMessage('create', u), userStream);
queuemessage(parseToMessage('create', o), orderStream);
