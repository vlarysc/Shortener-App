import linksApi from 'src/composebles/linksApi'

export default function linkService () {
  const { get, post, update, del, redirect } = linksApi('')

  return {
    get,
    post,
    update,
    del,
    redirect
  }
}
