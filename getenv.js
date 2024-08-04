import * as fs from 'fs';

export default function (envFile) {
  if (!fs.existsSync(envFile)) throw new Error('file not found')
    var data = fs.readFileSync(envFile, 'utf8')
      
      const result = {};
      const regex  = /[\\\/\.\,\!\@\#\$\%\^\&\*\(\)\+\-\=\:\|]/;
      const regexG = /[\\\/\.\,\!\@\#\$\%\^\&\*\(\)\+\-\=\:\|]/g;
      let pointer  = null;
      let newLine  = false;
      
      function addKey(key){
        return function addValue(value){
                  result[key] = value;
                  newLine = false;
                  pointer = null;
                }
      }

      function cleanKey(key){
        key = key.replaceAll(regexG, '')
        return key
      }
      
      const lines = data.split('\n');
        lines.forEach((line) => {
            newLine = true;
            let tokens = line.split(' ');         //split line into tokens
            if (regex.test(tokens[0][0])) return  //if line start with special character go to next line
            if (pointer) pointer = null;          //if key is given but value is not reset pointer

            tokens = Array.from(new Set(tokens))  //remove duplicates from each line
            tokens.forEach((token) => {
                    if (!newLine) return
                    if (!token) return
                    if (Object.keys(result).includes(token)) return newLine = false  //key already exists go to new line

                    if (!pointer) {
                      if (regex.test(token)) token = cleanKey(token) //remove unwanted from key
                      pointer = addKey(token)
                    }else{
                      pointer(token); //add value
                    }
            })
        });
      return result;
}