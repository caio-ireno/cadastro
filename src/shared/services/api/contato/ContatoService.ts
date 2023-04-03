import { Api } from '../axios-config'

export interface ContatoProps {
  id: number
  celular: string
  email: string
  facebook: string
  instagram: string
}

type ContatoComTotalCount = {
  data: ContatoProps[]
}
const getAll = async (): Promise<ContatoComTotalCount | Error> => {
  try {
    const urlRelativa = '/contato'
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

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<ContatoProps>(`/contato/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao apagar')
  }
}

const updateById = async (
  id: number,
  dados: ContatoProps,
): Promise<void | Error> => {
  try {
    await Api.put(`/contato/${id}`, dados)
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar',
    )
  }
}

export const LojasServices = {
  getAll,
  updateById,
  deleteById,
}
