import { Job } from "bullmq";
import logger from "../services/logger";
import Queue from "../services/Queue";

const processor = async (job: Job) => {
  logger.info("Example job triggered");
  logger.info(job.data);
};

export default new Queue({
  name: "Example",
  jobProcessor: processor,
  concurrency: 10,
  defaultJobOpts: {
    removeOnComplete: true,
    removeOnFail: false,
  },
});
