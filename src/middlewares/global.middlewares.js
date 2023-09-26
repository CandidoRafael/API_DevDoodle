import userService from '../services/user.service.js'
import mongoose from "mongoose"

const validId = (req, res, next) => {
  try {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({message: "Invalid Id"})
    }

    next()
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const validUser = async (req, res, next) => {

  try {
    const id = req.params.id

    const user = await userService.findByIdService(id)

    if(!user) {
      return res.status(400).send({message: "User not found"})
    }

    req.id = id
    req.user = user

    next()
  } catch (error) {
      res.status(500).send({message: error.message})
  }
  
}

export default { validId, validUser }



