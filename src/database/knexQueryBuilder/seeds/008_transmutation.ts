import * as Knex from 'knex';
import { TRANSMUTATION } from '../../../constant/tables';
import lineReader from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';

interface Transmutation {
  initial_grade_high: number;
  initial_grade_low: number;
  transmutated_grade: number;
}

export async function seed(knex: Knex): Promise<void> {
  //   Deletes ALL existing entries
  await knex(TRANSMUTATION).del();

  const transmutation: Transmutation[] = [];

  var read = lineReader.createInterface({
    input: createReadStream(join(__dirname, 'transmutation.txt')),
  });

  for await (const line of read) {
    let lineArr = line.split(' ');

    transmutation.push({
      initial_grade_low: parseFloat(lineArr[0]),
      initial_grade_high: parseFloat(lineArr[1]),
      transmutated_grade: parseFloat(lineArr[2]),
    });
  }

  //   Inserts seed entries
  await knex(TRANSMUTATION).insert(transmutation);
}
