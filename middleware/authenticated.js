export default function ({ redirect, store }) {
  if (!store.getters['auth/loggedIn']) redirect({ name: 'login' })
}
