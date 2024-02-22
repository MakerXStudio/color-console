import { describe, it, expect, beforeEach } from 'vitest'
import { createColorFormatter } from './index'
import chalk from 'chalk'

describe('createColorFormatter', () => {
  const colorStops = {
    red: '\u001b[31m',
    blue: '\u001b[34m',
    default: `\u001b[39m`,
  }

  const collector = {
    logs: [] as unknown[][],
    collectLog(...data: any[]) {
      this.logs.push(data)
    },
    reset() {
      this.logs = []
    },
  }
  const formatter = createColorFormatter(chalk.red, chalk.blue, 'collectLog', collector)
  beforeEach(() => {
    collector.reset()
  })
  it('formats plain text in the text colour', () => {
    formatter`Testing 123`
    expect(collector.logs).toStrictEqual([[`${colorStops.red}Testing 123${colorStops.default}`]])
  })
  it(`formats arguments in the arguments colour`, () => {
    formatter`${1}`
    expect(collector.logs).toStrictEqual([[`${colorStops.blue}1${colorStops.default}`]])
  })
  it('formats text with args with text in text colour and args in arg colour', () => {
    formatter`Hello ${'World'}`
    expect(collector.logs).toStrictEqual([[`${colorStops.red}Hello ${colorStops.default}${colorStops.blue}World${colorStops.default}`]])
  })
})
