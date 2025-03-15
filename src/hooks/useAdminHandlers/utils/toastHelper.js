export const showToast = (toast, { title, description = '', status }) => {
  toast({
    title,
    description,
    status,
    duration: status === 'error' ? 3000 : 2000,
    isClosable: true,
    position: 'top-right'
  });
};