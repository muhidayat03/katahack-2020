import React from "react";
import { Button } from '@aksara-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { renderInput, renderSelect } from "../../components/form/FormComponent";

import { Box, Dialog, DialogHeader, DialogContent, DialogFooter, Stack } from '@aksara-ui/core';

import { addProduct, listProduct } from "../../actions/product_action";


let ProductModalAdd = (props) => {
  const { pending } = useSelector((state) => state.addProduct);
  const { data: dataCategory } = useSelector((state) => state.listCategory);
  const { data: dataPartner } = useSelector((state) => state.listPartner);

  const dispatch = useDispatch();
  const { isOpen, setIsOpen, onClose, onHide, handleSubmit, reset } = props;

  const tryAddProduct = async (param) => {
    const test = await dispatch(addProduct(param));
    if (test) {
      onClose();
      await dispatch(listProduct(1));
      reset();
    }
  };
  const onSubmit = ({ kode, nama, deskripsi, kategori, jml_stok, harga_beli, harga_jual, suplier }) => {
    let param = {
      kode,
      nama,
      deskripsi,
      kategori: kategori.value,
      jml_stok,
      harga_beli,
      harga_jual,
      suplier: suplier.value
    };
    tryAddProduct(param);
  };

  const typeOptions = [
    { label: 'Suplier', value: 1 },
    { label: 'Customer', value: 2 },
    { label: 'Suplier & Customer', value: 3 }
  ]

  let categoryOptions = [];
  if (dataCategory && dataCategory.data.length !== 0) {
    categoryOptions = dataCategory.data.map(({ nama }) => ({
      label: nama,
      value: nama,
    }));
  }

  let suplierOptions = [];
  if (dataPartner && dataPartner.data.length !== 0) {
    suplierOptions = dataPartner.data.map(({ nama_toko }) => ({
      label: nama_toko,
      value: nama_toko,
    }));
  }
  return (
    <Dialog isOpen={isOpen} onClose={onClose} >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <DialogHeader id="stories-title">Tambah Product</DialogHeader>
        <DialogContent>
          <Stack>

            <Field
              name="kode"
              placeholder="Kode Produk"
              component={renderInput}
            />

            <Field
              name="nama"
              placeholder="Nama Produk"
              component={renderInput}
            />
            <Field
              name="deskripsi"
              placeholder="deskripsi"
              component={renderInput}
            />
            <Field
              name="kategori"
              placeholder="Kategori"
              options={categoryOptions}
              component={renderSelect}
            />
            <Field
              name="jml_stok"
              placeholder="Jumlah Stok"
              type='number'

              component={renderInput}
            />
            <Field
              name="harga_beli"
              placeholder="Harga Beli"
              type='number'

              component={renderInput}
            />
            <Field
              name="harga_jual"
              placeholder="Harga Jualp"
              type='number'

              component={renderInput}
            />
            <Field
              name="suplier"
              placeholder="Suplier"
              component={renderSelect}
              options={suplierOptions}
            />
          </Stack>
        </DialogContent>
        <DialogFooter>
          <Box display="flex" flexDirection="row-reverse">
            <Button variant='primary' type='submit'>Simpan</Button>
          </Box>
        </DialogFooter>
      </form>
    </Dialog >
  );
};



function validate(values) {
  const { nama, deskripsi } = values;
  const errors = {};
  if (!nama) {
    errors.nama = "Nama wajib diis";
  }

  if (!deskripsi) {
    errors.deskripsi = "Deskripsi wajib diisi";
  }
  return errors;
}

ProductModalAdd = reduxForm({
  // a unique name for the form
  form: "ProductModalAdd",
  validate: validate,
  // keepDirtyOnReinitialize: true,
  shouldError: () => true,
  enableReinitialize: true,
})(ProductModalAdd);

export default ProductModalAdd;
