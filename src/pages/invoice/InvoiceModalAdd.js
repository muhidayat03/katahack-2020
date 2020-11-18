import React from "react";
import { Button } from '@aksara-ui/core';
import { useSelector, useDispatch, connect } from "react-redux";
import { reduxForm, Field, FieldArray } from "redux-form";
import { renderInput, renderSelect } from "../../components/form/FormComponent";

import { Box, Dialog, DialogHeader, DialogContent, DialogFooter, Stack } from '@aksara-ui/core';

import { addProduct, listProduct } from "../../actions/product_action";
import { listInvoice, addInvoice } from "../../actions/invoice_action";
import RenderArray from './InvoiceForm';
import { formValueSelector } from 'redux-form' // ES6

let InvoiceModalAdd = (props) => {
  const { pending } = useSelector((state) => state.addProduct);
  const { data: dataProduct } = useSelector((state) => state.listProduct);
  const { data: dataPartner } = useSelector((state) => state.listPartner);

  const dispatch = useDispatch();
  const { isOpen, onClose, onHide, handleSubmit, reset } = props;

  console.log('AAAa', props.product)
  const tryAddInvoice = async (param, data) => {
    const test = await dispatch(addInvoice(param,data));
    if (test) {
      onClose();
      await dispatch(listInvoice(1));
      reset();
    }
  };

  const onSubmit = ({
    company,
    partner,
    date,
    due_date,
    product,
    notes, }) => {
    let param = {
      company,
      partner: partner.value,
      date,
      due_date,
      notes,
      status: 0,
      send_invoice: 0,
      total_harga: total
    };
    let data = product.map(item => {
      if (item)
        return {
          nama: item.name.label,
          harga: Number(item.name.value),
          deksripsi: item.name.deskripsi,
          kuantiti: Number(item.total)
        }
    })
    console.log('IIIIIIII', param, data)
    tryAddInvoice(param, data);
  };



  let productOptions = [];
  if (dataProduct && dataProduct.data.length !== 0) {
    productOptions = dataProduct.data.map(({ nama }) => ({
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

  let total = 0;
  console.log('asdfasdfasdf', props.product)
  if (props.product)
    for (var i = 0; i < props.product.length; i++) {
      if (props.product[i]) {

        let itemPrice = Number(props.product[i].name.value);
        let itemTotal = Number(props.product[i].total);

        if (itemPrice > 0 && itemTotal > 0) {
          total += itemPrice * itemTotal;
        }
      }


    }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <DialogHeader id="stories-title">Tambah Invoice</DialogHeader>
        <DialogContent>
          <div style={{ overflow: 'auto', maxHeight: 400 }}>

            <Stack>

              <Field
                name="company"
                placeholder="Company"
                component={renderInput}
              />
              <Field
                name="partner"
                placeholder="Partner"
                component={renderSelect}
                options={suplierOptions}
              />
              <Field
                name="date"
                placeholder="Tanggal Pembuatan"
                component={renderInput}
              />
              <Field
                name="due_date"
                placeholder="Tanggal Jatuh Tempo"
                component={renderInput}
              />
              <Field
                name="notes"
                placeholder="Catatan"
                component={renderInput}
              />
              <FieldArray
                name="product"
                placeholder="product"
                component={RenderArray}
              />
            </Stack>
          </div>
        </DialogContent>
        <DialogFooter>
          total : {total}
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

InvoiceModalAdd = reduxForm({
  // a unique name for the form
  form: "InvoiceModalAdd",
  validate: validate,
  // keepDirtyOnReinitialize: true,
  shouldError: () => true,
  enableReinitialize: true,
})(InvoiceModalAdd);

const selector = formValueSelector('InvoiceModalAdd')

export default connect(state => ({ product: selector(state, 'product',) }))(InvoiceModalAdd)
