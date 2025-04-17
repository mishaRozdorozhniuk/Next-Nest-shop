"use server"

import { POST } from '../common/util/fetch'

export default async function createProduct(formData: FormData) {
  return POST('products', formData)
}
