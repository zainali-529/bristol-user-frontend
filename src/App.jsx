import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import MouseFollowerGSAP from './components/MouseFollowerGSAP'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <MouseFollowerGSAP /> */}
    </>
  )
}

export default App
