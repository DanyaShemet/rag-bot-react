import { api } from '@/api/index'
export interface DocumentItem {
  _id: string
  fileName: string
  fileUrl: string
}

export const getDocuments = (): Promise<DocumentItem[]> => {
  return api.get('/documents').then((res) => res.data)
}

export const deleteDocument = (id: string) => {
  return api.delete(`/documents/${id}`).then((res) => res.data)
}
