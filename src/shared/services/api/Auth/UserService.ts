import { Api } from '../axios-config'

export interface RegisterProps {
  id: number
  name: string
  email: string
  password: string
}

type ContatoComTotalCount = {
  data: RegisterProps[]
}
const getAll = async (): Promise<ContatoComTotalCount | Error> => {
  try {
    const urlRelativa = '/user'
    const { data } = await Api.get(urlRelativa)

    if (data) {
      return {
        data,
      }
    }

    return new Error('Erro ao listar os Registros')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao Carregar',
    )
  }
}

export const UserServices = {
  getAll,
}
