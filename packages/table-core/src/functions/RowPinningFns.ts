import {
  RowPinningDefaultOptions,
  RowPinningOptions,
  RowPinningPosition,
  RowPinningState,
  RowPinningTableState,
} from '../features/RowPinning'
import {
  Row,
  RowData,
  Table,
  TableFeatures,
  TableState,
  Updater,
} from '../types'
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

export function getDefaultRowPinningOptions<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(table: Table<TFeatures, TData>): RowPinningDefaultOptions {
  return {
    onRowPinningChange: makeStateUpdater('rowPinning', table),
  }
}

export function table_setRowPinning<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(
  table: Table<TFeatures, TData> & {
    options: RowPinningOptions<TFeatures, TData>
  },
  updater: Updater<RowPinningState>
): void {
  table.options.onRowPinningChange?.(updater)
}

export function row_pin<TFeatures extends TableFeatures, TData extends RowData>(
  row: Row<TFeatures, TData>,
  table: Table<TFeatures, TData>,
  position: RowPinningPosition,
  includeLeafRows?: boolean,
  includeParentRows?: boolean
): void {
  const leafRowIds = includeLeafRows
    ? row.getLeafRows().map(({ id }) => id)
    : []
  const parentRowIds = includeParentRows
    ? row.getParentRows().map(({ id }) => id)
    : []
  const rowIds = new Set([...parentRowIds, row.id, ...leafRowIds])

  table_setRowPinning(table, old => {
    if (position === 'bottom') {
      return {
        top: (old?.top ?? []).filter(d => !rowIds?.has(d)),
        bottom: [
          ...(old?.bottom ?? []).filter(d => !rowIds?.has(d)),
          ...Array.from(rowIds),
        ],
      }
    }

    if (position === 'top') {
      return {
        top: [
          ...(old?.top ?? []).filter(d => !rowIds?.has(d)),
          ...Array.from(rowIds),
        ],
        bottom: (old?.bottom ?? []).filter(d => !rowIds?.has(d)),
      }
    }

    return {
      top: (old?.top ?? []).filter(d => !rowIds?.has(d)),
      bottom: (old?.bottom ?? []).filter(d => !rowIds?.has(d)),
    }
  })
}
