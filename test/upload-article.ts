import { pharseMarkdown } from "../src/upload-article/functions";
import chai from 'chai';

describe('upload-article/functions.ts', () => {
  it('pharseMarkdown', () => {
    chai.expect(pharseMarkdown(articleInString)).to.deep.include(articleInJson);
  });
});

const articleInString = `# test-title

## test-subtitle

- type: test-type
- series: test-series
- tags: tag1, tag2, tag3
- firstPublished: 123

---

# test-h1-1

There are sth

# test-h1-2

There are sth`

const articleInJson =  {
  "firstPublished": 123,
  "series": "test-series",
  "subtitle": "test-subtitle",
  "tags": ["tag1", "tag2", "tag3"],
  "title": "test-title",
  "type": "test-type",
  "body": [
    {
     "h1": "test-h1-1"
    },
    {
     "p": "There are sth"
    },
    {
     "h1": "test-h1-2"
    },
    {
     "p": "There are sth"
    }
   ],
 }



 