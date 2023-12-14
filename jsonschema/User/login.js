module.exports = {
  type: "object",
  additionalProperties: false,
  properties: {
    email: {
      type: String
    },
    password: {
      type: String
    }
  },
  required: ["email", "password"]
};
