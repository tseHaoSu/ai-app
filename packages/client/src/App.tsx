import { useEffect, useState } from 'react';
import './index.css';
import { Button } from './components/ui/button';

function App() {
   const [message, setMessage] = useState('');

   useEffect(() => {
      fetch('/api/hello')
         .then((res) => res.json())
         .then((data) => setMessage(data.message));
   }, []);

   return (
      <div className="p-4">
         <p className="font-bold text-2xl">{message}</p>
         <Button>Click me</Button>
      </div>
   );
}

export default App;
