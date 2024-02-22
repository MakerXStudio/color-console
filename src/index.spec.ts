import { describe, it, expect, beforeEach } from 'vitest'
import { createColorFormatter } from './index'
import chalk from 'chalk'

describe('createColorFormatter', () => {
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
    expect(collector.logs).toStrictEqual([[chalk.red('Testing 123')]])
  })
  it(`formats arguments in the arguments colour`, () => {
    formatter`${1}`
    expect(collector.logs).toStrictEqual([[chalk.blue(1)]])
  })
  it('formats text with args with text in text colour and args in arg colour', () => {
    formatter`Hello ${'World'}`
    expect(collector.logs).toStrictEqual([[chalk.red('Hello ') + chalk.blue('World')]])
  })
})
