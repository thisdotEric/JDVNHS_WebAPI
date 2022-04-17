import { StudentAttributes } from './types';
import { StudentAttributeKey } from './helpers';
import { ClassCount, countClass } from '.';
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

export type DecisionTreeNode = DecisionNode | LeafNode;

export class DecisionNode {
  constructor(
    public readonly question: Question,
    public readonly trueBranch: DecisionTreeNode,
    public readonly falseBranch: DecisionTreeNode
  ) {}
}

export class LeafNode {
  public readonly classCounts: ClassCount;

  constructor(rows: StudentAttributes[]) {
    this.classCounts = countClass(rows);
  }
}
