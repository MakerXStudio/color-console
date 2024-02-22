import chalk from 'chalk'

type ColorFn = (text: string) => string

export const createColorFormatter =
  <TLevel extends string>(textColor: ColorFn, argColor: ColorFn, consoleFn: TLevel, consoleObj: Record<TLevel, (...data: any[]) => void>) =>
  (textParts: TemplateStringsArray, ...args: unknown[]): void => {
    // eslint-disable-next-line no-console
    consoleObj[consoleFn](
      textParts
        .flatMap((t, i) => (args.length > i ? [textColor(t), argColor(`${args[i]}`)] : textColor(t)))
        .reduce((acc, cur) => acc + cur, ''),
    )
  }

export const colorConsole = {
  info: createColorFormatter(chalk.cyan, chalk.blue, 'info', console),
  log: createColorFormatter(chalk.white, chalk.white.bold, 'log', console),
  warn: createColorFormatter(chalk.yellow, chalk.yellow.bold, 'warn', console),
  success: createColorFormatter(chalk.green, chalk.green.bold, 'log', console),
  error: createColorFormatter(chalk.red, chalk.red.bold, 'error', console),
}
