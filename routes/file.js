const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const { v4: uuid4 } = require('uuid');
//create store disk

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) =>{
        let uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
})

let upload = multer({
    storage,
    limits : {fileSize: 1000000 * 10},
}).single('myfile');

router.post('/', (req, res) =>{

 

    //store in files
     upload(req, res, async(err) =>{
            //file validations
  if(!req.file){
    return res.json({error : 'filed is required!'});
}
         if(err) {
             return res.status(500).json({error: err.message});        
         }

         //store in database
        const file = new File({
         filename: req.file.filename,
         uuid: uuid4(),
         path: req.file.path,
         size: req.file.size 
        }); 
        const response = await file.save();
        return res.json({file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});
     })

    })

router.post('/send', async(req, res) =>{
   const {uuid, emailTo, emailFrom} = req.body;
   //validation checking
   if(!uuid || !emailTo || !emailFrom){
       return res.status(422).send({error:'all fields are required!'});
   }
  //get file from database

  const file = await File.findOne({uuid: uuid});

//   if(file.sender){
//       return res.status(422).send({error: 'email already send!'});
//   }

  file.sender = emailFrom;
  file.recevier = emailTo;

  const response = await file.save();

  //send mail
  const sendMail = require('../services/emailService');
  sendMail({
      from:emailFrom,
      to: emailTo,
      subject:'inShare file sharing',
      text:`${emailFrom} shared a file with you`,
      html: require('../services/emailTemplate')({
          emailFrom:emailFrom,
          downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
          size: parseInt(file.size/1000) + 'KB',
          expires: '24 Hours'
          
      })
     
  });
  return res.send({success: true})

})
    


module.exports = router;