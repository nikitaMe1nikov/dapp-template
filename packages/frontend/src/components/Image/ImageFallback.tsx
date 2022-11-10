import { FC, useEffect, useState, DetailedHTMLProps, ImgHTMLAttributes, memo } from 'react'
import { StandardLonghandProperties } from 'csstype' // eslint-disable-line import/no-extraneous-dependencies

type ImageFallbackProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  objectFit?: StandardLonghandProperties['objectFit']
  objectPosition?: StandardLonghandProperties['objectPosition']
  fallbackImage?: string
  layout?: 'fill'
}

const LAYOUTS = {
  fill: {
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
  },
}

export const ImageFallback: FC<ImageFallbackProps> = memo(
  ({ objectFit = 'contain', objectPosition = '50% 50%', fallbackImage, src, layout, ...props }) => {
    const [srcImage, setImageSrc] = useState(fallbackImage || src)
    const css = layout ? LAYOUTS[layout] : {}

    useEffect(() => {
      if (src && fallbackImage) {
        const img = new Image()
        img.src = src
        const onLoad = () => setImageSrc(src)
        img.addEventListener('load', onLoad)

        return () => {
          img.removeEventListener('load', onLoad)
        }
      }
    }, [src, fallbackImage])

    useEffect(() => {
      if (src !== srcImage) {
        setImageSrc(fallbackImage)
      }
    }, [src, srcImage, fallbackImage])

    return (
      <img
        {...props}
        style={{
          ...props.style,
          ...css,
          objectFit,
          objectPosition,
        }}
        src={srcImage}
      />
    )
  },
)
