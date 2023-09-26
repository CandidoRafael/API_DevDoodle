import mongoose from 'mongoose'

const connectDataBase = () => {
    console.log("Tentando conectar")

    const uri = "mongodb+srv://rafaelCandido:123.4rafa@cluster0.i2sso19.mongodb.net/?retryWrites=true&w=majority"

    const options = {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }

    mongoose.connect(uri, options)
    .then(() => console.log("MongoDB Atlas connected"))
    .catch((err) => console.log("-------------- erro aqui AFAKWDKADW",err))
}


export default connectDataBase