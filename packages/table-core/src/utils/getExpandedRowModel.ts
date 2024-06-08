import { Table, Row, RowModel, RowData, TableFeatures } from '../types'
import { getMemoOptions, memo } from '../utils'

export function getExpandedRowModel<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(): (table: Table<TFeatures, TData>) => () => RowModel<TFeatures, TData> {
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
  TFeatures extends TableFeatures,
  TData extends RowData,
>(rowModel: RowModel<TFeatures, TData>) {
  const expandedRows: Row<TFeatures, TData>[] = []

  const handleRow = (row: Row<TFeatures, TData>) => {
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
