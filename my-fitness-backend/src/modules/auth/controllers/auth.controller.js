import { authService } from '../services/auth.service.js';
import { loginSchema, profileUpdateSchema, registerSchema } from '../validators/auth.validators.js';

export const authController = {
  async register(req, res, next) {
    try {
      const parsed = registerSchema.parse(req.body);
      const result = await authService.register(parsed);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const parsed = loginSchema.parse(req.body);
      const result = await authService.login(parsed.username, parsed.password);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async getProfile(req, res, next) {
    try {
      const result = await authService.getProfile(req.user.sub);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const parsed = profileUpdateSchema.parse(req.body);
      const result = await authService.updateProfile(req.user.sub, parsed);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
};
