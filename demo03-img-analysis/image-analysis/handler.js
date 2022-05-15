"use strict";
const { get } = require('axios'); 

class Handler {
  constructor({ rekoSvc, translatorSvc }) {
    this.rekoSvc = rekoSvc
    this.translatorSvc = translatorSvc
  }
  async detectImgLabels(buffer) {
    const result = await this.rekoSvc.detectLabels({
      Image: {
        Bytes: buffer
      }
    }).promise();

    const workingItems = result.Labels
      .filter(({ Confidence }) => Confidence > 80)
  
    const names = workingItems
      .map(({ Name }) => Name)
      .join(' and ')

      return { names, workingItems }
  }
  async translateText(text) {
    const params = {
      SourceLanguageCode: `en`,
      TargetLanguageCode: `pt`,
      Text: text,
    }

    const { TranslatedText } = await this.translatorSvc
                          .translateText(params)
                          .promise()

    return TranslatedText.split(' e ')
  }
  formatTextResults(texts, workingItems) {
    const finalText = [];
    for (const indexText in texts) {
      const nameInPortuguese = texts[indexText]
      const confidence = workingItems[indexText].Confidence

      finalText.push(
        `${confidence.toFixed(2)}% de chance de ser do tipo ${nameInPortuguese}`
      )
    }

    return finalText.join(`\n`)
  }
  async getImageBuffer(imageUrl) {
    const response = await get(imageUrl, {
      responseType: 'arraybuffer',
    });
    
    const buffer = Buffer.from(response.data, 'base64')

    return buffer;
  }
  async main(event) {
    try {
      console.log(`event: `, event)
      const { imageUrl } = event.queryStringParameters;
     
      console.log('Downloading image...')
      const buffer = await this.getImageBuffer(imageUrl);

      // const imgBuffer = await readFile('./images/cat.jpeg')
      console.log(`Detecting labels...`)
      const { names, workingItems } = await this.detectImgLabels(buffer);
      
      console.log(`Translating to portuguese...`)
      const texts = await this.translateText(names);

      console.log(`Handling final object...`);
      const finalText = this.formatTextResults(texts, workingItems);
      
      console.log(`Finishing...`)
      return {
        statusCode: 200,
        body: `A imagem tem\n `.concat(finalText),
      }
      
    } catch (error) {
      console.log(`Error here: `, error.stack)
      return {
        statusCode: 500,
        body: `Internal server error!`
      }
    }
  }
}

// factory
const aws = require('aws-sdk');
const reko = new aws.Rekognition();
const translator = new aws.Translate();
const handler = new Handler({
  rekoSvc: reko,
  translatorSvc: translator
});

module.exports.main = handler.main.bind(handler);