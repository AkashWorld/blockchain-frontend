module.exports.typeDefs = `
type Descriptor {
	unit: String!
	value: Float!
	longitude: Float!
	latitude: Float!
	unixTimestamp: Int!
}

type Query {
	getAllAvailableUnits: [String!]!
	getLatestUnitValue(unit: String!): Float!
	getPaginatedDescriptors(
		unit: String!
		start: Int!
		count: Int!
	): [Descriptor!]!
}

type Mutation {
        insertValue(
                unit: String!
                value: Float!
                longitude: Float
                latitude: Float
        ): String!
}
enum Trend {
        UP
        SAME
        DOWN
}

type DailyTrend {
        unit: String!
        value: Float!
        trend: Trend
}

extend type Query {
        getDailyWeight: DailyTrend
        getDailyBMI: DailyTrend
}

enum TransactionResponse {
        TRANSACTION_HASH
        CONFIRMATION
        RECIEPT
        ERROR
}

type InsertValueResponse {
        transactionHash: String!
        responseType: TransactionResponse!
        message: String!
}

type Subscription {
        insertValueSubscription: InsertValueResponse!
}
`;
