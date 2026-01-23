import schedule from "node-schedule";
import { dbPool } from "../config/db.js";

schedule.scheduleJob("0 * * * *", async () => {
  console.log(`Running cleanup at ${new Date().toISOString()}`);

  try {
    const now = new Date();

    const [result] = await dbPool.query(
      "DELETE FROM users WHERE verified = FALSE AND verification_expires <= ?",
      [now]
    );

    console.log(
      `Hard deleted ${result.affectedRows} unverified expired accounts.`
    );
  } catch (err) {
    console.error("Cleanup failed:", err);
  }
});
