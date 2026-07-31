import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().trim().min(3, 'Username must be at least 3 characters').max(30),
  email: z.string().trim().email('Please provide a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  profile: z
    .object({
      height: z.number().nullable().optional(),
      weight: z.number().nullable().optional(),
      age: z.number().nullable().optional(),
      gender: z.string().nullable().optional(),
      goal: z.string().nullable().optional(),
      activityLevel: z.string().nullable().optional(),
    })
    .optional(),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const profileUpdateSchema = z.object({
  profile: z.object({
    height: z.number().nullable().optional(),
    weight: z.number().nullable().optional(),
    age: z.number().nullable().optional(),
    gender: z.string().nullable().optional(),
    goal: z.string().nullable().optional(),
    activityLevel: z.string().nullable().optional(),
  }).partial()
    .strict(),
});
