import mongoose from 'mongoose'

const connectDataBase = () => {
    console.log("Tentando conectar")

    const uri = process.env.MONGODB_URI

    const options = {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }

    mongoose.connect(uri, options)
    .then(() => console.log("MongoDB Atlas connected"))
    .catch((err) => console.log("-------------- erro aqui AFAKWDKADW",err))
}


export default connectDataBase