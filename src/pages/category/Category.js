import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from "react-redux";
import { listCategory } from '../../actions/category_action';
import { Button } from '@aksara-ui/core';
import CategoryModalAdd from './CategoryModalAdd';
import Loader from '../../components/Loader';
import Empty from '../../components/Empty';
import { IconPen, IconTrash, IconPages } from '@aksara-ui/icons';
import { Main, ContentConteiner, Title, PaginationContainer, ButtonContaienr } from '../../components/Layout';
import { Pagination } from '@aksara-ui/core';


const Category = () => {

  const { pending, data } = useSelector((state) => state.listCategory);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(listCategory(1));
  }, [dispatch]);


  const getCategory = async (page) => {
    const data = await dispatch(listCategory(page));
    if (data) {
      setPage(page);
    }
  };


  let dataRow = null
  if (data) {
    dataRow = data.data.map((item, i) => <tr key={item.id}>
      <td>{i + (page - 1) * 10 + 1}</td>
      <td>{item.nama}</td>
      <td>{item.deskripsi}</td>
      <td style={{ textAlign: 'center' }}>
        <IconPen size={16} style={{ marginRight: 10 }} />
        <IconTrash size={16} style={{ marginRight: 10 }} />
        <IconPages size={16} />

      </td>
    </tr>)
  } else {
    dataRow = <td colSpan='4'>
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
      <CategoryModalAdd isOpen={isOpen} onClose={() => setIsOpen(false)}></CategoryModalAdd>
      <ButtonContaienr>
        <Title>Category</Title>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Tambah Kategori
          </Button>
      </ButtonContaienr>
      <div className="table-wrapper">
        <div>
          <table className="kata-table">
            <thead>
              <tr style={{ botderTop: "2px solid red" }}>
                <th>No</th>
                <th>Nama</th>
                <th>Deskripsi</th>
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
        <Pagination current={page} total={data && data.totalpage} onSelect={select => getCategory(select)} />
      </PaginationContainer>
    </ContentConteiner>
  </Main>
}


export default Category;


