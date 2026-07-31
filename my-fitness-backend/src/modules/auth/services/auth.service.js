import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { userRepository } from '../repositories/user.repository.js';
import { userMapper } from '../mappers/user.mapper.js';
import {
  UserAlreadyExistsError,
  InvalidCredentialsError,
  UserNotFoundError,
} from '../errors/auth.errors.js';
import { env } from '../../../config/env.config.js';

const generateToken = (user) => {
  return jwt.sign(
    {
      sub: user.id,
      username: user.username,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
};

export const authService = {
  async register(input) {
    const existing = await userRepository.findByUsernameOrEmail(input.username, input.email);
    if (existing) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const profile = input.profile || {};

    const fullUser = await userRepository.createUserWithProfile(
      {
        username: input.username,
        email: input.email,
        passwordHash,
      },
      profile
    );

    return {
      user: userMapper.toPublicUser(fullUser),
      token: generateToken(fullUser),
    };
  },

  async login(username, password) {
    const user = await userRepository.findByUsernameWithProfile(username);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      user: userMapper.toPublicUser(user),
      token: generateToken(user),
    };
  },

  async getProfile(userId) {
    const user = await userRepository.findByIdWithProfile(userId);
    if (!user) {
      throw new UserNotFoundError();
    }

    return userMapper.toPublicUser(user);
  },

  async updateProfile(userId, profileData) {
    const p = profileData.profile || profileData;
    const updatedUser = await userRepository.upsertProfile(userId, p);
    if (!updatedUser) {
      throw new UserNotFoundError();
    }

    return userMapper.toPublicUser(updatedUser);
  },
};
