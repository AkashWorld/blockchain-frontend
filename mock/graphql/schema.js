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
        login(unsigned_address: String!): Login!
}
type Login {
    signed_address: String!
}

extend type Query {
    loginM: Login!
}`
;
