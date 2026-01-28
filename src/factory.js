const { TranslateClient } = require("@aws-sdk/client-translate");
const { RekognitionClient } = require("@aws-sdk/client-rekognition");
const Handler = require("./handler");
const axios = require("axios");

const rekognitionClient = new RekognitionClient();
const translatorClient = new TranslateClient();

const handler = new Handler({
  rekognitionClient,
  translatorClient,
  httpClient: axios,
});

module.exports = handler.main.bind(handler);
