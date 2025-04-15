#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getIcon, getWeather } from "./services/api.service.js";
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js";
import { TOKEN_DICTIONARY, getKeyValue, saveKeyValue } from "./services/storage.service.js";



const saveToken = async (token) => {
   if(!token.length) {
      printError('Токен не передан!')
      return
   }
   try {
      await saveKeyValue(TOKEN_DICTIONARY.token, token)
      printSuccess('Token сохранен!')
   } catch (error) {
      printError(error)
   }
}

const saveCity = async (city) => {
   if(!city.length) {
      printError('Город не передан!')
      return
   }
   try {  
      await saveKeyValue(TOKEN_DICTIONARY.city, city)
      printSuccess('Город сохранен!')
   } catch (error) {
      printError(error)
   }
}

const getForcast = async () => {
   try {
      const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
      const weather = await getWeather(city)
      printWeather(weather, getIcon(weather.weather[0].icon))
   } catch (error) {
      if(error?.response?.status == 404) {
         printError('Неправильно указан город')
      } else if(error?.response?.status == 401) {
         printError('Неверно указан токен')
      } else {
         printError(error.message)
      }
   }
}

const initCli = () => {
   const args = getArgs(process.argv);
   if(args.h) {
     return printHelp()
   }

   if(args.s) {
     return saveCity(args.s)
   }

   if(args.t) {
     return saveToken(args.t)
   }

   return getForcast()
}

initCli()

