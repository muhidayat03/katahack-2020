import React from "react";
import { Button } from '@aksara-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { renderInput } from "../../components/form/FormComponent";
import { Box, Dialog, DialogHeader, DialogContent, DialogFooter, Stack } from '@aksara-ui/core';
import { addCategory, listCategory } from "../../actions/category_action";


let CategoryModalAdd = (props) => {
  const { pending } = useSelector((state) => state.addCategory);
  const dispatch = useDispatch();
  const { isOpen, setIsOpen, onClose, onHide, handleSubmit, reset } = props;
  const tryAddCategory = async (param) => {
    const test = await dispatch(addCategory(param));
    if (test) {
      onClose();
      await dispatch(listCategory(1));
      reset();
    }
  };
  const onSubmit = ({ nama, deskripsi }) => {
    let param = {
      nama,
      deskripsi,
    };
    tryAddCategory(param);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <DialogHeader id="stories-title">Basic Example</DialogHeader>
        <DialogContent>
          <Stack>
            <Field
              name="nama"
              placeholder="Nama Kategori"
              component={renderInput}
            />
            <Field
              name="deskripsi"
              placeholder="Deskripsi"
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

CategoryModalAdd = reduxForm({
  // a unique name for the form
  form: "CategoryModalAdd",
  validate: validate,
  // keepDirtyOnReinitialize: true,
  shouldError: () => true,
  enableReinitialize: true,
})(CategoryModalAdd);

export default CategoryModalAdd;
