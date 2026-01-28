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

    const workingItems = response.Labels;
    const labels = workingItems.map(({ Name }) => Name).join(" and ");

    return {
      workingItems,
      labels,
    };
  }

  async translateLabels(labels) {
    const command = new TranslateTextCommand({
      SourceLanguageCode: "en",
      TargetLanguageCode: "pt",
      Text: labels,
    });

    const response = await this.translatorClient.send(command);
    return response.TranslatedText.split(" e ");
  }

  formatLabelsResult(labels, workingItems) {
    const finalText = [];

    for (const textIndex in labels) {
      const labelInPortuguese = labels[textIndex];
      const confidence = workingItems[textIndex].Confidence;

      finalText.push(
        `${confidence.toFixed(2)}% de ser do tipo ${labelInPortuguese}`,
      );
    }

    return finalText.join("\n");
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
      const { labels, workingItems } =
        await this.detectImageLabels(imageBuffer);
      const translatedLabels = await this.translateLabels(labels);
      const finalText = this.formatLabelsResult(translatedLabels, workingItems);

      return {
        statusCode: 200,
        body: `A imagem tem\n`.concat(finalText),
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
