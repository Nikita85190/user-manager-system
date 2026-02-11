import { useState, useCallback } from 'react';

interface UseConfirmDialogResult {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  handleConfirm: () => void;
}

export function useConfirmDialog(
  onConfirm: () => void | Promise<void>
): UseConfirmDialogResult {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    await onConfirm();
    setIsOpen(false);
  }, [onConfirm]);

  return {
    isOpen,
    openDialog,
    closeDialog,
    handleConfirm,
  };
}
