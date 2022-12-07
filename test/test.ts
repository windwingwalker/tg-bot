import { isCsv, isMarkdown } from "../src/functions";
import { pharseMarkdown } from "../src/upload-article/functions";
import chai from 'chai';

describe('functions.ts', () => {
  it('file is csv', () => {
    chai.expect(isCsv("text/csv")).to.equal(true);
    chai.expect(isCsv("text/comma-separated-values")).to.equal(true);
  })
});

