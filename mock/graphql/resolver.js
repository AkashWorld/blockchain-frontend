const { PubSub } = require("graphql-subscriptions");

const subscriptions = new PubSub();
const SUBSCRIPTION_KEY = "subscription key";
/**
 * Generating semi-random data for mocking purposes
 */
const data = {};
data.lbs = [
  { value: 150 },
  { value: 152 },
  { value: 157 },
  { value: 158 },
  { value: 158 },
  { value: 155 },
  { value: 159 },
  { value: 160 },
  { value: 159 },
  { value: 161 },
  { value: 163 },
  { value: 159 },
  { value: 165 },
  { value: 167 },
  { value: 169 },
  { value: 167 },
  { value: 171 },
  { value: 171 },
  { value: 171 },
  { value: 172 },
  { value: 174 },
  { value: 175 },
  { value: 182.2 }
];
data.inch = [
  { value: 65 },
  { value: 65.5 },
  { value: 65.8 },
  { value: 66 },
  { value: 67.4 },
  { value: 67.9 },
  { value: 68 },
  { value: 68.1 },
  { value: 69 },
  { value: 69.1 },
  { value: 69.4 },
  { value: 69.5 },
  { value: 69.7 },
  { value: 70 },
  { value: 70.1 },
  { value: 70.4 },
  { value: 70.6 },
  { value: 70.65 },
  { value: 70.9 },
  { value: 71.3 },
  { value: 71.4 },
  { value: 71.9 },
  { value: 72 }
];
data.bpm = [
  { value: 90 },
  { value: 65.5 },
  { value: 120 },
  { value: 110 },
  { value: 60 },
  { value: 68 },
  { value: 68 },
  { value: 71 },
  { value: 88 },
  { value: 81 },
  { value: 64 },
  { value: 73 },
  { value: 69.7 },
  { value: 100 },
  { value: 98.4 },
  { value: 95 },
  { value: 88 },
  { value: 73 },
  { value: 90 },
  { value: 79 },
  { value: 72.4 },
  { value: 78.9 },
  { value: 70 }
];

let rutgersLatLong = { latitude: 40.501304, longitude: -74.447367 };

function randomSign() {
  if (Math.random() < 0.5) return -1;
  return 1;
}

let initTimeStamp = 1573055843;
data.lbs.forEach(val => {
  val.unit = "lb";
  const latLongRand = Math.random() * 0.05;
  rutgersLatLong.latitude += randomSign() * latLongRand;
  rutgersLatLong.longitude += randomSign() * latLongRand;
  val.latitude = rutgersLatLong.latitude;
  val.longitude = rutgersLatLong.longitude;
  initTimeStamp += Math.floor(Math.random() * 1000);
  val.unixTimestamp = initTimeStamp;
});
initTimeStamp = 1573055843;
data.inch.forEach(val => {
  val.unit = "inch";
  const latLongRand = Math.random() * 0.05;
  rutgersLatLong.latitude += randomSign() * latLongRand;
  rutgersLatLong.longitude += randomSign() * latLongRand;
  val.latitude = rutgersLatLong.latitude;
  val.longitude = rutgersLatLong.longitude;
  initTimeStamp += Math.floor(Math.random() * 1000);
  val.unixTimestamp = initTimeStamp;
});
initTimeStamp = 1573055843;
data.bpm.forEach(val => {
  val.unit = "bpm";
  const latLongRand = Math.random() * 0.05;
  rutgersLatLong.latitude += randomSign() * latLongRand;
  rutgersLatLong.longitude += randomSign() * latLongRand;
  val.latitude = rutgersLatLong.latitude;
  val.longitude = rutgersLatLong.longitude;
  initTimeStamp += Math.floor(Math.random() * 1000);
  val.unixTimestamp = initTimeStamp;
});

/**
 * Resolvers for GQL
 */
module.exports.resolvers = {
  Mutation: {
    insertValue: async () => {
      /** Sleep for 2 seconds to simulate insertion and return random string that represents the transactionHash */
      /** Begins an async function that publishes result of this mutation that can be listened to via the isnertValueSubscription subscription*/
      await sleep(300);
      const txHash =
        "0x" +
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
      insertValueMockPublishing(txHash);
      return txHash;
    }
  },
  Query: {
    getAllAvailableUnits: () => {
      return ["lb", "inch", "bpm"];
    },
    getLatestUnitValue: (_, args) => {
      switch (args.unit) {
        case "lb":
          return 182.2;
        case "inch":
          return 72;
        case "bpm":
          return 70;
      }
      return null;
    },
    getPaginatedDescriptors: async (_, args) => {
      await sleep(300);
      switch (args.unit) {
        case "lb":
          return data.lbs.slice(
            data.lbs.length - args.start - args.count,
            data.lbs.length - args.start
          );
        case "inch":
          return data.inch.slice(
            data.inch.length - args.start - args.count,
            data.inch.length - args.start
          );
        case "bpm":
          return data.bpm.slice(
            data.bpm.length - args.start - args.count,
            data.bpm.length - args.start
          );
      }
      return [];
    },
    getDailyBMI: () => {
      let trend = "UP";
      if (Math.random() > 0.5) trend = "DOWN";
      return {
        unit: "BMI",
        value: 22.3,
        trend
      };
    },
    getDailyWeight: () => {
      let trend = "UP";
      if (Math.random() > 0.5) trend = "DOWN";
      return {
        unit: "lb",
        value: 189,
        trend
      };
    }
  },
  Subscription: {
    insertValueSubscription: {
      subscribe: () => {
        console.log("Subscribed to insertValueSubscription");
        return subscriptions.asyncIterator(SUBSCRIPTION_KEY);
      }
    }
  }
};

async function insertValueMockPublishing(txHash) {
  await sleep(10000);
  console.log("Publishing reciept");
  subscriptions.publish(SUBSCRIPTION_KEY, {
    insertValueSubscription: {
      transactionHash: txHash,
      responseType: "RECIEPT",
      message: txHash
    }
  });
  for (let i = 0; i < 30; ++i) {
    await sleep(750);
    console.log("Publishing confirmation " + i);
    subscriptions.publish(SUBSCRIPTION_KEY, {
      insertValueSubscription: {
        transactionHash: txHash,
        responseType: "CONFIRMATION",
        message: i
      }
    });
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
