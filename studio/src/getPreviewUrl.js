export default (doc) => {
  return `/api/preview?slug=` + doc?.slug?.current + '&type=' + doc?._type
}