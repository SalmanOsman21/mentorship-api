import {z} from 'zod';

export const createUserSchema= z.object({
    name : z.string().min(1, 'Name is required '),
    email: z.string().email('Email is required'),
    password: z.string().min(6, 'Password must be at least 6 chaacters  ')
    .max(100, 'Password must be at most 100 characters')

})