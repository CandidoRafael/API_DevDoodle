import Posts from '../models/Posts.js'

export const createService = (body) => Posts.create(body)

export const findAllService = (offset, limit) => Posts.find().sort({_id:-1}).skip(offset).limit(limit).populate("user")

export const countPosts = () => Posts.countDocuments()

export const topPostsService = () => Posts.findOne().sort({_id:-1}).populate("user")

export const findByIdService = (id) => Posts.findById(id).populate("user")

export const searchByTitleService = (title) => Posts.find({ 
    title: {$regex: `${title || ""}`, $options: "i"}
 }).sort({_id: -1}).populate("user")

 export const byUserService = (id) => Posts.find({user: id}).sort({_id:-1}).populate("user")

 export const updateService = (id, title, text, banner) => Posts.findOneAndUpdate({_id: id}, { title, text, banner }, { rawResult: true })

 export const deletePostService = (id) => Posts.findByIdAndDelete({_id: id})

 export const likePostsService = (idPost, userId) => 
 Posts.findOneAndUpdate( 
    {_id: idPost, "likes.userId": { $nin: [userId] } }, 
    {$push: { likes: { userId, created: new Date() } } } 
)

export const deleteLikePostService = (idPost, userId) => 
Posts.findOneAndUpdate( 
    {_id: idPost }, 
    {$pull: { likes: { userId } } } 
)

export const addCommentService = (idPost, comment, userId) => {
    
    const idComment = Math.floor(Date.now() * Math.random()).toString(36) 
    
    return Posts.findOneAndUpdate( {_id: idPost}, {$push: {
        comments: { 
            idComment, 
            userId, 
            comment, 
            createdAt: new Date()
        } }})
}

export const deleteCommentService = (idPost, idComment, userId) => {
    return Posts.findByIdAndUpdate( 
        {_id: idPost}, 
        {$pull: { comments: { idComment, userId } }}
   )
}