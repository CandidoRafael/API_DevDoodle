import { createService, findAllService } from '../services/posts.service.js'

const create =  async (req, res) => {
    
    try {
        const { title, text, banner } = req.body

        if(!title || !banner || !text) {
            res.status(400).send({ message: "Submit all fields to create a post" })
        }

        await createService({
            title,
            text,
            banner,
            id: "objectIdFake",
        })

        res.send(201)

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
    
}

const findAll = async (req, res) => {
    const posts = []
    res.send(posts)
}

export { create, findAll }