import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker?worker'

pdfjsLib.GlobalWorkerOptions.workerPort = new pdfWorker()

export async function extractTextFromPDF(file: File) {
  const arrayBuffer = await file.arrayBuffer()

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  let text = ''

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()

    const pageText = content.items.map((item: any) => item.str).join(' ')
    text += pageText + ' '
  }

  return text
}