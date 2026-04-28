import { readFile } from 'node:fs'
import {readdir,stat} from 'node:fs/promises'
import { join } from 'node:path'
const args=process.argv.slice(2)
// 1.Recuperar la carpeta a listarç
const dir= process.argv[2] ?? '.'
// 2. Formato simple de los tamaños
const formatBytes=(size)=>{}
// 3. Leer los nombres sin info
const files=await readdir(dir)
console.log(files)