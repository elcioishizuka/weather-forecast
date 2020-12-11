import { createReducer, Action, on } from '@ngrx/store'

import * as fromHomeActions from './home.actions';

export interface HomeState {
  apiKey: string;
  entity: any;
  loading: boolean;
  error: boolean;
}

export const homeInitialState: HomeState = {
  apiKey: '',
  entity: undefined,
  loading: false,
  error: false,
}

const reducer = createReducer(
  homeInitialState,
  /* Alterado para não limpar o valor do API key no método clearHomeState */
  on(fromHomeActions.clearHomeState, state => ({
    ...state,
    entity: undefined,
    loading: false,
    error: false,
    }),
  ), 
  /* Adicionado para alterar valor do API key */
  on (fromHomeActions.changeApiKey, (state, { apiKey }) => ({
    ...state,
    apiKey,
  })),
  on(
    fromHomeActions.loadCurrentWeather,
    fromHomeActions.loadCurrentWeatherById,
    state => ({
      ...state,
      loading: true,
      error: false,
    }),
  ),
  on(fromHomeActions.loadCurrentWeatherSuccess, (state, { entity }) => ({
    ...state,
    entity,
    loading: false,
  })),
  on(fromHomeActions.loadCurrentWeatherFailed, state => ({
    ...state,
    loading: false,
    error: true,
  })),
);

export function homeReducer(state: HomeState | undefined, action: Action): HomeState {
  return reducer(state, action);
}
