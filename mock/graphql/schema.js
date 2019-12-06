module.exports.typeDefs = `
type Descriptor {
	unit: String!
	value: Float!
	longitude: Float!
	latitude: Float!
	unixTimestamp: Float!
}

type Query {
	getValuesForUnitGlobal(unit: String!): [Descriptor!]!
        getAllAvailableUnitsGlobal: [String!]!
        getLatestUnitValueGlobal(unit: String!): Float!
        getPaginatedDescriptorsGlobal(
		unit: String!
		start: Int!
		count: Int!
        ): [Descriptor!]!
	getValuesForUnit(unit: String!): [Descriptor!]!
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

extend type Query {
	getBalance: Float!
}
type Verify {
	address: String!
}
type Create {
	newKey: String!
}
extend type Mutation {
	verify(signedMessage: String!): Verify!
	createNewAccount(privateKey: String!): Create!
}
`;
