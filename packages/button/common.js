const obj = {
  type: {
    type: String,
    default: 'primary'//promary,success,warning,danger,info
  },
  size: {
    type: String,
    default: 'normal'
  },
  loading: {
    type: Boolean,
    default: false
  },
  iconButton: {
    type: Boolean,
    default: false
  },
  borderButton: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: 'auto'
  },
  height: {
    type: String,
    default: 'auto'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  border: {
    type: String,
    default: ''
  },
  background: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  }
}
const {loading,disabled,...loadingObj} = obj
export default obj
export {
  loadingObj
}
