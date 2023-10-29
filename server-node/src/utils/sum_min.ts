export function sumMin(x: string){
  const a = x.split(':')
  return (Number(a[0]) * 60) + Number(a[1])
}