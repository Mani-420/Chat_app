import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    profilePic: {
      type: String,
      default:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Fprojets-termins--533817362089569838%2F&psig=AOvVaw0mFISmxzHJdyJQRa2DijLJ&ust=1752075490919000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPi5tvvLrY4DFQAAAAAdAAAAABAE'
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 5
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

// Check if password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

// Generate access tokens
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

// Generate refresh tokens
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
};

export const User = mongoose.model('User', userSchema);
