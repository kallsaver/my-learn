interface Options {
  label: string
}

function init(options: Options) {
  console.log(options.label)
}

interface SquareConfig {
  color?: string
  width?: number
}

function createSquare(config: SquareConfig): {color: string, width: number} {
  const square = {
    color: 'white',
    width: 300,
  }
  if (config.color) {
    square.color = config.color
  }
  return square
}
