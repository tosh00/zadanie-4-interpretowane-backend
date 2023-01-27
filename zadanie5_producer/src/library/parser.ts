export default function parseToMessage (message: string ,payload: any){
  const toParse = {message, payload}
  return JSON.stringify(toParse)
}