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