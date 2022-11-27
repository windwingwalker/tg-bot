import Article from "./models";

export const pharseMarkdown = (file: string) => {
  var handlingBody = false;
  const fileRawArray: Array<string> = file.split("\n");
  var res: Article = new Article();

  for (const element of fileRawArray) {
    
    if (handlingBody){
      if (element == "") {
        continue
      }else if (element.slice(0, 2) == "# ") {
        var content = element.slice(2, element.length + 1);
        res.body.push({"h1": content});
      }else if (element.slice(0, 3) == "## ") {
        var content = element.slice(3, element.length + 1);
        res.body.push({"h2": content});
      }else if (element.slice(0, 4) == "### ") {
        var content = element.slice(4, element.length + 1);
        res.body.push({"h3": content});
      }else {
        var content = element.slice(0, element.length + 1);
        res.body.push({"p": content});
      }
    }else{
      if (element == "") {
        continue
      }else if (element.slice(0, 2) == "# ") {
        res["title"] = element.slice(2, element.length + 1).trim();
      }else if (element.slice(0, 3) == "## ") {
        res["subtitle"] = element.slice(3, element.length + 1).trim();
      }else if (element.slice(0, 3) == "---") {
        handlingBody = true;
        continue;
      }else if (element.slice(0, 7) == "- type:") {
        res["type"] = element.slice(7, element.length + 1).trim();
      }else if (element.slice(0, 17) == "- firstPublished:") {
        res["firstPublished"] = +element.slice(17, element.length + 1).trim();
      }else if (element.slice(0, 9) == "- series:") {
        res["series"] = element.slice(9, element.length + 1).trim();
      }else if (element.slice(0, 7) == "- tags:") {
        res["tags"] = element.slice(7, element.length + 1).split(",").map(item => item.trim());
      }
    }
  }
  return res;
}