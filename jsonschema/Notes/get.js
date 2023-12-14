module.exports = {
  type: "object",
  additionalProperties: false,
  properties: {
    userId: {
      type: String
    },
    title: {
      type: String
    }
  },
  required: ["userId", "title"]
};
