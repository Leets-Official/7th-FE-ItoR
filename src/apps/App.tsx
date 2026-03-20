import '@apps/styles/styles.css'
import { cn } from '@shared/utils'

function App() {
  const exampleClass = 'bg-red-500'
  return (
    <div className={cn('flex flex-col', exampleClass)}>
      <h2>initial</h2>
      <p>Example of using the cn utility function to merge class names.</p>
    </div>
  )
}

export default App
