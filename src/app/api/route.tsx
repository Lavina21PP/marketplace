// route.ts (App Router)
import { Kafka } from 'kafkajs';

export async function POST(request: Request) {
  const body = await request.json();

  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'], // หรือ URL ของ Kafka broker
  });

  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: 'my-topic',
    messages: [
      { value: JSON.stringify(body) },
    ],
  });

  await producer.disconnect();

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
