import { RowData, Cell, Column, Row, Table, TableFeatures } from '../types'
import { Getter, getMemoOptions, memo } from '../utils'

export interface CellContext<
  TData extends RowData,
  TValue,
  TFeatures extends TableFeatures = {},
> {
  cell: Cell<TData, TValue, TFeatures>
  column: Column<TData, TValue, TFeatures>
  getValue: Getter<TValue>
  renderValue: Getter<TValue | null>
  row: Row<TData, TFeatures>
  table: Table<TData, TFeatures>
}

export interface CoreCell<
  TData extends RowData,
  TValue,
  TFeatures extends TableFeatures = {},
> {
  /**
   * The associated Column object for the cell.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/core/cell#column)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/cells)
   */
  column: Column<TData, TValue, TFeatures>
  /**
   * Returns the rendering context (or props) for cell-based components like cells and aggregated cells. Use these props with your framework's `flexRender` utility to render these using the template of your choice:
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/core/cell#getcontext)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/cells)
   */
  getContext: () => CellContext<TData, TValue, TFeatures>
  /**
   * Returns the value for the cell, accessed via the associated column's accessor key or accessor function.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/core/cell#getvalue)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/cells)
   */
  getValue: CellContext<TData, TValue, TFeatures>['getValue']
  /**
   * The unique ID for the cell across the entire table.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/core/cell#id)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/cells)
   */
  id: string
  /**
   * Renders the value for a cell the same as `getValue`, but will return the `renderFallbackValue` if no value is found.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/core/cell#rendervalue)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/cells)
   */
  renderValue: CellContext<TData, TValue, TFeatures>['renderValue']
  /**
   * The associated Row object for the cell.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/core/cell#row)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/cells)
   */
  row: Row<TData, TFeatures>
}

export function createCell<
  TData extends RowData,
  TValue,
  TFeatures extends TableFeatures = {},
>(
  table: Table<TData, TFeatures>,
  row: Row<TData, TFeatures>,
  column: Column<TData, TValue, TFeatures>,
  columnId: string
): Cell<TData, TValue, TFeatures> {
  const getRenderValue = () =>
    cell.getValue() ?? table.options.renderFallbackValue

  const cell: CoreCell<TData, TValue, TFeatures> = {
    id: `${row.id}_${column.id}`,
    row,
    column,
    getValue: () => row.getValue(columnId),
    renderValue: getRenderValue,
    getContext: memo(
      () => [table, column, row, cell],
      (table, column, row, cell) => ({
        table,
        column,
        row,
        cell: cell as Cell<TData, TValue, TFeatures>,
        getValue: cell.getValue,
        renderValue: cell.renderValue,
      }),
      getMemoOptions(table.options, 'debugCells', 'cell.getContext')
    ),
  }

  Object.values(table._features).forEach(feature => {
    feature.createCell?.(
      cell as Cell<TData, TValue, TFeatures>,
      column,
      row,
      table
    )
  }, {})

  return cell as Cell<TData, TValue, TFeatures>
}
