export default function auth({ next, router }) {
    if (!localStorage.getItem('jwt')) {
      console.log("chua dang nhap");
      return router.push({ name: 'Login' });
    }

    return next();
  }
