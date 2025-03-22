const fs = require('fs');
const path = require('path');
const iconsDir = './icons';
const indexFile = './index.html';

fs.readdir(iconsDir, (err, files) => {
    if (err) throw err;

    const pngFiles = files.filter(file => file.endsWith('.png'));
    const iconListCode = `const iconList = ${JSON.stringify(pngFiles, null, 2)};`;

    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) throw err;
        const updatedData = data.replace(/const iconList = \[\];/, iconListCode);

        fs.writeFile(indexFile, updatedData, 'utf8', err => {
            if (err) throw err;
            console.log('index.html updated with new iconList');
        });
    });
});
