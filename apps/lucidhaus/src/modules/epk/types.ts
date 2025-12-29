export interface EPKPressLink {
  outlet: string
  url: string
  description?: string
}

export interface EPKPhoto {
  src: string
  alt: string
}

export interface EPKTourGraphic {
  src: string
  title: string
}

export interface EPKVideo {
  src: string
  poster?: string
}

export interface EPKData {
  bio: string
  pressLinks: EPKPressLink[]
  photos: EPKPhoto[]
  tourGraphics: EPKTourGraphic[]
  video?: EPKVideo
}
