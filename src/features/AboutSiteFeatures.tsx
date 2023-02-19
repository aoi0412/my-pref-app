import AboutSite from '@/components/elements/AboutSite'
import { useState } from 'react'
const AboutSiteFeatures = () => {
  const isVisible = true
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const text = 'fjeiwoajfowia'
  return (
    <AboutSite
      isVisible={isVisible}
      isOpen={isOpen}
      onPress={() => {
        if (!isOpen) setIsOpen(true)
      }}
      onClose={() => {
        setIsOpen(false)
      }}
      explanation={text}
      image
    />
  )
}

export default AboutSiteFeatures
