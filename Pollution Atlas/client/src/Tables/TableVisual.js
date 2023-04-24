import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function TableInstance({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function TableVisual( {dataEntry} ) {
    const columns = React.useMemo(() => 
        [{
          Header: 'State',
          accessor: 'StateName',
        },
        {
            Header: 'Average Mean',
            columns: [
                {
                    Header: 'AVG CO Mean',
                    accessor: 'CO',
                },
                {
                    Header: 'AVG SO2 Mean',
                    accessor: 'SO2',
                },
                {
                    Header: 'AVG NO2 Mean',
                    accessor: 'NO2',
                },
                {
                    Header: 'AVG O3 Mean',
                    accessor: 'O3',
                },
            ]
        },],
        []
    )
  
  const data = dataEntry;
  
  return (
    <Styles>
      <TableInstance columns={columns} data={dataEntry} />
    </Styles>
  )
}

export default TableVisual;