/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import React, { useContext } from 'react'
import type { LinkProps } from '@looker/components'
import { Link } from '@looker/components'
import type { Looker40SDK } from '@looker/sdk'
import type { ExtensionContextData2 } from '@looker/extension-sdk-react'
import { ExtensionContext2 } from '@looker/extension-sdk-react'

export const ExternalLink: React.FC<Omit<LinkProps, 'color'>> = ({
  href,
  target,
  onClick,
  ...rest
}) => {
  const extensionContext = useContext<ExtensionContextData2<Looker40SDK>>(
    ExtensionContext2
  )
  const { extensionSDK } = extensionContext
  const onLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // probably don't need to call this as href is no longer added to the Link
    event.stopPropagation()
    if (href) {
      extensionSDK.updateLocation(href, undefined, target)
    } else if (onClick) {
      onClick(event)
    }
  }

  return <Link onClick={onLinkClick} {...rest} />
}
