import { Worker } from "bullmq";
import { redisConnection } from "../redis/redis.connection";
import { mailSender } from "../utils/mail-sender";

export const worker = new Worker(
  "email-queue",
  async (job) => {
    console.log(`message receive id: ${job.id}`);
    console.log(`processing message`);
    console.log(`sending email to: ${job.data.to}`);
    const { to, subject, html } = job.data;
    await mailSender(to, subject, html);
  },
  {
    connection: redisConnection,
  }
);
