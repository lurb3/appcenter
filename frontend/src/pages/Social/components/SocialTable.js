import React from 'react';
import { Grid, TableContainer, Table, TableBody, TableRow, TableCell, TableFooter, TablePagination, Paper } from '@mui/material';
import SocialTableActions from './SocialTableActions';

const SocialTable = ({data, page = 0, perPage = 3, total = 3}) => {
  return (
    <>
      {
        data.length <= 0 ? <div>No users found</div> : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
              {
                data.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      {user.name}
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                  </TableRow>
                ))
              }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={total}
                    rowsPerPage={perPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={() => {}}
                    onRowsPerPageChange={() => {}}
                    ActionsComponent={SocialTableActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )
      }
    </>
  )
};

export default SocialTable;
