export default ({ store, redirect }) => {
  // If the user is not authenticated
  if (store.getters['auth/authenticated'] && !store.getters['auth/tokened']) {
    return redirect('/input-token')
  }
}
