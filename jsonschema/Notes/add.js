module.exports = {
  type: "object",
  additionalProperties: false,
  properties: {
    userId: {
      type: String
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    notes: {
      type: String
    }
  },
  required: ["userId", "title", "description", "notes"]
};
