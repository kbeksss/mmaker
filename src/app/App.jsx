import { Routing } from '@pages/index.jsx'
import { withProviders } from '@app/providers'

const App = () => {
    return (
        <>
            <Routing />
            another check
        </>
    )
}

export default withProviders(App)
