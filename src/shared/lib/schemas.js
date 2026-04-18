import { z } from 'zod'

export const loginSchema = z.object({
  login: z.string().min(1, 'Введите логин'),
  pass: z.string().min(6, 'Минимум 6 символов'),
})

export const productSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  description: z.string().min(5, 'Минимум 5 символов'),
  price: z.coerce.number({ invalid_type_error: 'Введите число' }).positive('Должна быть больше 0'),
  categoryId: z.coerce.number({ invalid_type_error: 'Укажите категорию' }).positive('Укажите категорию'),
})

export const serviceSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  description: z.string().min(5, 'Минимум 5 символов'),
  categoryId: z.coerce.number({ invalid_type_error: 'Укажите категорию' }).positive('Укажите категорию'),
  price: z.coerce.number({ invalid_type_error: 'Введите число' }).positive('Должна быть больше 0'),
})

export const requestSchema = z.object({
  name: z.string().min(2, 'Введите имя'),
  contact: z.string().min(5, 'Введите телефон или email'),
  serviceId: z.string().min(1, 'Выберите услугу'),
  desc: z.string().min(5, 'Опишите проблему подробнее'),
})
