#!/usr/bin/env node

// fs to work with local file system
const fs = require('fs');
const util = require('util'); // not used in method #3
const chalk = require('chalk');
const path = require('path');

// // method #2
// const lstat = util.promisify(fs.lstat);


// method #3
const {lstat} = fs.promises;


// process module is global with node
// cwd = current working directory
// choose the address of the file by the cwd
const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames ) => {
   // Either 
   // err === an error object, which means something went wrong
   // Or
   // err === null, which means everything is ok and check the file names
   if(err){
      // handle error here
      // throw new Error(err)
      console.log(err);
   }

   const statPromises = filenames.map(filename =>{
      return lstat(path.join(targetDir, filename));
   });
   const allStats = await Promise.all(statPromises);

   for(let stats of allStats){
      const index = allStats.indexOf(stats);

      if(stats.isFile()){
         console.log(filenames[index], "file");
      }else{
         console.log(chalk.blue.bold(filenames[index]), "folder")
      }
      
   }
});


// // method #1
// const lstat = (filename) =>{
//    return new Promise((resolve, reject)=>{
//       fs.lstat(filename,(err, stats)=>{
//          if(err){
//             reject(err);
//          }
//          resolve(stats);
//       })
//    });

// }

