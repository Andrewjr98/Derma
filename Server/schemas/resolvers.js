const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('Posts');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('Posts');
        },
        Posts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params).sort({ createdAt: -1 });
        },
        Post: async (parent, { PostId }) => {
            return Post.findOne({ _id: PostId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('Posts').populate('friends');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        user: async (parent, args) => {
            return User.findById(args._id).populate('friend');
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addPost: async (parent, { message }, context) => {
            if (context.user) {
                const Post = await Post.create({
                    title: context.Post.title,
                    message: context.Post.message,
                    PostAuthor: context.user.username,
                    createdAt: context.Post.createdAt,
                    image: context.Post.image,
                    tags: context.Post.tags
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { Posts: Post._id } }
                );

                return Post;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addComment: async (parent, { PostId, message }, context) => {
            if (context.user) {
                return Post.findOneAndUpdate(
                    { _id: PostId },
                    {
                        $addToSet: {
                            comments: { message, commentAuthor: context.user.username },
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removePost: async (parent, { PostId }, context) => {
            if (context.user) {
                const Post = await Post.findOneAndDelete({
                    _id: PostId,
                    PostAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { Posts: Post._id } }
                );

                return Post;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeComment: async (parent, { PostId, commentId }, context) => {
            if (context.user) {
                return Post.findOneAndUpdate(
                    { _id: PostId },
                    {
                        $pull: {
                            comments: {
                                _id: commentId,
                                commentAuthor: context.user.username,
                            },
                        },
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async (parent, { friendId, user }, context) => {
            const friend = await friend.findOneAndUpdate(
                { _id: user },
                {
                    $push: {
                        friends: {
                            _id: friendId
                        }
                    }
                },
                { new: true }
            );
        },
        removeFriend: async (parent, { friendId, user }, context) => {
            if (context.user) {
                return Post.findOneAndUpdate(
                    { _id: user },
                    {
                        $pull: {
                            friends: {
                                _id: friendId
                            },
                        },
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;