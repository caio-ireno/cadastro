import { Environment } from '../../../environment'
import { Api } from '../axios-config'

export interface IListagemTipoSorvete {
  id: number
  tipo: string
}

type TTipoSorveteComTotalCount = {
  data: IListagemTipoSorvete[]
  totalCount: number
}

const getAll = async (): Promise<TTipoSorveteComTotalCount | Error> => {
  try {
    const urlRelativa = '/sorvetes'

    const { data, headers } = await Api.get(urlRelativa)

    if (data) {
      return {
        data,
        totalCount: Number(
          headers['x-total-count'] || Environment.LIMITE_LINHAS,
        ),
      }
    }

    return new Error('Erro ao listar os registros.')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao listar os registros.',
    )
  }
}

const deleteTypeById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<IListagemTipoSorvete>(`/sorvetes/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao apagar')
  }
}

const getTypeById = async (
  id: number,
): Promise<IListagemTipoSorvete | Error> => {
  try {
    const { data } = await Api.get(`/sorvetes/${id}`)

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

const createType = async (
  dados: Omit<IListagemTipoSorvete, 'id'>,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IListagemTipoSorvete>('/sorvetes', dados) //Dessa forma eu consigo dizer qqual dado esta retornando

    if (data) {
      return data.id
    }

    return new Error('Erro ao criar o Registro')
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao criar')
  }
}

const updateTypeById = async (
  id: number,
  dados: IListagemTipoSorvete,
): Promise<void | Error> => {
  try {
    await Api.put(`/sorvetes/${id}`, dados)
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar',
    )
  }
}
export const TipoSorveteService = {
  getAll,
  deleteTypeById,
  getTypeById,
  createType,
  updateTypeById,
}
