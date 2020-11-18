import React from 'react';
import { Button } from '@aksara-ui/core';
import { renderSelect, renderInput } from "../../components/form/FormComponent";
import { IconCloseRounded } from '@aksara-ui/icons';
import { useSelector } from 'react-redux'
import { Field } from 'redux-form'



const RenderArray = ({ fields }) => {
  const { data: dataProduct } = useSelector((state) => state.listProduct);

  let productOptions = [];
  if (dataProduct && dataProduct.data.length !== 0) {
    productOptions = dataProduct.data.map(({ nama, harga_jual, deskripsi }) => ({
      label: nama,
      value: harga_jual,
      deskripsi: deskripsi,
    }));
  }

  return <>{
    fields.map((product, index) => (
      <div
        key={index}
        style={{ marginBottom: 5, display: 'flex', }}
      >
        <div style={{ flex: 0.7 }}>
          <Field
            name={product + '.name'}
            type="text"
            options={productOptions}
            component={renderSelect}
          />
        </div>
        <div style={{ flex: 0.3, marginLeft: 10 }}>
          <Field
            name={product + '.total'}
            type="number"
            options={product.total}
            component={renderInput}
          />
        </div>
        <IconCloseRounded
          style={{ margin: '8px 10px' }}
          onClick={() => fields.remove(index)}
        />
      </div>
    ))

  }
    < Button
      type="button"
      onClick={() => fields.push()}
    >
      Tambah Produk
  </Button>
  </>

}


export default RenderArray;