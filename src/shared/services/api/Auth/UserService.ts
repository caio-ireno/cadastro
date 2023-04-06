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
const getById = async (id: number): Promise<RegisterProps | Error> => {
  try {
    const { data } = await Api.get(`/user/${id}`)

    if (data) {
      return data
    }

    return new Error('Erro ao consultar o Registro')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao consultar',
    )
  }
}
const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<RegisterProps>(`/user/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao apagar')
  }
}

const updateById = async (
  id: number,
  dados: RegisterProps,
): Promise<void | Error> => {
  try {
    await Api.put(`/user/${id}`, dados)
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar',
    )
  }
}

export const UserServices = {
  getAll,
  updateById,
  deleteById,
  getById,
}
