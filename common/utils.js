const printProgress = (count, max) => {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)

  const percent = formatPecent(count/max)
  process.stdout.write(`${count}/${max} (${percent})`)
}

const formatPecent = (value) => `${(value * 100).toFixed(2)}%`

const exportModule = (package) => {
  if (typeof module !== 'undefined') {
    module.exports = package
  }
}

const utils = {
  printProgress,
  formatPecent,
  exportModule
}

exportModule(utils)