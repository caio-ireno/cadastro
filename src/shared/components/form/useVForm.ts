import { FormHandles } from '@unform/core';
import { useCallback, useRef } from 'react';

export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);
  const IsSavingAndClose = useRef(false);
  const IsSavingAndNew = useRef(false);

  const HandleSave = useCallback(() => {
    IsSavingAndNew.current = false;
    IsSavingAndClose.current = false;
    formRef.current?.submitForm();
  }, []);
  const HandleSaveAndNew = useCallback(() => {
    IsSavingAndNew.current = true;
    IsSavingAndClose.current = false;
    formRef.current?.submitForm();
  }, []);
  const HandleSaveAndCLose = useCallback(() => {
    IsSavingAndNew.current = false;
    IsSavingAndClose.current = true;
    formRef.current?.submitForm();
  }, []);

  const HandleIsSaveAndNew = useCallback(() => {
    return IsSavingAndNew.current;
  }, []);
  const HandleIsSaveAndClose = useCallback(() => {
    return IsSavingAndClose.current;
  }, []);

  return {
    formRef,
    save: HandleSave,
    saveAndNew: HandleSaveAndNew,
    saveAndClose: HandleSaveAndCLose,
    IsSaveAndClose: HandleIsSaveAndClose,
    IsSaveAndNew: HandleIsSaveAndNew,
  };
};
