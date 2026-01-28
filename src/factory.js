const awsTranslate = require("@aws-sdk/client-translate");
const awsRekognition = require("@aws-sdk/client-rekognition");
const Handler = require("./handler");

const handler = new Handler({
  rekognitionClient: awsRekognition.RekognitionClient,
  translatorClient: awsTranslate.TranslateClient,
});

module.exports = handler.main.bind(handler);
