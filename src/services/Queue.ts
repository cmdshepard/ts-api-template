import * as BullMQ from "bullmq";
import logger from "./logger";
import redis from "./redis";

export default class Queue {

  public queue: BullMQ.Queue;

  public worker: BullMQ.Worker;

  constructor({
    name,
    defaultJobOpts,
    concurrency,
    jobProcessor,
  }: {
    name: string;
    defaultJobOpts: BullMQ.JobsOptions;
    concurrency?: number;
    jobProcessor: (job: BullMQ.Job) => any;
  }) {
    this.queue = new BullMQ.Queue(name, {
      defaultJobOptions: defaultJobOpts,
      connection: redis,
    });

    const processor = async (...args: any[]): Promise<any> => {
      const job: BullMQ.Job = args[0];
      const startedAt = Date.now();
      logger.info(`Starting job: ${job.name} in ${name} queue`);
      // @ts-ignore
      const ret = await jobProcessor(...args);
      logger.info(`Finished job: ${job.name} in ${name} queue (${Date.now() - startedAt}ms)`);
      return ret;
    };

    this.worker = new BullMQ.Worker(name, processor, {
      concurrency,
      connection: redis,
    });

    this.worker.on("failed", (job, failedReason) => {
      logger.error(`Job ${job?.name} failed due to reason:`);
      logger.error(failedReason);
      logger.error("Job data:");
      logger.error(job?.data || "No data");
    });

    this.worker.on("error", e => {
      logger.error(`Queue worker ${name} received an error:`);
      logger.error(e);
    });
  }

  add = (
    name: string,
    data: any,
    opts?: BullMQ.JobsOptions,
  ): Promise<BullMQ.Job> => this.queue.add(name, data, opts);

}
