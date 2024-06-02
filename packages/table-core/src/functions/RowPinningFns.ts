
import { RowPinningDefaultOptions, RowPinningState, RowPinningTableState } from '../features/RowPinning'
import { RowData, Table, TableFeatures, TableState } from '../types'
import { makeStateUpdater } from '../utils'

// These functions can only assume that the APIs/types from the RowPinning feature are available

export const getDefaultRowPinningState = (): RowPinningState => ({
  top: [],
  bottom: [],
})

export function getInitialRowPinningState<TFeatures extends TableFeatures>(
  state: TableState<TFeatures> & {}
): TableState<TFeatures> & RowPinningTableState {
  return {
    rowPinning: getDefaultRowPinningState(),
    ...state,
  }
}

export function getDefaultRowPinningOptions<TFeatures extends TableFeatures, TData extends RowData>(
  table: Table<TFeatures, TData>
): RowPinningDefaultOptions {
  return {
    onRowPinningChange: makeStateUpdater('rowPinning', table),
  }
}