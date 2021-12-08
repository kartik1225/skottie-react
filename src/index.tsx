import React from 'react'

const SkottieKitInit = require('skottiekit-wasm/bin/skottiekit.js')

export class SkottiePlayer extends React.Component<SRProps> {
  private loadKit: any

  private content: LottieFile = {}

  public width = 0

  public height = 0

  private assets = {}

  private animationUploaded: Boolean = false

  private animation: any
  private assetPath: string

  constructor(props: any) {
    super(props)

    this.loadKit = SkottieKitInit({
      locateFile: (file: string) => props.skottiePath + file
    })

    this.assetPath = props.assetPath

    this.setContent(props.animationData)
    this.handleFileUpload()
    this.downloadAssets()
  }

  downloadAssets() {
    if (this.content.assets !== undefined) {
      ;(this.content.assets as any[]).map((asset): void => {
        if (asset.p !== undefined) {
          this.handleAssetUpload(asset.p)
        }
      })
    }
  }

  render() {
    return (
      <div id='skottie-player'>
        <canvas id='my-canvas' height={this.height} width={this.width} />
      </div>
    )
  }

  private setContent(newContent: any): void {
    this.content = newContent
    if (this.content.w) {
      this.width = this.content.w
    }
    if (this.content.h) {
      this.height = this.content.h
    }
  }

  private updatePlayer(): void {
    if (this.shouldRenderAnimation()) {
      this.loadKit.then((values: any) => {
        const SkottieKit = values
        if (this.animationUploaded && this.animation) {
          this.animation.delete()
        }
        try {
          this.animation = SkottieKit.MakeManagedAnimation(
            JSON.stringify(this.content),
            this.assets
          )
        } catch (e) {
          console.warn(e)
        }
        this.animationUploaded = true
        const animation = this.animation
        const duration = (animation as any).duration() * 1000

        const oldCanvas = document.getElementById('my-canvas')
        if (oldCanvas) {
          oldCanvas.remove()
        }

        const canvasElement = document.createElement('canvas')
        canvasElement.setAttribute('id', 'my-canvas')
        canvasElement.setAttribute('width', this.width.toString())
        canvasElement.setAttribute('height', this.height.toString())

        const parent = document.getElementById('skottie-player')
        if (parent) {
          parent.append(canvasElement)
        }

        const surface = SkottieKit.MakeCanvasSurface('my-canvas')

        const firstFrame = Date.now()
        const clearColor = SkottieKit.WHITE
        const bounds = {
          fLeft: 0,
          fTop: 0,
          fRight: this.width,
          fBottom: this.height
        }

        function drawFrame(canvas: any) {
          // seek takes a float from 0.0 to 1.0
          const seek = ((Date.now() - firstFrame) / duration) % 1.0
          try {
            animation.seek(seek)
          } catch (e) {
            console.warn(e)
          }

          canvas.clear(clearColor)
          try {
            animation.render(canvas, bounds)
          } catch (e) {
            console.warn(e)
          }
          surface.requestAnimationFrame(drawFrame)
        }
        surface.requestAnimationFrame(drawFrame)
      })
    } else {
      const canvasElement = document.getElementById('my-canvas')
      if (canvasElement) {
        canvasElement.setAttribute('style', 'display:none')
      }
    }
  }

  handleFileUpload(): void {
    this.setContent(this.props.animationData)

    this.assets = {}
    this.updatePlayer()
  }

  handleAssetUpload(mapKey: string): void {
    fetch(`${this.assetPath}/${mapKey}`, {
      method: 'GET'
    })
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], mapKey)
        if (file && mapKey) {
          const reader = new FileReader()
          this.readAssetFile(reader, file, mapKey)
        }
      })
  }

  private readAssetFile(
    reader: FileReader,
    file: File | Blob,
    mapKey: string
  ): void {
    reader.readAsArrayBuffer(file)
    reader.onload = () => {
      ;(this.assets as any)[mapKey] = reader.result
      this.updatePlayer()
    }
  }

  private getNumAssets(assets: Array<any>): number {
    let length = 0
    for (let i = 0; i < assets.length; i++) {
      if (assets[i].p !== undefined) {
        length++
      }
    }
    return length
  }

  private shouldRenderAnimation(): boolean {
    if (this.content.fonts) {
      return (
        this.content.assets &&
        this.content.fonts &&
        Object.keys(this.assets).length ===
          this.getNumAssets(this.content.assets) +
            this.content.fonts.list.length
      )
    }
    return (
      this.content.assets !== undefined &&
      Object.keys(this.assets).length === this.getNumAssets(this.content.assets)
    )
  }
}
