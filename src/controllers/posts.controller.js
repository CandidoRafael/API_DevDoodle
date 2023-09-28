import { 
    createService, 
    findAllService, 
    countPosts,
    topPostsService,
    findByIdService,
    searchByTitleService,
    byUserService,
    updateService,
    deletePostService,
    likePostsService,
    deleteLikePostService,
    addCommentService,
    deleteCommentService
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

export const searchByTitle = async (req, res) => {
    try {
      const { title } = req.query

      const posts = await searchByTitleService(title)

      if(posts.length === 0) {
        return res.status(400).send({ message: "There are no posts with this title" })
      }

      res.send({
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

export const byUser = async (req, res) => {
    try {
      const id = req.userId

      const posts = await byUserService(id)

      res.send({
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

export const update =  async (req, res) => {
    try {
      const { title, text, banner } = req.body
      const { id } = req.params

      if(!title || !banner || !text) {
        res.status(400).send({ message: "Submit at least one field to update the post" })
    }

    const posts = await findByIdService(id)

    if(posts.user._id != req.userId) {
        return res.status(400).send({
            message: "You didn't update this post"
        })
    }

    await updateService(id, title, text, banner)

    return res.send({ message: "Post successfully updated!" })

    } catch (error) {
       res.status(500).send({message: error.message})
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params

        const posts = await findByIdService(id)
      
        if(posts.user._id != req.userId) {
            return res.status(400).send({
                message: "You didn't delete this post"
            })
        }

        await deletePostService(id)

        return res.send({message: "Post deleted successfully!"})
        
    } catch (error) {
       res.status(500).send({message: error.message})
    }
}

export const likePosts = async (req, res) => {
    try {
      const { id } = req.params
      const userId = req.userId

      const postLiked = await likePostsService(id, userId)

      if(!postLiked) {
        await deleteLikePostService(id, userId)
        return res.status(200).send({message: "Like removed"})
      }

      res.send({ message: "Liked :)" })

    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

export const addComment = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.userId
        const { comment } = req.body

        if(!comment) {
            return res.status(400).send({ message: "Write a message to comment" })
        }

        await addCommentService(id, comment, userId)

        res.send({
            message: "Comment successfully completed!"
        })

    } catch (error) {
        res.status(500).send({ message: error.message })
    }

}

export const deleteComment = async (req, res) => {
    try {
        const { idPost, idComment } = req.params
        const userId = req.userId

        const commentDelete = await deleteCommentService(idPost, idComment, userId)
        
        const commentFinder = commentDelete.comments.find((comment) => comment.idComment === idComment )

        if(!commentFinder) {
          return res.status(400).send({message: "Comment not found"})
        }

        if(commentFinder.userId !== userId) {
            return  res.status(400).send({message: "You can't delete this comment"})
        }

        res.send({
            message: "Comment successfully deleted!"
        })

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}