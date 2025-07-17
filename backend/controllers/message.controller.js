import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { Message } from '../models/message.model.js';
import { User } from '../models/user.model.js';
import cloudinary from '../utils/cloudinary.js';
import { getReceiverSocketId, io } from '../socket/socketHandler.js';

export const getAllUsers = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;
  const users = await User.find({
    _id: { $ne: loggedInUserId }
  }).select('-password -refreshToken');

  if (!users) {
    throw new ApiError('No users found', 404);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, users, 'Users retrieved successfully'));
});

export const getMessages = asyncHandler(async (req, res) => {
  const { id: userToOther } = req.params;
  const myId = req.user._id;

  if (!userToOther) {
    throw new ApiError('User ID is required', 400);
  }

  const otherUser = await User.findById(userToOther);
  if (!otherUser) {
    throw new ApiError('User not found', 404);
  }

  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToOther },
      { senderId: userToOther, receiverId: myId }
    ]
  })
    .sort({ createdAt: 1 })
    .populate('sender', 'username profilePic')
    .populate('receiver', 'username profilePic');

  if (messages.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], 'No messages found'));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, messages, 'Messages retrieved successfully'));
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { id: receiverId } = req.params;
  const { text, image } = req.body;
  const senderId = req.user._id;

  // if (!receiverId || (!text && !image)) {
  //   throw new ApiError('User ID and message content are required', 400);
  // }

  let imageUrl;
  if (image) {
    try {
      const uploadImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadImage.secure_url;
    } catch (error) {
      throw new ApiError('Image upload failed', 500);
    }
  }

  const message = await Message.create({
    senderId,
    receiverId,
    text,
    image: image ? imageUrl : null
  });

  if (!message) {
    throw new ApiError('Failed to send message', 500);
  }

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('newMessage', message);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, message, 'Message sent successfully'));
});
