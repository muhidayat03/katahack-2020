import React from "react";
import { Button } from '@aksara-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { renderInput, renderSelect } from "../../components/form/FormComponent";

import { Box, Dialog, DialogHeader, DialogContent, DialogFooter, Stack } from '@aksara-ui/core';

import { addPartner, listPartner } from "../../actions/partner_action";


let PartnerModalAdd = (props) => {
  const { pending } = useSelector((state) => state.addPartner);
  const dispatch = useDispatch();
  const { isOpen, setIsOpen, onClose, onHide, handleSubmit, reset } = props;

  const tryAddPartner = async (param) => {
    const test = await dispatch(addPartner(param));
    if (test) {
      onClose();
      await dispatch(listPartner(1));
      reset();
    }
  };
  const onSubmit = ({ nama_toko, nama_owner, tipe, email, no_hp, alamat, catatan }) => {
    let param = {
      nama_toko,
      nama_owner,
      tipe: tipe.value,
      email,
      no_hp,
      alamat,
      catatan
    };
    tryAddPartner(param);
  };

  const typeOptions = [
    { label: 'Suplier', value: 1 },
    { label: 'Customer', value: 2 },
    { label: 'Suplier & Customer', value: 3 }
  ]
  return (
    <Dialog isOpen={isOpen} onClose={onClose} >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <DialogHeader id="stories-title">Tambah Partner</DialogHeader>
        <DialogContent>
          <Stack>

            <Field
              name="nama_toko"
              placeholder="Nama Toko"
              component={renderInput}
            />
            <Field
              name="tipe"
              placeholder="Tipe"
              options={typeOptions}
              component={renderSelect}
            />
            <Field
              name="nama_owner"
              placeholder="Nama Owner"
              component={renderInput}
            />
            <Field
              name="email"
              placeholder="Email"
              component={renderInput}
            />
            <Field
              name="no_hp"
              placeholder="No Hp"
              component={renderInput}
            />
            <Field
              name="alamat"
              placeholder="Alamat"
              component={renderInput}
            />
            <Field
              name="catatan"
              placeholder="Catatan"
              component={renderInput}
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

PartnerModalAdd = reduxForm({
  // a unique name for the form
  form: "PartnerModalAdd",
  validate: validate,
  // keepDirtyOnReinitialize: true,
  shouldError: () => true,
  enableReinitialize: true,
})(PartnerModalAdd);

export default PartnerModalAdd;
