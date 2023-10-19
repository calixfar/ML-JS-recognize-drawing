class SketchPad {
  constructor (container, size = 400) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = size
    this.canvas.height = size
    this.canvas.style = `
      background-color: white;
      box-shadow: 0px 0px 10px 2px black;
    `

    container.appendChild(this.canvas)

    const lineBreak = document.createElement('br')
    container.appendChild(lineBreak)

    this.undoBtn = document.createElement('button')
    this.undoBtn.innerHTML = 'UNDO'
    container.appendChild(this.undoBtn)


    this.ctx = this.canvas.getContext('2d')

    this.reset()
    this.#addEventListeners()
  }

  #addEventListeners() {
    this.canvas.onmousedown = (event) => {

      this.paths.push([this.#getMouseLocation(event)])
      this.isDrawing = true
    }
    this.canvas.onmousemove = (event) => {
      if (!this.isDrawing) {
        return
      }

      this.paths[this.paths.length - 1].push(
        this.#getMouseLocation(event)
      )
      this.#redraw()
    }

    document.onmouseup = () => {
      this.isDrawing = false
    }
    this.canvas.ontouchstart = (event) => {
      this.canvas.onmousedown(event.touches[0])
    }
    this.canvas.ontouchmove = (event) => {
      this.canvas.onmousemove(event.touches[0])
    }
    document.ontouchend = () => {
      this.canvas.onmouseup()
    }

    this.undoBtn.onclick = () => {
      this.paths.pop()
      this.#redraw()
    }
  }

  #redraw = () => {
    this.ctx.clearRect(
      0,0,
      this.canvas.width, this.canvas.height  
    )
    draw.paths(this.ctx, this.paths)

    this.undoBtn.disabled = !(this.paths.length > 0)
  }

  #getMouseLocation = (event) => {
    const rect = this.canvas.getBoundingClientRect()
    return [
      Math.round(event.clientX - rect.left),
      Math.round(event.clientY - rect.top)
    ]
  }

  reset () {
    this.paths = []
    this.isDrawing = false
    this.#redraw()
  }
}