import { Table, Row, RowModel, RowData } from '../types'
import { getMemoOptions, memo } from '../utils'

export function getExpandedRowModel<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
>(): (table: Table<TData, TFeatures>) => () => RowModel<TData, TFeatures> {
  return table =>
    memo(
      () => [
        table.getState().expanded,
        table.getPreExpandedRowModel(),
        table.options.paginateExpandedRows,
      ],
      (expanded, rowModel, paginateExpandedRows) => {
        if (
          !rowModel.rows.length ||
          (expanded !== true && !Object.keys(expanded ?? {}).length)
        ) {
          return rowModel
        }

        if (!paginateExpandedRows) {
          // Only expand rows at this point if they are being paginated
          return rowModel
        }

        return expandRows(rowModel)
      },
      getMemoOptions(table.options, 'debugTable', 'getExpandedRowModel')
    )
}

export function expandRows<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
>(rowModel: RowModel<TData, TFeatures>) {
  const expandedRows: Row<TData, TFeatures>[] = []

  const handleRow = (row: Row<TData, TFeatures>) => {
    expandedRows.push(row)

    if (row.subRows?.length && row.getIsExpanded()) {
      row.subRows.forEach(handleRow)
    }
  }

  rowModel.rows.forEach(handleRow)

  return {
    rows: expandedRows,
    flatRows: rowModel.flatRows,
    rowsById: rowModel.rowsById,
  }
}
