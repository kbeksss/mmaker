import { Routing } from '@pages/index.jsx'
import { withProviders } from '@app/providers'

const App = () => {
    return (
        <>
            <Routing />
        </>
    )
}

export default withProviders(App)
