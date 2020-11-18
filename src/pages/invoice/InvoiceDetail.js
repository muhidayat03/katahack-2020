import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from "react-redux";
import { listProduct } from '../../actions/product_action';
import { detailInvoice } from '../../actions/invoice_action';
import { Button } from '@aksara-ui/core';
import ProductModalAdd from './InvoiceModalAdd';
import Loader from '../../components/Loader';
import { IconPen, IconTrash, IconPages } from '@aksara-ui/icons';
import { Pagination } from '@aksara-ui/core';
import Empty from '../../components/Empty';
import { listCategory } from '../../actions/category_action';
import { listPartner } from '../../actions/partner_action';
import { Main, ContentConteiner, Title, ButtonContaienr } from '../../components/Layout';
import { useHistory } from 'react-router-dom';




const Product = () => {

  const { pending, data } = useSelector((state) => state.detailInvoice);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(data);


  useEffect(() => {
    dispatch(detailInvoice(1));
  }, [dispatch]);

  const getProduct = async (page) => {
    const data = await dispatch(listProduct(page));
    if (data) {
      setPage(page);
    }
  };


  let dataRow = null
  let total = 0;
  let displayData = null;
  if (data && data.length !== 0) {
    displayData = data[0];
    displayData.items.forEach(item => {
      console.log(item.kuantiti)
      console.log(item.harga)
      total += item.kuantiti * item.harga
      console.log(total)
    })

    console.log(total)

    dataRow = displayData.items.map((item, i) => <tr key={item.id}>
      <td width="20%" style={{ textAlign: 'center', padding: 10 }}>{item.nama}</td>
      <td width="20%" style={{ textAlign: 'center', padding: 10 }}>{item.deksripsi}</td>
      <td width="20%" style={{ textAlign: 'center', padding: 10 }}>Rp {item.kuantiti}</td>
      <td width="20%" style={{ textAlign: 'center', padding: 10 }}>Rp {item.harga}</td>
      <td width="20%" style={{ textAlign: 'center', padding: 10 }}>
        Rp {item.harga * item.kuantiti}
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
      <ButtonContaienr style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
        <Title>Detail Invoice</Title>

        <a style={{ color: 'blue', marginLeft: 20, borderBottom: '1px solid blue' }} href='http://api.tokosahabatbunda.com/invoice/1' target="_blank">
          Download
          </a>
      </ButtonContaienr>
      <div style={{ width: 900, minHeight: 900, backgroundColor: 'white', marginBottom: 40, padding: 60, fontSize: 12 }}>
        <h3 style={{ textAlign: 'right', marginBottom: 20 }}>INVOICE</h3>
        <div style={{ display: 'flex', justifyContent: 'flex-end', display: 'flex', }}>
          <div>
            <div style={{ width: 260, display: 'flex', }}>
              <div style={{ width: 120 }}>No Invoice</div>
              <div style={{ flex: 1 }}>: INV {displayData?.id}</div>
            </div>
            <div style={{ width: 260, display: 'flex', }}>
              <div style={{ width: 120 }}>Tanggal</div>
              <div style={{ flex: 1 }}>:  {displayData?.date}</div>
            </div>
            <div style={{ width: 260, display: 'flex', }}>
              <div style={{ width: 120 }}>Tgl. Jatuh Tempo</div>
              <div style={{ flex: 1 }}>:  {displayData?.due_date}</div>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
          <div style={{ width: '40%', }}>
            <h3 style={{ borderBottom: "1px solid black" }}>Info Perusahaan</h3>
            <h3 style={{ fontWeight: 'normal', marginTop: 4 }}>{displayData?.company}</h3>
          </div>
          <div style={{ width: '40%', }}>
            <h3 style={{ borderBottom: "1px solid black" }}>Tagihan Untuk</h3>
            <h3 style={{ fontWeight: 'normal', marginTop: 4 }}>{displayData?.partner}</h3>
          </div>
        </div>



        <div style={{ marginTop: 40 }}>
          <table style={{ width: '100%', borderSpacing: 2, borderColor: 'grey', borderCollapse: 'collapse', borderBottom: '1px solid black' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'center', color: 'white', backgroundColor: 'black', padding: 10 }}>Produk</th>
                <th style={{ textAlign: 'center', color: 'white', backgroundColor: 'black', padding: 10 }}>Deskripsi</th>
                <th style={{ textAlign: 'center', color: 'white', backgroundColor: 'black', padding: 10 }}>Kuantitas</th>
                <th style={{ textAlign: 'center', color: 'white', backgroundColor: 'black', padding: 10 }}>Harga</th>
                <th style={{ textAlign: 'center', color: 'white', backgroundColor: 'black', padding: 10 }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {dataRow}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 8 }}>
          <table style={{ width: '100%', borderSpacing: 2, borderColor: 'grey', borderCollapse: 'collapse', }}>
            <tbody>
              <tr>
                <td width="20%" style={{ textAlign: 'center', }}></td>
                <td width="20%" style={{ textAlign: 'center', }}></td>
                <td width="20%" style={{ textAlign: 'center', }}></td>
                <td width="20%" style={{ textAlign: 'center', fontWeight: 'bold', textAlign: 'right' }}>Sub Total :</td>
                <td width="20%" style={{ textAlign: 'center', fontWeight: 'bold' }}>Rp {total}</td>
              </tr>
              <tr>
                <td width="20%" style={{ textAlign: 'center', }}></td>
                <td width="20%" style={{ textAlign: 'center', }}></td>
                <td width="20%" style={{ textAlign: 'center', }}></td>
                <td width="20%" style={{ textAlign: 'center', fontWeight: 'bold', textAlign: 'right' }}>Discount :</td>
                <td width="20%" style={{ textAlign: 'center', fontWeight: 'bold' }}>-</td>
              </tr>
              <tr>
                <td width="20%" style={{ textAlign: 'center', }}></td>
                <td width="20%" style={{ textAlign: 'center', }}></td>
                <td width="20%" style={{ textAlign: 'center', }}></td>
                <td width="20%" style={{ textAlign: 'center', fontWeight: 'bold', textAlign: 'right' }}>Total :</td>
                <td width="20%" style={{ textAlign: 'center', fontWeight: 'bold' }}>Rp {total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 60, padding: 60 }}>
          <div style={{ width: 120 }}>
            <h4 style={{ textAlign: 'left' }}>Notes:</h4>
            <p>{displayData?.notes}</p>
          </div>
          <div style={{ width: 120 }}>
            <div style={{ borderBottom: '1px solid black' }}></div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h4 style={{ textAlign: 'center' }}>{displayData?.company}</h4>
          </div>
        </div>


      </div>





    </ContentConteiner>

  </Main >
}




export default Product;


