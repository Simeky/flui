import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

export const toastSucesso = (mensagem: string) => {
  Toast.fire({
    icon: 'success',
    title: mensagem
  });
};

export const toastErro = (mensagem: string) => {
  Toast.fire({
    icon: 'error',
    title: mensagem
  });
};

export const toastAviso = (mensagem: string) => {
  Toast.fire({
    icon: 'warning',
    title: mensagem
  });
};

export const toastInfo = (mensagem: string) => {
  Toast.fire({
    icon: 'info',
    title: mensagem
  });
};
