import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from "react-redux";
import { listPartner } from '../../actions/partner_action';
import { Button } from '@aksara-ui/core';
import PartnerModalAdd from './PartnerModalAdd';
import Loader from '../../components/Loader';
import Empty from '../../components/Empty';
import { IconPen, IconTrash } from '@aksara-ui/icons';




import { Pagination } from '@aksara-ui/core';


const Partner = () => {

  const { pending, data } = useSelector((state) => state.listPartner);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  console.log(data);


  useEffect(() => {
    dispatch(listPartner(1));
  }, [dispatch]);

  if (pending) {
    return <Loader />
  }

  const getPartner = async (page) => {
    const data = await dispatch(listPartner(page));
    if (data) {
      setPage(page);
    }
  };


  let dataRow = null
  if (data) {

    dataRow = data.data.map((item, i) => <tr key={item.id}>
      <td>{i + (page - 1) * 10 + 1}</td>
      <td>{item.nama_toko}</td>
      <td>{item.nama_owner}</td>
      <td>{item.email}</td>
      <td style={{ textAlign: 'center' }}>
        <IconPen size={16} style={{ marginRight: 10 }} />
        <IconTrash size={16} />
      </td>
    </tr>)
  } else {
    dataRow = <td colSpan='5'>
      <Empty></Empty>
    </td>
  }

  return <Main>
    <ContentConteiner>
      <PartnerModalAdd isOpen={isOpen} onClose={() => setIsOpen(false)}></PartnerModalAdd>




      <ButtonContaienr>
        <Title>Partner</Title>

        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Tambah Partner
          </Button>
      </ButtonContaienr>
      <div className="table-wrapper">

        <div>

          <table className="kata-table">
            <thead>
              <tr style={{ botderTop: "2px solid red" }}>
                <th>No</th>
                <th>Nama Toko</th>
                <th>Owner</th>
                <th>Email</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataRow}
            </tbody>
          </table>
        </div>
      </div>
      <PaginationContainer>
        <Pagination current={page} total={data && data.totalpage} onSelect={select => getPartner(select)} />
      </PaginationContainer>
    </ContentConteiner>
  </Main>
}






const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  // position: relative;
  padding: 40px;
  background-color: rgb(246, 247, 248);
  transition: transform 0.3s ease 0s;
`;



const ContentConteiner = styled.div`
  width: 100%;
  height: 200px;
  margin: 0 auto;
  // background-color: red;
  @media (min-width: 1280px) {
    max-width: 920px;
  }
  @media (min-width: 1366px) {
    max-width: 990px;
  }
  @media (min-width: 1440px) {
    max-width: 1160px;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem; 
  font-weight: 500;
  letter-spacing: -0.01em;
  color: #2B2F33;
  line-height: 1.125em; 
`;

const PaginationContainer = styled.div`
  display: flex;
  width: 100%; 
  justify-content: center;
  margin-top: 20px;
`;

const ButtonContaienr = styled.div`
  display: flex;
  width: 100%; 
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

export default Partner;


