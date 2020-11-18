import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from "react-redux";
import { listCategory } from '../../actions/category_action';
import { Button } from '@aksara-ui/core';
import CategoryModalAdd from './CategoryModalAdd';
import Loader from '../../components/Loader';
import Empty from '../../components/Empty';
import { IconPen, IconTrash } from '@aksara-ui/icons';




import { Pagination } from '@aksara-ui/core';


const Category = () => {

  const { pending, data } = useSelector((state) => state.listCategory);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  console.log(data);


  useEffect(() => {
    dispatch(listCategory(1));
  }, [dispatch]);

  if (pending) {
    return <Loader />
  }

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
        <IconTrash size={16} />
      </td>
    </tr>)
  } else {
    dataRow = <td colSpan='4'>
      <Empty></Empty>
    </td>
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

export default Category;


