import { Routes, Route } from 'react-router'
import Home from '@pages/Home/index.jsx'

export const Routing = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Home />} />
            </Routes>
        </>
    )
}
