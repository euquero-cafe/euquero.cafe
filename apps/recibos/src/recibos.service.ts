import { Textract } from "@aws-sdk/client-textract";
import { Injectable } from "@nestjs/common";
import * as TextractParser from "aws-textract-json-parser";
import { NlpManager } from "node-nlp";


@Injectable()
export class RecibosService {
  private nlp: NlpManager;

  constructor(private readonly textract: Textract) {
    this.nlp = new NlpManager({ languages: ["pt"], forceNER: true, ner: { useDuckling: false } });
  }

  async detectTotalAmount(buffer: Buffer) {
    const response = await this.textract.analyzeDocument({
      Document: { Bytes: buffer },
      FeatureTypes: ["TABLES", "FORMS"]
    });
    const parser = await TextractParser(response);
    const rawData = parser.getRawData({ minConfidence: 25 });

    // find the line with the word "Total" and get the next line with a number
    const totalIndex = rawData.findIndex(each => each.toLowerCase().match(/(^|\W)total.*/));
    const rawAfterTotal = rawData.slice(totalIndex);
    // find the first number in the next line after "Total"
    const numberAfterTotalIndex = rawAfterTotal.findIndex(each => each.match(/\d/));
    // remove all non-numeric characters from the number
    const text = rawAfterTotal.slice(0, numberAfterTotalIndex + 1).join(" ").replace(/\D+$/g, "");

    const nlp = await this.nlp.process(text);
    const currencies = nlp.entities
      .filter(each => each.entity === "currency" && each.resolution.value > 0)
      .sort((a, b) => b.resolution.value - a.resolution.value)
      .map(each => ({
        text: each.sourceText,
        value: each.resolution.value * 100,
        currency: each.resolution.unit
      }));

    return { text, total: currencies[0] };
  }
}
