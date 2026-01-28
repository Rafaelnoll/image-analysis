module.exports = class Handler {
  constructor({ rekognitionClient, translatorClient }) {
    this.rekognitionClient = rekognitionClient;
    this.translatorClient = translatorClient;
  }

  async main(event) {
    console.log("Event", event);

    return {
      statusCode: 200,
      body: "Hello!",
    };
  }
};
