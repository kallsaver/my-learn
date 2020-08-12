type UserName = {
  a: string
  b: string
}

type Name = Record<string, any>

function create <T> (): Record<string, any> {
  return {
    a: 's',
    b: 'c'
  }
}

const result = create<UserName>()

