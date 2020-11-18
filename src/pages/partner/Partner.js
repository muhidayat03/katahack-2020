import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from "react-redux";
import { listPartner } from '../../actions/partner_action';
import { Button } from '@aksara-ui/core';
import PartnerModalAdd from './PartnerModalAdd';
import Loader from '../../components/Loader';
import Empty from '../../components/Empty';
import { IconPen, IconTrash, IconPages } from '@aksara-ui/icons';
import { Main, ContentConteiner, Title, PaginationContainer, ButtonContaienr } from '../../components/Layout';




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
        <IconTrash size={16} style={{ marginRight: 10 }} />
        <IconPages size={16} />

      </td>
    </tr>)
  } else {
    dataRow = <td colSpan='5'>
      <Empty></Empty>
    </td>
  }

  if (pending) {
    return <Main>
      <ContentConteiner>
        <Loader />
      </ContentConteiner>
    </Main>
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







export default Partner;


