import User from '../models/User.js'

const createService = (body) => User.create(body)

const findAllService = () => User.find()

const findByIdService = (id) => User.findById(id)

const udpateService = (  
    id,
    name, 
    username, 
    email, 
    password, 
    avatar, 
    background
    ) => User.findOneAndUpdate({ _id: id }, { name, username, email, password, avatar, background }, { rawResult: true })

export default { 
  createService, 
  findAllService, 
  findByIdService,
  udpateService
}