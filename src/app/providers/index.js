import compose from 'compose-function'
import { withStore } from './with-store.jsx'
import { withRouter } from './with-router.jsx'
import {withStyledComponents} from "./with-styled-components.jsx";

export const withProviders = compose(withStore, withRouter, withStyledComponents)
