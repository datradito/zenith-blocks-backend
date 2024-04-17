import cron from "node-cron";
// In your server code
// import cron from "node-cron";
// import AWS from "aws-sdk";

// Configure AWS SDK
// AWS.config.update({ region: "your-region" });
// const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

// // Your SQS queue URL
// const queueUrl = "your-queue-url";

// cron.schedule("0 22 * * *", generateBills);

// async function generateBills() {
//   // Get all recurring bills
//   const recurringBills = await db.query("SELECT * FROM recurring");

//   for (const recurringBill of recurringBills) {
//     // Get all bills with the same recurring_id, sorted by created_date
//     const bills = await db.query(
//       "SELECT * FROM bills WHERE recurring_id = ? ORDER BY created_date DESC",
//       [recurringBill.id]
//     );

//     // Check if it's time to generate a new bill
//     const mostRecentBill = bills[0];
//     const now = new Date();
//     const nextBillDate = getNextBillDate(
//       mostRecentBill.created_date,
//       recurringBill.frequency
//     );

//     if (now >= nextBillDate) {
//       // Send a message to the SQS queue
//       const params = {
//         MessageBody: JSON.stringify({
//           recurringId: recurringBill.id,
//           createdDate: now,
//         }),
//         QueueUrl: queueUrl,
//       };

//       sqs.sendMessage(params, function (err, data) {
//         if (err) {
//           console.log("Error", err);
//         } else {
//           console.log("Success", data.MessageId);
//         }
//       });
//     }
//   }
// }

// function getNextBillDate(lastBillDate, frequency) {
//   const nextBillDate = new Date(lastBillDate);

//   switch (frequency) {
//     case "Weekly":
//       nextBillDate.setDate(lastBillDate.getDate() + 7);
//       break;
//     case "Bi-Weekly":
//       nextBillDate.setDate(lastBillDate.getDate() + 14);
//       break;
//     case "Monthly":
//       nextBillDate.setMonth(lastBillDate.getMonth() + 1);
//       break;
//   }

//   return nextBillDate;
// }
cron.schedule("0 0 1 1 *", function () {
  console.log("This task runs every minute");
});

export default cron;
