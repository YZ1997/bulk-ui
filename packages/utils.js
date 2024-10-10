// 节流
const debounc = (fn, delay = 300) => {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

// 防抖
const throttle = (fn, delay = 300) => {
  let timer = null
  return function () {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

// 图片压缩
const compress = (file, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = e => {
      const img = new Image()
      img.src = e.target.result
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const { width, height } = img
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)
        const dataUrl = canvas.toDataURL('image/jpeg', quality)
        resolve(dataUrl)
      }
    }
  })
}

// 图片链接压缩
const compressUrl = (url, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const { width, height } = img
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)
      const dataUrl = canvas.toDataURL('image/jpeg', quality)
      resolve(dataUrl)
    }
  })
}

// 将file对象转换为base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export {
  debounc,
  throttle,
  compress,
  compressUrl,
  fileToBase64
}