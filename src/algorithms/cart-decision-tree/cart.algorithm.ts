import { StudentAttributes } from './types';
import { StudentAttributeKey } from './helpers';
type AttributeValue = string | number | boolean;

export class Question {
  private value: AttributeValue;
  private objectKey: StudentAttributeKey;

  constructor(key: StudentAttributeKey, value: AttributeValue) {
    this.value = value;
    this.objectKey = key;
  }

  checkMatch(rowValue: StudentAttributes): boolean {
    let attrValue = rowValue[this.objectKey];

    return Number.isInteger(attrValue)
      ? attrValue >= this.value
      : attrValue === this.value;
  }

  questionToString() {
    const condition = Number.isInteger(this.value) ? '>=' : '==';
    return `Is ${this.objectKey} ${condition} ${this.value}?`;
  }
}
