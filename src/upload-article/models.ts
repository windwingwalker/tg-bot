class Article{
  firstPublished?: number;
  title: string;
  subtitle: string;
  series: string;
  type: string;
  tags: string[];
  body: Body[] = [];
}

interface Body{
  [key: string]: string;
}

export default Article;