import { Environment } from '../../../environment'
import { Api } from '../axios-config'

export interface NoticiaProps {
  id: number
  nomeNoticia: string
  imgNoticia: string
}

export interface ListaNoticiaProps {
  id: number
  nomeNoticia: string
  imgNoticia: string
}

type LojasComTotalCount = {
  data: NoticiaProps[]
  totalCount: number
}

const getAll = async (): Promise<LojasComTotalCount | Error> => {
  try {
    const urlRelativa = '/noticias'
    const { data, headers } = await Api.get(urlRelativa)

    if (data) {
      return {
        data,
        totalCount: Number(
          headers['x-total-count'] || Environment.LIMITE_LINHAS,
        ),
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

const getById = async (id: number): Promise<ListaNoticiaProps | Error> => {
  try {
    const { data } = await Api.get(`/noticias/${id}`)

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

const create = async (
  dados: Omit<ListaNoticiaProps, 'id'>,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<ListaNoticiaProps>('/noticias', dados, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (data) {
      return data.id
    }

    return new Error('Erro ao criar o Registro')
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao criar')
  }
}

const updateById = async (
  id: number,
  dados: ListaNoticiaProps,
): Promise<void | undefined | Error> => {
  try {
    console.log(dados)
    const { data } = await Api.put(`/noticias/${id}`, dados)
    if (data) {
      return data.id
    }
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar',
    )
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<ListaNoticiaProps>(`/noticias/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao apagar')
  }
}

export const NoticiaServices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
