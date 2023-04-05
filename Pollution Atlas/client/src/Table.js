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

function Table( {dataEntry} ) {
    const columns = React.useMemo(() => 
        [{
            Header: 'Date',
            columns: [
                {
                    Header: 'Year',
                    accessor: 'Year',
                },
                {
                    Header: 'Month',
                    accessor: 'Month',
                },
                {
                    Header: 'Day',
                    accessor: 'Day',
                },
            ]
        },
        {
            Header: 'Location',
            columns: [
                {
                    Header: 'State',
                    accessor: 'StateName',
                },
                {
                    Header: 'County',
                    accessor: 'CountyName',
                },
            ]
        },
        {
            Header: 'CO Pollutant',
            columns: [
                {
                    Header: 'AQI',
                    accessor: 'CO AQI',
                },
                {
                    Header: 'Mean',
                    accessor: 'CO MEAN',
                },
                {
                    Header: 'Maximum Value',
                    accessor: 'CO MAXVAL',
                },
                {
                    Header: 'Maximum Hour',
                    accessor: 'CO MAXHOUR',
                },
            ]
        },
        {
            Header: 'SO2 Pollutant',
            columns: [
                {
                    Header: 'AQI',
                    accessor: 'SO2 AQI',
                },
                {
                    Header: 'Mean',
                    accessor: 'SO2 MEAN',
                },
                {
                    Header: 'Maximum Value',
                    accessor: 'SO2 MAXVAL',
                },
                {
                    Header: 'Maximum Hour',
                    accessor: 'SO2 MAXHOUR',
                },
            ]
        },
        {
            Header: 'NO2 Pollutant',
            columns: [
                {
                    Header: 'AQI',
                    accessor: 'NO2 AQI',
                },
                {
                    Header: 'Mean',
                    accessor: 'NO2 MEAN',
                },
                {
                    Header: 'Maximum Value',
                    accessor: 'NO2 MAXVAL',
                },
                {
                    Header: 'Maximum Hour',
                    accessor: 'NO2 MAXHOUR',
                },
            ]
        },
        {
            Header: 'O3 Pollutant',
            columns: [
                {
                    Header: 'AQI',
                    accessor: 'O3 AQI',
                },
                {
                    Header: 'Mean',
                    accessor: 'O3 MEAN',
                },
                {
                    Header: 'Maximum Value',
                    accessor: 'O3 MAXVAL',
                },
                {
                    Header: 'Maximum Hour',
                    accessor: 'O3 MAXHOUR',
                },
            ]
        }],
        []
    )

  const data = dataEntry;

  return (
    <Styles>
      <TableInstance columns={columns} data={dataEntry} />
    </Styles>
  )
}

export default Table