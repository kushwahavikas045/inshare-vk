require('dotenv').config();
const mongoose = require('mongoose');

// const connectDB = () =>{
//     mongoose.connect(process.env.MONGO_CONNECTION_URL, {useNewUrlParser :true, useCreateIndex:true,useUnifiedTopology:true, useFindAndModify : true});
//     const connection = mongoose.connection;

//     connection.once('open', () =>{
//         console.log('Database connection');
//     })
// }
const connectDB = async () => {
	try {
		await mongoose.connect("mongodb+srv://vikas:vikas@cluster0.1yvw1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: true,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};
module.exports = connectDB;