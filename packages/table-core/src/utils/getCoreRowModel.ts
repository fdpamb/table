import { createRow } from '../core/row'
import { Table, Row, RowModel, RowData } from '../types'
import { getMemoOptions, memo } from '../utils'

export function getCoreRowModel<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(): (table: Table<TFeatures, TData>) => () => RowModel<TFeatures, TData> {
  return table =>
    memo(
      () => [table.options.data],
      (
        data
      ): {
        rows: Row<TFeatures, TData>[]
        flatRows: Row<TFeatures, TData>[]
        rowsById: Record<string, Row<TFeatures, TData>>
      } => {
        const rowModel: RowModel<TFeatures, TData> = {
          rows: [],
          flatRows: [],
          rowsById: {},
        }

        const accessRows = (
          originalRows: TData[],
          depth = 0,
          parentRow?: Row<TFeatures, TData>
        ): Row<TFeatures, TData>[] => {
          const rows = [] as Row<TFeatures, TData>[]

          for (let i = 0; i < originalRows.length; i++) {
            // This could be an expensive check at scale, so we should move it somewhere else, but where?
            // if (!id) {
            //   if (process.env.NODE_ENV !== 'production') {
            //     throw new Error(`getRowId expected an ID, but got ${id}`)
            //   }
            // }

            // Make the row
            const row = createRow(
              table,
              table._getRowId(originalRows[i]!, i, parentRow),
              originalRows[i]!,
              i,
              depth,
              undefined,
              parentRow?.id
            )

            // Keep track of every row in a flat array
            rowModel.flatRows.push(row)
            // Also keep track of every row by its ID
            rowModel.rowsById[row.id] = row
            // Push table row into parent
            rows.push(row)

            // Get the original subrows
            if (table.options.getSubRows) {
              row.originalSubRows = table.options.getSubRows(
                originalRows[i]!,
                i
              )

              // Then recursively access them
              if (row.originalSubRows?.length) {
                row.subRows = accessRows(row.originalSubRows, depth + 1, row)
              }
            }
          }

          return rows
        }

        rowModel.rows = accessRows(data)

        return rowModel
      },
      getMemoOptions(table.options, 'debugTable', 'getRowModel', () =>
        table._autoResetPageIndex()
      )
    )
}
