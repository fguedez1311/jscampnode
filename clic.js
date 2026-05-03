import { readFile } from 'node:fs'
import {readdir,stat} from 'node:fs/promises'
import { join } from 'node:path'

// 1.Recuperar la carpeta a listarç
const dir= process.argv[2] ?? '.'
// 2. Formato simple de los tamaños
function formatSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
// 3. Leer los nombres sin info
const files=await readdir(dir)
console.log(files)
const entries=await Promise.all(
    files.map(async (name)=>{
        const fullPath=join(dir,name)
        const info=await stat(fullPath)
        return {
            name,
            isDir:info.isDirectory(),
            size:formatSize(info.size)

        }
    })

)

for(const entry of entries){
    //Renderizar la información
    const icon=entry.isDir ? "📁" :"🗎"
    const size=entry.isDir ? '-': `${entry.size}`
    console.log(`${icon}  ${entry.name.padEnd(25)} ${entry.size}`)

}