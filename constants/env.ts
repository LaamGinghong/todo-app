import { resolve } from 'path'

const PROJECT_ROOT = resolve(__dirname, '../')
const PROJECT_NAME = 'TODO APP'

const IS_DEV = process.env.NODE_ENV !== 'production'

export { PROJECT_ROOT, PROJECT_NAME, IS_DEV }
