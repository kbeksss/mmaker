import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const withRouter = (component) => () => (
    <BrowserRouter>
        <Suspense>{component()}</Suspense>
    </BrowserRouter>
)
