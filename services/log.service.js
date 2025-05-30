import chalk from "chalk";
import dedent from "dedent";


const printError = (error) => {
	console.log(
		chalk.bgRed(`Error `) + error
	);
}

const printSuccess = (message) => {
	console.log(
		chalk.bgGreen(`Success `) + message
	);
}


const printHelp = () => {
	console.log(dedent`${chalk.bgCyan('HELP')}
	Без параметров - вывод погоды
	-s [CITY] для установки города
	-h для вывода помощи
	-t API_KEY для сохранения токена
	`);
}


const printWeather = (res, icon) => {
	console.log(dedent`${chalk.bgYellow('WEATHER')} Погода в городе ${res.name}
	${icon}  ${res.weather[0].description}
	Температура: ${res.main.temp} (ощущается как ${res.main.feels_like}) 
	Влажность: ${res.main.humidity}%
	Скорость ветра: ${res.main.speed}
	`
  )
}


export {printError, printSuccess, printHelp, printWeather}