import { promises } from "fs"
import { homedir } from "os"
import { join } from "path"

const TOKEN_DICTIONARY = {
	token: 'token',
	city: 'city'
}

const filePath = join(homedir(), 'weather-data.json')

const saveKeyValue = async (key, value) => {
    let data = {}
	if(await isExist(filePath)) {
      const file = await promises.readFile(filePath)
	  data = JSON.parse(file)
	}
	  data[key] = value
	  await promises.writeFile(filePath, JSON.stringify(data))
}


const getKeyValue = async (key) => {
   if(await isExist(filePath)) {
	const file = await promises.readFile(filePath)
	const data = JSON.parse(file)
	return data[key]
   }
   return undefined
}

const isExist = async (path) => {
	try {
       await promises.stat(path)
	   return true
	} catch(err) {
       return false
	}
}

export {saveKeyValue, getKeyValue, TOKEN_DICTIONARY}