const fs = require('fs')
const { resolve } = require('node:path/win32')
const superagent = require('superagent')

const readFilePro = file => {
    //여기서 file은 argumnet (함수에서 매개변수를 집어넣는것 =전달인자)
    return new Promise((resoleve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find that file 😥')
            resolve(data);
        })
    })
}

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`);

    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then(res => {
        if (err) console.log(err.message)
        console.log(res.body.message);

        fs.writeFile('dog-img.txt', res.body.message, err => {
            if (err) return console.log(err.message);
            console.log('Random dog image saved to file!');
        });
    }).catch(err => {
        console.log(err.message);
    })
});