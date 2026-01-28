const { DetectLabelsCommand } = require("@aws-sdk/client-rekognition");
const { TranslateTextCommand } = require("@aws-sdk/client-translate");

module.exports = class Handler {
  constructor({ rekognitionClient, translatorClient, httpClient }) {
    this.rekognitionClient = rekognitionClient;
    this.translatorClient = translatorClient;
    this.httpClient = httpClient;
  }

  async getImageBuffer(imageUrl) {
    const response = await this.httpClient.get(imageUrl, {
      responseType: "arraybuffer",
    });

    return Buffer.from(response.data, "base64");
  }

  async detectImageLabels(imageBuffer) {
    const command = new DetectLabelsCommand({
      Image: {
        Bytes: imageBuffer,
      },
      MaxLabels: 10,
      MinConfidence: 80,
    });

    const response = await this.rekognitionClient.send(command);
    return response.Labels.map(({ Name }) => Name).join(" and ");
  }

  async translateLabels(labels) {
    const command = new TranslateTextCommand({
      SourceLanguageCode: "en",
      TargetLanguageCode: "pt",
      Text: labels,
    });

    const response = await this.translatorClient.send(command);
    return response.TranslatedText;
  }

  async main(event) {
    try {
      const { imageUrl } = event.queryStringParameters;

      if (!imageUrl) {
        return {
          statusCode: 400,
          body: "Image URL is required",
        };
      }

      const imageBuffer = await this.getImageBuffer(imageUrl);
      const labels = await this.detectImageLabels(imageBuffer);
      const translatedText = await this.translateLabels(labels);

      return {
        statusCode: 200,
        body: translatedText,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: "Internal server error",
      };
    }
  }
};
