import { Api } from '../axios-config'

export interface HistoriaProps {
  id: number
  texto: string
}

type TextoComTotalCount = {
  data: HistoriaProps[]
}

const getAll = async (): Promise<TextoComTotalCount | Error> => {
  try {
    const urlRelativa = '/historias'
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

const updateById = async (
  id: number,
  dados: HistoriaProps,
): Promise<void | Error> => {
  try {
    await Api.put(`/historias/${id}`, dados)
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar',
    )
  }
}
const getById = async (id: number): Promise<HistoriaProps | Error> => {
  try {
    const { data } = await Api.get(`/historias/${id}`)

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
    await Api.delete<HistoriaProps>(`/historias/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao apagar')
  }
}

export const HistoriaService = {
  getAll,
  getById,
  updateById,
  deleteById,
}
