declare module 'pdfjs-dist/build/pdf.worker?worker' {
  const workerConstructor: new () => Worker
  export default workerConstructor
}