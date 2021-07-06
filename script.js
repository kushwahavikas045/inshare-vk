const File = require('./models/file');
const fs = require('fs');
const connectDB = require('./config/db');
connectDB();
async function deleteData(){
    const pastDate = Date.now((Date.now() - 24 * 60 * 60 * 1000))
    const files = await File.find({createdAt: { $lt: pastDate }});
    if(files.length){
        for(const file of files){
          try {
            fs.unlinkSync(file.path);
            await file.remove();
            console.log(`successful deleted ${file.filename}`);
          } catch (error) {
              console.log(`Error while delete file ${error}`);
          }
        }
    }
}

deleteData().then(() =>{
    console.log('All done!');
    process.exit();
   
})