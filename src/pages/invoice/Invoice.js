import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch, connect } from "react-redux";
import { listProduct } from '../../actions/product_action';
import { detailInvoice, listInvoice, addInvoice } from '../../actions/invoice_action';
import { Button } from '@aksara-ui/core';
import ProductModalAdd from './InvoiceModalAdd';
import Loader from '../../components/Loader';
import { IconPen, IconTrash, IconPages } from '@aksara-ui/icons';
import { Main, ContentConteiner, Title, PaginationContainer, ButtonContaienr } from '../../components/Layout';
import { Pagination } from '@aksara-ui/core';
import Empty from '../../components/Empty';
import { listCategory } from '../../actions/category_action';
import { listPartner } from '../../actions/partner_action';
import { useHistory } from "react-router-dom";



const Product = () => {
  const { pending, data } = useSelector((state) => state.listInvoice);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    dispatch(listProduct(1));
    dispatch(listCategory(1));
    dispatch(listPartner(1));
    dispatch(listInvoice(1));
  }, [dispatch]);


  const getProduct = async (page) => {
    const data = await dispatch(listProduct(page));
    if (data) {
      setPage(page);
    }
  };

  const handleDetail = (id) => {
    history.push(`invoice/${data.data[0].id}`);
  }



  let dataRow = null
  if (data) {
    dataRow = data.data.map((item, i) => <tr key={item.id}>
      <td>{i + (page - 1) * 10 + 1}</td>
      <td>{item.partner}</td>
      <td>{item.date}</td>
      <td>{item.due_date}</td>
      <td>{item.status}</td>
      <td style={{ textAlign: 'center' }}>
        <IconPen size={16} style={{ marginRight: 10 }} />
        <IconTrash size={16} style={{ marginRight: 10 }} />
        <IconPages size={16} onClick={() => handleDetail(item.id)} />
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
      <ProductModalAdd isOpen={isOpen} onClose={() => setIsOpen(false)}></ProductModalAdd>
      <ButtonContaienr>
        <Title>Invoice</Title>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Tambah Invoice
          </Button>
      </ButtonContaienr>
      <div className="table-wrapper">
        <div>
          <table className="kata-table">
            <thead>
              <tr style={{ botderTop: "2px solid red" }}>
                <th>No</th>
                <th>Nama Customer</th>
                <th>tgl Pembuatan</th>
                <th>tgl Jatuh tempo</th>
                <th>status</th>
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
        <Pagination current={page} total={data && data.totalpage} onSelect={select => getProduct(select)} />
      </PaginationContainer>
    </ContentConteiner>
  </Main>
}

export default Product;


