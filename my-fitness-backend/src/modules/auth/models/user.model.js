import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Note: Primary authentication & user profile storage uses PostgreSQL:
 * - Table `auth_users`: Core account details (id, username, email, password_hash, is_premium)
 * - Table `user_profiles`: User metrics (user_id, height, weight, age, gender, goal, activity_level)
 *
 * This Mongoose model remains available if MongoDB fallback or document caching is enabled.
 */

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    profile: {
      height: { type: Number, default: null },
      weight: { type: Number, default: null },
      age: { type: Number, default: null },
      gender: { type: String, default: null },
      goal: { type: String, default: null },
      activityLevel: { type: String, default: null },
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'auth_users',
  }
);

userSchema.pre('save', async function preSave(next) {
  if (!this.isModified('passwordHash')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

userSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    profile: this.profile,
    isPremium: this.isPremium,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const AuthUser = mongoose.model('AuthUser', userSchema);
