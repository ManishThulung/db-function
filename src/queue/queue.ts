import { Queue, Worker } from "bullmq";
import { redisConnection } from "../redis/redis.connection";

type EmailType = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

const emailQueue = new Queue("email-queue", {
  connection: redisConnection,
});

export const sendEmail = async (email: EmailType) => {
  console.log("calling sendEmail in queue")
  const res = await emailQueue.add(
    "email",
    { ...email },
    { delay: 1000 }
    // { removeOnComplete: true, removeOnFail: true }
  );
  console.log("job added: ", res.id);
};

emailQueue.on("waiting", (jobId) => {
  console.log(`Job ${jobId} added`);
});
