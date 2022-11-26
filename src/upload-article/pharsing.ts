import Article from "./article";

const pharseMarkdown = (file: string) => {
  var handlingBody = false;
  const fileRawArray: Array<string> = file.split("\n");
  var res: Article = new Article();

  for (const element of fileRawArray) {
    if (handlingBody){
      if (element == ""){
        continue
      }else if (element[0] == "#" && element[1] == "#" && element[2] == "#"){
        var content = element.slice(4, element.length + 1)
        res.body.push({"h3": content})
      }else if (element[0] == "#" && element[1] == "#"){
        var content = element.slice(3, element.length + 1)
        res.body.push({"h2": content})
      }else if (element[0] == "#"){
        var content = element.slice(2, element.length + 1)
        res.body.push({"h1": content})
      }else{
        var content = element.slice(0, element.length + 1)
        res.body.push({"p": content})
      }
    }else{
      if (element == ""){
        continue
      }else if (element[0] == "#" && element[1] == "#"){
        var content = element.slice(3, element.length + 1)
        res["subtitle"] = content;
      }else if (element[0] == "#"){
        var content = element.slice(2, element.length + 1)
        res["title"] = content;
      }else if (element[0] == "-" && element[1] == "-" && element[2] == "-") {
        handlingBody = true
        continue;
      }else if (element[0] == "-" && element[2] == "t" && element[3] == "y" && element[4] == "p" && element[5] == "e"){
        res["type"] = element.slice(8, element.length + 1)
      }else if (element[0] == "-" && element[2] == "f" && element[3] == "i" && element[4] == "r" && element[5] == "s" && element[6] == "t" && element[7] == "P" && element[8] == "u" && element[9] == "b" && element[10] == "l" && element[11] == "i" && element[12] == "s" && element[13] == "h" && element[14] == "e" && element[15] == "d"){
        res["firstPublished"] = +element.slice(18, element.length + 1)
      }
    }
  }
  return res;
}

export default pharseMarkdown;