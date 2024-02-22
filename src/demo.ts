import { colorConsole, createColorFormatter } from './index'
import chalk from 'chalk'

colorConsole.log`Example of log with args ${1}, ${2}, ${'three'}`
colorConsole.info`Example of info with args ${1}, ${2}, ${'three'}`
colorConsole.warn`Example of warn with args ${1}, ${2}, ${'three'}`
colorConsole.error`Example of error with args ${1}, ${2}, ${'three'}`
colorConsole.success`Example of success with args ${1}, ${2}, ${'three'}`

const customLogger = createColorFormatter(chalk.magenta, chalk.greenBright, 'log', console)

customLogger`Example of custom with args ${1}, ${2}, ${'three'}`
