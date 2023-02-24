import AboutSite from '@/components/AboutSite'
import { aboutSiteIsVisibleAtom } from '@/recoil/aboutSite'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
const AboutSiteFeatures = () => {
  const isVisible = useRecoilValue(aboutSiteIsVisibleAtom)
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
