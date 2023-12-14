module.exports = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: {
      type: String
    },
    notes: {
      type: String
    }
  },
  required: ["id", "notes"]
};
