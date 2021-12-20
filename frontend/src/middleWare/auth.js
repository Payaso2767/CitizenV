export default function auth ({ next, router }) {
  if (!localStorage.getItem('accessToken')) {
    console.log('abcdufg')
    return router.push({ name: 'login' })
  }

  return next()
}
