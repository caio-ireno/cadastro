import { Environment } from '../../../environment'
import { Api } from '../axios-config'

export interface IListagemTipoSorvete {
  tipo: string
  id: number
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

export const TipoSorveteService = {
  getAll,
}
