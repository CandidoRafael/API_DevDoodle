import { 
    createService, 
    findAllService, 
    countPosts,
    topPostsService,
    findByIdService
} from '../services/posts.service.js'


export const create =  async (req, res) => {
    
    try {
        const { title, text, banner } = req.body

        if(!title || !banner || !text) {
            res.status(400).send({ message: "Submit all fields to create a post" })
        }
        
        await createService({
            title,
            text,
            banner,
            user: req.userId
        })
        res.send(201)

    } catch (error) {
        res.status(500).send({ message: error.message })
    } 
}

export const findAll = async (req, res) => {
   
    try {
        let { limit, offset } = req.query

        limit = Number(limit)
        offset = Number(offset)
    
        if(!limit) {
            limit = 5
        }
    
        if(!offset) {
            offset = 0
        }

        const posts = await findAllService(offset, limit)
        const total = await countPosts()
        const currentUrl = req.baseUrl

        const next = offset + limit
        const nextURL = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null
    
        const previous = offset - limit < 0 ? null : offset - limit
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

        if(posts.length === 0) {
          return res.status(400).send({message: "There are no registered posts"})
        }
      
        res.send({
            nextURL,
            previousUrl,
            limit,
            offset,
            total,

            results: posts.map(postsItem => ({ 
                id: postsItem._id,
                title: postsItem.title,
                text: postsItem.text,
                banner: postsItem.banner,
                likes: postsItem.likes,
                comments: postsItem.comments,
                name: postsItem.user.name,
                username: postsItem.user.username,
                userAvatar: postsItem.user.avatar
            }))
        })
    
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

export const topPost = async (req, res) => {
   try {
        const posts = await topPostsService()

    if(!posts) {
        return res.status(400).send({message: "There is no registered post"})
    }

    res.send({
      posts: {
        id: posts._id,
            title: posts.title,
            text: posts.text,
            banner: posts.banner,
            likes: posts.likes,
            comments: posts.comments,
            name: posts.user.name,
            username: posts.user.username,
            userAvatar: posts.user.avatar
        }
    })
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

export const findById = async (req, res) => {
    try {
        
      const { id } = req.params  
      
      const posts = await findByIdService(id)

      return res.send({
         posts: {
            id: posts._id,
                title: posts.title,
                text: posts.text,
                banner: posts.banner,
                likes: posts.likes,
                comments: posts.comments,
                name: posts.user.name,
                username: posts.user.username,
                userAvatar: posts.user.avatar
            }
      })

    } catch (error) {
        res.status(500).send({message: error.message})
    }
}
