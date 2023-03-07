import React from 'react'
import type { PropsWithChildren } from 'react'
import Nav from './nav/Nav'
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
        <Nav/>
        <main>{children}</main>
    </>
  )
}

export default Layout