import { ColumnPinningPosition } from '..'
import {
  Cell,
  Column,
  OnChangeFn,
  Table,
  Updater,
  Row,
  RowData,
  TableFeature,
} from '../types'
import { getMemoOptions, makeStateUpdater, memo } from '../utils'

export type ColumnVisibilityState = Record<string, boolean>

export interface ColumnVisibilityTableState {
  columnVisibility: ColumnVisibilityState
}

export interface VisibilityOptions {
  /**
   * Whether to enable column hiding. Defaults to `true`.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#enablehiding)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  enableHiding?: boolean
  /**
   * If provided, this function will be called with an `updaterFn` when `state.columnVisibility` changes. This overrides the default internal state management, so you will need to persist the state change either fully or partially outside of the table.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#oncolumnvisibilitychange)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  onColumnVisibilityChange?: OnChangeFn<ColumnVisibilityState>
}

export type ColumnVisibilityDefaultOptions = Pick<
  VisibilityOptions,
  'onColumnVisibilityChange'
>

export interface ColumnVisibilityInstance<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
> {
  /**
   * If column pinning, returns a flat array of leaf-node columns that are visible in the unpinned/center portion of the table.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#getcentervisibleleafcolumns)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  getCenterVisibleLeafColumns: () => Column<TData, unknown, TFeatures>[]
  /**
   * Returns whether all columns are visible
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#getisallcolumnsvisible)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  getIsAllColumnsVisible: () => boolean
  /**
   * Returns whether any columns are visible
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#getissomecolumnsvisible)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  getIsSomeColumnsVisible: () => boolean
  /**
   * If column pinning, returns a flat array of leaf-node columns that are visible in the left portion of the table.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#getleftvisibleleafcolumns)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  getLeftVisibleLeafColumns: () => Column<TData, unknown, TFeatures>[]
  /**
   * If column pinning, returns a flat array of leaf-node columns that are visible in the right portion of the table.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#getrightvisibleleafcolumns)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  getRightVisibleLeafColumns: () => Column<TData, unknown, TFeatures>[]
  /**
   * Returns a handler for toggling the visibility of all columns, meant to be bound to a `input[type=checkbox]` element.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#gettoggleallcolumnsvisibilityhandler)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  getToggleAllColumnsVisibilityHandler: () => (event: unknown) => void
  /**
   * Returns a flat array of columns that are visible, including parent columns.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#getvisibleflatcolumns)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  getVisibleFlatColumns: () => Column<TData, unknown, TFeatures>[]
  /**
   * Returns a flat array of leaf-node columns that are visible.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#getvisibleleafcolumns)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  getVisibleLeafColumns: () => Column<TData, unknown, TFeatures>[]
  /**
   * Resets the column visibility state to the initial state. If `defaultState` is provided, the state will be reset to `{}`
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#resetcolumnvisibility)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  resetColumnVisibility: (defaultState?: boolean) => void
  /**
   * Sets or updates the `state.columnVisibility` state.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#setcolumnvisibility)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  setColumnVisibility: (updater: Updater<ColumnVisibilityState>) => void
  /**
   * Toggles the visibility of all columns.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#toggleallcolumnsvisible)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  toggleAllColumnsVisible: (value?: boolean) => void
}

export interface ColumnVisibilityColumnDef {
  enableHiding?: boolean
}

export interface VisibilityRow<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
> {
  _getAllVisibleCells: () => Cell<TData, unknown, TFeatures>[]
  /**
   * Returns an array of cells that account for column visibility for the row.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#getvisiblecells)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  getVisibleCells: () => Cell<TData, unknown, TFeatures>[]
}

export interface ColumnVisibilityColumn {
  /**
   * Returns whether the column can be hidden
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#getcanhide)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  getCanHide: () => boolean
  /**
   * Returns whether the column is visible
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#getisvisible)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  getIsVisible: () => boolean
  /**
   * Returns a function that can be used to toggle the column visibility. This function can be used to bind to an event handler to a checkbox.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#gettogglevisibilityhandler)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  getToggleVisibilityHandler: () => (event: unknown) => void
  /**
   * Toggles the visibility of the column.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-visibility#togglevisibility)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-visibility)
   */
  toggleVisibility: (value?: boolean) => void
}

//

export const ColumnVisibility: TableFeature = {
  getInitialState: (state): ColumnVisibilityTableState => {
    return {
      columnVisibility: {},
      ...state,
    }
  },

  getDefaultOptions: <
    TData extends RowData,
    TFeatures extends TableFeatures = {},
  >(
    table: Table<TData, TFeatures>
  ): ColumnVisibilityDefaultOptions => {
    return {
      onColumnVisibilityChange: makeStateUpdater('columnVisibility', table),
    }
  },

  createColumn: <
    TData extends RowData,
    TValue,
    TFeatures extends TableFeatures = {},
  >(
    column: Column<TData, TValue, TFeatures>,
    table: Table<TData, TFeatures>
  ): void => {
    column.toggleVisibility = value => {
      if (column.getCanHide()) {
        table.setColumnVisibility(old => ({
          ...old,
          [column.id]: value ?? !column.getIsVisible(),
        }))
      }
    }
    column.getIsVisible = () => {
      const childColumns = column.columns
      return (
        (childColumns.length
          ? childColumns.some(c => c.getIsVisible())
          : table.getState().columnVisibility?.[column.id]) ?? true
      )
    }

    column.getCanHide = () => {
      return (
        (column.columnDef.enableHiding ?? true) &&
        (table.options.enableHiding ?? true)
      )
    }
    column.getToggleVisibilityHandler = () => {
      return (e: unknown) => {
        column.toggleVisibility?.(
          ((e as MouseEvent).target as HTMLInputElement).checked
        )
      }
    }
  },

  createRow: <TData extends RowData, TFeatures extends TableFeatures = {}>(
    row: Row<TData, TFeatures>,
    table: Table<TData, TFeatures>
  ): void => {
    row._getAllVisibleCells = memo(
      () => [row.getAllCells(), table.getState().columnVisibility],
      cells => {
        return cells.filter(cell => cell.column.getIsVisible())
      },
      getMemoOptions(table.options, 'debugRows', '_getAllVisibleCells')
    )
    row.getVisibleCells = memo(
      () => [
        row.getLeftVisibleCells(),
        row.getCenterVisibleCells(),
        row.getRightVisibleCells(),
      ],
      (left, center, right) => [...left, ...center, ...right],
      getMemoOptions(table.options, 'debugRows', 'getVisibleCells')
    )
  },

  createTable: <TData extends RowData, TFeatures extends TableFeatures = {}>(
    table: Table<TData, TFeatures>
  ): void => {
    const makeVisibleColumnsMethod = (
      key: string,
      getColumns: () => Column<TData, unknown, TFeatures>[]
    ): (() => Column<TData, unknown, TFeatures>[]) => {
      return memo(
        () => [
          getColumns(),
          getColumns()
            .filter(d => d.getIsVisible())
            .map(d => d.id)
            .join('_'),
        ],
        columns => {
          return columns.filter(d => d.getIsVisible?.())
        },
        getMemoOptions(table.options, 'debugColumns', key)
      )
    }

    table.getVisibleFlatColumns = makeVisibleColumnsMethod(
      'getVisibleFlatColumns',
      () => table.getAllFlatColumns()
    )
    table.getVisibleLeafColumns = makeVisibleColumnsMethod(
      'getVisibleLeafColumns',
      () => table.getAllLeafColumns()
    )
    table.getLeftVisibleLeafColumns = makeVisibleColumnsMethod(
      'getLeftVisibleLeafColumns',
      () => table.getLeftLeafColumns()
    )
    table.getRightVisibleLeafColumns = makeVisibleColumnsMethod(
      'getRightVisibleLeafColumns',
      () => table.getRightLeafColumns()
    )
    table.getCenterVisibleLeafColumns = makeVisibleColumnsMethod(
      'getCenterVisibleLeafColumns',
      () => table.getCenterLeafColumns()
    )

    table.setColumnVisibility = updater =>
      table.options.onColumnVisibilityChange?.(updater)

    table.resetColumnVisibility = defaultState => {
      table.setColumnVisibility(
        defaultState ? {} : table.initialState.columnVisibility ?? {}
      )
    }

    table.toggleAllColumnsVisible = value => {
      value = value ?? !table.getIsAllColumnsVisible()

      table.setColumnVisibility(
        table.getAllLeafColumns().reduce(
          (obj, column) => ({
            ...obj,
            [column.id]: !value ? !column.getCanHide?.() : value,
          }),
          {}
        )
      )
    }

    table.getIsAllColumnsVisible = () =>
      !table.getAllLeafColumns().some(column => !column.getIsVisible?.())

    table.getIsSomeColumnsVisible = () =>
      table.getAllLeafColumns().some(column => column.getIsVisible?.())

    table.getToggleAllColumnsVisibilityHandler = () => {
      return (e: unknown) => {
        table.toggleAllColumnsVisible(
          ((e as MouseEvent).target as HTMLInputElement)?.checked
        )
      }
    }
  },
}

export function _getVisibleLeafColumns<
  TData extends RowData,
  TFeatures extends TableFeatures = {},
>(table: Table<TData, TFeatures>, position?: ColumnPinningPosition | 'center') {
  return !position
    ? table.getVisibleLeafColumns()
    : position === 'center'
      ? table.getCenterVisibleLeafColumns()
      : position === 'left'
        ? table.getLeftVisibleLeafColumns()
        : table.getRightVisibleLeafColumns()
}
