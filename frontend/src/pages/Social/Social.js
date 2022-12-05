import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import SocialTable from './components/SocialTable';
import apiUtil from 'utils/api';
import './social.scss';

const Social = () => {
  const [ userList, setUserList ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ perPage, setperPage ] = useState(2);
  const [ total, setTotal ] = useState(2);

  const fetchUsers = async () => {
    const data = {current_page: currentPage, per_page: perPage}
    console.log(data)
    const response = await apiUtil().post('/user/users', data);

    if (response.status === 200) {
      setUserList(response.data.users);
      setperPage(response.data.per_page);
      setCurrentPage(response.data.current_page);
      setTotal(response.data.total);
    }
  };

  const nextPage = () => {
    let curr = currentPage + 1;
    setCurrentPage(curr);
  }

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  return (
    <Container
      alignItems='center'
      height='100%'
      className='socialWrapper'
      direction='column'
    >
      <Grid item textAlign='center' width="100%" position={'relative'}>
        <h1 className='colorWhite'>Users list</h1>
        <h4 className='colorWhite'>Add and message friends</h4>
      </Grid>
      <SocialTable
        data={userList}
        page={currentPage}
        perPage={perPage}
        total={total}
      />
    </Container>
  );
};

export default Social;
